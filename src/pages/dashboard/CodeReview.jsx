import React from 'react';
import ToolPage from '../../components/ToolPage';
import { Code2 } from 'lucide-react';

export default function CodeReview() {
  return (
    <ToolPage
      title="Code Review"
      description="Get comprehensive AI-powered code review with readability, best practices, and improvement suggestions"
      icon={Code2}
      iconBg="bg-gradient-to-br from-blue-500 to-cyan-500"
      apiEndpoint="/tools/code-review"
      placeholder={`// Paste your code here for review\nfunction example() {\n  var x = 1\n  var y = 2\n  return x+y\n}`}
      inputLabel="Code to Review"
      buttonLabel="Start Review"
      scoreKeys={[
        { key: 'readability', label: 'Readability' },
        { key: 'maintainability', label: 'Maintainability' },
        { key: 'overall', label: 'Overall' },
      ]}
    />
  );
}
