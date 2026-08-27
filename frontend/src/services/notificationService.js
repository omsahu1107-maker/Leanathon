import api from './api';

/**
 * Notification Service — connects to backend REST API
 * Backend response shape:
 *   GET:  { success: true, count: N, data: [...notifications] }
 *   PATCH: { success: true, data: { ...notification } }
 *   POST:  { success: true, message: '...', data: [...allNotifications] }
 */

export async function getNotifications(studentId = 'std_9841') {
  const response = await api.get(`/notifications/${studentId}`);
  return response.data; // array of notifications
}

export async function markAsRead(id) {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data; // updated notification object
}

export async function markAllAsRead(studentId = 'std_9841') {
  const response = await api.post('/notifications/mark-all-read', { studentId });
  return response.data; // array of all notifications
}

export default {
  getNotifications,
  markAsRead,
  markAllAsRead
};
