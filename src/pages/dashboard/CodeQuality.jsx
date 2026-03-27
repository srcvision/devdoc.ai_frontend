import React from 'react';
import ToolPage from '../../components/ToolPage';
import { Star } from 'lucide-react';

export default function CodeQuality() {
  return (
    <ToolPage
      title="Code Quality Analyzer"
      description="Score your code on readability, maintainability, complexity, and overall quality"
      icon={Star}
      iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
      apiEndpoint="/tools/code-quality"
      placeholder={`// Paste code for quality analysis\nfunction processUsers(data) {\n  var result = [];\n  for(var i=0;i<data.length;i++){\n    if(data[i].age>18){result.push(data[i]);}\n  }\n  return result;\n}`}
      inputLabel="Code to Quality-Score"
      buttonLabel="Score Quality"
      scoreKeys={[
        { key: 'readability', label: 'Readability' },
        { key: 'maintainability', label: 'Maintainability' },
        { key: 'complexity', label: 'Complexity' },
        { key: 'overall', label: 'Overall Quality' },
      ]}
    />
  );
}
