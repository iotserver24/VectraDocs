import Link from 'next/link';
import { Github } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

                    {/* Column 1: Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-lg font-bold text-white mb-3">Your Docs</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Built with the VectraDocs Template.
                        </p>
                    </div>

                    {/* Column 2: Documentation */}
                    <div>
                        <h4 className="text-sm font-semibold text-zinc-200 mb-3">Documentation</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/docs" className="text-zinc-400 hover:text-blue-500 transition-colors">Getting Started</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-500">
                        © {new Date().getFullYear()} Your Organization. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
