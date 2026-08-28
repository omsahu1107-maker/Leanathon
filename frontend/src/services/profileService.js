import api from './api';
import { mockStudentProfile, mockRecentActivity } from '../data/mockData';

/**
 * Profile Service — connects to backend REST API with offline fallback
 */
export async function getProfile(id = 'std_9841') {
  try {
    const response = await api.get(`/students/profile/${id}`);
    if (response && response.data) {
      localStorage.setItem('admitai_profile', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.warn('[ProfileService] Backend offline, returning client fallback profile:', error.message);
  }

  const cached = localStorage.getItem('admitai_profile');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return mockStudentProfile;
}

export async function updateProfile(id = 'std_9841', data = {}) {
  try {
    const response = await api.put(`/students/profile/${id}`, data);
    if (response && response.data) {
      localStorage.setItem('admitai_profile', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.warn('[ProfileService] Backend offline, updating profile in localStorage:', error.message);
  }

  const existing = await getProfile(id);
  const updated = {
    ...existing,
    ...data,
    personalDetails: {
      ...existing.personalDetails,
      ...(data.personalDetails || {})
    },
    academicDetails: {
      ...existing.academicDetails,
      ...(data.academicDetails || {})
    },
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem('admitai_profile', JSON.stringify(updated));
  return updated;
}

export async function getActivity(id = 'std_9841') {
  try {
    const response = await api.get(`/students/activity/${id}`);
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.warn('[ProfileService] Backend offline, returning client fallback activity:', error.message);
  }

  return mockRecentActivity || [];
}

export default {
  getProfile,
  updateProfile,
  getActivity
};
