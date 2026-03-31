import axios from 'axios';

// ── Smart baseURL: uses local backend in development, Render in production ──
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Inject token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('devdoc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally (token expired / invalid → force re-login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('devdoc_token');
      localStorage.removeItem('devdoc_user');
      localStorage.removeItem('devdoc_token_expiry');
      window.location.href = '/login?reason=session_expired';
    }
    return Promise.reject(error);
  }
);

export default api;
