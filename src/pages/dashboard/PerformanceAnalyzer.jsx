import React from 'react';
import ToolPage from '../../components/ToolPage';
import { Zap } from 'lucide-react';

export default function PerformanceAnalyzer() {
  return (
    <ToolPage
      title="Performance Analyzer"
      description="Identify slow operations, inefficient loops, and memory-heavy logic in your code"
      icon={Zap}
      iconBg="bg-gradient-to-br from-yellow-500 to-orange-500"
      apiEndpoint="/tools/performance"
      placeholder={`// Paste code to analyze for performance issues\nfor (let i = 0; i < data.length; i++) {\n  for (let j = 0; j < data.length; j++) {\n    process(data[i], data[j]);\n  }\n}`}
      inputLabel="Code to Performance-Test"
      buttonLabel="Analyze Performance"
      scoreKeys={[{ key: 'performance', label: 'Performance Score' }, { key: 'overall', label: 'Overall' }]}
    />
  );
}
