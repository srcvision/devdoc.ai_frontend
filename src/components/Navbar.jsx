import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';

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
  const { pathname } = useLocation();
  const pageName = breadcrumbMap[pathname] || 'Dashboard';
  const isOverview = pathname === '/dashboard';

  return (
    <header className="h-12 flex items-center gap-4 px-5 flex-shrink-0"
      style={{ background: '#000', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs flex-1">
        <Link to="/dashboard" className="transition-colors font-medium"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={e => e.currentTarget.style.color = '#FB3640'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
          devdoc.ai
        </Link>
        {!isOverview && (
          <>
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>/</span>
            <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{pageName}</span>
          </>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
          style={{ background: 'rgba(251,54,64,0.1)', color: '#FB3640' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          AI Online
        </div>

        {/* Notification */}
        <button className="relative w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent'; }}>
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: '#FB3640' }} />
        </button>
      </div>
    </header>
  );
}
