import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, ChevronDown, ChevronRight, BookOpen, Terminal, Code, Cpu } from 'lucide-react';

const sections = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      { title: 'Quick Start Guide', content: `1. Register at /register\n2. Login with your credentials\n3. Open your dashboard\n4. Paste code into any AI tool\n5. Click Analyze to get instant results` },
      { title: 'Authentication', content: `Devdoc.ai uses JWT authentication. After login, your token is saved in localStorage and automatically included in all API requests via Axios interceptors.` },
    ],
  },
  {
    title: 'AI Tools',
    icon: Cpu,
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
    icon: Code,
    items: [
      { title: 'Base URL', content: `http://localhost:5000/api\n\nAll tool routes require Authorization: Bearer <token> header.` },
      { title: 'Auth Endpoints', content: `POST /api/auth/register - { name, email, password }\nPOST /api/auth/login    - { email, password }\nGET  /api/auth/me       - Get current user (protected)` },
      { title: 'Tool Endpoints', content: `POST /api/tools/code-review\nPOST /api/tools/bug-detect\nPOST /api/tools/security-scan\nPOST /api/tools/performance\nPOST /api/tools/code-quality\nPOST /api/tools/architecture\nPOST /api/tools/github-analyze\nPOST /api/tools/debug\nPOST /api/tools/explain\nGET  /api/tools/reports\nGET  /api/tools/reports/:id\nDELETE /api/tools/reports/:id\nGET  /api/tools/dashboard-stats` },
    ],
  },
  {
    title: 'Self-Hosting & Setup',
    icon: Terminal,
    items: [
      { title: 'Environment Variables', content: `Backend .env:\nPORT=5000\nMONGO_URI=mongodb://localhost:27017/devdoctor\nJWT_SECRET=your_secret_key\nGEMINI_API_KEY=your_gemini_key\nGITHUB_TOKEN=your_github_token (optional, improves rate limits)` },
      { title: 'Running Locally', content: `# Backend\ncd backend && npm install && npm run dev\n\n# Frontend\ncd frontend && npm install && npm run dev\n\nFrontend: http://localhost:5173\nBackend:  http://localhost:5000` },
    ],
  },
];

function DocItem({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${open ? 'border-red-brand/40 bg-[#0A0A0A]' : 'border-white/10 bg-[#050505] hover:border-white/20'}`}>
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-6 py-5 text-left group">
        <span className={`font-bold text-base transition-colors ${open ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>{title}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${open ? 'bg-red-brand/20 text-red-brand' : 'bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white'}`}>
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 animate-slide-up">
          <div className="bg-[#111111] rounded-xl p-5 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-brand/5 rounded-full blur-[40px] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
            <pre className="text-sm font-mono text-white/70 whitespace-pre-wrap overflow-x-auto relative z-10 leading-relaxed">{content}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Documentation() {
  const [activeSection, setActiveSection] = useState(sections[0].title);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-red-brand selection:text-white pb-20">
      
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="font-black text-2xl tracking-tight text-white transition-transform group-hover:scale-105">Devdoc<span className="text-red-brand">.ai</span></span>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/" className="text-sm font-bold tracking-widest text-white/70 hover:text-white transition-colors uppercase relative group">
              ← Back to Home
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-red-brand transition-all group-hover:w-full" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-brand/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-brand/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Sidebar TOC */}
        <aside className="lg:col-span-1">
          <div className="sticky top-32 space-y-2 p-6 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-xl">
            <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-6">Documentation</p>
            {sections.map(({ title, icon: Icon }) => (
              <button key={title} onClick={() => setActiveSection(title)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-3 ${activeSection === title ? 'bg-red-brand text-white shadow-[0_0_20px_rgba(251,54,64,0.4)]' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                <Icon size={16} className={activeSection === title ? 'text-white' : 'text-white/40'} />
                {title}
              </button>
            ))}
            <div className="pt-6 mt-6 border-t border-white/10">
              <Link to="/register" className="w-full bg-white text-black font-black uppercase tracking-widest py-3.5 rounded-xl text-sm inline-flex justify-center transition-transform hover:-translate-y-1 hover:shadow-lg">
                Start Free Trial
              </Link>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-3">
          <div className="mb-12">
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Developer Guide</h1>
            <p className="text-xl text-white/50 font-medium">Everything you need to integrate and use Devdoc.ai.</p>
          </div>

          <div className="space-y-12">
            {sections.filter((s) => s.title === activeSection).map(({ title, items }) => (
              <div key={title} className="animate-fade-in-up">
                <h2 className="text-3xl font-black text-white mb-8 pb-4 border-b border-white/10 flex items-center gap-4">
                  <span className="w-2 h-8 bg-red-brand rounded-full" />
                  {title}
                </h2>
                <div className="space-y-4">
                  {items.map((item) => <DocItem key={item.title} {...item} />)}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

