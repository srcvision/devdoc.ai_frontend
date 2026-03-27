import React from 'react';
import ToolPage from '../../components/ToolPage';
import { Building2 } from 'lucide-react';

export default function ArchitectureAnalyzer() {
  return (
    <ToolPage
      title="Architecture Analyzer"
      description="Analyze your project structure for modularity, scalability, and best architectural practices"
      icon={Building2}
      iconBg="bg-gradient-to-br from-cyan-500 to-blue-600"
      apiEndpoint="/tools/architecture"
      placeholder={`# Paste your project folder structure or architecture description\nsrc/\n  components/\n    Button.jsx\n    Modal.jsx\n  pages/\n    Home.jsx\n    About.jsx\n  utils/\n    api.js\n  App.jsx\n  index.js`}
      inputLabel="Project Structure / Architecture"
      buttonLabel="Analyze Architecture"
      scoreKeys={[
        { key: 'maintainability', label: 'Maintainability' },
        { key: 'overall', label: 'Architecture Score' },
      ]}
    />
  );
}
