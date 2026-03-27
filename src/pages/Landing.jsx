import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Code2, Bug, ShieldCheck, Zap, Star, Building2, Github, Terminal, BookOpen,
  ArrowRight, Menu, X, Sun, Moon, CheckCircle, Clock, Users, TrendingUp,
  ChevronDown, ChevronUp, Clipboard, Play, BarChart2, Quote
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
    <div style={{ borderBottom: '1px solid rgba(0,15,8,0.08)' }} className="last:border-0">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="font-semibold text-ink group-hover:text-red-brand text-sm">{q}</span>
        <span className="flex-shrink-0 text-gray-400">{open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</span>
      </button>
      {open && <p className="pb-5 text-gray-500 text-sm leading-relaxed">{a}</p>}
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
    <div className="min-h-screen bg-white transition-colors duration-300">

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F0EDE5] backdrop-blur-xl shadow-md border-b border-black/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="font-black text-xl tracking-tight text-ink">Devdoc<span className={`${scrolled ? 'text-red-brand' : 'text-[#F0EDE5]'}`}>.ai</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[['#how-it-works','How It Works'],['#features','Features'],['/pricing','Pricing'],['/docs','Docs']].map(([href,label]) => (
              <Link key={href} to={href} className="text-sm font-medium text-ink hover:text-[#F0EDE5] transition-colors">{label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-sm py-2 px-4">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block text-sm font-medium text-ink hover:text-[#F0EDE5] transition-colors">Sign in</Link>
                <Link to="/register" className="hidden md:block btn-primary text-sm py-2 px-4">Get Started Free</Link>
              </>
            )}
            <button onClick={() => setMenuOpen(m => !m)} className="md:hidden w-9 h-9 flex items-center transition-all duration-300 ease-out">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-red-brand shadow-lg border-t px-6 py-4 rounded-2xl flex flex-col gap-4">
            {[['#how-it-works','How It Works'],['#features','Features'],['/pricing','Pricing'],['/docs','Docs'],['/login','Sign In']].map(([href,label]) => (
              <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-ink">{label}</Link>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: '#FB3640' }}>
        <div className="absolute inset-0 grid-bg-light pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: '#D62B34' }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 pointer-events-none" style={{ background: '#B5222A' }} />

        <div className="relative max-w-6xl mx-auto px-6 pt-36 pb-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-widest"
              style={{ background: 'rgba(0,15,8,0.12)', color: 'rgba(0,15,8,0.75)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#000F08' }} />
              AI Code Intelligence — Free to Start
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 tracking-tight" style={{ color: '#000F08' }}>
              Stop<br />guessing.<br />
              <span style={{ color: '#ffffff' }}>Fix your code.</span>
            </h1>

            <p className="text-xl leading-relaxed mb-4 max-w-2xl" style={{ color: 'rgba(0,15,8,0.7)' }}>
              devdoc.ai gives you instant AI feedback on any code — bugs, security vulnerabilities, performance issues, and architecture — explained in plain English.
            </p>
            <p className="text-base mb-10 max-w-xl" style={{ color: 'rgba(0,15,8,0.5)' }}>
              Paste your code, pick a tool, and get a structured report in under 60 seconds. No setup. No installation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl transition-all active:scale-95 text-base"
                style={{ background: '#000F08', color: '#ffffff', boxShadow: '0 4px 24px rgba(0,15,8,0.3)' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1a1f1e'}
                onMouseLeave={e => e.currentTarget.style.background = '#000F08'}>
                Start Analyzing Free <ArrowRight size={18} />
              </Link>
              <Link to="/pricing"
                className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl transition-all text-base"
                style={{ background: 'rgba(0,15,8,0.1)', color: '#000F08', border: '1.5px solid rgba(0,15,8,0.15)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,15,8,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,15,8,0.1)'}>
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Code preview */}
        <div className="relative max-w-6xl mx-auto mb-12 px-6 pb-0">
          <div className="max-w-2xl ml-auto rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#000F08', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: '#FB3640' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
              </div>
              <span className="text-xs ml-2 font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>analysis_report.md</span>
            </div>
            <div className="p-5 font-mono text-sm space-y-3">
              {[
                { e:'✅', l:'Strength', c:'#10b981',   t:'Clean separation of concerns. Function naming is consistent.' },
                { e:'🐛', l:'Bug L.47', c:'#FB3640',   t:'`user.data` may be null — add a guard before accessing `.profile`.' },
                { e:'🔒', l:'Security', c:'#f59e0b',   t:'API key found in client bundle. Move to server environment variables.' },
                { e:'⚡', l:'Perf L.83',c:'#60a5fa',  t:'Nested loop is O(n²). Use a Map to reduce to O(n).' },
              ].map(({ e, l, c, t }) => (
                <div key={l} className="flex gap-3">
                  <span>{e}</span>
                  <div>
                    <span className="font-bold" style={{ color: c }}>{l}: </span>
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>{t}</span>
                  </div>
                </div>
              ))}
              <div className="flex gap-6 pt-3 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {[['Quality','7/10','#FB3640'],['Security','5/10','#f59e0b'],['Perf','6/10','#60a5fa']].map(([l,v,c]) => (
                  <div key={l} className="text-center">
                    <span className="text-lg font-black" style={{ color: c }}>{v}</span>
                    <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* spacer for preview overflow */}
      <div className="h-12 bg-white" />

      {/* ── Stats ── */}
      <section className="py-16 px-6 bg-white border-y" style={{ borderColor: 'rgba(0,15,8,0.06)' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ v, l, icon: Icon }) => (
            <div key={l}>
              <p className="text-4xl font-black text-ink mb-1">{v}</p>
              <p className="text-sm text-gray-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold text-red-brand uppercase tracking-[0.2em] mb-3">Process</p>
            <h2 className="text-4xl md:text-5xl font-black text-ink mb-4">Three steps.<br />One clear result.</h2>
            <p className="text-gray-500 max-w-md">No sign-up friction. No configuration. Just paste and go.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map(({ icon: Icon, n, title, desc }) => (
              <div key={n}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FB3640' }}>
                    <Icon size={22} color="#fff" />
                  </div>
                  <span className="text-4xl font-black" style={{ color: 'rgba(0,15,8,0.06)' }}>{n}</span>
                </div>
                <h3 className="text-xl font-bold text-ink mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6" style={{ background: '#000F08' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold text-red-brand uppercase tracking-[0.2em] mb-3">Tools</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">9 AI tools.<br />One subscription.</h2>
            <p className="max-w-md" style={{ color: 'rgba(255,255,255,0.5)' }}>Each tool is purpose-built for a specific code health dimension — deep and focused, not generic.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group rounded-2xl p-6 cursor-default transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,54,64,0.08)'; e.currentTarget.style.borderColor = 'rgba(251,54,64,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ background: 'rgba(251,54,64,0.12)' }}>
                  <Icon size={18} style={{ color: '#FB3640' }} />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Why devdoc ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-bold text-red-brand uppercase tracking-[0.2em] mb-3">Comparison</p>
            <h2 className="text-4xl font-black text-ink">Before <span className="text-red-brand">vs</span> after devdoc<span className="text-red-brand">.ai</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 shadow-2xl" style={{ background: '#FB3640', border: '1px solid rgba(251,54,64,0.12)' }}>
              <p className="text-xs font-bold text-ink uppercase tracking-widest mb-5">Without devdoc.ai</p>
              {['Wait days for a human reviewer', 'Miss security flaws until pen testing', 'Guess at performance bottlenecks', 'Get inconsistent review feedback', 'Ship code you\'re not confident in'].map(t => (
                <div key={t} className="flex gap-3 mb-3"><span className="text-ink flex-shrink-0">✗</span><span className="text-sm text-ink">{t}</span></div>
              ))}
            </div>
            <div className="rounded-2xl p-8 shadow-2xl" style={{ background: '#000F08' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#FB3640' }}>With devdoc.ai</p>
              {['Instant results in under 60 seconds', 'OWASP security scanning on every run', 'Precise line-level performance flags', 'Consistent, objective AI feedback', 'Ship code that\'s been independently verified'].map(t => (
                <div key={t} className="flex gap-3 mb-3"><CheckCircle size={15} style={{ color: '#FB3640' }} className="flex-shrink-0 mt-0.5" /><span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6" style={{ background: '#FB3640' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(0,15,8,0.5)' }}>Stories</p>
            <h2 className="text-4xl font-black" style={{ color: '#000F08' }}>Real developers. Real results.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 ">
            {testimonials.map(({ n, r, av, t }) => (
              <div key={n} className="rounded-2xl p-7 flex flex-col shadow-xl" style={{ background: 'rgba(0,15,8,0.08)' }}>
                <Quote size={24} className="mb-4" style={{ color: 'rgba(0,15,8,0.2)' }} />
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'rgba(0,15,8,0.75)' }}>"{t}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: '#000F08', color: '#FB3640' }}>{av}</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#000F08' }}>{n}</p>
                    <p className="text-xs" style={{ color: 'rgba(0,15,8,0.5)' }}>{r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-bold text-red-brand uppercase tracking-[0.2em] mb-3">FAQ</p>
            <h2 className="text-4xl font-black text-ink">Common questions</h2>
          </div>
          {faqs.map(faq => <FAQItem key={faq.q} {...faq} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6" style={{ background: '#000F08' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-5 leading-tight" style={{ color: '#FB3640' }}>
            Your code deserves<br />better feedback.
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Join 1,200+ developers shipping cleaner, safer code with devdoc.ai.
          </p>
          <Link to="/register"
            className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-xl text-base transition-all active:scale-95"
            style={{ background: '#FB3640', color: '#fff', boxShadow: '0 4px 32px rgba(251,54,64,0.4)' }}
            onMouseEnter={e => e.currentTarget.style.background = '#D62B34'}
            onMouseLeave={e => e.currentTarget.style.background = '#FB3640'}>
            Analyze My Code Free <ArrowRight size={18} />
          </Link>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.2)' }}>5 free analyses per day. No credit card required.</p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-14 px-6" style={{ background: '#000F08', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-2 md:col-span-1">
              <span className="font-black text-xl tracking-tight mb-3 block" style={{ color: '#FB3640' }}>devdoc.ai</span>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>AI-powered code intelligence for developers who care about quality.</p>
            </div>
            {[
              { title: 'Product', links: [['#features','Features'],['/pricing','Pricing'],['/docs','Docs'],['/register','Get Started']] },
              { title: 'Tools',   links: [['#','Code Review'],['#','Bug Detector'],['#','Security'],['#','GitHub Analyzer']] },
              { title: 'Legal',   links: [['#','Privacy Policy'],['#','Terms of Service']] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{title}</p>
                <div className="flex flex-col gap-2.5">
                  {links.map(([h, l]) => (
                    <Link key={l} to={h} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#FB3640'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2025 devdoc.ai — Built by developers, for developers.</p>
            <div className="flex gap-5">
              {[{ h: '/pricing', l: 'Pricing' }, { h: '/docs', l: 'Docs' }, { h: '/login', l: 'Sign In' }].map(({ h, l }) => (
                <Link key={l} to={h} className="text-xs transition-colors" style={{ color: 'rgba(255,255,255,0.25)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FB3640'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}>
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
