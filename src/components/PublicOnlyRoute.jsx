import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps public-only pages (Login, Register).
 * If the user is already authenticated → redirect to /dashboard.
 */
export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#000F08' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'rgba(251,54,64,0.3)', borderTopColor: '#FB3640' }} />
          <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>Loading devdoc.ai...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}
