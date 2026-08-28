import api from './api';
import { mockNotifications } from '../data/mockData';

/**
 * Notification Service — connects to backend REST API with offline fallback
 */
export async function getNotifications(studentId = 'std_9841') {
  try {
    const response = await api.get(`/notifications/${studentId}`);
    if (response && response.data) {
      localStorage.setItem('admitai_notifications', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.warn('[NotificationService] Backend offline, returning client fallback notifications:', error.message);
  }

  const cached = localStorage.getItem('admitai_notifications');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {}
  }
  return mockNotifications;
}

export async function markAsRead(id) {
  try {
    const response = await api.patch(`/notifications/${id}/read`);
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.warn('[NotificationService] Backend offline, marking notification as read in localStorage:', error.message);
  }

  const notifs = await getNotifications();
  const updated = notifs.map(n => (n.id === id ? { ...n, read: true } : n));
  localStorage.setItem('admitai_notifications', JSON.stringify(updated));
  return updated.find(n => n.id === id);
}

export async function markAllAsRead(studentId = 'std_9841') {
  try {
    const response = await api.post('/notifications/mark-all-read', { studentId });
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.warn('[NotificationService] Backend offline, marking all notifications read in localStorage:', error.message);
  }

  const notifs = await getNotifications();
  const updated = notifs.map(n => ({ ...n, read: true }));
  localStorage.setItem('admitai_notifications', JSON.stringify(updated));
  return updated;
}

export default {
  getNotifications,
  markAsRead,
  markAllAsRead
};
