import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Code2, Bug, ShieldCheck, Zap, Star, Building2, Github, Terminal, BookOpen,
  ArrowRight, Menu, X, Sun, Moon, CheckCircle, Clock, Users, TrendingUp,
  ChevronDown, ChevronUp, Clipboard, Play, BarChart2, Quote, Mail, MapPin, Linkedin
} from 'lucide-react';


const features = [
  { icon: Code2,       title: 'Code Review',          desc: 'Get line-by-line feedback on readability, naming conventions, and structure — the kind a senior engineer would give after a thoughtful review.' },
  { icon: Bug,         title: 'Bug Detector',          desc: 'Catches null-reference traps, off-by-one errors, and runtime exceptions before they reach your users.' },
  { icon: ShieldCheck, title: 'Security Scanner',      desc: 'OWASP Top 10 coverage — SQL injection, exposed secrets, insecure dependencies, XSS — found automatically.' },
  { icon: Zap,         title: 'Performance Analyzer',  desc: 'Flags O(n²) loops, memory leaks, and redundant computations with precise line references and rewrite suggestions.' },
  { icon: Star,        title: 'Code Quality Score',    desc: 'A 1–10 score across readability, maintainability, and complexity with full evidence-backed explanations.' },
  { icon: Building2,   title: 'Architecture Analyzer', desc: 'Evaluates modularity, separation of concerns, and how closely your codebase follows SOLID principles.' },
  { icon: Github,      title: 'GitHub Repo Analyzer',  desc: 'Point to any public GitHub URL — no copy-pasting. Get a full AI analysis of the entire repository.' },
  { icon: Terminal,    title: 'Debug Assistant',        desc: 'Paste any stack trace and get a clear root-cause explanation with exact steps to resolve the issue.' },
  { icon: BookOpen,    title: 'Code Explainer',         desc: 'Understand unfamiliar codebase in seconds. Explains every function, class, and design pattern in plain English.' },
];

const steps = [
  { icon: Clipboard, n: '01', title: 'Paste Your Code',  desc: 'Drop in a snippet, a class, a full file — or just a GitHub URL. No setup required.' },
  { icon: Play,      n: '02', title: 'Choose a Tool',    desc: 'Pick from 9 specialized AI tools: bug scan, security audit, or architecture deep-dive.' },
  { icon: BarChart2, n: '03', title: 'Read Your Report', desc: 'Structured output with scores, line-specific references, explanations, and fix recommendations.' },
];

const stats = [
  { v: '1,200+', l: 'Developers', icon: Users },
  { v: '9',      l: 'AI Tools',   icon: Star },
  { v: '< 60s',  l: 'Per Scan',   icon: Clock },
  { v: '98%',    l: 'Satisfied',  icon: TrendingUp },
];

const testimonials = [
  { n: 'Priya Sharma',     r: 'Full-Stack Dev · Bengaluru', av: 'PS', t: "DevDoctor flagged three security vulnerabilities before my PR review. My lead was genuinely impressed. It's like having a senior dev on call 24/7." },
  { n: 'Daniela Hoffmann', r: 'Backend Engineer · Berlin',   av: 'DH', t: "I pointed the GitHub Analyzer at a 40k-line legacy repo and had a concise breakdown in under a minute. That used to take a whole sprint to understand." },
  { n: 'Marcus Osei',      r: 'CS Student · Final Year',     av: 'MO', t: "The Code Explainer alone made complex patterns click for me. I genuinely understand architecture now in a way textbooks never taught." },
];

const faqs = [
  { q: 'Which languages does devdoc.ai support?', a: 'All major languages: JavaScript, TypeScript, Python, Java, C++, Go, Rust, PHP, Ruby, and more — with language-aware best practices for each.' },
  { q: 'Is my code stored or used to train models?', a: 'No. Code is sent securely for analysis and never retained on our servers after the response is returned.' },
  { q: 'How is this different from a linter?', a: 'Linters check syntax rules. devdoc.ai understands intent and logic — it tells you why code is risky and suggests meaningful improvement in plain English.' },
  { q: 'What does the Free plan include?', a: '5 analyses per day, Code Review + Bug Detector + Code Explainer tools, and 7-day report history. No card required.' },
  { q: 'Is there a trial for Pro?', a: 'Yes — new accounts get a 7-day full Pro trial. No credit card needed until you decide to continue.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }} className="last:border-0 transition-colors hover:bg-black/5">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-5 text-left gap-4 group">
        <span className="font-bold text-black group-hover:text-red-brand text-base transition-colors">{q}</span>
        <span className="flex-shrink-0 text-black group-hover:text-red-brand transition-transform duration-300" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>
          <ChevronDown size={20} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const { isDark, toggle }  = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 font-sans">

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/15 backdrop-blur-2xl shadow-lg border-b border-black/10 py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="font-black text-2xl tracking-tight text-white transition-transform group-hover:scale-105">Devdoc<span className="text-black">.ai</span></span>
          </Link>

          <div className={`hidden md:flex items-center gap-8 bg-black/5 px-6 py-2.5 rounded-full backdrop-blur-md ${scrolled ? 'shadow-none' : 'shadow-lg'}`}>
            {[['/how-it-works','How It Works'],['/features','Features'],['/pricing','Pricing'],['/docs','Docs'],['/about','Meet the Developer']].map(([href,label]) => (
              <Link key={href} to={href} className={`text-sm font-bold text-black ${scrolled ? 'hover:text-red-brand' : 'hover:text-white'} transition-colors relative group`}>
                {label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${scrolled ? 'bg-red-brand' : 'bg-white'} transition-all group-hover:w-full`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="bg-black hover:bg-red-brand text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-brand/50 hover:-translate-y-0.5">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block text-sm font-bold text-black hover:text-red-dark transition-colors">Sign in</Link>
                <Link to="/register" className="hidden md:block bg-black hover:bg-red-dark text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-brand/50 hover:-translate-y-0.5">
                  Get Started Free
                </Link>
              </>
            )}
            <button onClick={() => setMenuOpen(m => !m)} className="md:hidden w-10 h-10 bg-black/5 rounded-full flex justify-center items-center transition-all hover:bg-black/10">
              {menuOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-black shadow-2xl overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'}`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {[['/how-it-works','How It Works'],['/features','Features'],['/pricing','Pricing'],['/docs','Docs'],['/about','Meet the Developer'],['/login','Sign In']].map(([href,label]) => (
              <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-base font-bold text-white hover:text-red-brand transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#FB3640] pt-40 pb-32">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-white opacity-20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay" />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-black opacity-20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl pt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-8 uppercase tracking-[0.2em] shadow-lg animate-fade-in-up"
              style={{ background: '#000000', color: '#ffffff' }}>
              <span className="w-2 h-2 rounded-full bg-red-brand animate-pulse shadow-[0_0_10px_#FB3640]" />
              AI Code Intelligence
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black leading-[0.9] mb-8 tracking-tighter text-black animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Stop<br />guessing.<br />
              <span className="text-white drop-shadow-md">Fix your code.</span>
            </h1>

            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-6 max-w-2xl text-black/80 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              devdoc.ai gives you instant AI feedback on any codebase — bugs, security flaws, performance bottlenecks, and architecture — explained in plain English.
            </p>
            <p className="text-base md:text-lg mb-12 max-w-xl text-black/60 font-semibold animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              Paste code. Pick a tool. Get a perfect report in under 60 seconds. Free to start.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/register"
                className="inline-flex items-center justify-center gap-2 font-black px-10 py-5 rounded-2xl transition-all shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-1 text-lg group bg-black text-white">
                Start Analyzing Free <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
              </Link>
              <Link to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 font-black px-10 py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg bg-white/20 text-black border-2 border-black/10 hover:border-black backdrop-blur-sm">
                How it works
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Code Preview Card */}
        <div className="relative max-w-6xl mx-auto px-6 mt-16 pb-32">
          <div className="max-w-2xl ml-auto rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] bg-[#050505] border border-white/20 transition-all duration-700 hover:-translate-y-2">
            <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border-b border-white/10 backdrop-blur-md">
              <div className="flex gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-brand shadow-[0_0_10px_#FB3640]" />
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-500" />
              </div>
              <span className="text-xs ml-3 font-mono font-bold text-white/50 tracking-widest uppercase">analysis_report.md</span>
            </div>
            
            <div className="p-8 font-mono text-sm space-y-5 bg-gradient-to-b from-black to-zinc-900">
              {[
                { e:'✅', l:'Strength', c:'#10b981',   t:'Clean separation of concerns. Function naming is consistent.' },
                { e:'🐛', l:'Bug L.47', c:'#FB3640',   t:'`user.data` may be null — add a guard before accessing `.profile`.' },
                { e:'🔒', l:'Security', c:'#f59e0b',   t:'API key found in client bundle. Move to server environment variables.' },
                { e:'⚡', l:'Perf L.83',c:'#60a5fa',  t:'Nested loop is O(n²). Use a Map to reduce to O(n).' },
              ].map(({ e, l, c, t }, i) => (
                <div key={l} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default animate-fade-in-up" style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'both' }}>
                  <span className="text-xl drop-shadow-md">{e}</span>
                  <div>
                    <span className="font-black tracking-wide" style={{ color: c }}>{l}: </span>
                    <span className="text-white/70">{t}</span>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-around pt-6 mt-4 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
                {[['Quality','7/10','#FB3640'],['Security','5/10','#f59e0b'],['Perf','6/10','#60a5fa']].map(([l,v,c]) => (
                  <div key={l} className="text-center group">
                    <span className="text-2xl font-black block mb-1 transition-transform group-hover:scale-110" style={{ color: c, textShadow: `0 0 20px ${c}50` }}>{v}</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 px-6 bg-[#000000] border-t border-white/10 relative z-10 -mt-[4px]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(({ v, l, icon: Icon }) => (
            <div key={l} className="group cursor-default p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(251,54,64,0.15)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-brand/10 rounded-full blur-[30px] -mr-10 -mt-10 transition-transform group-hover:scale-200" />
              <div className="flex justify-center mb-6 relative z-10">
                <Icon size={36} className="text-white/20 group-hover:text-red-brand transition-colors duration-300" />
              </div>
              <p className="text-5xl font-black text-white mb-3 tracking-tight group-hover:scale-105 transition-transform relative z-10">{v}</p>
              <p className="text-xs font-black text-white/40 uppercase tracking-widest relative z-10">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works Summary ── */}
      <section id="how-it-works" className="py-32 px-6 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <p className="text-xs font-black text-red-brand uppercase tracking-[0.2em] mb-4">The Workflow</p>
            <h2 className="text-5xl lg:text-6xl font-black text-black leading-tight mb-6">Three steps.<br />Zero config.</h2>
            <p className="text-lg text-gray-500 max-w-md font-medium mb-10">We eliminated the friction. No plugins to install. No YAML files to configure. Just pure AI insight.</p>
            
            <div className="space-y-8">
              {steps.map(({ icon: Icon, n, title, desc }) => (
                <div key={n} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl group-hover:bg-red-brand transition-colors duration-300 group-hover:scale-110">
                      <Icon size={24} />
                    </div>
                    {n !== '03' && <div className="w-0.5 h-full bg-black/10 mt-4" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-black text-black mb-2 flex items-center gap-3">
                      <span className="text-black/20 text-sm font-mono">{n}</span> {title}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
             <div className="relative rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] h-[600px] border border-black/5 group">
                {/* Abstract graphic replacing image */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-brand to-black group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
                
                {/* Floating elements inside graphic */}
                <div className="absolute top-20 left-10 right-10 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transform transition-transform duration-500 hover:translate-x-2">
                  <div className="h-3 w-1/3 bg-white/40 rounded-full mb-3" />
                  <div className="h-3 w-full bg-white/20 rounded-full mb-2" />
                  <div className="h-3 w-4/5 bg-white/20 rounded-full" />
                </div>
                
                <div className="absolute top-60 right-10 w-2/3 p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl transform transition-transform duration-500 hover:-translate-x-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Bug className="text-red-brand" />
                    <span className="text-white font-bold font-mono text-sm">Vulnerability caught</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full mb-2" />
                  <div className="h-2 w-full bg-white/10 rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-32 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <p className="text-xs font-black text-red-brand uppercase tracking-[0.2em] mb-4">The Platform</p>
            <h2 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">9 AI tools. 1 subscription.</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium">Each tool is precision-engineered for a specific dimension of code health. Stop relying on scattered linters.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative rounded-3xl p-8 bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(251,54,64,0.15)] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 group-hover:bg-red-brand/10" />
                
                <Icon size={40} className="mb-6 text-white group-hover:text-red-brand transition-colors duration-300" />
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-white/50 text-base leading-relaxed font-medium relative z-10">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why devdoc ── */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs font-black text-red-brand uppercase tracking-[0.2em] mb-4">The Difference</p>
            <h2 className="text-5xl lg:text-6xl font-black text-black tracking-tight">Before <span className="text-red-brand">vs</span> After</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="rounded-[40px] p-10 lg:p-14 shadow-2xl transition-transform hover:-translate-y-2 border border-black/5" style={{ background: '#f8f9fa' }}>
              <div className="inline-block px-4 py-2 bg-black/5 rounded-full mb-8">
                <p className="text-sm font-black text-black/40 uppercase tracking-widest">Without devdoc.ai</p>
              </div>
              <ul className="space-y-6">
                {['Wait days for a human reviewer to have free time', 'Miss security flaws until an expensive pen test', 'Guess at performance bottlenecks in production', 'Get inconsistent review feedback depending on developer mood', 'Ship code you\'re honestly not fully confident in'].map(t => (
                  <li key={t} className="flex gap-4 items-start">
                    <span className="text-black/30 font-black text-xl mt-1">✗</span>
                    <span className="text-lg font-bold text-black/60 leading-tight">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="rounded-[40px] p-10 lg:p-14 shadow-[0_30px_60px_rgba(251,54,64,0.3)] transition-transform hover:-translate-y-2 bg-black relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-brand/20 blur-[60px] rounded-full pointer-events-none" />
              <div className="inline-block px-4 py-2 bg-red-brand rounded-full mb-8">
                <p className="text-sm font-black text-white uppercase tracking-widest">With devdoc.ai</p>
              </div>
              <ul className="space-y-6 relative z-10">
                {['Instant AI results in under 60 seconds on every push', 'OWASP automated security scanning continuously', 'Precise line-level performance flags and fixes', 'Consistent, objective, senior-level AI feedback', 'Ship code that has been rigorously independently verified'].map(t => (
                  <li key={t} className="flex gap-4 items-start">
                    <CheckCircle size={24} className="text-red-brand mt-1 flex-shrink-0" />
                    <span className="text-lg font-bold text-white/90 leading-tight">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-32 px-6 bg-red-brand">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black text-black tracking-tight mb-4">Real developers.<br/>Real results.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ n, r, av, t }) => (
              <div key={n} className="rounded-3xl p-10 bg-black text-white shadow-2xl hover:scale-105 transition-transform duration-300">
                <Quote size={40} className="mb-6 opacity-20 text-white" />
                <p className="text-lg leading-relaxed font-medium text-white/80 mb-10 h-32">"{t}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black bg-white text-black shadow-lg">
                    {av}
                  </div>
                  <div>
                    <p className="font-black text-lg">{n}</p>
                    <p className="text-sm text-white/50 font-bold uppercase tracking-wide">{r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32 px-6 bg-[#f8f9fa]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-black mb-4 tracking-tight">Common questions</h2>
          </div>
          <div className="bg-white rounded-[30px] p-6 md:p-10 shadow-xl border border-black/5">
             {faqs.map(faq => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-40 px-6 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(ellipse at 50% -20%, #FB3640 0%, transparent 70%)' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
            Your code deserves<br />
            <span className="text-red-brand">better feedback.</span>
          </h2>
          <p className="text-2xl mb-12 text-white/50 font-medium">
            Join 1,200+ developers shipping cleaner, safer code.
          </p>
          <Link to="/register"
            className="inline-flex items-center justify-center gap-3 font-black px-12 py-6 rounded-2xl text-xl transition-all shadow-[0_0_40px_rgba(251,54,64,0.5)] hover:shadow-[0_0_60px_rgba(251,54,64,0.8)] hover:scale-105 bg-red-brand text-white hover:bg-[#ff4d56]">
            Analyze My Code Free <ArrowRight size={24} />
          </Link>
          <p className="text-sm font-bold uppercase tracking-widest mt-8 text-white/30">5 free analyses per day. No credit card required.</p>
        </div>
      </section>


      {/* ── Footer ── */}
      <footer className="py-20 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <span className="font-black text-3xl tracking-tight mb-4 block text-white">devdoc<span className="text-red-brand">.ai</span></span>
              <p className="text-base font-medium text-white/40 leading-relaxed">AI-powered code intelligence for backend and frontend developers who care.</p>
            </div>
            {[
              { title: 'Product', links: [['/features','Features'],['/pricing','Pricing'],['/docs','Docs'],['/register','Get Started']] },
              { title: 'Tools',   links: [['#','Code Review'],['#','Bug Detector'],['#','Security'],['#','GitHub Analyzer']] },
              { title: 'Legal',   links: [['/privacy','Privacy Policy'],['/terms','Terms of Service']] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-sm font-black text-white uppercase tracking-widest mb-6">{title}</p>
                <div className="flex flex-col gap-4">
                  {links.map(([h, l]) => (
                    <Link key={l} to={h} className="text-base font-medium text-white/50 hover:text-red-brand transition-colors">
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
            <p className="text-sm font-bold text-white/30 tracking-widest uppercase">
              © 2026 devdoc.ai — Built by <a href="https://www.linkedin.com/in/saurav-chaudhari-1ab838265/" target="_blank" rel="noopener noreferrer" className="text-red-brand hover:underline">Saurav Chaudhari</a>
            </p>
            <div className="flex gap-8">
              {[{ h: '/pricing', l: 'Pricing' }, { h: '/docs', l: 'Docs' }, { h: '/login', l: 'Sign In' }].map(({ h, l }) => (
                <Link key={l} to={h} className="text-sm font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
