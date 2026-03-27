import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading DevDoctor...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
