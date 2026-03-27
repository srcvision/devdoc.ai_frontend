import React from 'react';
import ToolPage from '../../components/ToolPage';
import { BookOpen } from 'lucide-react';

export default function CodeExplainer() {
  return (
    <ToolPage
      title="Code Explanation Tool"
      description="AI explains any code snippet step-by-step in simple, easy-to-understand language"
      icon={BookOpen}
      iconBg="bg-gradient-to-br from-indigo-500 to-blue-600"
      apiEndpoint="/tools/explain"
      placeholder={`// Paste any code you want explained\nconst debounce = (fn, delay) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n};`}
      inputLabel="Code to Explain"
      buttonLabel="Explain Code"
    />
  );
}
