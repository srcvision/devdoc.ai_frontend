import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Zap, Star, Shield, Clock } from 'lucide-react';

const perks = [
  { icon: Zap,    label: '9 AI-powered tools',        desc: 'From bug detection to architecture review' },
  { icon: Shield, label: 'Security scanning built-in', desc: 'OWASP Top 10 checked on every analysis' },
  { icon: Clock,  label: 'Results in < 60 seconds',    desc: 'No waiting. No queue. Instant output.' },
  { icon: Star,   label: 'Free to start',              desc: '5 analyses per day, no card required' },
];

export default function Register() {
  const [form, setForm]         = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { login }               = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login({ _id: data._id, name: data.name, email: data.email, plan: data.plan }, data.token);
      toast.success(`Account created! Welcome, ${data.name}!`);
      window.location.href = '/dashboard';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#000F08' }}>

      {/* ── Left: Brand Panel ── */}
      <div className="hidden lg:flex w-[44%] flex-col justify-between p-12 relative overflow-hidden flex-shrink-0" style={{ background: '#FB3640' }}>
        <div className="absolute inset-0 grid-bg-light pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-15 pointer-events-none" style={{ background: '#D62B34' }} />

        <Link to="/" className="relative flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,15,8,0.15)' }}>
            <span className="font-black text-white text-xs">dd</span>
          </div>
          <span className="font-black text-white text-lg tracking-tight">devdoc<span style={{ color: 'rgba(0,15,8,0.7)' }}>.ai</span></span>
        </Link>

        <div className="relative">
          <h2 className="text-5xl font-black leading-tight mb-5" style={{ color: '#000F08' }}>
            Better code.<br />Better you.
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: 'rgba(0,15,8,0.65)' }}>
            Get AI feedback on your code that would otherwise take a senior engineer hours to write — available in seconds.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {perks.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-xl p-4" style={{ background: 'rgba(0,15,8,0.1)' }}>
                <Icon size={16} style={{ color: '#000F08', opacity: 0.75 }} className="mb-2" />
                <p className="font-semibold text-sm" style={{ color: '#000F08' }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(0,15,8,0.55)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm" style={{ color: 'rgba(0,15,8,0.5)' }}>No credit card needed. Free plan lasts forever.</p>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <span className="font-black text-2xl" style={{ color: '#FB3640' }}>devdoc<span className="text-white">.ai</span></span>
          </Link>

          <h1 className="text-3xl font-black mb-1" style={{ color: '#ffffff' }}>Create your account</h1>
          <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Already have one?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#FB3640' }}>Sign in</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name',     type: 'text',     icon: User, placeholder: 'Arjun Sharma',    label: 'Full name' },
              { key: 'email',    type: 'email',    icon: Mail, placeholder: 'you@example.com', label: 'Email address' },
            ].map(({ key, type, icon: Icon, placeholder, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                  <input type={type} placeholder={placeholder} value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    required className="input-dark w-full pl-10" />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  required className="input-dark w-full pl-10 pr-10" />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
              style={{ background: '#FB3640', color: '#ffffff', boxShadow: '0 4px 20px rgba(251,54,64,0.4)' }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = '#D62B34')}
              onMouseLeave={e => (e.currentTarget.style.background = '#FB3640')}>
              {loading
                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Create My Account</span><ArrowRight size={15} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            By creating an account you agree to our{' '}
            <a href="#" className="hover:underline" style={{ color: 'rgba(255,255,255,0.4)' }}>Terms</a> and{' '}
            <a href="#" className="hover:underline" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
