import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Zap, Star, Shield, Clock, Activity, Briefcase, GraduationCap, Building } from 'lucide-react';

const perks = [
  { icon: Zap,    label: '9 AI-powered tools',        desc: 'From bug detection to architecture review' },
  { icon: Shield, label: 'Security scanning built-in', desc: 'OWASP Top 10 checked on every analysis' },
  { icon: Clock,  label: 'Results in < 60 seconds',    desc: 'No waiting. No queue. Instant output.' },
  { icon: Star,   label: 'Free to start',              desc: '5 analyses per day, no card required' },
];

export default function Register() {
  const [form, setForm]         = useState({ name: '', email: '', password: '', role: '', experience: '', company: '' });
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
    <div className="min-h-screen flex bg-[#000000] text-white overflow-hidden selection:bg-red-brand selection:text-white">

      {/* ── Left: Premium Brand Panel ── */}
      <div className="hidden lg:flex w-[44%] flex-col justify-between p-12 relative overflow-hidden flex-shrink-0 bg-[#050505] border-r border-white/5">
        
        {/* Animated Background Mesh & Glows */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-brand/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-red-brand/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-float delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-1.5 group w-fit">
          <span className="font-black text-2xl tracking-tight text-white transition-transform group-hover:scale-105 drop-shadow-md">Devdoc<span className="text-red-brand">.ai</span></span>
        </Link>

        {/* Copy */}
        <div className="relative z-10 animate-slide-up">
          <div className="inline-flex items-center mt-2 gap-2 px-6 py-4 rounded-full text-[15px] font-black mb-4 text-red-brand bg-red-brand/10 border border-red-brand/20 uppercase tracking-widest shadow-[0_0_15px_rgba(251,54,64,0.15)]">
            <Activity size={20} className="text-red-brand animate-pulse" /> Platform Access
          </div>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter mb-6 text-white drop-shadow-lg">
            Better code.<br />
            <span className="text-red-brand drop-shadow-[0_0_20px_rgba(251,54,64,0.3)]">Better you.</span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed text-white/50 max-w-md font-medium">
            Get AI feedback on your code that would otherwise take a senior engineer hours to write — available in seconds.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {perks.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-5 hover:border-white/15 hover:bg-[#111] transition-all duration-300 group shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-red-brand/10 flex items-center justify-center mb-3 group-hover:bg-red-brand/20 transition-colors">
                  <Icon size={16} className="text-red-brand" />
                </div>
                <p className="font-bold text-sm text-white mb-1">{label}</p>
                <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <p className="relative z-10 top-4 text-sm font-medium text-white/30 flex items-center gap-2">
          <Shield size={14} className="text-red-brand/50" /> No credit card needed. Free plan lasts forever.
        </p>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#000000] relative">
        <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-red-brand/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-1.5 mb-10 w-fit">
            <span className="font-black text-2xl tracking-tight text-white">Devdoc<span className="text-red-brand">.ai</span></span>
          </Link>

          <h1 className="text-4xl font-black mb-2 text-white tracking-tight">Create your account</h1>
          <p className="mb-10 text-base text-white/50 font-medium">
            Already have one?{' '}
            <Link to="/login" className="font-bold text-white hover:text-red-brand transition-colors underline decoration-white/20 underline-offset-4">Sign in here</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: 'name',       type: 'text',     icon: User,          placeholder: 'e.g. Satoshi Nakamoto', label: 'Full name' },
              { key: 'email',      type: 'email',    icon: Mail,          placeholder: 'you@example.com',       label: 'Email address' },
              { key: 'role',       type: 'text',     icon: Briefcase,     placeholder: 'e.g. Frontend Developer', label: 'Primary Role' },
              { key: 'experience', type: 'text',     icon: GraduationCap, placeholder: 'e.g. Senior / 5+ years',  label: 'Experience Level' },
              { key: 'company',    type: 'text',     icon: Building,      placeholder: 'e.g. Acme Corp (Optional)', label: 'Company (Optional)', required: false },
            ].map(({ key, type, icon: Icon, placeholder, label, required = true }) => (
              <div key={key}>
                <label className="block text-sm font-bold mb-2 text-white/80">{label}</label>
                <div className="relative group">
                  <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-red-brand transition-colors" />
                  <input type={type} placeholder={placeholder} value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    required={required}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white placeholder-white/20 focus:outline-none focus:border-red-brand focus:bg-white/10 focus:ring-1 focus:ring-red-brand transition-all duration-300" />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Password</label>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-red-brand transition-colors" />
                <input type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-red-brand focus:bg-white/10 focus:ring-1 focus:ring-red-brand transition-all duration-300" />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 mt-4 bg-red-brand text-white shadow-[0_0_20px_rgba(251,54,64,0.3)] hover:shadow-[0_0_30px_rgba(251,54,64,0.5)] hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0">
              {loading
                ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Create My Account</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="mt-10 text-center text-xs font-medium text-white/30">
            By creating an account you agree to our{' '}
            <Link to="/terms" className="text-white/50 hover:text-white underline decoration-white/20">Terms</Link> and{' '}
            <Link to="/privacy" className="text-white/50 hover:text-white underline decoration-white/20">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
