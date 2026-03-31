import React, { useState } from 'react';

const LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'go', 'rust', 'php', 'cpp', 'c', 'ruby', 'swift', 'plaintext'];

export default function CodeEditor({ value, onChange, placeholder = 'Paste your code here...', label, minRows = 14 }) {
  const [lang, setLang] = useState('javascript');
  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value?.length || 0;

  return (
    <div className="overflow-hidden rounded-2xl" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5"
        style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FB3640' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fbbf24' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#34d399' }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>{label || 'Code Input'}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {lineCount} ln · {charCount} ch
          </span>
          
        </div>
      </div>

      {/* Editor area */}
      <div className="relative flex" style={{ minHeight: `${Math.max(lineCount + 2, minRows) * 24}px` }}>
        {/* Line numbers */}
        <div className="flex flex-col items-end pt-4 px-3 select-none pointer-events-none flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.01)', borderRight: '1px solid rgba(255,255,255,0.04)', minWidth: 40 }}>
          {Array.from({ length: Math.max(lineCount + 2, minRows) }, (_, i) => (
            <span key={i} className="font-mono leading-6 text-[11px]"
              style={{ color: 'rgba(255,255,255,0.15)', lineHeight: '24px' }}>{i + 1}</span>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={Math.max(lineCount + 2, minRows)}
          spellCheck={false}
          className="flex-1 px-4 py-4 font-mono text-sm leading-6 resize-none focus:outline-none"
          style={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.82)',
            caretColor: '#FB3640',
          }}
        />
      </div>
    </div>
  );
}
