import axios from 'axios';
 

const api = axios.create({
  baseURL: "https://devdoc-ai-backend-2346.onrender.com/api",
  headers: { 'Content-Type': 'application/json' },
});

// Inject token on every request (updated key: devdoc_token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('devdoc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally (token expired or invalid → force re-login)
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
