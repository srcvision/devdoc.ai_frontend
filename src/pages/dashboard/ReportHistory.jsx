import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { History, Trash2, ExternalLink, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const toolColors = {
  'code-review': 'badge-info', 'bug-detect': 'badge-danger', 'security-scan': 'badge-success',
  'performance': 'badge-warning', 'code-quality': 'badge-brand', 'architecture': 'badge-info',
  'github-analyze': 'badge', 'debug': 'badge-danger', 'explain': 'badge-brand',
};

const toolLabels = {
  'code-review': 'Code Review', 'bug-detect': 'Bug Detect', 'security-scan': 'Security',
  'performance': 'Performance', 'code-quality': 'Quality', 'architecture': 'Architecture',
  'github-analyze': 'GitHub', 'debug': 'Debug', 'explain': 'Explain',
};

export default function ReportHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterTool, setFilterTool] = useState('all');
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    api.get('/tools/reports').then(({ data }) => setReports(data)).catch(() => toast.error('Failed to load reports')).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await api.delete(`/tools/reports/${id}`);
      setReports((r) => r.filter((rep) => rep._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Report deleted');
    } catch {
      toast.error('Failed to delete report');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = reports.filter((r) => {
    const matchTool = filterTool === 'all' || r.toolType === filterTool;
    const matchSearch = !search || r.inputCode.toLowerCase().includes(search.toLowerCase()) || (toolLabels[r.toolType] || '').toLowerCase().includes(search.toLowerCase());
    return matchTool && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="tool-header">
        <div className="tool-icon-wrapper bg-gradient-to-br from-teal-500 to-cyan-600">
          <History size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Report History</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">All your previous AI analysis reports. Click any entry to view the full result.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reports..." className="input pl-9 h-10 bg-black text-sm" />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select value={filterTool} onChange={(e) => setFilterTool(e.target.value)} className="text-slate-100 input pl-9 h-10 bg-black text-sm w-48">
            <option value="all">All Tools</option>
            {Object.entries(toolLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="card p-12 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl dark:bg-surface-800 flex items-center justify-center text-3xl">📋</div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">No reports found</p>
          <p className="text-gray-400 text-sm">Run an analysis using any AI tool to see reports here</p>
          <Link to="/dashboard/code-review" className="btn-primary mt-2">Start first analysis</Link>
        </div>
      ) : (
        <div className={`grid gap-4 ${selected ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Report list */}
          <div className="card overflow-hidden">
            <div className="divide-y divide-gray-50 dark:divide-gray-700/30">
              {filtered.map((r) => (
                <div
                  key={r._id}
                  onClick={() => setSelected(r._id === selected?._id ? null : r)}
                  className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-black bg-ink transition-colors ${selected?._id === r._id ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge ${toolColors[r.toolType] || 'badge-info'} text-[10px]`}>{toolLabels[r.toolType] || r.toolType}</span>
                      {r.language && <span className="text-[10px] text-gray-400">{r.language}</span>}
                      {r.score?.overall && <span className="badge badge-success text-[10px] ml-auto">Score: {r.score.overall}/10</span>}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate font-mono">
                      {r.inputCode.slice(0, 80)}...
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={(e) => { e.stopPropagation(); setSelected(r); }} className="btn-ghost py-1.5 px-2 text-xs" title="View">
                      <ExternalLink size={13} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(r._id); }}
                      disabled={deleting === r._id}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-colors"
                      title="Delete"
                    >
                      {deleting === r._id ? <span className="w-3.5 h-3.5 border-2 border-red-400 border-t-transparent rounded-full animate-spin block" /> : <Trash2 size={13} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected report detail */}
          {selected && (
            <div className="card overflow-hidden animate-fade-in">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`badge ${toolColors[selected.toolType] || 'badge-info'}`}>{toolLabels[selected.toolType]}</span>
                  <span className="text-xs text-gray-400">{new Date(selected.createdAt).toLocaleString()}</span>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xs">✕ Close</button>
              </div>
              <div className="p-5 overflow-y-auto max-h-[600px]">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Input</p>
                  <pre className="bg-gray-50 dark:bg-surface-950 rounded-xl p-4 text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {selected.inputCode.slice(0, 500)}{selected.inputCode.length > 500 ? '...' : ''}
                  </pre>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">AI Response</p>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-xs">
                    {selected.aiResponse.slice(0, 1500)}{selected.aiResponse.length > 1500 ? '...' : ''}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
