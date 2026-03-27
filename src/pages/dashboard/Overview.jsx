import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import {
  Code2, Bug, ShieldCheck, Zap, Star, Building2,
  Github, Terminal, BookOpen, TrendingUp, FileText,
  Clock, ArrowRight, Activity
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const toolCards = [
  { label: 'Code Review',   path: '/dashboard/code-review',  icon: Code2,      ring: 'rgba(96,165,250,0.2)',   color: '#60a5fa' },
  { label: 'Bug Detector',  path: '/dashboard/bug-detector', icon: Bug,        ring: 'rgba(251,54,64,0.15)',   color: '#FB3640' },
  { label: 'Security',      path: '/dashboard/security',     icon: ShieldCheck, ring: 'rgba(52,211,153,0.2)',  color: '#34d399' },
  { label: 'Performance',   path: '/dashboard/performance',  icon: Zap,        ring: 'rgba(251,191,36,0.2)',   color: '#fbbf24' },
  { label: 'Code Quality',  path: '/dashboard/code-quality', icon: Star,       ring: 'rgba(167,139,250,0.2)',  color: '#a78bfa' },
  { label: 'Architecture',  path: '/dashboard/architecture', icon: Building2,  ring: 'rgba(34,211,238,0.2)',   color: '#22d3ee' },
  { label: 'GitHub Repo',   path: '/dashboard/github',       icon: Github,     ring: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' },
  { label: 'Debug',         path: '/dashboard/debug',        icon: Terminal,   ring: 'rgba(244,114,182,0.2)',  color: '#f472b6' },
  { label: 'Explainer',     path: '/dashboard/explain',      icon: BookOpen,   ring: 'rgba(99,102,241,0.2)',   color: '#818cf8' },
];

const toolLabels = {
  'code-review':'Code Review','bug-detect':'Bug Detect','security-scan':'Security',
  'performance':'Perf','code-quality':'Quality','architecture':'Architecture',
  'github-analyze':'GitHub','debug':'Debug','explain':'Explain',
};

export default function Overview() {
  const { user }             = useAuth();
  const [stats, setStats]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tools/dashboard-stats')
      .then(({ data }) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Developer';

  const barData = stats ? {
    labels: Object.keys(stats.toolCounts).map(k => toolLabels[k] || k),
    datasets: [{
      label: 'Scans',
      data: Object.values(stats.toolCounts),
      backgroundColor: 'rgba(251,54,64,0.7)',
      hoverBackgroundColor: '#FB3640',
      borderRadius: 6,
      borderSkipped: false,
    }],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#000F08', titleColor: '#FB3640', bodyColor: 'rgba(255,255,255,0.7)' } },
    scales: {
      x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 11 } } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 11 } } },
    },
  };

  return (
    <div className="space-y-6 animate-fade-in" style={{ color: 'rgba(255,255,255,0.85)' }}>

      {/* ── Welcome banner ── */}
      <div className="rounded-2xl p-7 relative overflow-hidden" style={{ background: '#FB3640' }}>
        <div className="absolute inset-0 grid-bg-light pointer-events-none opacity-50" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'rgba(0,15,8,0.55)' }}>Welcome back</p>
            <h1 className="text-3xl font-black mb-2" style={{ color: '#000F08' }}>Hey, {firstName}. 👋</h1>
            <p className="text-sm" style={{ color: 'rgba(0,15,8,0.6)' }}>Your AI code health platform is ready. What are we fixing today?</p>
          </div>
          <Link to="/dashboard/code-review"
            className="hidden sm:flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
            style={{ background: '#000F08', color: '#FB3640' }}
            onMouseEnter={e => e.currentTarget.style.background = '#1a1f1e'}
            onMouseLeave={e => e.currentTarget.style.background = '#000F08'}>
            Start Analysis <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Scans',  value: loading ? '—' : (stats?.totalScans ?? 0),  icon: FileText,   color: '#FB3640' },
          { label: 'Avg Quality',  value: loading ? '—' : (stats?.avgQuality ? `${stats.avgQuality}/10` : '—'), icon: TrendingUp, color: '#34d399' },
          { label: 'Tools Used',   value: loading ? '—' : Object.keys(stats?.toolCounts || {}).length, icon: Activity,   color: '#60a5fa' },
          { label: 'Plan',         value: user?.plan?.toUpperCase() || 'FREE',         icon: Star,       color: '#fbbf24' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Icon size={18} className="mb-3" style={{ color }} />
            <p className="text-2xl font-black" style={{ color: '#fff' }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Tools grid ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>AI Tools</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3">
          {toolCards.map(({ label, path, icon: Icon, ring, color }) => (
            <Link key={path} to={path}
              className="flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center transition-all duration-200 group"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)' }}
              onMouseEnter={e => { e.currentTarget.style.background = ring; e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'none'; }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ring }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-[10px] font-medium leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Chart + Recent ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>Scans by Tool</p>
          {barData ? (
            <Bar data={barData} options={chartOptions} height={180} />
          ) : (
            <div className="flex flex-col items-center justify-center h-44 gap-2">
              <Clock size={28} style={{ color: 'rgba(255,255,255,0.15)' }} />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>Run your first analysis to see stats</p>
            </div>
          )}
        </div>

        {/* Recent scans */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Recent Scans</p>
            <Link to="/dashboard/history" className="text-xs font-semibold transition-colors" style={{ color: '#FB3640' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              See all →
            </Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-44">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#FB3640', borderTopColor: 'transparent' }} />
            </div>
          ) : stats?.recentReports?.length > 0 ? (
            <div>
              {stats.recentReports.slice(0, 5).map((r) => (
                <div key={r._id} className="flex items-center gap-4 px-5 py-3.5 transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(251,54,64,0.15)' }}>
                    <Activity size={13} style={{ color: '#FB3640' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium capitalize truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {toolLabels[r.toolType] || r.toolType}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {r.language} · {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {r.score?.overall && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(251,54,64,0.15)', color: '#FB3640' }}>
                      {r.score.overall}/10
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-44 gap-2 text-center px-6">
              <Clock size={28} style={{ color: 'rgba(255,255,255,0.15)' }} />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>No scans yet</p>
              <Link to="/dashboard/code-review" className="text-xs font-semibold" style={{ color: '#FB3640' }}>
                Run your first analysis →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
