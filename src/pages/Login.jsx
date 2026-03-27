import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen flex" style={{ background: '#000F08' }}>

      {/* ── Left: Brand Panel ── */}
      <div className="hidden lg:flex w-[44%] flex-col justify-between p-12 relative overflow-hidden flex-shrink-0" style={{ background: '#FB3640' }}>
        <div className="absolute inset-0 grid-bg-light pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 pointer-events-none" style={{ background: '#D62B34' }} />

        {/* Logo */}
        <Link to="/" className="relative flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,15,8,0.15)' }}>
            <span className="font-black text-white text-xs">dd</span>
          </div>
          <span className="font-black text-white text-lg tracking-tight">Devdoc<span style={{ color: 'rgba(0,15,8,0.7)' }}>.ai</span></span>
        </Link>

        {/* Copy */}
        <div className="relative">
          <h2 className="text-5xl font-black leading-tight mb-5" style={{ color: '#000F08' }}>
            Write code.<br />Ship with<br />confidence.
          </h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: 'rgba(0,15,8,0.7)' }}>
            The AI code health platform that catches bugs, security issues, and performance problems before they reach production.
          </p>
          <div className="space-y-3">
            {[
              { icon: Clock, text: 'Analysis results in under 60 seconds' },
              { icon: ShieldCheck, text: 'OWASP-aligned security scanning' },
              { icon: CheckCircle, text: 'Support for all major languages' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon size={16} style={{ color: '#000F08', opacity: 0.7 }} className="flex-shrink-0" />
                <span className="text-sm font-medium" style={{ color: 'rgba(0,15,8,0.75)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Session note */}
        <div className="relative flex items-center gap-2 text-sm" style={{ color: 'rgba(0,15,8,0.55)' }}>
          <ShieldCheck size={14} />
          Sessions automatically expire after 3 hours for your security.
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-10">
            <span className="font-black text-2xl" style={{ color: '#FB3640' }}>devdoc<span className="text-white">.ai</span></span>
          </Link>

          <h1 className="text-3xl font-black mb-1" style={{ color: '#ffffff' }}>Welcome back</h1>
          <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            No account?{' '}
            <Link to="/register" className="font-semibold hover:underline" style={{ color: '#FB3640' }}>Create one free</Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input
                  type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  required className="input-dark w-full pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
                <a href="#" className="text-xs hover:underline" style={{ color: '#FB3640' }}>Forgot password?</a>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
                <input
                  type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  required className="input-dark w-full pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{ background: '#FB3640', color: '#ffffff', boxShadow: '0 4px 20px rgba(251,54,64,0.4)' }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = '#D62B34')}
              onMouseLeave={e => (e.currentTarget.style.background = '#FB3640')}>
              {loading
                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Sign In</span><ArrowRight size={15} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            By signing in you agree to our{' '}
            <a href="#" className="hover:underline" style={{ color: 'rgba(255,255,255,0.4)' }}>Terms</a> and{' '}
            <a href="#" className="hover:underline" style={{ color: 'rgba(255,255,255,0.4)' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
