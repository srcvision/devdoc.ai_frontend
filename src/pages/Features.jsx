import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Bug, ShieldCheck, Zap, Star, Building2, Github,
  Terminal, BookOpen, ArrowRight, Menu, X, CheckCircle, 
  Sparkles, Shield, Cpu, Clock, Layers
} from 'lucide-react';

const tools = [
  {
    icon: Bug, color: '#FB3640', name: 'Bug Detector',
    subtitle: 'Catch errors before runtime',
    desc: 'Identifies null pointers, infinite loops, and race conditions. Built to find the types of logical errors that linters usually miss.',
    features: ['Logical error detection', 'Type mismatch flagging', 'Runtime edge cases']
  },
  {
    icon: ShieldCheck, color: '#34d399', name: 'Security Scanner',
    subtitle: 'OWASP Top 10 automated',
    desc: 'Scans for SQL injections, cross-site scripting (XSS), insecure deserialization, and exposed secrets dynamically in your code.',
    features: ['Secret detection', 'Injection risks', 'Auth vulnerabilities']
  },
  {
    icon: Zap, color: '#fbbf24', name: 'Performance Analyzer',
    subtitle: 'Milliseconds matter',
    desc: 'Analyzes algorithmic complexity and memory allocation. Flags O(n²) operations and memory leaks with exact line references.',
    features: ['Time complexity analysis', 'Memory leak detection', 'Caching suggestions']
  },
  {
    icon: Building2, color: '#22d3ee', name: 'Architecture Review',
    subtitle: 'Scale without tech debt',
    desc: 'Ensures your code follows SOLID principles. Checks for tight coupling, circular dependencies, and modularity issues.',
    features: ['SOLID compliance', 'Coupling analysis', 'Design pattern usage']
  },
  {
    icon: Code2, color: '#60a5fa', name: 'Code Reviewer',
    subtitle: 'Your 24/7 Senior Dev',
    desc: 'Provides style, naming, and readability feedback so your team maintains a consistent, maintainable codebase.',
    features: ['Readability checks', 'Naming conventions', 'Formatting consistency']
  },
  {
    icon: BookOpen, color: '#818cf8', name: 'Code Explainer',
    subtitle: 'Understand any codebase',
    desc: 'Translates complex regex, legacy spaghetti code, and undocumented functions into plain English explanations.',
    features: ['Line-by-line translation', 'Regex simplification', 'Logic breakdown']
  },
  {
    icon: Github, color: '#f9fafb', name: 'GitHub Repo Audit',
    subtitle: 'Analyze entire projects',
    desc: 'Point to a public repository and get a complete architectural bird\'s-eye view, security audit, and dependency check instantly.',
    features: ['Full project context', 'Dependency auditing', 'Structural overview']
  },
  {
    icon: Terminal, color: '#f472b6', name: 'Debug Assistant',
    subtitle: 'Instant fix suggestions',
    desc: 'Paste a stack trace alongside your code and let the AI pinpoint the exact variable or function causing the crash.',
    features: ['Stack trace parsing', 'Root cause isolation', 'Fix generation']
  },
  {
    icon: Star, color: '#a78bfa', name: 'Quality Scorer',
    subtitle: 'Track your improvements',
    desc: 'Provides a structured 1-10 score grading your code\'s maintainability, testability, and complexity.',
    features: ['Maintainability index', 'Test coverage hints', 'Complexity scoring']
  },
];

export default function Features() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black transition-colors duration-300">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="font-black text-2xl tracking-tight text-white transition-transform group-hover:scale-105">
              Devdoc<span className="text-red-brand">.ai</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[['/how-it-works','How It Works'],['/features','Features'],['/pricing','Pricing'],['/docs','Docs']].map(([href,label]) => (
              <Link key={href} to={href} className="text-sm font-bold tracking-wide text-white/70 hover:text-white transition-colors uppercase relative group">
                {label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-brand transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-sm font-bold tracking-wide text-white/70 hover:text-white transition-colors uppercase">Sign in</Link>
            <Link to="/register" className="hidden md:block bg-red-brand text-white text-sm font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(251,54,64,0.3)] hover:shadow-[0_0_30px_rgba(251,54,64,0.6)] transition-all hover:-translate-y-0.5 uppercase tracking-wide">Get Started Free</Link>
            <button onClick={() => setMenuOpen(m => !m)} className="md:hidden w-10 h-10 bg-white/5 rounded-full flex items-center justify-center transition-all text-white hover:bg-white/10">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-[1px] border-white/10 px-6 py-4 rounded-2xl flex flex-col gap-4 mx-4 mt-2">
            {[['/how-it-works','How It Works'],['/features','Features'],['/pricing','Pricing'],['/login','Sign In']].map(([href,label]) => (
              <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white">{label}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-48 pb-32 px-6">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-red-brand/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-8 text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase tracking-widest animate-fade-in-up">
            <Sparkles size={14} className="text-red-brand" /> The Platform
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Write code.<br/>
            Let <span className="text-red-brand drop-shadow-[0_0_30px_rgba(251,54,64,0.5)]">AI</span> handle<br />the rest.
          </h1>

          <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed mb-12 font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            9 distinct artificial intelligence models. 1 seamless dashboard. We analyze performance, security, architecture, and bugs natively without changing your workflow.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/register" className="bg-red-brand text-white text-lg font-black tracking-wide px-10 py-5 rounded-2xl shadow-[0_0_40px_rgba(251,54,64,0.4)] transition-all hover:shadow-[0_0_60px_rgba(251,54,64,0.7)] hover:-translate-y-1">
              Start Using All Features
            </Link>
          </div>
        </div>
      </section>

      {/* spacer to blend background */}
      <div className="h-32 bg-gradient-to-b from-transparent to-[#050505]" />

      {/* ── Tools Grid ── */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 md:flex justify-between items-end border-b border-white/10 pb-8">
            <div>
              <p className="text-xs font-black text-red-brand uppercase tracking-[0.2em] mb-4">AI Engine</p>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">The Toolkit</h2>
            </div>
            <p className="text-white/40 max-w-sm mt-6 md:mt-0 font-medium text-lg">Select any tool directly from your dashboard. It scans instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.name} className="group relative rounded-[32px] p-10 transition-all duration-500 bg-[#0a0a0a] border border-white/10 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                  
                  {/* Subtle color wash on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none" style={{ background: t.color }} />
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-[50px] transition-all duration-700 pointer-events-none group-hover:opacity-40" style={{ background: t.color, transform: 'translate(30%, -30%)' }} />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" style={{ background: `${t.color}20`, border: `1px solid ${t.color}40` }}>
                      <Icon size={28} style={{ color: t.color }} />
                    </div>

                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{t.name}</h3>
                    <p className="text-xs font-black uppercase tracking-widest mb-6 block" style={{ color: t.color }}>{t.subtitle}</p>
                    
                    <p className="text-white/50 text-base leading-relaxed mb-10 h-[84px] font-medium">
                      {t.desc}
                    </p>

                    <div className="space-y-4 mt-auto pt-6 border-t border-white/5">
                      {t.features.map(f => (
                        <div key={f} className="flex items-center gap-3">
                          <CheckCircle size={18} className="opacity-80 transition-colors" style={{ color: t.color }} />
                          <span className="text-sm font-bold text-white/60 tracking-wide">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── "Why devdoc" Detailed section ── */}
      <section className="py-32 px-6 bg-white border-t-[12px] border-red-brand">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tighter">Built for production.<br />Designed for <span className="text-red-brand">speed.</span></h2>
            <p className="text-black/50 text-xl max-w-3xl mx-auto font-medium leading-relaxed">Unlike traditional static analysis tools that spit out hundreds of false positives, our models understand the actual context of your code.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Zero Data Retention", desc: "Your code is completely ephemeral. Once the report is generated, the code is wiped. No model training, period." },
              { icon: Clock, title: "Sub-minute Latency", desc: "Most AI analysis takes minutes. We've optimized our specific LLM pipelines to return complex reports in under 40 seconds on average." },
              { icon: Layers, title: "Unopinionated", desc: "It doesn't force a framework on you. It analyzes vanilla JS, React, Node, or massive Python monoliths with the same accuracy." }
            ].map(b => (
              <div key={b.title} className="text-center group cursor-default">
                <div className="w-24 h-24 mx-auto rounded-full bg-black flex items-center justify-center mb-8 text-white shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-red-brand">
                  <b.icon size={36} />
                </div>
                <h3 className="text-2xl font-black text-black mb-4 tracking-tight">{b.title}</h3>
                <p className="text-black/60 text-base font-medium leading-relaxed max-w-xs mx-auto">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 bg-[#f8f9fa]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black text-black mb-10 tracking-tight">Ready to upgrade your workflow?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/register" className="bg-black text-white text-lg font-black tracking-wide px-12 py-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]">Create Free Account</Link>
            <Link to="/pricing" className="px-12 py-6 text-lg font-black tracking-wide text-black hover:bg-black/5 rounded-2xl transition-colors border-2 border-transparent hover:border-black/10">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-20 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <span className="font-black text-3xl tracking-tight text-white">Devdoc<span className="text-red-brand">.ai</span></span>
          <div className="flex gap-8">
            <Link to="/how-it-works" className="text-sm font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">How It Works</Link>
            <Link to="/pricing" className="text-sm font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">Pricing</Link>
            <Link to="/docs" className="text-sm font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">Documentation</Link>
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/20">© 2025 devdoc.ai</p>
        </div>
      </footer>
    </div>
  );
}
