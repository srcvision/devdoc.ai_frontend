import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Code2, Bug, ShieldCheck, Zap, Star,
  Building2, Github, Terminal, BookOpen, History,
  ChevronLeft, ChevronRight, LogOut, Activity
} from 'lucide-react';

const navItems = [
  { path: '/dashboard',              label: 'Overview',         icon: LayoutDashboard, end: true },
  { path: '/dashboard/code-review',  label: 'Code Review',      icon: Code2 },
  { path: '/dashboard/bug-detector', label: 'Bug Detector',     icon: Bug },
  { path: '/dashboard/security',     label: 'Security Scanner', icon: ShieldCheck },
  { path: '/dashboard/performance',  label: 'Performance',      icon: Zap },
  { path: '/dashboard/code-quality', label: 'Code Quality',     icon: Star },
  { path: '/dashboard/architecture', label: 'Architecture',     icon: Building2 },
  { path: '/dashboard/github',       label: 'GitHub Analyzer',  icon: Github, badge: 'New' },
  { path: '/dashboard/debug',        label: 'Debug Assistant',  icon: Terminal },
  { path: '/dashboard/explain',      label: 'Code Explainer',   icon: BookOpen },
  { path: '/dashboard/history',      label: 'Report History',   icon: History },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside
      className={`relative flex flex-col h-screen transition-all duration-300 no-scrollbar ${collapsed ? 'w-[70px]' : 'w-[260px]'}`}
      style={{ background: '#000F08', borderRight: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="absolute -right-3 top-20 z-10 w-6 h-6 flex items-center justify-center rounded-full transition-all"
        style={{ background: '#FB3640', border: '2px solid #000F08', color: '#fff', boxShadow: '0 2px 8px rgba(251,54,64,0.4)' }}
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>

      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: '#FB3640', boxShadow: '0 2px 12px rgba(251,54,64,0.4)' }}>
          <Activity size={15} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-black text-base tracking-tight leading-none" style={{ color: '#FB3640' }}>
            devdoc<span style={{ color: 'rgba(255,255,255,0.4)' }}>.ai</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-4 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
            }
          >
            <item.icon size={17} className="flex-shrink-0" />
            {!collapsed && <span className="flex-1">{item.label}</span>}
            {!collapsed && item.badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: 'rgba(251,54,64,0.15)', color: '#FB3640' }}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      {!collapsed ? (
        <div className="flex-shrink-0 px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
              style={{ background: '#FB3640', color: '#000F08' }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: 'rgba(255,255,255,0.85)' }}>{user?.name || 'User'}</p>
              <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{user?.email}</p>
            </div>
            <button onClick={handleLogout} title="Logout" className="p-1.5 rounded-lg transition-colors"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FB3640'; e.currentTarget.style.background = 'rgba(251,54,64,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}>
              <LogOut size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-shrink-0 px-2 py-4 flex justify-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button onClick={handleLogout} title="Logout" className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FB3640'; e.currentTarget.style.background = 'rgba(251,54,64,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}>
            <LogOut size={16} />
          </button>
        </div>
      )}
    </aside>
  );
}
