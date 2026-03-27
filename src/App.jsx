import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Public pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';

// Dashboard pages
import Overview from './pages/dashboard/Overview';
import CodeReview from './pages/dashboard/CodeReview';
import BugDetector from './pages/dashboard/BugDetector';
import SecurityScanner from './pages/dashboard/SecurityScanner';
import PerformanceAnalyzer from './pages/dashboard/PerformanceAnalyzer';
import CodeQuality from './pages/dashboard/CodeQuality';
import ArchitectureAnalyzer from './pages/dashboard/ArchitectureAnalyzer';
import GitHubAnalyzer from './pages/dashboard/GitHubAnalyzer';
import DebugAssistant from './pages/dashboard/DebugAssistant';
import CodeExplainer from './pages/dashboard/CodeExplainer';
import ReportHistory from './pages/dashboard/ReportHistory';

function AppContent() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '!bg-white dark:!bg-surface-800 !text-gray-900 dark:!text-white !border !border-gray-200 dark:!border-gray-700 !rounded-xl !shadow-xl',
          duration: 4000,
        }}
      />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<Documentation />} />

        {/* Dashboard (protected) */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Overview />} />
          <Route path="code-review" element={<CodeReview />} />
          <Route path="bug-detector" element={<BugDetector />} />
          <Route path="security" element={<SecurityScanner />} />
          <Route path="performance" element={<PerformanceAnalyzer />} />
          <Route path="code-quality" element={<CodeQuality />} />
          <Route path="architecture" element={<ArchitectureAnalyzer />} />
          <Route path="github" element={<GitHubAnalyzer />} />
          <Route path="debug" element={<DebugAssistant />} />
          <Route path="explain" element={<CodeExplainer />} />
          <Route path="history" element={<ReportHistory />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

