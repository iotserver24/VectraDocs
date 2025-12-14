import Link from 'next/link';
import { ArrowRight, Book, Terminal, Layers, Moon, Zap, Cpu, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden bg-black text-zinc-100">

      {/* 1. Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center z-10">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
          <Terminal className="w-3 h-3 text-blue-500" />
          <span>Documentation Template</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Build beautiful docs <br />
          <span className="text-blue-500">in minutes.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          A powerful, modern documentation starter kit.
          <span className="hidden md:inline"> Built with Next.js, Fumadocs, and Tailwind CSS. </span>
          Everything you need to create world-class documentation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/docs"
            className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
          >
            Read the Docs
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/iotserver24/VectraDocs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-full font-medium transition-all"
          >
            <Layers className="w-4 h-4" />
            View Source
          </a>
        </div>
      </div>

      {/* 2. Features Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 py-16 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">MDX Powered</h3>
            <p className="text-zinc-400 leading-relaxed">
              Write content in MDX. Use React components directly in your markdown files.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Fast & SEO Ready</h3>
            <p className="text-zinc-400 leading-relaxed">
              Statically generated pages for optimal performance and SEO out of the box.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Moon className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Dark Mode Support</h3>
            <p className="text-zinc-400 leading-relaxed">
              Values user preference and comes with a beautiful dark mode by default.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Tech Stack Marquee */}
      <div className="w-full border-t border-zinc-900 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="flex items-center gap-2 text-lg font-semibold"><Cpu className="w-5 h-5" /> Next.js</span>
          <span className="flex items-center gap-2 text-lg font-semibold"><Globe className="w-5 h-5" /> Fumadocs</span>
          <span className="flex items-center gap-2 text-lg font-semibold"><Zap className="w-5 h-5" /> Tailwind CSS</span>
        </div>
      </div>

    </div>
  );
}
