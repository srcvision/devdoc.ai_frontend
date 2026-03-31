import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import ResultPanel from '../../components/ResultPanel';
import {
  Code2, Bug, ShieldCheck, Zap, Star, Building2,
  Github, Terminal, BookOpen, Clock, ArrowRight,
  Search, Filter, Activity, Trash2, ChevronDown
} from 'lucide-react';

const tools = [
  { id: 'code-review',  label: 'Code Review',   icon: Code2,       color: '#60a5fa' },
  { id: 'bug-detector', label: 'Bug Detect',  icon: Bug,         color: '#FB3640' },
  { id: 'security',     label: 'Security',      icon: ShieldCheck, color: '#34d399' },
  { id: 'performance',  label: 'Performance',   icon: Zap,         color: '#fbbf24' },
  { id: 'code-quality', label: 'Code Quality',  icon: Star,        color: '#a78bfa' },
  { id: 'architecture', label: 'Architecture',  icon: Building2,   color: '#22d3ee' },
  { id: 'github',       label: 'GitHub Repo',   icon: Github,      color: '#f9fafb' },
  { id: 'debug',        label: 'Debug',         icon: Terminal,    color: '#f472b6' },
  { id: 'explain',      label: 'Explainer',     icon: BookOpen,    color: '#818cf8' },
];

export default function ReportHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTool, setFilterTool] = useState('all');
  const [deleting, setDeleting] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/tools/reports');
      setReports(Array.isArray(data) ? data : (data.reports || []));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete button clicked for ID:', id);
    if (window.confirm('Are you sure you want to delete this report?')) {
      console.log('User confirmed deletion for:', id);
      setDeleting(id);
      try {
        console.log('Calling API: DELETE', `/tools/reports/${id}`);
        const response = await api.delete(`/tools/reports/${id}`);
        console.log('API Response:', response.data);
        setReports(r => r.filter(rep => rep._id !== id));
        if (selected?._id === id) setSelected(null);
        console.log('Report removed from state.');
      } catch (err) {
        console.error('Delete API Error:', err);
        setError(err.response?.data?.error || 'Failed to delete report');
      } finally {
        setDeleting(null);
      }
    } else {
      console.log('User cancelled deletion.');
    }
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch =
      (r.language || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.toolType || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTool = filterTool === 'all' || r.toolType === filterTool;
    return matchesSearch && matchesTool;
  });

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">History</h1>
          <p className="text-white/60">View past analysis reports and recommendations.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search by language or tool..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white focus:outline-none focus:border-red-brand/50 focus:ring-1 focus:ring-red-brand/50 transition-colors shadow-lg"
          />
        </div>
        <div className="relative flex-shrink-0 min-w-[200px]">
          <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <select
            value={filterTool}
            onChange={e => setFilterTool(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-red-brand/50 focus:ring-1 focus:ring-red-brand/50 transition-colors cursor-pointer shadow-lg"
          >
            <option value="all" className="bg-[#0a0a0a]">All Tools</option>
            {tools.map(t => (
              <option key={t.id} value={t.id} className="bg-[#0a0a0a]">{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-8 bg-red-brand/10 border border-red-brand/20 text-red-brand rounded-xl">
          {error}
        </div>
      )}

      {/* List */}
      <div className="grid gap-4">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#050505] border border-white/10 rounded-2xl p-6 h-32 animate-pulse" />
          ))
        ) : filteredReports.length > 0 ? (
          filteredReports.map(r => {
            const t = tools.find(tool => r.toolType.includes(tool.id)) || { label: r.toolType, icon: Activity, color: '#FB3640' };
            const Icon = t.icon;
            const isSelected = selected?._id === r._id;
            
            return (
              <div 
                key={r._id} 
                onClick={() => setSelected(isSelected ? null : r)}
                className={`group block bg-[#050505] border rounded-2xl p-6 transition-all shadow-lg cursor-pointer ${isSelected ? 'border-white/20 bg-white/[0.04]' : 'border-white/10 hover:bg-white/[0.04] hover:border-white/20'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Icon & title */}
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                      style={{ background: `${t.color}15`, color: t.color }}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[var(--color)] transition-colors mb-1" style={{ '--color': t.color }}>
                        {t.label}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-white/50">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock size={14} />
                          {new Date(r.createdAt).toLocaleString()}
                        </span>
                        {r.language && (
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-black uppercase tracking-widest text-white">
                            {r.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Context snippet & Score */}
                  <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
                    <div className="flex items-center gap-4">
                      {r.score?.overall != null && (
                        <div className="flex items-baseline gap-1" style={{ color: t.color }}>
                          <span className="text-3xl font-black">{r.score.overall}</span>
                          <span className="text-sm font-bold opacity-50">/10</span>
                        </div>
                      )}
                      
                      <button
                        onClick={(e) => handleDelete(r._id, e)}
                        disabled={deleting === r._id}
                        className="p-2 rounded-lg bg-red-brand/10 hover:bg-red-brand/20 text-red-brand transition-colors shadow-lg ml-2"
                        title="Delete Report"
                      >
                        {deleting === r._id ? (
                           <span className="w-5 h-5 border-2 border-red-brand border-t-transparent rounded-full animate-spin block" />
                        ) : (
                           <Trash2 size={20} />
                        )}
                      </button>
                    </div>

                    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                      {isSelected ? 'Hide details' : 'View full report'} 
                      <ChevronDown size={16} className={`transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isSelected && (
                  <div className="mt-8 pt-6 border-t border-white/10 animate-fade-in cursor-default" onClick={e => e.stopPropagation()}>
                    {r.inputCode && (
                      <div className="mb-6">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-white/30">Input Context</p>
                        <pre className="rounded-xl p-5 text-[13px] font-mono overflow-x-auto whitespace-pre-wrap border border-white/5 bg-white/[0.02] text-white/70 max-h-[300px] custom-scrollbar">
                          {r.inputCode}
                        </pre>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest mb-3 text-white/30">AI Analysis Report</p>
                      <div className="bg-[#000000] border border-white/5 rounded-xl overflow-hidden p-6 ring-1 ring-white/5">
                        <ResultPanel content={r.aiResponse} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="text-center py-24 bg-[#050505] border border-white/10 rounded-3xl shadow-lg">
            <Activity size={48} className="mx-auto text-white/20 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No reports found</h3>
            <p className="text-white/50">Try running an analysis using one of the tools in the sidebar.</p>
          </div>
        )}
      </div>

    </div>
  );
}
