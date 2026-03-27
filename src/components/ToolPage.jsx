import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import ResultPanel from './ResultPanel';
import ScoreChart from './ScoreChart';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Sparkles, Eraser } from 'lucide-react';

export default function ToolPage({
  title, description, icon: Icon, iconBg,
  apiEndpoint, placeholder, inputLabel, buttonLabel = 'Analyze',
  scoreKeys = [],
}) {
  const [code, setCode]       = useState('');
  const [result, setResult]   = useState(null);
  const [score, setScore]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) { toast.error('Paste some code first'); return; }
    setLoading(true); setResult(null); setScore(null);
    try {
      const { data } = await api.post(apiEndpoint, { code });
      setResult(data.aiResponse);
      setScore(data.score || null);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Analysis failed. Check your API key.');
    } finally { setLoading(false); }
  };

  const handleClear = () => { setCode(''); setResult(null); setScore(null); };

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Header */}
      <div className="tool-header">
        <div className={`tool-icon-wrapper ${iconBg}`} style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
          <Icon size={22} />
        </div>
        <div>
          <h1 className="text-xl font-black" style={{ color: '#fff' }}>{title}</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{description}</p>
        </div>
      </div>

      {/* Score charts */}
      {score && scoreKeys.length > 0 && (
        <div className="rounded-2xl p-6 animate-fade-in" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>Analysis Scores</p>
          <div className="flex flex-wrap gap-8 justify-center">
            {scoreKeys.map(({ key, label }) =>
              score[key] != null && <ScoreChart key={key} label={label} score={score[key]} />
            )}
          </div>
        </div>
      )}

      {/* Editor */}
      <div>
        <CodeEditor value={code} onChange={setCode} placeholder={placeholder} label={inputLabel || title} />
        <div className="flex items-center gap-3 mt-4">
          <button onClick={handleSubmit} disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
            style={{ background: '#FB3640', color: '#fff', boxShadow: '0 4px 16px rgba(251,54,64,0.3)' }}
            onMouseEnter={e => !loading && (e.currentTarget.style.background = '#D62B34')}
            onMouseLeave={e => e.currentTarget.style.background = '#FB3640'}>
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Analyzing...</>
            ) : (
              <><Sparkles size={15} />{buttonLabel}</>
            )}
          </button>
          <button onClick={handleClear} disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
            <Eraser size={14} /> Clear
          </button>
          <span className="text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.2)' }}>AI-powered analysis</span>
        </div>
      </div>

      {/* Result */}
      <ResultPanel content={result} isLoading={loading} />
    </div>
  );
}
