import api from './api';

/**
 * Profile Service — connects to backend REST API
 * Backend response shape:
 *   GET profile:   { success: true, data: { ...studentProfile } }
 *   PUT profile:   { success: true, message: '...', data: { ...updatedProfile } }
 *   GET activity:  { success: true, data: [...activities] }
 */

export async function getProfile(id = 'std_9841') {
  const response = await api.get(`/students/profile/${id}`);
  return response.data; // student profile object
}

export async function updateProfile(id = 'std_9841', data = {}) {
  const response = await api.put(`/students/profile/${id}`, data);
  return response.data; // updated profile object
}

export async function getActivity(id = 'std_9841') {
  const response = await api.get(`/students/activity/${id}`);
  return response.data; // array of recent activity items
}

export default {
  getProfile,
  updateProfile,
  getActivity
};
