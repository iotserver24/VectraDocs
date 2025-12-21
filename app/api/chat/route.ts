import { restore } from '@orama/plugin-data-persistence';
import { search } from '@orama/orama';
import fs from 'fs';
import path from 'path';

// Load the index once into memory
const INDEX_PATH = path.join(process.cwd(), 'public', 'search-index.json');
let oramaDB: any = null;

async function getOramaDB() {
    if (oramaDB) return oramaDB;
    try {
        const data = fs.readFileSync(INDEX_PATH, 'utf-8');
        oramaDB = await restore('json', data);
        return oramaDB;
    } catch (e) {
        console.error("❌ Orama index not found. Did you run 'npm run build:index'?");
        return null;
    }
}

// Pre-warm DB on module load
getOramaDB();

export async function POST(req: Request) {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // RAG Retrieval (parallel with nothing - just fast)
    const db = await getOramaDB();
    let context = "";
    let sourcesPayload: { title: string; url: string }[] = [];

    if (db) {
        const searchResult = await search(db, { term: lastMessage, limit: 3 });
        context = searchResult.hits
            .map((h) => `[${h.document.title}]: ${h.document.content}`)
            .join("\n\n");
        sourcesPayload = searchResult.hits.map((h) => ({
            title: h.document.title as string,
            url: h.document.url as string
        }));
    }

    // Build messages for API (shorter system prompt)
    const systemPrompt = `You are a docs assistant. Answer using ONLY the context below. Be concise.

Context:
${context}

Rules: If info not in context, say so. Add 📚 References section with markdown links at end.`;

    const apiMessages = [
        { role: "system", content: systemPrompt },
        ...messages.slice(-6).map((m: any) => ({ role: m.role, content: m.content }))
    ];

    // Direct OpenAI-compatible API call (faster than LangChain)
    const response = await fetch(`${process.env.LLM_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LLM_API_KEY}`
        },
        body: JSON.stringify({
            model: process.env.LLM_MODEL || "gpt-3.5-turbo",
            messages: apiMessages,
            stream: true,
            temperature: 0
        })
    });

    if (!response.body) {
        return new Response("No response", { status: 500 });
    }

    // Stream SSE response directly
    const transformStream = new ReadableStream({
        async start(controller) {
            const reader = response.body!.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;
                        try {
                            const json = JSON.parse(data);
                            const content = json.choices?.[0]?.delta?.content;
                            if (content) {
                                controller.enqueue(new TextEncoder().encode(content));
                            }
                        } catch { }
                    }
                }
            }
            controller.close();
        }
    });

    return new Response(transformStream, {
        headers: {
            'X-Search-Term': encodeURIComponent(lastMessage),
            'X-Sources-Count': sourcesPayload.length.toString(),
            'X-Sources': JSON.stringify(sourcesPayload)
        }
    });
}
