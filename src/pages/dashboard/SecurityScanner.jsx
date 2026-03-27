import React from 'react';
import ToolPage from '../../components/ToolPage';
import { ShieldCheck } from 'lucide-react';

export default function SecurityScanner() {
  return (
    <ToolPage
      title="Security Scanner"
      description="Detect vulnerabilities, injection risks, insecure patterns, and unsafe dependencies"
      icon={ShieldCheck}
      iconBg="bg-gradient-to-br from-emerald-500 to-teal-500"
      apiEndpoint="/tools/security-scan"
      placeholder={`// Paste code to scan for security vulnerabilities\nconst query = "SELECT * FROM users WHERE id = " + userId;`}
      inputLabel="Code to Security Scan"
      buttonLabel="Run Security Scan"
      scoreKeys={[
        { key: 'security', label: 'Security Score' },
        { key: 'overall', label: 'Overall' },
      ]}
    />
  );
}
