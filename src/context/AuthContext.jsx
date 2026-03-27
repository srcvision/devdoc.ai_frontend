import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY    = 'devdoc_token';
const USER_KEY     = 'devdoc_user';
const EXPIRY_KEY   = 'devdoc_token_expiry';
const SESSION_MS   = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [token, setToken]     = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef              = useRef(null);

  // ── Hard logout that clears everything ─────────────────────
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // ── Schedule auto-logout at expiry time ────────────────────
  const scheduleAutoLogout = (expiresAt) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const remaining = expiresAt - Date.now();
    if (remaining <= 0) {
      logout();
      return;
    }
    timerRef.current = setTimeout(() => {
      logout();
      // Redirect to login with a friendly message hint
      window.location.href = '/login?reason=session_expired';
    }, remaining);
  };

  // ── Restore session on page load ───────────────────────────
  useEffect(() => {
    const storedToken  = localStorage.getItem(TOKEN_KEY);
    const storedUser   = localStorage.getItem(USER_KEY);
    const storedExpiry = localStorage.getItem(EXPIRY_KEY);

    if (storedToken && storedUser && storedExpiry) {
      const expiresAt = parseInt(storedExpiry, 10);
      if (Date.now() < expiresAt) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        scheduleAutoLogout(expiresAt);
      } else {
        // Already expired — clear silently
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(EXPIRY_KEY);
      }
    }
    setLoading(false);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Login: store session with 3h expiry timestamp ─────────
  const login = (userData, tokenData) => {
    const expiresAt = Date.now() + SESSION_MS;
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem(TOKEN_KEY,   tokenData);
    localStorage.setItem(USER_KEY,    JSON.stringify(userData));
    localStorage.setItem(EXPIRY_KEY,  String(expiresAt));
    scheduleAutoLogout(expiresAt);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
