import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, History, LogOut, Activity, ChevronLeft, ChevronRight,
  Code2, Bug, ShieldCheck, Zap, Star, Building2, Github, Terminal, BookOpen,
  DollarSign, Lightbulb, Sparkles, ExternalLink
} from 'lucide-react';

// ── Navigation ──────────────────────────────────────────────
const navItems = [
  { path: '/dashboard',         label: 'Overview',  icon: LayoutDashboard, end: true },
  { path: '/dashboard/history', label: 'History',   icon: History },
];

// ── AI Tools ──────────────────────────────────────────────
const toolItems = [
  { path: '/dashboard/code-review',  label: 'Code Review',   icon: Code2,       color: '#60a5fa' },
  { path: '/dashboard/bug-detector', label: 'Bug Detector',  icon: Bug,         color: '#FB3640' },
  { path: '/dashboard/security',     label: 'Security',      icon: ShieldCheck, color: '#34d399' },
  { path: '/dashboard/performance',  label: 'Performance',   icon: Zap,         color: '#fbbf24' },
  { path: '/dashboard/code-quality', label: 'Code Quality',  icon: Star,        color: '#a78bfa' },
  { path: '/dashboard/architecture', label: 'Architecture',  icon: Building2,   color: '#22d3ee' },
  { path: '/dashboard/github',       label: 'GitHub Repo',   icon: Github,      color: '#f9fafb' },
  { path: '/dashboard/debug',        label: 'Debug',         icon: Terminal,    color: '#f472b6' },
  { path: '/dashboard/explain',      label: 'Explainer',     icon: BookOpen,    color: '#818cf8' },
];

// ── Pages ───────────────────────────────────────────────────
const pageItems = [
  { path: '/how-it-works', label: 'How It Works', icon: Lightbulb },
  { path: '/features',     label: 'Features',     icon: Sparkles },
  { path: '/pricing',      label: 'Pricing',      icon: DollarSign },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const SectionLabel = ({ children }) =>
    !collapsed ? (
      <p className="text-[10px] font-bold uppercase tracking-widest px-4 mb-2 mt-6 text-white/30">{children}</p>
    ) : <div className="mt-6 mb-2 mx-auto w-4 border-t border-white/5" />;

  const renderLink = (item, isExternal = false) => {
    const Icon = item.icon;
    const commonClass = `group flex items-center relative transition-colors duration-200 outline-none ${
      collapsed ? 'justify-center py-3' : 'px-4 py-2.5 mx-2 rounded-lg'
    }`;

    if (isExternal) {
      return (
        <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer"
          title={collapsed ? item.label : undefined}
          className={`${commonClass} text-white/40 hover:text-white hover:bg-white/5`}>
          <Icon size={16} className="transition-transform group-hover:scale-110 flex-shrink-0" style={item.color ? { color: item.color } : {}} />
          {!collapsed && <span className="flex-1 ml-3 text-[13px] font-medium tracking-wide">{item.label}</span>}
          {!collapsed && <ExternalLink size={12} className="text-white/20 group-hover:text-white/40" />}
        </a>
      );
    }
    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.end}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) =>
          `${commonClass} ${
            isActive 
              ? 'bg-red-brand/10 text-white shadow-[inset_2px_0_0_#FB3640]' 
              : 'text-white/50 hover:text-white hover:bg-white/5'
          }`
        }
      >
        <Icon size={16} className={`transition-transform flex-shrink-0 group-hover:scale-110`} style={item.color ? { color: item.color } : {}} />
        {!collapsed && <span className="flex-1 ml-3 text-[13px] font-medium tracking-wide">{item.label}</span>}
      </NavLink>
    );
  };

  return (
    <aside
      className={`relative flex flex-col h-screen transition-all duration-300 z-40 bg-[#050505] border-r border-white/5 ${collapsed ? 'w-[70px]' : 'w-[240px]'}`}
    >
      {/* ── Header ── */}
      <div className={`flex items-center h-16 flex-shrink-0 border-b border-white/5 ${collapsed ? 'justify-center px-0' : 'px-5'}`}>
        <div className="flex items-center gap-3 w-full">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-red-brand bg-opacity-10 border border-red-brand/20 shadow-[0_0_15px_rgba(251,54,64,0.15)] relative overflow-hidden group hover:bg-opacity-20 transition-all cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Activity size={16} className="text-red-brand" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-black text-[15px] tracking-tight text-white leading-none">Devdoc<span className="text-red-brand">.ai</span></span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 leading-none mt-1">Platform</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Scroll Area ── */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-1">
        {navItems.map(item => renderLink(item))}
        
        <SectionLabel>AI Engine</SectionLabel>
        {toolItems.map(item => renderLink(item))}

        <SectionLabel>Resources</SectionLabel>
        {pageItems.map(item => renderLink(item))}
      </nav>

      {/* ── Footer ── */}
      <div className="p-3 border-t border-white/5 bg-[#000000]">
        {!collapsed ? (
          <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-3 flex items-center justify-between group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-brand to-orange-500 flex items-center justify-center text-white text-xs font-black shadow-[0_0_10px_rgba(251,54,64,0.3)] flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-white truncate">{user?.name || 'Developer'}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-brand truncate">{user?.plan || 'Free'} Plan</span>
              </div>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded-md text-white/30 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 ml-2" title="Sign out">
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-brand to-orange-500 flex items-center justify-center text-white text-sm font-black shadow-[0_0_10px_rgba(251,54,64,0.3)] cursor-pointer" title={user?.name || 'Developer'}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center rounded-xl text-white/30 hover:text-white hover:bg-white/10 transition-colors" title="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ── Collapse Toggle ── */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:scale-110 transition-all z-50 shadow-xl"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}

