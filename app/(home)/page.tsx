'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Zap, Code2, Github, Terminal, Cpu, Globe, Package, Sparkles, Rocket, Shield, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Animated background orbs component - NO random values to avoid hydration mismatch
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main orange glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[120px] animate-pulse-slow" />

      {/* Floating orbs - using orange theme only */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float-1" />
      <div className="absolute top-40 right-[15%] w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-float-2" />
      <div className="absolute bottom-20 left-[20%] w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-float-3" />
      <div className="absolute bottom-40 right-[10%] w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-float-4" />

      {/* Static particle dots - fixed positions to avoid hydration mismatch */}
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[10%] top-[20%]" style={{ animationDelay: '0s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[25%] top-[15%]" style={{ animationDelay: '0.5s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[40%] top-[30%]" style={{ animationDelay: '1s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[55%] top-[10%]" style={{ animationDelay: '1.5s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[70%] top-[25%]" style={{ animationDelay: '2s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[85%] top-[20%]" style={{ animationDelay: '2.5s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[15%] top-[60%]" style={{ animationDelay: '3s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[30%] top-[70%]" style={{ animationDelay: '3.5s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[60%] top-[65%]" style={{ animationDelay: '4s' }} />
      <div className="absolute w-1 h-1 bg-orange-500/40 rounded-full animate-particle left-[80%] top-[55%]" style={{ animationDelay: '4.5s' }} />
    </div>
  );
}

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
}

// Intersection observer hook for scroll animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Animated counter for stats
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Feature card with stagger animation
function FeatureCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
  index
}: {
  icon: any;
  iconColor: string;
  iconBg: string;
  title: string;
  description: React.ReactNode;
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-2xl bg-zinc-950/80 border border-zinc-900 hover:border-orange-500/50 transition-all duration-500 backdrop-blur-sm overflow-hidden
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-orange-500/50 via-amber-500/50 to-orange-500/50 blur-sm animate-gradient-rotate" />
      </div>

      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold text-zinc-100 mb-3 group-hover:text-orange-400 transition-colors">{title}</h3>
        <p className="text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Marquee component for tech stack
function TechMarquee() {
  const items = [
    { icon: Cpu, text: 'Next.js 16' },
    { icon: Globe, text: 'Fumadocs' },
    { icon: Bot, text: 'LangChain' },
    { icon: Zap, text: 'Orama' },
    { icon: Shield, text: 'TypeScript' },
    { icon: Rocket, text: 'Vercel' },
    { icon: Sparkles, text: 'Open Source' },
    { icon: Clock, text: 'Real-time' },
  ];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 mx-8 px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-full backdrop-blur-sm hover:border-orange-500/50 hover:bg-zinc-800/50 transition-all cursor-default group"
          >
            <item.icon className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-medium text-zinc-300 whitespace-nowrap group-hover:text-white transition-colors">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { displayText, isComplete } = useTypewriter('Chats Back.', 80);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax mouse effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const featuresSection = useScrollAnimation();
  const pluginSection = useScrollAnimation();
  const updatesSection = useScrollAnimation();

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden bg-black text-zinc-100">
      {/* Custom animations styles */}
      <style jsx global>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(5deg); }
          50% { transform: translate(-20px, 20px) rotate(-5deg); }
          75% { transform: translate(40px, 10px) rotate(3deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-40px, 30px) rotate(-5deg); }
          66% { transform: translate(30px, -20px) rotate(5deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, -40px); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }
        @keyframes particle {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0); }
          10% { opacity: 1; transform: translateY(0) scale(1); }
          90% { opacity: 1; transform: translateY(-100px) scale(1); }
          100% { opacity: 0; transform: translateY(-100px) scale(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 0.35; transform: translate(-50%, 0) scale(1.1); }
        }
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3), 0 0 40px rgba(249, 115, 22, 0.1); }
          50% { box-shadow: 0 0 30px rgba(249, 115, 22, 0.5), 0 0 60px rgba(249, 115, 22, 0.2); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(249, 115, 22, 0.5), 0 0 40px rgba(249, 115, 22, 0.3); }
          50% { text-shadow: 0 0 30px rgba(249, 115, 22, 0.8), 0 0 60px rgba(249, 115, 22, 0.5); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes border-dance {
          0%, 100% { border-color: rgba(249, 115, 22, 0.3); }
          50% { border-color: rgba(251, 191, 36, 0.3); }
        }
        
        .animate-float-1 { animation: float-1 20s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 25s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 18s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 22s ease-in-out infinite; }
        .animate-particle { animation: particle 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-gradient-rotate { animation: gradient-rotate 3s linear infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animate-border-dance { animation: border-dance 3s ease-in-out infinite; }
        
        .text-gradient-animate {
          background: linear-gradient(90deg, #fff, #fdba74, #fff, #fdba74, #fff);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* 1. Hero Section */}
      <div
        ref={heroRef}
        className="relative w-full max-w-7xl mx-auto px-4 pt-24 pb-20 md:pt-36 md:pb-32 flex flex-col items-center text-center z-10"
      >
        <FloatingOrbs />

        {/* VectraDocs Logo */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-white">Vectra</span>
            <span className="text-orange-500">Docs</span>
          </span>
        </div>

        {/* Badge: Credits - Animated entrance */}
        <div
          className="mb-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-[12px] font-mono text-zinc-400 backdrop-blur-sm animate-fade-in-up animate-border-dance"
          style={{ animationDelay: '0.2s' }}
        >
          <Terminal className="w-4 h-4 text-orange-500 animate-pulse" />
          <span>Built by <strong className="text-zinc-200 hover:text-orange-400 transition-colors cursor-pointer">iotserver24</strong></span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        {/* Headline with parallax */}
        <h1
          className="text-5xl md:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up"
          style={{
            animationDelay: '0.4s',
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Documentation that
          </span>
          <br />
          <span className="text-orange-500 animate-text-glow inline-block">
            {displayText}
            {!isComplete && <span className="animate-pulse">|</span>}
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          Add <span className="text-gradient-animate font-semibold">AI-powered chat</span> to your documentation in minutes.
          <span className="hidden md:inline"> Use our Next.js template or framework plugins. </span>
          Your users get instant, context-aware answers from your docs.
        </p>

        {/* CTA Buttons with glow effects */}
        <div
          className="flex flex-col sm:flex-row items-center gap-5 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <Link
            href="/docs"
            className="group relative flex items-center gap-2 px-10 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 animate-glow-pulse overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 animate-shimmer" />
          </Link>
          <a
            href="https://github.com/iotserver24/VectraDocs"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-10 py-4 bg-zinc-900/80 border border-zinc-700 hover:border-orange-500/50 hover:bg-zinc-800 text-zinc-300 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>

      {/* 2. Features Grid */}
      <div
        ref={featuresSection.ref}
        className="w-full max-w-7xl mx-auto px-4 py-20 border-t border-zinc-900"
      >
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-700 ${featuresSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Everything you need
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Powerful features to create documentation that truly helps your users find answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            index={0}
            icon={Bot}
            iconColor="text-orange-500"
            iconBg="bg-gradient-to-br from-orange-500/20 to-orange-600/10"
            title="Context-Aware AI"
            description={
              <>
                An intelligent assistant that knows your docs inside out. It answers questions instantly using <span className="text-orange-400 font-medium">RAG technology</span>.
              </>
            }
          />
          <FeatureCard
            index={1}
            icon={Zap}
            iconColor="text-amber-400"
            iconBg="bg-gradient-to-br from-amber-500/20 to-amber-600/10"
            title="Client-Side Speed"
            description={
              <>
                Powered by <span className="text-amber-400 font-medium">Orama</span>. Search indexing happens at build time and runs entirely in the browser. Zero latency.
              </>
            }
          />
          <FeatureCard
            index={2}
            icon={Code2}
            iconColor="text-orange-400"
            iconBg="bg-gradient-to-br from-orange-500/20 to-orange-600/10"
            title="Premium UI & DX"
            description={
              <>
                Built on <span className="text-orange-400 font-medium">Next.js 16</span>. Features a sleek dark mode, floating command bars, and rich markdown rendering out of the box.
              </>
            }
          />
        </div>
      </div>

      {/* 3. Framework Plugins Section - ALL THREE */}
      <div
        ref={pluginSection.ref}
        className={`w-full max-w-7xl mx-auto px-4 py-16 border-t border-zinc-900 transition-all duration-700 ${pluginSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
            <Package className="w-4 h-4" />
            Framework Plugins
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Works with your favorite frameworks
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Add AI-powered documentation chat to any framework in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* VitePress Plugin */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-zinc-800 hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">VitePress</h3>
              <code className="block px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-orange-400 font-mono mb-3 group-hover:border-orange-500/50 transition-colors">
                npm i vetradocs-vitepress
              </code>
              <a href="https://www.npmjs.com/package/vetradocs-vitepress" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
                View on npm →
              </a>
            </div>
          </div>

          {/* Docusaurus Plugin */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-zinc-800 hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">Docusaurus</h3>
              <code className="block px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-orange-400 font-mono mb-3 group-hover:border-orange-500/50 transition-colors">
                npm i vetradocs-docusaurus
              </code>
              <a href="https://www.npmjs.com/package/vetradocs-docusaurus" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
                View on npm →
              </a>
            </div>
          </div>

          {/* Scalar/Web Component Plugin */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-zinc-800 hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">Scalar / Web</h3>
              <code className="block px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-orange-400 font-mono mb-3 group-hover:border-orange-500/50 transition-colors">
                npm i vetradocs-scalar
              </code>
              <a href="https://www.npmjs.com/package/vetradocs-scalar" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">
                View on npm →
              </a>
            </div>
          </div>
        </div>

        {/* Backend CLI */}
        <div className="mt-8 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
          <span className="inline-flex items-center gap-2 text-sm text-zinc-400 mb-3">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Quick Backend Setup
          </span>
          <code className="block px-6 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-orange-400 font-mono mx-auto max-w-md hover:border-orange-500/50 transition-colors cursor-pointer">
            npx create-vetradocs-backend@latest
          </code>
        </div>
      </div>

      {/* 4. Updates Section */}
      <div
        ref={updatesSection.ref}
        className={`w-full max-w-7xl mx-auto px-4 py-12 border-t border-zinc-900 transition-all duration-700 ${updatesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="group flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-orange-500/30 transition-all duration-300 backdrop-blur-sm">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-zinc-100 mb-2 flex items-center gap-2 justify-center md:justify-start">
              <span className="text-2xl animate-bounce">📋</span>
              Updates & Changelog
            </h3>
            <p className="text-zinc-400">Stay up to date with the latest features and improvements.</p>
          </div>
          <Link
            href="/updates"
            className="group/btn flex items-center gap-2 px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-full font-medium transition-all duration-300 hover:scale-105 border border-zinc-700 hover:border-orange-500/50"
          >
            View Changelog
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 5. Tech Stack Marquee */}
      <div className="w-full border-t border-zinc-900 bg-zinc-950/50 py-8">
        <div className="text-center mb-6">
          <span className="text-zinc-600 text-sm uppercase tracking-widest">Powered by</span>
        </div>
        <TechMarquee />
      </div>

    </div>
  );
}
