import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import {
  Code2, Bug, ShieldCheck, Zap, Star, Building2,
  Github, Terminal, BookOpen, Clock, ArrowRight, Activity, Flame, Trophy, Target,
  AlertTriangle, CheckCircle, TrendingUp, Cpu
} from 'lucide-react';

const tools = [
  { path: '/dashboard/code-review',  icon: Code2,       color: '#60a5fa' },
  { path: '/dashboard/bug-detector', icon: Bug,         color: '#FB3640' },
  { path: '/dashboard/security',     icon: ShieldCheck, color: '#34d399' },
  { path: '/dashboard/performance',  icon: Zap,         color: '#fbbf24' },
  { path: '/dashboard/code-quality', icon: Star,        color: '#a78bfa' },
  { path: '/dashboard/architecture', icon: Building2,   color: '#22d3ee' },
  { path: '/dashboard/github',       icon: Github,      color: '#f9fafb' },
  { path: '/dashboard/debug',        icon: Terminal,    color: '#f472b6' },
  { path: '/dashboard/explain',      icon: BookOpen,    color: '#818cf8' },
];

const toolLabels = {
  'code-review': 'Code Review', 'bug-detect': 'Bug Detect', 'security-scan': 'Security',
  'performance': 'Perf', 'code-quality': 'Quality', 'architecture': 'Architecture',
  'github-analyze': 'GitHub', 'debug': 'Debug', 'explain': 'Explain',
};

// ── Enhanced Radial Score Ring (Roller/Round Chart) ──
function ScoreRing({ score, max = 10, color = '#FB3640', size = 100, label, sublabel }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(score / max, 1);
  return (
    <div className="flex flex-col items-center group">
      <div className="relative transform transition-transform duration-500 group-hover:scale-110">
        <div className="absolute inset-0 rounded-full opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-40" style={{ background: color }} />
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative z-10">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="6"
            stroke="rgba(255,255,255,0.06)" />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="6"
            stroke={color} strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
            fontSize={size > 80 ? "24" : "16"} fontWeight="900" fill="#fff">{score}</text>
        </svg>
      </div>
      {label && <p className="text-sm font-bold mt-4 tracking-wide group-hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.85)' }}>{label}</p>}
      {sublabel && <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{sublabel}</p>}
    </div>
  );
}

// ── Activity Bar Chart (Last 7 Days) ──
function ActivityBarChart() {
  const data = [12, 19, 8, 25, 14, 30, 22];
  const maxVal = Math.max(...data);

  return (
    <div className="h-44 flex items-end justify-between gap-3 mt-4">
      {data.map((val, i) => {
        const heightPct = (val / maxVal) * 100;
        const daysAgo = 6 - i;
        const label = daysAgo === 0 ? 'Today' : `${daysAgo}d`;
        const isActive = i === 6;
        return (
          <div key={i} className="flex flex-col items-center flex-1 group">
            <div className="w-full relative flex items-end justify-center rounded-t-lg transition-all duration-300 shadow-inner overflow-hidden cursor-crosshair"
              style={{ height: '140px', background: 'rgba(255,255,255,0.02)' }}>
              
              <div className="absolute -top-10 bg-white text-black text-xs font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-xl z-20 pointer-events-none">
                {val} scans
              </div>
              
              <div className="w-full rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-80"
                style={{ 
                  height: `${heightPct}%`, 
                  background: isActive ? 'linear-gradient(to top, #FB3640, #ff6b6b)' : 'linear-gradient(to top, rgba(251,54,64,0.15), rgba(251,54,64,0.4))', 
                  borderTop: isActive ? 'none' : '1px solid rgba(251,54,64,0.5)',
                  boxShadow: isActive ? '0 -4px 20px rgba(251,54,64,0.5)' : 'none'
                }} />
            </div>
            <span className="text-[10px] mt-3 font-semibold uppercase tracking-widest transition-colors" 
              style={{ color: isActive ? '#FB3640' : 'rgba(255,255,255,0.4)' }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Quality Trend Line Chart (SVG) ──
function QualityTrendLineChart() {
  const data = [6.5, 6.8, 7.1, 7.0, 7.5, 8.2, 8.5]; // Example quality scores over 7 points
  const min = 5;
  const max = 10;
  
  // Calculate SVG coordinates
  const height = 120;
  const width = 100; // Percentage based
  const xStep = 100 / (data.length - 1);
  
  const points = data.map((val, i) => {
    const x = i * xStep;
    const y = height - ((val - min) / (max - min)) * height;
    return `${x}%,${y}`;
  }).join(' ');

  const pathD = `M 0%,${height - ((data[0] - min) / (max - min)) * height} ` +
    data.map((val, i) => {
      if (i === 0) return '';
      const x = i * xStep;
      const y = height - ((val - min) / (max - min)) * height;
      const prevX = (i - 1) * xStep;
      const prevY = height - ((data[i - 1] - min) / (max - min)) * height;
      // Smooth cubic bezier curve calculation
      const cp1X = prevX + (x - prevX) * 0.5;
      const cp1Y = prevY;
      const cp2X = prevX + (x - prevX) * 0.5;
      const cp2Y = y;
      return `C ${cp1X}%,${cp1Y} ${cp2X}%,${cp2Y} ${x}%,${y}`;
    }).join(' ');

  return (
    <div className="relative mt-6" style={{ height: '140px' }}>
      <svg width="100%" height="100%" className="overflow-visible stroke-current" style={{ color: '#a78bfa' }}>
        {/* Grid lines */}
        {[0, 0.5, 1].map(pct => (
          <line key={pct} x1="0" y1={`${pct * 100}%`} x2="100%" y2={`${pct * 100}%`} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
        ))}
        {/* Fill Gradient (Area under line) - Needs an SVG trick, simpler to just use path for now */}
        <path d={`${pathD}`} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
          style={{ filter: 'drop-shadow(0px 8px 12px rgba(167, 139, 250, 0.4))' }} />
        {/* Data points */}
        {data.map((val, i) => {
          const x = i * xStep;
          const y = height - ((val - min) / (max - min)) * height;
          return (
            <circle key={i} cx={`${x}%`} cy={y} r="4" fill="#000" stroke="#a78bfa" strokeWidth="2" className="transition-transform duration-300 hover:r-6 cursor-pointer" />
          )
        })}
      </svg>
      <div className="absolute right-0 top-0 bg-[#a78bfa] text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">Latest: 8.5</div>
    </div>
  );
}

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tools/dashboard-stats')
      .then(({ data }) => setStats(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Developer';
  const totalScans = stats?.totalScans ?? 0;
  const avgQuality = stats?.avgQuality ?? 0;

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-[1600px] mx-auto">

      {/* ── Header & KPI Cards ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pt-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">
            Overview
          </h1>
          <p className="text-sm font-medium text-white/50">
            Welcome back, {firstName}. Here's your codebase health at a glance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard/code-review"
            className="inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-all bg-red-brand text-white hover:bg-red-brand/90 shadow-[0_4px_15px_rgba(251,54,64,0.3)] hover:shadow-[0_6px_20px_rgba(251,54,64,0.4)] hover:-translate-y-0.5">
            <Activity size={14} /> New Analysis
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Avg Quality Tracker', value: avgQuality.toFixed(1), icon: Star, color: '#a78bfa', suffix: '/10' },
          { label: 'Total Analyses Run', value: totalScans, icon: Target, color: '#34d399', suffix: '' },
          { label: 'Unique Tools Active', value: Object.keys(stats?.toolCounts || {}).length, icon: Terminal, color: '#60a5fa', suffix: '/9' },
          { label: 'Avg Sec. Score', value: 92, icon: ShieldCheck, color: '#FB3640', suffix: '/100' },
        ].map(({ label, value, icon: Icon, color, suffix }) => (
          <div key={label} className="bg-[#050505] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-white/10 transition-colors shadow-lg">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" style={{ background: color }} />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">{label}</span>
              <Icon size={14} style={{ color: color }} className="opacity-70" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white tracking-tight">{value}</span>
              <span className="text-sm font-bold text-white/30">{suffix}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: Operation Log & Secondary Stats */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col shadow-lg" style={{ height: '400px' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-bold uppercase tracking-widest text-white/80">Operation Log</h2>
              <Link to="/dashboard/history" className="text-[11px] font-bold text-red-brand hover:text-white transition-colors uppercase tracking-widest">
                View All →
              </Link>
            </div>
            
            <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/30">
                    <th className="pb-3 font-bold w-1/2">Tool & Time</th>
                    <th className="pb-3 font-bold w-1/4">Environment</th>
                    <th className="pb-3 font-bold text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan="3" className="py-8 text-center"><div className="w-5 h-5 border-2 border-red-brand border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                  ) : stats?.recentReports?.length > 0 ? (
                    stats.recentReports.map(r => {
                      const toolInfo = tools.find(t => t.path.includes(r.toolType?.replace(/-/g, '-')));
                      const TIcon = toolInfo?.icon || Activity;
                      const tColor = toolInfo?.color || '#FB3640';
                      return (
                        <tr key={r._id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${tColor}15` }}>
                                <TIcon size={14} style={{ color: tColor }} />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-white/90 group-hover:text-white transition-colors">{toolLabels[r.toolType] || r.toolType}</span>
                                <span className="text-[10px] text-white/30">{new Date(r.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-white/50">
                              {r.language || 'CodeBase'}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            {r.score?.overall != null ? (
                              <span className="text-sm font-black" style={{ color: tColor }}>{r.score.overall}<span className="text-[10px] text-white/20">/10</span></span>
                            ) : (
                              <span className="text-xs text-white/20">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr><td colSpan="3" className="py-8 text-center text-xs text-white/30">No recent scans found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 shadow-lg">
              <h2 className="text-[13px] font-bold uppercase tracking-widest text-white/80 mb-1">Scan Volume</h2>
              <p className="text-[10px] text-white/40 mb-2">Automated checks last 7 days</p>
              <ActivityBarChart />
            </div>
            
            <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 shadow-lg">
              <h2 className="text-[13px] font-bold uppercase tracking-widest text-white/80 mb-1">Quality Trend</h2>
              <p className="text-[10px] text-white/40 mb-2">Aggregate health progression</p>
              <QualityTrendLineChart />
            </div>
          </div>

        </div>

        {/* Right Column: Engine Insights */}
        <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col shadow-lg" style={{ height: 'auto' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[13px] font-bold uppercase tracking-widest text-white/80">Engine Insights</h2>
            <Cpu size={14} className="text-white/30" />
          </div>

          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-xl relative overflow-hidden group border border-red-brand/20 bg-red-brand/5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-red-brand" />
                <span className="text-[10px] font-black uppercase tracking-widest text-red-brand">Critical Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed text-white/60">
                Multiple <span className="text-white">null-reference</span> vulnerabilities detected in API boundary interfaces. Consider adding optional chaining or stricter type guards.
              </p>
            </div>

            <div className="p-4 rounded-xl relative overflow-hidden group border border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Strong Pattern</span>
              </div>
              <p className="text-[11px] leading-relaxed text-white/60">
                Separation of concerns in your <span className="text-white">service layer</span> averages a 9.2/10 architecture score. This pattern ensures high maintainability.
              </p>
            </div>
            
            <div className="p-4 rounded-xl relative overflow-hidden group border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={14} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Optimization</span>
              </div>
              <p className="text-[11px] leading-relaxed text-white/60">
                You have multiple <span className="text-white">O(N^2)</span> nested loops in data transformation blocks. Map/Reduce chains could improve performance by 40%.
              </p>
            </div>

            <div className="p-5 mt-auto rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={12} className="text-white/40" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Est. Time Saved</span>
                </div>
                <p className="text-2xl font-black text-white tracking-tight">14<span className="text-xs text-white/40 font-bold ml-1">hrs</span> 30<span className="text-xs text-white/40 font-bold ml-1">mins</span></p>
              </div>
              <Trophy size={32} className="text-white/10" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
