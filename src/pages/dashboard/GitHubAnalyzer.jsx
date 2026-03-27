import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import ResultPanel from '../../components/ResultPanel';
import ScoreChart from '../../components/ScoreChart';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function GitHubAnalyzer() {
  const [repoUrl, setRepoUrl] = useState('');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(null);
  const [repoInfo, setRepoInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      toast.error('Please enter a GitHub repository URL');
      return;
    }
    if (!repoUrl.includes('github.com')) {
      toast.error('Please enter a valid GitHub URL (e.g., https://github.com/owner/repo)');
      return;
    }
    setLoading(true);
    setResult(null);
    setScore(null);
    setRepoInfo(null);
    try {
      const { data } = await api.post('/tools/github-analyze', { repoUrl });
      setResult(data.aiResponse);
      setScore(data.score || null);
      setRepoInfo(data.repoInfo || null);
      toast.success('Repository analyzed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to analyze repository. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="tool-header">
        <div className="tool-icon-wrapper bg-gradient-to-br from-gray-700 to-gray-900">
          <Github size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">GitHub Repository Analyzer</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">AI analyzes your entire GitHub repo – code quality, architecture, bugs, and performance</p>
        </div>
      </div>

      {/* URL Input */}
      <div className="card p-6 space-y-4 bg-black">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          GitHub Repository URL
        </label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="https://github.com/facebook/react"
              className="input pl-9 bg-ink text-slate-200"
            />
          </div>
          <button onClick={handleAnalyze} disabled={loading} className="btn-primary flex-shrink-0">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Analyzing...</>
            ) : '✨ Analyze Repo'}
          </button>
        </div>
        <p className="text-xs text-gray-400">The backend fetches repository files via the GitHub API and sends them to Gemini AI for analysis.</p>

        {/* Examples */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-400">Try:</span>
          {['https://github.com/expressjs/express', 'https://github.com/axios/axios'].map((url) => (
            <button key={url} onClick={() => setRepoUrl(url)}
              className="text-xs px-2 py-1 rounded-lg bg-gray-100 dark:bg-surface-800 text-brand-600 dark:text-brand-400 hover:bg-brand-50 transition-colors">
              {url.replace('https://github.com/', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Repo Info card */}
      {repoInfo && (
        <div className="card p-5 animate-fade-in">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Github size={16} className="text-gray-500" />
                <span className="font-bold text-gray-900 dark:text-white">{repoInfo.full_name}</span>
                <a href={repoInfo.html_url} target="_blank" rel="noreferrer" className="text-brand-500 hover:text-brand-600">
                  <ExternalLink size={13} />
                </a>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{repoInfo.description}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            {[['Language', repoInfo.language], ['⭐ Stars', repoInfo.stargazers_count?.toLocaleString()], ['🍴 Forks', repoInfo.forks_count?.toLocaleString()], ['Issues', repoInfo.open_issues_count]].map(([label, val]) => (
              <div key={label}>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{val || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scores */}
      {score && (
        <div className="card p-6 animate-fade-in">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-5">Repository Scores</h3>
          <div className="flex flex-wrap gap-8 justify-center">
            {[['overall', 'Overall'], ['security', 'Security'], ['performance', 'Performance']].map(([key, label]) =>
              score[key] != null ? <ScoreChart key={key} label={label} score={score[key]} /> : null
            )}
          </div>
        </div>
      )}

      <ResultPanel content={result} isLoading={loading} />
    </div>
  );
}
