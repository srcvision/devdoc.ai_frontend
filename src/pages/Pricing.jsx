import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Shield, Star, Menu, X } from 'lucide-react';

const plans = [
  {
    name: 'Starter', price: { monthly: 0, annual: 0 },
    desc: 'Perfect for side projects, learning, and personal use.',
    badge: null,
    features: ['5 code analyses per day', 'Code Review tool', 'Bug Detector tool', 'Code Explainer tool', '7-day report history'],
    cta: 'Get Started Free', link: '/register', highlight: false,
  },
  {
    name: 'Pro', price: { monthly: 19, annual: 15 },
    desc: 'For developers who want unlimited access to all 9 AI tools.',
    badge: 'Most Popular',
    features: ['Unlimited analyses', 'All 9 AI tools', 'GitHub Repo Analyzer', 'Priority AI processing', 'Unlimited report history', 'PDF export', '7-day free trial'],
    cta: 'Start 7-Day Free Trial', link: '/register', highlight: true,
  },
  {
    name: 'Team', price: { monthly: 49, annual: 39 },
    desc: 'Built for engineering teams and growing organizations.',
    badge: null,
    features: ['Everything in Pro', 'Team dashboard & shared reports', 'Custom AI prompts', 'REST API access', 'SSO / SAML auth', 'Dedicated account manager'],
    cta: 'Contact Our Team', link: '/register', highlight: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-hidden selection:bg-red-brand selection:text-white pb-20">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
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
            <Link to="/register" className="hidden md:block bg-red-brand text-white text-sm font-bold py-3 px-6 rounded-xl shadow-[0_0_20px_rgba(251,54,64,0.3)] hover:shadow-[0_0_30px_rgba(251,54,64,0.6)] transition-all hover:-translate-y-0.5 uppercase tracking-widest">Get Started Free</Link>
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

      {/* ── Header ── */}
      <section className="relative pt-48 pb-20 px-6 text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-brand/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        
        <div className="relative z-10 max-w-3xl mx-auto animate-slide-up">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-6 text-red-brand bg-red-brand/10 border border-red-brand/20 shadow-[0_0_20px_rgba(251,54,64,0.15)] uppercase tracking-widest">
            <Star size={14} className="text-red-brand" /> Flexible Pricing
          </p>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
            Simple, <span className="text-red-brand drop-shadow-[0_0_30px_rgba(251,54,64,0.4)]">honest</span> pricing
          </h1>
          <p className="text-xl md:text-2xl text-white/60 mb-10 font-medium">Start free. Upgrade when you need more power.</p>

          {/* Toggle */}
          <div className="inline-flex p-1.5 rounded-full bg-[#111111] border border-white/10 shadow-2xl relative">
            <button onClick={() => setAnnual(false)} className={`relative z-10 px-8 left-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${!annual ? 'text-white' : 'text-white/50 hover:text-white'}`}>
              Monthly
            </button>
            <button onClick={() => setAnnual(true)} className={`relative z-10 px-8 left-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${annual ? 'text-white' : 'text-white/50 hover:text-white'}`}>
              Annual <span className="opacity-90 text-xs text-green-400 ml-1 font-black bg-green-400/10 px-2 py-0.5 rounded-md border border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.2)]">SAVE 20%</span>
            </button>
            {/* Toggle Highlight Background */}
            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#222222] rounded-full transition-all duration-300 border border-white/5 ${annual ? 'left-[calc(50%+1px)]' : 'left-1.5'}`} />
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="relative py-10 px-6 z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map(({ name, price, desc, badge, features, cta, link, highlight }, i) => {
            const p = annual ? price.annual : price.monthly;
            return (
              <div key={name} className={`relative flex flex-col rounded-[2rem] transition-all duration-500 hover:-translate-y-2 animate-slide-up group overflow-hidden ${highlight ? 'bg-[#0a0a0a] border border-red-brand/40 shadow-[0_20px_50px_rgba(251,54,64,0.15)] z-20' : 'bg-[#111111]/80 border border-white/10 hover:border-white/20 hover:shadow-2xl z-10'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                
                {/* Background animations for highlighted card */}
                {highlight && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-brand/10 rounded-full blur-[80px] group-hover:bg-red-brand/20 transition-colors duration-500" />
                )}

                {badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4">
                    <span className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-red-brand text-white shadow-[0_0_20px_rgba(251,54,64,0.6)] border border-red-500/50">{badge}</span>
                  </div>
                )}

                <div className="p-10 flex-1 relative z-10">
                  <h3 className={`font-black text-2xl mb-2 tracking-tight ${highlight ? 'text-red-brand drop-shadow-[0_0_10px_rgba(251,54,64,0.5)]' : 'text-white'}`}>{name}</h3>
                  <p className="text-sm font-medium text-white/50 mb-8 min-h-[40px]">{desc}</p>
                  
                  <div className="flex items-end gap-2 mb-8 pb-8 border-b border-white/10">
                    <span className="text-6xl font-black text-white tracking-tighter">
                      {p === 0 ? 'Free' : `$${p}`}
                    </span>
                    {p > 0 && <span className="text-base font-bold text-white/40 mb-2">/mo</span>}
                  </div>
                  
                  <div className="space-y-4">
                    {features.map(f => (
                      <div key={f} className="flex items-start gap-4">
                        <div className={`mt-0.5 rounded-full p-1 flex-shrink-0 ${highlight ? 'bg-red-brand/20 text-red-brand shadow-[0_0_10px_rgba(251,54,64,0.3)]' : 'bg-white/10 text-white/70'}`}>
                           <Check size={12} strokeWidth={4} />
                        </div>
                        <span className={`text-base font-medium ${highlight ? 'text-white/90' : 'text-white/70'}`}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-10 pb-10 relative z-10">
                  <Link to={link} className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 ${highlight ? 'bg-red-brand text-white hover:bg-white hover:text-black shadow-[0_0_20px_rgba(251,54,64,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                    {cta} {highlight && <ArrowRight size={18} />}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Context & Explanation ── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">Why Choose Devdoc.ai?</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Our tools are designed to save you hours of debugging and reading obscure documentation. By upgrading, you unlock the full potential of AI-driven development.
              </p>
              <ul className="space-y-6">
                 {[
                   { i: Zap, t: 'Instant Analysis', d: 'No queue times. Your code is processed immediately using premium dedicated GPUs.' },
                   { i: Shield, t: 'Enterprise Security', d: 'Your code is never used to train our models. We wipe data immediately after processing.' }
                 ].map(item => (
                   <li key={item.t} className="flex gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                       <item.i size={20} className="text-red-brand drop-shadow-[0_0_10px_rgba(251,54,64,0.5)]" />
                     </div>
                     <div>
                       <h4 className="text-xl font-bold text-white mb-1">{item.t}</h4>
                       <p className="text-white/50 text-sm leading-relaxed">{item.d}</p>
                     </div>
                   </li>
                 ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-red-brand/20 blur-[100px] rounded-full" />
              <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 relative z-10 shadow-2xl">
                 <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                   <div className="w-3 h-3 rounded-full bg-red-brand shadow-[0_0_10px_#FB3640]" />
                   <span className="font-mono text-sm text-white/50">Return on Investment</span>
                 </div>
                 <div className="space-y-6">
                   <div>
                     <div className="flex justify-between mb-2">
                       <span className="text-white/80 font-bold">Time Saved per Week</span>
                       <span className="text-red-brand font-black">~4.5 hrs</span>
                     </div>
                     <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                       <div className="bg-gradient-to-r from-red-600 to-red-brand w-[85%] h-full rounded-full relative">
                         <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] translate-x-[-100%] animate-[ticker_2s_infinite]" />
                       </div>
                     </div>
                   </div>
                   <div>
                     <div className="flex justify-between mb-2">
                       <span className="text-white/80 font-bold">Bugs Caught Before Prod</span>
                       <span className="text-red-brand font-black">+32%</span>
                     </div>
                     <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                       <div className="bg-gradient-to-r from-red-600 to-red-brand w-[65%] h-full rounded-full relative">
                         <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] translate-x-[-100%] animate-[ticker_2s_infinite_0.5s]" />
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-[#050505] border-y border-white/5 relative">
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-red-brand/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-white/50 text-lg">Everything you need to know about the product and billing.</p>
          </div>
          
          <div className="space-y-6">
            {[
              ['Can I cancel any time?', 'Yes. Cancel from your account settings any time — no penalties, no questions.'],
              ['What happens after the free trial?', "You stay on the free Starter plan automatically. We don't believe in surprise charges or dark patterns."],
              ['Is there a student discount?', 'Yes! We love supporting the next generation of developers. Email us with your .edu address for 50% off the Pro plan forever.'],
              ['Is my code secure?', 'Absolutely. Your code is processed securely in memory and never stored persistently unless you explicitly save a report. We do NOT use your code to train our models.'],
            ].map(([q, a], idx) => (
              <div key={q} className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors">
                <p className="font-bold text-xl mb-3 text-white flex gap-4"><span className="text-red-brand select-none font-black opacity-50">0{idx + 1}</span>{q}</p>
                <p className="text-white/60 leading-relaxed font-medium pl-[44px]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-black text-white mb-6">Ready to upgrade your workflow?</h2>
        <Link to="/register" className="inline-flex items-center gap-3 bg-white text-black font-black px-10 py-5 rounded-xl uppercase tracking-widest hover:bg-red-brand hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(251,54,64,0.6)] hover:-translate-y-1">
          Start for Free <ArrowRight size={20} />
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-white/10 text-center bg-[#050505]">
        <Link to="/" className="font-black text-2xl tracking-tight text-white mb-4 block">Devdoc<span className="text-red-brand">.ai</span></Link>
        <p className="text-xs font-bold tracking-widest text-white/30 uppercase">© 2026 Devdoc.ai. All rights reserved.</p>
      </footer>
    </div>
  );
}

