import React from 'react';
import ToolPage from '../../components/ToolPage';
import { Bug } from 'lucide-react';

export default function BugDetector() {
  return (
    <ToolPage
      title="Bug Detector"
      description="AI scans your code for logical bugs, runtime errors, and potential crashes"
      icon={Bug}
      iconBg="bg-gradient-to-br from-red-500 to-orange-500"
      apiEndpoint="/tools/bug-detect"
      placeholder={`// Paste code to detect bugs\nfunction divide(a, b) {\n  return a / b; // What if b is 0?\n}`}
      inputLabel="Code to Scan for Bugs"
      buttonLabel="Detect Bugs"
      scoreKeys={[{ key: 'overall', label: 'Risk Level' }]}
    />
  );
}
