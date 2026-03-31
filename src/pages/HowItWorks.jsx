import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clipboard, Play, BarChart2, ArrowRight, Menu, X, CheckCircle, 
  Terminal, ShieldAlert, Activity, Zap, Code, ShieldCheck, Database
} from 'lucide-react';

const steps = [
  { 
    n: '01', icon: Clipboard, title: 'Connect Your Code',
    desc: 'Paste a raw snippet, upload a whole file, or drop in a public GitHub repository link. No complex setups, no fragile YAML configs, no CLI toolchains to maintain. Just your code and our AI.',
    features: ['Supports 40+ programming languages natively', 'Direct deep-link GitHub integration', 'Instant pasting with auto-language detection']
  },
  { 
    n: '02', icon: Play, title: 'Run the AI Engine',
    desc: 'Select from 9 specialized analysis tools. Whether catching elusive concurrency bugs, finding memory leaks, or checking security flaws against OWASP standards — Devdoc.ai dynamically selects the optimal model.',
    features: ['Massive parallel analysis processing', 'Context-aware repository intelligence', 'Sub-60s execution time for complex repos']
  },
  { 
    n: '03', icon: BarChart2, title: 'Act on the Insights',
    desc: 'Receive a structured, interactive markdown report. Instead of vague lint errors, get exact line numbers, deep plain-English explanations, and production-ready code fixes you can copy-paste.',
    features: ['Line-by-line precise annotations', 'One-click copy-to-clipboard fixes', 'Architectural scoring and health metrics']
  },
];

export default function HowItWorks() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-red-brand selection:text-white transition-colors duration-300 overflow-hidden">

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#000000]/80 backdrop-blur-xl border-b border-white/10 shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="font-black text-2xl tracking-tight text-white transition-transform group-hover:scale-105">Devdoc<span className="text-red-brand">.ai</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[['/how-it-works','How It Works'],['/features','Features'],['/pricing','Pricing'],['/docs','Docs']].map(([href,label]) => (
              <Link key={href} to={href} className="text-sm font-bold tracking-widest text-white/70 hover:text-white transition-colors uppercase relative group">
                {label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-brand transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:block text-sm font-bold tracking-widest text-white/70 hover:text-white uppercase transition-colors">Sign in</Link>
            <Link to="/register" className="hidden md:block bg-red-brand text-white text-sm font-bold py-2.5 px-6 rounded-xl shadow-[0_0_20px_rgba(251,54,64,0.3)] hover:shadow-[0_0_30px_rgba(251,54,64,0.6)] transition-all hover:-translate-y-0.5 uppercase tracking-widest">Get Started Free</Link>
            <button onClick={() => setMenuOpen(m => !m)} className="md:hidden w-10 h-10 bg-white/5 rounded-full flex items-center justify-center transition-all text-white hover:bg-white/10">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border border-white/10 px-6 py-4 rounded-2xl flex flex-col gap-4 mx-4 mt-2 absolute w-[calc(100%-2rem)] shadow-2xl backdrop-blur-3xl">
            {[['/how-it-works','How It Works'],['/features','Features'],['/pricing','Pricing'],['/login','Sign In']].map(([href,label]) => (
              <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white py-2 border-b border-white/5 last:border-0">{label}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-48 pb-32 px-6 flex flex-col items-center justify-center min-h-[85vh]">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-red-brand/10 via-red-900/20 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-float" />
        <div className="absolute -bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-red-brand/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen delay-1000 animate-float" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-xs font-black mb-8 text-white bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] uppercase tracking-widest backdrop-blur-md animate-slide-up">
            <Activity size={14} className="text-red-brand animate-pulse" /> The Core Methodology
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter mb-8 text-white animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Complex analysis.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-red-brand drop-shadow-[0_0_40px_rgba(251,54,64,0.3)]">Seamless execution.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-medium max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            We engineered Devdoc.ai to bypass the tedious setups of traditional static analyzers. Experience senior-level AI code reviews without waiting for CI/CD pipelines to finish.
          </p>
        </div>
        

      </section>

      {/* ── Deep Dive Explanation ── */}
      <section className="py-24 px-6 bg-[#030303] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6">How Our Engine Differs</h2>
             <p className="text-white/50 text-xl max-w-2xl mx-auto">Standard linters look for syntax errors. Our AI physically understands intent, architecture, and advanced security vectors.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { i: Code, t: 'Contextual Understanding', d: 'Unlike traditional regex-based linters, our LLMs understand the semantic meaning behind your variables and functions, catching logic errors that compile fine but fail in production.' },
              { i: ShieldCheck, t: 'Owasp Top 10 Security', d: 'We actively scan for SQL injections, XSS vulnerabilities, and improper auth handling by simulating potential attack vectors through your code logic.' },
              { i: Database, t: 'Multi-file Architecture', d: 'When evaluating GitHub repositories, we map out the imports and dependencies of your entire system, providing architectural-level refactoring advice.' }
            ].map((ft, i) => (
               <div key={ft.t} className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl hover:border-red-brand/40 hover:bg-[#111] transition-all duration-300 group shadow-lg hover:shadow-[0_20px_40px_rgba(251,54,64,0.1)]">
                 <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 group-hover:bg-red-brand/20 group-hover:border-red-brand/30">
                   <ft.i size={28} className="text-white group-hover:text-red-brand transition-colors" />
                 </div>
                 <h3 className="text-2xl font-black text-white mb-4">{ft.t}</h3>
                 <p className="text-white/50 text-base leading-relaxed">{ft.d}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Steps Detailed ── */}
      <section className="py-32 px-6 bg-[#000000] relative overflow-hidden">
        {/* Glow down the center pipeline */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-red-brand/30 to-transparent hidden md:block" />

        <div className="max-w-7xl mx-auto space-y-40 relative z-10">
          {steps.map((step, idx) => {
            const isEven = idx % 2 !== 0;
            return (
              <div key={step.n} className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 md:gap-24 items-center`}>
                
                {/* Illustration Block */}
                <div className="w-full md:w-1/2 relative group">
                   {/* Center dot on the pipeline */}

                  <div className="relative rounded-[3rem] p-10 h-[450px] flex items-center justify-center overflow-hidden transition-all duration-700 bg-[#080808] border border-white/10 group-hover:border-red-brand/50 group-hover:shadow-[0_0_80px_rgba(251,54,64,0.15)]">
                    
                    {/* Dynamic abstract background within the card */}
                    <div className="absolute inset-0 opacity-[0.2] group-hover:opacity-[0.4] transition-opacity duration-700" 
                      style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(251,54,64,0.2) 0%, transparent 60%)' }} />
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay" />
                    
                    <step.icon size={180} className={`text-white/90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-4 ${isEven ? 'group-hover:text-red-brand' : 'group-hover:text-red-400'}`} />
                  </div>
                </div>

                {/* Content Block */}
                <div className="w-full md:w-1/2">
                  <div className="inline-flex items-center gap-4 mb-8">
                    <span className="text-7xl font-black text-white/5 tracking-tighter select-none">{step.n}</span>
                    <div className="h-px w-12 bg-red-brand/50" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-lg">{step.title}</h2>
                  <p className="text-white/60 text-xl font-medium leading-relaxed mb-10">
                    {step.desc}
                  </p>
                  
                  <div className="space-y-5 bg-[#0a0a0a] p-8 rounded-3xl border border-white/5">
                    {step.features.map(f => (
                      <div key={f} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-red-brand/15 items-center justify-center flex-shrink-0 flex shadow-[0_0_10px_rgba(251,54,64,0.2)] mt-0.5">
                           <CheckCircle size={14} className="text-red-brand" strokeWidth={3} />
                        </div>
                        <span className="font-bold text-white/80 tracking-wide text-base leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </section>

      {/* ── Interactive Preview / Terminal ── */}
      <section className="py-40 px-6 bg-[#030303] flex justify-center border-y border-white/5 relative overflow-hidden">
        {/* Intense background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-red-brand/10 rounded-full blur-[200px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-brand/50 to-transparent" />

        <div className="max-w-4xl w-full relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-6 text-white border border-white/20 uppercase tracking-widest bg-white/5 backdrop-blur-md">
               <Zap size={14} className="text-red-brand fill-red-brand" /> Clear Insights
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">Stop guessing.<br/>Start shipping.</h2>
            <p className="text-white/50 font-medium text-xl max-w-2xl mx-auto leading-relaxed">Look exactly at what your report contains. Every detail is structured to minimize reading time and maximize immediate actionability.</p>
          </div>

          <div className="rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-700 hover:scale-[1.01] bg-[#0A0A0A] border border-white/10 relative hover:border-red-brand/30 group">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#111111]">
              <div className="flex gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#FB3640] shadow-[0_0_15px_#FB3640]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#10b981]" />
              </div>
              <div className="flex items-center gap-4 bg-black/50 px-6 py-2 rounded-full border border-white/5">
                <ShieldAlert size={14} className="text-white/40" />
                <span className="text-xs font-mono font-bold text-white/50 tracking-widest uppercase truncate max-w-[200px] md:max-w-none">/src/auth/validateToken.ts</span>
              </div>
              <div className="w-10 opacity-0 md:opacity-100" /> {/* Spacer */}
            </div>
            
            <div className="p-8 md:p-16 font-mono text-base leading-relaxed text-gray-300 relative z-10 bg-[#050505]">
              <div className="flex flex-col gap-12">
                <div className="group/item">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                     <span className="bg-red-brand/10 text-red-brand px-3 py-1 rounded border border-red-brand/20 font-black text-sm">CRITICAL</span>
                     <h3 className="text-2xl font-black text-white">JWT Signature Verification Bypass</h3>
                  </div>
                  <p className="mb-4 text-lg"><span className="text-red-brand font-black bg-red-brand/10 px-2 py-0.5 rounded mr-2">[Line 42]</span> <span className="text-white">Security vulnerability detected in token parsing.</span></p>
                  <p className="text-white/50 text-lg leading-relaxed">The function <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded font-bold">jwt.decode(token)</code> is used without verifying the signature via <code className="text-white/80 bg-white/10 px-1.5 py-0.5 rounded font-bold">jwt.verify()</code>. A malicious actor can provide a spoofed token with a modified payload and bypass authentication entirely.</p>
                </div>

                <div className="bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group/code shadow-2xl">
                  {/* Decorative glow inside code block */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[60px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-brand/5 rounded-full blur-[60px] pointer-events-none" />

                  <div className="flex items-center justify-between mb-8">
                     <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-black">Diff View</p>
                     <span className="text-xs font-bold text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">TypeScript</span>
                  </div>

                  <div className="flex flex-col font-mono text-sm md:text-lg space-y-2 overflow-x-auto pb-4">
                    <span className="text-white/40 opacity-70 px-4 py-1">  try {'{'}</span>
                    <span className="flex">
                       <span className="w-8 text-center text-red-brand/50 select-none">-</span>
                       <span className="text-red-brand line-through opacity-80 bg-red-brand/10 px-4 py-1 rounded w-full">const payload = jwt.decode(token); // WARNING</span>
                    </span>
                    <span className="flex">
                       <span className="w-8 text-center text-green-500/50 select-none">+</span>
                       <span className="text-green-400 font-bold bg-green-500/10 px-4 py-1.5 rounded w-full shadow-[0_0_15px_rgba(16,185,129,0.05)] border border-green-500/20">const payload = jwt.verify(token, process.env.JWT_SECRET);</span>
                    </span>
                    <span className="text-white/40 opacity-70 px-4 py-1">    return payload;</span>
                    <span className="text-white/40 opacity-70 px-4 py-1">  {'}'} catch (err) {'{'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-8 md:gap-16 mt-4 pt-10 border-t border-white/5">
                  <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] tracking-widest uppercase text-white/30 font-black mb-2 flex items-center gap-2"><Activity size={12}/> Impact</span>
                    <span className="font-black text-red-brand text-xl">High / Auth Bypass</span>
                  </div>
                  <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] tracking-widest uppercase text-white/30 font-black mb-2 flex items-center gap-2"><Zap size={12}/> Fix Effort</span>
                    <span className="font-black text-green-400 text-xl">Trivial (1 LoC)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Premium Dark CTA ── */}
      <section className="py-40 px-6 bg-[#000000] text-center relative overflow-hidden border-t border-white/10">
         <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(251,54,64,0.15) 0%, transparent 70%)' }} />
         <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-red-brand/20 blur-[150px] rounded-[100%] pointer-events-none" />
         
        <h2 className="text-6xl md:text-8xl font-black text-white mb-10 max-w-4xl mx-auto tracking-tighter relative z-10 leading-[0.9]">
          Experience it<br/>
          <span className="text-red-brand">instantly.</span>
        </h2>
        <p className="text-2xl font-medium text-white/50 mb-16 max-w-2xl mx-auto relative z-10 leading-relaxed">
          No credit card required. Start analyzing your code right now and see the difference AI makes.
        </p>
        <Link to="/register"
          className="relative z-10 inline-flex items-center gap-4 font-black px-12 py-6 rounded-2xl text-xl transition-all shadow-[0_0_40px_rgba(251,54,64,0.3)] hover:shadow-[0_0_80px_rgba(251,54,64,0.6)] hover:-translate-y-2 group bg-red-brand text-white border border-red-500/50">
          Get Started For Free <ArrowRight size={28} className="transition-transform group-hover:translate-x-3" />
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="py-20 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="font-black text-3xl tracking-tight text-white">Devdoc<span className="text-red-brand">.ai</span></Link>
          <div className="flex gap-10">
            <Link to="/features" className="text-sm font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">Pricing</Link>
            <Link to="/docs" className="text-sm font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">Documentation</Link>
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-white/20">© 2026 devdoc.ai</p>
        </div>
      </footer>
    </div>
  );
}

