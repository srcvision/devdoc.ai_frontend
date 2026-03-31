import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import ResultPanel from './ResultPanel';
import ScoreChart from './ScoreChart';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Sparkles, Eraser, CornerDownLeft } from 'lucide-react';

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
      toast.error(err.response?.data?.message || 'Analysis failed. Try again.');
    } finally { setLoading(false); }
  };

  const handleClear = () => { setCode(''); setResult(null); setScore(null); };

  return (
    <div className="space-y-4 animate-fade-in pb-8">

      {/* Tool header */}
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${iconBg}`}
          style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}>
          <Icon size={20} />
        </div>
        <div>
          <h1 className="text-lg font-black" style={{ color: '#fff' }}>{title}</h1>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{description}</p>
        </div>
      </div>

      {/* Score charts (legacy prop support) */}
      {score && scoreKeys.length > 0 && (
        <div className="rounded-2xl p-5 animate-fade-in"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-4"
            style={{ color: 'rgba(255,255,255,0.25)' }}>Scores</p>
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

        {/* Actions */}
        <div className="flex items-center gap-2.5 mt-3.5">
          <button onClick={handleSubmit} disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 disabled:opacity-40"
            style={{ background: '#FB3640', color: '#fff', boxShadow: '0 4px 16px rgba(251,54,64,0.3)' }}
            onMouseEnter={e => !loading && (e.currentTarget.style.background = '#D62B34')}
            onMouseLeave={e => (e.currentTarget.style.background = '#FB3640')}>
            {loading ? (
              <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...</>
            ) : (
              <><Sparkles size={14} />{buttonLabel}</>
            )}
          </button>

          <button onClick={handleClear} disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}>
            <Eraser size={13} /> Clear
          </button>

          <span className="text-[10px] ml-auto flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.15)' }}>
            <CornerDownLeft size={10} /> Analyze with AI
          </span>
        </div>
      </div>

      {/* Structured result */}
      <ResultPanel content={result} isLoading={loading} />
    </div>
  );
}
