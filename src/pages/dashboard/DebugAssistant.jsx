import React from 'react';
import ToolPage from '../../components/ToolPage';
import { Terminal } from 'lucide-react';

export default function DebugAssistant() {
  return (
    <ToolPage
      title="AI Debug Assistant"
      description="Paste an error message or stack trace and get root cause analysis with step-by-step fix"
      icon={Terminal}
      iconBg="bg-gradient-to-br from-pink-500 to-rose-600"
      apiEndpoint="/tools/debug"
      placeholder={`# Paste your error message or stack trace here\nTypeError: Cannot read properties of undefined (reading 'map')\n    at Dashboard (Dashboard.jsx:24:21)\n    at renderWithHooks (react-dom.development.js:14985)\n    at mountIndeterminateComponent (react-dom.development.js:17811)`}
      inputLabel="Error Message / Stack Trace"
      buttonLabel="Debug Error"
    />
  );
}
