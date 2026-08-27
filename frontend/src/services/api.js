import axios from 'axios';

/**
 * AdmitAI API Client
 * Base URL: VITE_API_URL (defaults to /api for production proxy, or http://localhost:5000/api in dev)
 *
 * IMPORTANT: This interceptor does NOT unwrap response.data automatically.
 * Each service is responsible for extracting the `data` field from the API response
 * shape: { success: true, data: [...], count: N }
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admitai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — return full response.data ({ success, data, count, message })
// Services will extract the nested .data field themselves
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    console.error('[AdmitAI API Error]', message);
    return Promise.reject(new Error(message));
  }
);

export default api;
