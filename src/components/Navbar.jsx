import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const breadcrumbMap = {
  '/dashboard': 'Overview',
  '/dashboard/code-review': 'Code Review',
  '/dashboard/bug-detector': 'Bug Detector',
  '/dashboard/security': 'Security Scanner',
  '/dashboard/performance': 'Performance Analyzer',
  '/dashboard/code-quality': 'Code Quality',
  '/dashboard/architecture': 'Architecture Analyzer',
  '/dashboard/github': 'GitHub Analyzer',
  '/dashboard/debug': 'Debug Assistant',
  '/dashboard/explain': 'Code Explainer',
  '/dashboard/history': 'Report History',
};

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const { pathname } = useLocation();
  const pageName = breadcrumbMap[pathname] || 'Dashboard';

  return (
    <header
      className="h-14 flex items-center gap-4 px-6 sticky top-0 z-20 flex-shrink-0"
      style={{
        background: '#000F08',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm flex-1">
        <Link to="/dashboard" className="transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#FB3640'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
          devdoc.ai
        </Link>
        {pathname !== '/dashboard' && (
          <>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{pageName}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {/* Notification */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}>
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: '#FB3640' }} />
        </button>

        {/* Theme toggle */}
        <button onClick={toggle} aria-label="Toggle theme"
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}>
          {isDark ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
