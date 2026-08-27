import api from './api';

/**
 * Application Service — connects to backend REST API
 * Backend response shape: { success: true, data: { ...applicationObject } }
 */

export async function getApplication(id = 'ADM-2026-8941') {
  const response = await api.get(`/applications/${id}`);
  return response.data; // application object
}

export async function saveApplication(data, id = 'ADM-2026-8941') {
  const response = await api.put(`/applications/${id}`, data);
  return response.data; // updated application object
}

export async function submitApplication(id = 'ADM-2026-8941') {
  const response = await api.post(`/applications/${id}/submit`);
  return response.data; // submitted application object
}

export default {
  getApplication,
  saveApplication,
  submitApplication
};
