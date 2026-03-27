import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
      <div className="rounded-2xl p-10 flex flex-col items-center justify-center gap-5 min-h-[280px]"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(251,54,64,0.3)', borderTopColor: '#FB3640' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin animation-reverse" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.4)', animationDirection: 'reverse' }} />
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold text-sm mb-1" style={{ color: '#FB3640' }}>Running AI analysis...</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>This may take a few seconds</p>
        </div>
        <div className="w-56 space-y-2">
          {[65, 85, 50].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-full rounded-full animate-pulse" style={{ width: `${w}%`, background: 'linear-gradient(90deg, #FB3640, #D62B34)' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center justify-center gap-3 text-center min-h-[240px]"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>🔍</div>
        <p className="font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Results appear here</p>
        <p className="text-xs max-w-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Paste your code above and click Analyze to get AI-powered insights.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#FB3640' }} />
          <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>Analysis Complete</span>
        </div>
        <button onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}>
          {copied ? <CheckCircle size={13} className="text-green-400" /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Markdown content */}
      <div className="p-6 overflow-auto max-h-[700px]">
        <div className="prose prose-sm max-w-none
          prose-headings:text-white prose-h2:text-base prose-h2:font-bold prose-h2:mt-5 prose-h2:mb-2
          prose-h3:text-sm prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-1.5
          prose-p:leading-relaxed prose-li:leading-relaxed
          prose-code:rounded-md prose-code:text-[0.8em] prose-code:before:content-none prose-code:after:content-none
          prose-pre:rounded-xl prose-pre:overflow-x-auto
          prose-hr:border-white/10 prose-blockquote:rounded-r-lg prose-blockquote:py-1"
          style={{
            '--tw-prose-body': 'rgba(255,255,255,0.65)',
            '--tw-prose-bold': 'rgba(255,255,255,0.9)',
            '--tw-prose-bullets': 'rgba(255,255,255,0.35)',
            '--tw-prose-quotes': 'rgba(255,255,255,0.5)',
            '--tw-prose-code': '#FB3640',
            '--tw-prose-pre-bg': 'rgba(0,0,0,0.4)',
            '--tw-prose-pre-code': 'rgba(255,255,255,0.75)',
          }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}
            components={{ pre: ({ children }) => <pre className="overflow-x-auto">{children}</pre> }}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
