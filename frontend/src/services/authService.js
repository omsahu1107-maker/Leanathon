import api from './api';

/**
 * Authentication Service for AdmitAI (Student & Staff Portal)
 */
export async function login(credentials) {
  const response = await api.post('/auth/login', credentials);
  if (response.token) {
    localStorage.setItem('admitai_token', response.token);
  }
  return response;
}

export async function register(studentData) {
  const response = await api.post('/auth/register', studentData);
  if (response.token) {
    localStorage.setItem('admitai_token', response.token);
  }
  return response;
}

export async function getCurrentUser() {
  const response = await api.get('/auth/me');
  return response.user;
}

export function logout() {
  localStorage.removeItem('admitai_token');
  localStorage.removeItem('admitai_user');
}

export default {
  login,
  register,
  getCurrentUser,
  logout
};
