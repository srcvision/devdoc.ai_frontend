import React, { useState } from 'react';
import { Copy, CheckCircle, ChevronDown, ChevronUp, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

// ── Map section headings to visual config ─────────────────────────────────
const sectionConfig = [
  { keywords: ['what\'s good', 'strength', 'positive'], color: '#34d399', bg: 'rgba(52,211,153,0.06)', icon: '✅', border: 'rgba(52,211,153,0.15)' },
  { keywords: ['critical', 'severe', 'vulnerability', 'critical bug'], color: '#FB3640', bg: 'rgba(251,54,64,0.06)', icon: '🚨', border: 'rgba(251,54,64,0.2)' },
  { keywords: ['bug', 'logical error', 'runtime'], color: '#f87171', bg: 'rgba(248,113,113,0.06)', icon: '🐛', border: 'rgba(248,113,113,0.15)' },
  { keywords: ['security', 'owasp', 'unsafe', 'risk', 'high risk'], color: '#fbbf24', bg: 'rgba(251,191,36,0.06)', icon: '🔒', border: 'rgba(251,191,36,0.15)' },
  { keywords: ['performance', 'slow', 'memory', 'inefficient'], color: '#60a5fa', bg: 'rgba(96,165,250,0.06)', icon: '⚡', border: 'rgba(96,165,250,0.15)' },
  { keywords: ['score', 'metric', 'rating'], color: '#a78bfa', bg: 'rgba(167,139,250,0.06)', icon: '📊', border: 'rgba(167,139,250,0.15)' },
  { keywords: ['suggest', 'recommend', 'improvement', 'fix', 'refactor'], color: '#22d3ee', bg: 'rgba(34,211,238,0.06)', icon: '💡', border: 'rgba(34,211,238,0.15)' },
  { keywords: ['explanation', 'breakdown', 'what this', 'step-by-step'], color: '#818cf8', bg: 'rgba(129,140,248,0.06)', icon: '📚', border: 'rgba(129,140,248,0.15)' },
  { keywords: ['fixed code', 'corrected', 'optimized code'], color: '#34d399', bg: 'rgba(52,211,153,0.06)', icon: '✅', border: 'rgba(52,211,153,0.15)' },
];

function getSectionConfig(title) {
  const lower = title.toLowerCase();
  return sectionConfig.find(c => c.keywords.some(k => lower.includes(k))) ||
    { color: 'rgba(255,255,255,0.6)', bg: 'rgba(255,255,255,0.03)', icon: '📋', border: 'rgba(255,255,255,0.08)' };
}

// ── Parse score lines: "Readability: 8/10" ────────────────────────────────
function parseScores(text) {
  const scores = [];
  const re = /[-•*]?\s*([A-Za-z\s]+?):\s*(\d{1,3})\s*\/\s*(10|100)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    scores.push({ label: m[1].trim(), val: parseInt(m[2]), max: parseInt(m[3]) });
  }
  return scores;
}

// ── Score bar ─────────────────────────────────────────────────────────────
function ScoreBar({ label, val, max }) {
  const pct = Math.round((val / max) * 100);
  const color = pct >= 80 ? '#34d399' : pct >= 60 ? '#fbbf24' : '#FB3640';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{val}/{max}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Parse inline code blocks from markdown ────────────────────────────────
function InlineMarkdown({ text }) {
  // Bold, inline code, simple rendering
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) => {
        if (p.startsWith('`') && p.endsWith('`'))
          return <code key={i} className="px-1 py-0.5 rounded text-[0.82em] font-mono"
            style={{ background: 'rgba(251,54,64,0.15)', color: '#FB3640' }}>{p.slice(1,-1)}</code>;
        if (p.startsWith('**') && p.endsWith('**'))
          return <strong key={i} style={{ color: 'rgba(255,255,255,0.9)' }}>{p.slice(2,-2)}</strong>;
        return <span key={i}>{p}</span>;
      })}
    </span>
  );
}

// ── Collapsible section card ───────────────────────────────────────────────
function SectionCard({ title, body, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const cfg = getSectionConfig(title);
  const scores = parseScores(body);
  const hasScores = scores.length > 0;

  // Detect code blocks
  const codeBlocks = [];
  const bodyNoCode = body.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) => {
    codeBlocks.push(code.trim());
    return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
  });

  const lines = bodyNoCode.split('\n').filter(l => l.trim());

  return (
    <div className="rounded-xl overflow-hidden transition-all duration-200"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      {/* Header */}
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
        <span className="text-base flex-shrink-0">{cfg.icon}</span>
        <span className="font-bold text-sm flex-1" style={{ color: cfg.color }}>{title}</span>
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>{open ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</span>
      </button>

      {/* Body */}
      {open && (
        <div className="px-4 pb-4 space-y-3">
          {/* Score bars if found */}
          {hasScores && (
            <div className="rounded-lg p-3 space-y-2.5" style={{ background: 'rgba(0,0,0,0.2)' }}>
              {scores.map(s => <ScoreBar key={s.label} {...s} />)}
            </div>
          )}

          {/* Body lines */}
          <div className="space-y-1.5">
            {lines.map((line, i) => {
              // Code block placeholder
              if (line.startsWith('___CODE_BLOCK_')) {
                const idx = parseInt(line.match(/\d+/)?.[0] ?? '0');
                return (
                  <pre key={i} className="rounded-lg p-3 overflow-x-auto text-xs font-mono leading-5"
                    style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {codeBlocks[idx]}
                  </pre>
                );
              }
              // List items
              const isBullet = /^[-•*\d+\.]/.test(line.trim());
              const clean = line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '');
              return (
                <div key={i} className={`flex gap-2.5 text-sm leading-relaxed ${isBullet ? '' : 'opacity-80'}`}>
                  {isBullet && <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: cfg.color }} />}
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <InlineMarkdown text={clean} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Parse full AI markdown response into sections ──────────────────────────
function parseResponse(content) {
  const sections = [];
  const parts = content.split(/\n(?=##\s)/);
  for (const part of parts) {
    const titleMatch = part.match(/^##\s+(.+)/);
    if (!titleMatch) {
      if (part.trim()) sections.push({ title: 'Summary', body: part.trim() });
      continue;
    }
    const title = titleMatch[1].replace(/[📋🐛🔒⚡📈🏛️🐙🔍📚]/g, '').trim();
    const subParts = part.slice(titleMatch[0].length).split(/\n(?=###\s)/);
    for (const sub of subParts) {
      const subMatch = sub.match(/^###\s+(.+)/);
      if (!subMatch) {
        if (sub.trim()) sections.push({ title, body: sub.trim() });
        continue;
      }
      const subTitle = subMatch[1].replace(/[✅⚠️🔧💡📊🚨🐛🔒⚡🏗️🔄🛡️📚❌🔎🛠️🐌🔄💾🚀]/g, '').trim();
      const body = sub.slice(subMatch[0].length).trim();
      if (body) sections.push({ title: subTitle, body });
    }
  }
  return sections;
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ResultPanel({ content, isLoading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content || '');
    setCopied(true);
    toast.success('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center justify-center gap-5 min-h-[260px]"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'rgba(251,54,64,0.2)', borderTopColor: '#FB3640' }} />
          <div className="absolute inset-2 rounded-full border border-t-transparent animate-spin"
            style={{ borderColor: 'rgba(255,255,255,0.08)', borderTopColor: 'rgba(255,255,255,0.3)', animationDirection: 'reverse', animationDuration: '0.7s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity size={14} style={{ color: '#FB3640' }} />
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold text-sm mb-1" style={{ color: '#FB3640' }}>AI is analyzing your code...</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Results in a few seconds</p>
        </div>
        <div className="w-52 space-y-2">
          {[75, 55, 85].map((w, i) => (
            <div key={i} className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="h-full rounded-full animate-pulse" style={{ width: `${w}%`, background: '#FB3640', opacity: 0.6 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center justify-center gap-3 text-center min-h-[220px]"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: 'rgba(255,255,255,0.04)' }}>🔍</div>
        <p className="font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Results appear here</p>
        <p className="text-xs max-w-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
          Paste your code above and click Analyze.
        </p>
      </div>
    );
  }

  // Handle AI rejection for non-technical input
  if (content.includes('No valid code or technical input provided')) {
    return (
      <div className="rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center border animate-fade-in"
        style={{ background: 'rgba(251,54,64,0.04)', borderColor: 'rgba(251,54,64,0.2)' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-brand text-white shadow-lg shadow-red-brand/20">
          <Activity size={24} />
        </div>
        <div className="max-w-md">
          <p className="font-bold text-lg mb-1" style={{ color: '#fff' }}>Technical Input Required</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            We couldn't find any code, project structure, or technical documentation in your input. 
            DevDoctor is specialized in technical analysis.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['Code Snippet', 'Stack Trace', 'Project Tree', 'Architecture'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/40">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sections = parseResponse(content);

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#34d399' }} />
          <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Analysis Complete — {sections.length} sections
          </span>
        </div>
        <button onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}>
          {copied ? <CheckCircle size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy raw'}
        </button>
      </div>

      {/* Structured sections */}
      <div className="p-4 space-y-2.5 overflow-auto max-h-[700px]">
        {sections.map((s, i) => (
          <SectionCard key={i} title={s.title} body={s.body} defaultOpen={i < 3} />
        ))}
      </div>
    </div>
  );
}

