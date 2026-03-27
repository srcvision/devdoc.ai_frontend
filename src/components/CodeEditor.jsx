import React, { useState } from 'react';

const LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'go', 'rust', 'php', 'cpp', 'plaintext'];

export default function CodeEditor({ value, onChange, placeholder = 'Paste your code here...', label, minRows = 16 }) {
  const [lang, setLang] = useState('javascript');
  const [wordCount] = useState(() => value?.split(/\s+/).filter(Boolean).length || 0);

  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value ? value.length : 0;

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-surface-900">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label || 'Code Editor'}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{lineCount} lines · {charCount} chars</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-xs bg-gray-100 dark:bg-surface-800 border border-gray-200 dark:border-gray-700 
                       rounded-lg px-2 py-1 text-gray-600 dark:text-gray-300 
                       focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col items-end pt-4 pr-2 border-r border-gray-100 dark:border-gray-700/30 select-none pointer-events-none overflow-hidden">
          {Array.from({ length: Math.max(lineCount, minRows) }, (_, i) => (
            <span key={i} className="text-xs text-gray-300 dark:text-gray-600 leading-6 font-mono">{i + 1}</span>
          ))}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={Math.max(lineCount + 2, minRows)}
          spellCheck={false}
          className="w-full pl-14 pr-4 py-4 bg-white dark:bg-surface-950 
                     text-gray-900 dark:text-gray-100 font-mono text-sm leading-6
                     resize-none focus:outline-none focus:ring-0
                     placeholder-gray-300 dark:placeholder-gray-700"
        />
      </div>
    </div>
  );
}
