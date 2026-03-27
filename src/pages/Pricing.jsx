import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { isDark, toggle } = useTheme();
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: '#ffffff' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 h-15 flex items-center justify-between px-8 py-4" style={{ background: '#ffffff', borderBottom: '1px solid rgba(0,15,8,0.06)' }}>
        <Link to="/" className="font-black text-xl tracking-tight text-ink">
          Devdoc<span className="text-red-brand">.ai</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-500 hover:text-red-brand transition-colors">Home</Link>
          <Link to="/login" className="text-sm text-gray-500 hover:text-red-brand transition-colors">Sign in</Link>
          <Link to="/register" className="btn-primary py-2 px-4 text-sm">Get Started</Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-20 px-6 text-center" style={{ background: '#FB3640' }}>
        <div className="absolute inset-0 grid-bg-light pointer-events-none" />
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(0,15,8,0.5)' }}>Pricing</p>
        <h1 className="text-5xl font-black mb-4" style={{ color: '#000F08' }}>Simple, honest pricing</h1>
        <p className="text-lg mb-8" style={{ color: 'rgba(0,15,8,0.6)' }}>Start free. Upgrade when you need more.</p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 px-1 py-1 rounded-full" style={{ background: 'rgba(0,15,8,0.1)' }}>
          <button onClick={() => setAnnual(false)} className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={{ background: !annual ? '#000F08' : 'transparent', color: !annual ? '#fff' : 'rgba(0,15,8,0.5)' }}>Monthly</button>
          <button onClick={() => setAnnual(true)} className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={{ background: annual ? '#000F08' : 'transparent', color: annual ? '#fff' : 'rgba(0,15,8,0.5)' }}>
            Annual <span className="opacity-60 text-xs text-green-500 ml-1">(Save ~20%)</span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {plans.map(({ name, price, desc, badge, features, cta, link, highlight }) => {
            const p = annual ? price.annual : price.monthly;
            return (
              <div key={name} className="relative flex flex-col rounded-2xl"
                style={{
                  background: highlight ? '#000F08' : '#ffffff',
                  border: highlight ? '2px solid #FB3640' : '1.5px solid rgba(0,15,8,0.08)',
                  boxShadow: highlight ? '0 8px 40px rgba(251,54,64,0.25)' : '0 1px 8px rgba(0,0,0,0.05)',
                }}>
                {badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#FB3640', color: '#fff' }}>{badge}</span>
                  </div>
                )}
                <div className="p-7 flex-1">
                  <p className="font-black text-lg mb-1" style={{ color: highlight ? '#FB3640' : '#000F08' }}>{name}</p>
                  <p className="text-sm mb-5" style={{ color: highlight ? 'rgba(255,255,255,0.4)' : '#6b7280' }}>{desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-5xl font-black" style={{ color: highlight ? '#ffffff' : '#000F08' }}>
                      {p === 0 ? 'Free' : `$${p}`}
                    </span>
                    {p > 0 && <span className="text-sm mb-2" style={{ color: highlight ? 'rgba(255,255,255,0.35)' : '#9ca3af' }}>/mo</span>}
                  </div>
                  <div className="space-y-2.5">
                    {features.map(f => (
                      <div key={f} className="flex items-start gap-2.5">
                        <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#FB3640' }} />
                        <span className="text-sm" style={{ color: highlight ? 'rgba(255,255,255,0.65)' : '#4b5563' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-7 pb-7">
                  <Link to={link}
                    className="w-full block text-center py-3 rounded-xl font-bold text-sm transition-all"
                    style={{
                      background: highlight ? '#FB3640' : 'transparent',
                      color: highlight ? '#fff' : '#000F08',
                      border: highlight ? 'none' : '1.5px solid rgba(0,15,8,0.15)',
                      boxShadow: highlight ? '0 4px 16px rgba(251,54,64,0.35)' : 'none',
                    }}
                    onMouseEnter={e => { if (highlight) e.currentTarget.style.background = '#D62B34'; }}
                    onMouseLeave={e => { if (highlight) e.currentTarget.style.background = '#FB3640'; }}
                  >{cta}</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6" style={{ background: '#000F08' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-8" style={{ color: '#FB3640' }}>FAQ</h2>
          {[
            ['Can I cancel any time?', 'Yes. Cancel from your account settings any time — no penalties, no questions.'],
            ['What happens after the free trial?', 'You stay on free (Starter) automatically. No surprise charges.'],
            ['Is there a student discount?', 'Yes — email us with your .edu address for 50% off Pro.'],
          ].map(([q, a]) => (
            <div key={q} className="pb-5 mb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>{q}</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ background: '#000F08', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <Link to="/" className="font-black text-lg" style={{ color: '#FB3640' }}>Devdoc.ai</Link>
        <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2025 Devdoc.ai</p>
      </footer>
    </div>
  );
}
