import api from './api';

/**
 * Admin Service for AdmitAI Administrative & Counseling Portal
 */

export async function getAdminOverview() {
  const response = await api.get('/admin/overview');
  return response.data;
}

export async function getStudents(filters = {}) {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== 'All') params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);

  const response = await api.get(`/admin/students?${params.toString()}`);
  return response.data;
}

export async function getStudentDetails(id) {
  const response = await api.get(`/admin/students/${id}`);
  return response.data;
}

export async function updateStudentStatus(id, status, remarks = '') {
  const response = await api.patch(`/admin/students/${id}/status`, { status, remarks });
  return response.data;
}

export async function getActiveSessions() {
  const response = await api.get('/admin/active-sessions');
  return response.data;
}

export async function getMessages(filters = {}) {
  const params = new URLSearchParams();
  if (filters.channel && filters.channel !== 'All') params.append('channel', filters.channel);
  if (filters.status && filters.status !== 'All') params.append('status', filters.status);

  const response = await api.get(`/admin/messages?${params.toString()}`);
  return response.data;
}

export async function replyToMessage(id, replyText, counselorName = 'Dr. S. K. Patnaik') {
  const response = await api.post(`/admin/messages/${id}/reply`, { replyText, counselorName });
  return response.data;
}

export async function getDocuments(filters = {}) {
  const params = new URLSearchParams();
  if (filters.studentId && filters.studentId !== 'All') params.append('studentId', filters.studentId);
  if (filters.status && filters.status !== 'All') params.append('status', filters.status);
  if (filters.category && filters.category !== 'All') params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);

  const response = await api.get(`/admin/documents?${params.toString()}`);
  return response.data;
}

export async function getDocumentDetails(id) {
  const response = await api.get(`/admin/documents/${id}`);
  return response.data;
}

export async function verifyDocument(id, status, remarks = '', counselorName = 'Dr. S. K. Patnaik') {
  const response = await api.patch(`/admin/documents/${id}/verify`, { status, remarks, counselorName });
  return response.data;
}

export default {
  getAdminOverview,
  getStudents,
  getStudentDetails,
  updateStudentStatus,
  getActiveSessions,
  getMessages,
  replyToMessage,
  getDocuments,
  getDocumentDetails,
  verifyDocument
};
