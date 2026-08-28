import api from './api';
import { mockApplication } from '../data/mockData';

/**
 * Application Service — connects to backend REST API with localStorage fallback
 */
export async function getApplication(id = 'ADM-2026-8941') {
  try {
    const response = await api.get(`/applications/${id}`);
    if (response && response.data) {
      localStorage.setItem('admitai_application', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.warn('[ApplicationService] Backend offline, returning client fallback application:', error.message);
  }

  const cached = localStorage.getItem('admitai_application');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return mockApplication;
}

export async function saveApplication(data, id = 'ADM-2026-8941') {
  try {
    const response = await api.put(`/applications/${id}`, data);
    if (response && response.data) {
      localStorage.setItem('admitai_application', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.warn('[ApplicationService] Backend offline, saving application to localStorage:', error.message);
  }

  const existing = await getApplication(id);
  const updated = {
    ...existing,
    ...data,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem('admitai_application', JSON.stringify(updated));
  return updated;
}

export async function submitApplication(id = 'ADM-2026-8941') {
  try {
    const response = await api.post(`/applications/${id}/submit`);
    if (response && response.data) {
      localStorage.setItem('admitai_application', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.warn('[ApplicationService] Backend offline, submitting application in client state:', error.message);
  }

  const existing = await getApplication(id);
  const submitted = {
    ...existing,
    status: 'Submitted',
    currentStage: 'Document Verification',
    completionPercentage: 85,
    submittedAt: new Date().toISOString()
  };
  localStorage.setItem('admitai_application', JSON.stringify(submitted));
  return submitted;
}

export default {
  getApplication,
  saveApplication,
  submitApplication
};
