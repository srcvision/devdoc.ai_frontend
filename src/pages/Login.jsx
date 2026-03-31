import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Clock, ShieldCheck, Activity } from 'lucide-react';

export default function Login() {
  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const { login }               = useAuth();
  const [searchParams]          = useSearchParams();
  const navigate_                = (path) => window.location.href = path;

  // Show session-expired notice
  useEffect(() => {
    if (searchParams.get('reason') === 'session_expired') {
      toast.error('Your session expired. Please sign in again.', { duration: 5000 });
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login({ _id: data._id, name: data.name, email: data.email, plan: data.plan }, data.token);
      toast.success(`Welcome back, ${data.name}!`);
      navigate_('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Incorrect email or password.');
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
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-brand/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-red-brand/15 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-float delay-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center gap-1.5 group w-fit">
          <span className="font-black text-2xl tracking-tight text-white transition-transform group-hover:scale-105 drop-shadow-md">Devdoc<span className="text-red-brand">.ai</span></span>
        </Link>

        {/* Copy */}
        <div className="relative z-10 animate-slide-up">
          <div className="inline-flex mt-2 items-center gap-2 px-6 py-4 rounded-full text-[15px] font-black mb-4 text-red-brand bg-red-brand/10 border border-red-brand/20 uppercase tracking-widest shadow-[0_0_15px_rgba(251,54,64,0.15)]">
            <Activity size={20} className="text-red-brand animate-pulse" /> Welcome Back
          </div>
          <h2 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tighter mb-6 text-white drop-shadow-lg">
            Write code.<br />
            Ship with <span className="text-red-brand drop-shadow-[0_0_20px_rgba(251,54,64,0.3)]">confidence.</span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed text-white/50 max-w-md font-medium">
            The AI code health platform that catches bugs, security issues, and performance problems before they reach production.
          </p>
          
          <div className="space-y-4">
            {[
              { icon: Clock, text: 'Analysis results in under 60 seconds' },
              { icon: ShieldCheck, text: 'OWASP-aligned security scanning' },
              { icon: CheckCircle, text: 'Support for all major languages' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 w-fit shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-red-brand/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-red-brand" />
                </div>
                <span className="text-sm font-bold text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Session note */}
        <div className="relative top-5 z-10 flex items-center gap-3 text-xs font-medium text-white/30 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/10">
          <ShieldCheck size={14} className="text-red-brand/70" />
          Sessions automatically expire after 3 hours.
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex-1 flex -mt-24 items-center justify-center p-8 bg-[#000000] relative">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-red-brand/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-1.5 mb-10 w-fit">
            <span className="font-black text-2xl tracking-tight text-white">Devdoc<span className="text-red-brand">.ai</span></span>
          </Link>

          <h1 className="text-4xl font-black mb-2 text-white tracking-tight">Sign in</h1>
          <p className="mb-10 text-base text-white/50 font-medium">
            No account?{' '}
            <Link to="/register" className="font-bold text-white hover:text-red-brand transition-colors underline decoration-white/20 underline-offset-4">Create one free</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 text-white/80">Email address</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-red-brand transition-colors" />
                <input
                  type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white placeholder-white/20 focus:outline-none focus:border-red-brand focus:bg-white/10 focus:ring-1 focus:ring-red-brand transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-white/80">Password</label>
                <a href="#" className="text-xs font-bold text-white/40 hover:text-white transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-red-brand transition-colors" />
                <input
                  type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-red-brand focus:bg-white/10 focus:ring-1 focus:ring-red-brand transition-all duration-300"
                />
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
                : <><span>Sign In</span><ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="mt-10 text-center text-xs font-medium text-white/30">
            By signing in you agree to our{' '}
            <Link to="/terms" className="text-white/50 hover:text-white underline decoration-white/20">Terms</Link> and{' '}
            <Link to="/privacy" className="text-white/50 hover:text-white underline decoration-white/20">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
