import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const sections = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Quick Start Guide', content: `1. Register at /register\n2. Login with your credentials\n3. Open your dashboard\n4. Paste code into any AI tool\n5. Click Analyze to get instant results` },
      { title: 'Authentication', content: `DevDoctor uses JWT authentication. After login, your token is saved in localStorage and automatically included in all API requests via Axios interceptors.` },
    ],
  },
  {
    title: 'AI Tools',
    items: [
      { title: 'Code Review', content: `POST /api/tools/code-review\nBody: { code: string, language?: string }\nReturns: { aiResponse: string, score: object, reportId: string }` },
      { title: 'Bug Detector', content: `POST /api/tools/bug-detect\nDetects logical bugs, runtime errors, and potential crashes. Returns severity levels and corrected code.` },
      { title: 'Security Scanner', content: `POST /api/tools/security-scan\nScans for OWASP vulnerabilities, injection risks, hardcoded secrets, and insecure patterns.` },
      { title: 'Performance Analyzer', content: `POST /api/tools/performance\nIdentifies O(n²) algorithms, blocking operations, memory leaks, and provides optimized alternatives.` },
      { title: 'GitHub Analyzer', content: `POST /api/tools/github-analyze\nBody: { repoUrl: string }\nFetches repo files via GitHub API, analyzes code architecture, quality, bugs, and security.` },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Base URL', content: `http://localhost:5000/api\n\nAll tool routes require Authorization: Bearer <token> header.` },
      { title: 'Auth Endpoints', content: `POST /api/auth/register - { name, email, password }\nPOST /api/auth/login    - { email, password }\nGET  /api/auth/me       - Get current user (protected)` },
      { title: 'Tool Endpoints', content: `POST /api/tools/code-review\nPOST /api/tools/bug-detect\nPOST /api/tools/security-scan\nPOST /api/tools/performance\nPOST /api/tools/code-quality\nPOST /api/tools/architecture\nPOST /api/tools/github-analyze\nPOST /api/tools/debug\nPOST /api/tools/explain\nGET  /api/tools/reports\nGET  /api/tools/reports/:id\nDELETE /api/tools/reports/:id\nGET  /api/tools/dashboard-stats` },
    ],
  },
  {
    title: 'Self-Hosting & Setup',
    items: [
      { title: 'Environment Variables', content: `Backend .env:\nPORT=5000\nMONGO_URI=mongodb://localhost:27017/devdoctor\nJWT_SECRET=your_secret_key\nGEMINI_API_KEY=your_gemini_key\nGITHUB_TOKEN=your_github_token (optional, improves rate limits)` },
      { title: 'Running Locally', content: `# Backend\ncd backend && npm install && npm run dev\n\n# Frontend\ncd frontend && npm install && npm run dev\n\nFrontend: http://localhost:5173\nBackend:  http://localhost:5000` },
    ],
  },
];

function DocItem({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 dark:border-gray-700/50 rounded-xl overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-surface-800 transition-colors">
        <span className="font-medium text-gray-900 dark:text-white text-sm">{title}</span>
        {open ? <ChevronDown size={16} className="text-brand-500" /> : <ChevronRight size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <pre className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap overflow-x-auto">{content}</pre>
        </div>
      )}
    </div>
  );
}

export default function Documentation() {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState(sections[0].title);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-surface-950">
        {/* Navbar */}
        <nav className="border-b border-gray-200 dark:border-gray-700/50 px-6 h-16 flex items-center justify-between sticky top-0 glass z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-600 rounded-xl flex items-center justify-center">
              <Stethoscope size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">DevDoctor <span className="text-brand-600">AI</span></span>
          </Link>
          <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">← Home</Link>
        </nav>

        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar TOC */}
          <aside className="md:col-span-1">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Contents</p>
              {sections.map(({ title }) => (
                <button key={title} onClick={() => setActiveSection(title)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === title ? 'bg-brand-50 dark:bg-ink text-brand-600 dark:text-brand-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                  {title}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50 mt-4">
                <Link to="/register" className="btn-primary w-full justify-center py-2 text-sm">Get Started</Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="md:col-span-3 space-y-8">
            {sections.filter((s) => s.title === activeSection).map(({ title, items }) => (
              <div key={title}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
                <div className="space-y-3">
                  {items.map((item) => <DocItem key={item.title} {...item} />)}
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
