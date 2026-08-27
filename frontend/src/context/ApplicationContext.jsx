import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import applicationService from '../services/applicationService';
import documentService from '../services/documentService';
import notificationService from '../services/notificationService';

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplication = useCallback(async () => {
    try {
      const data = await applicationService.getApplication();
      setApplication(data);
    } catch (err) {
      console.warn('Failed to load application data:', err.message);
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    try {
      const data = await documentService.getDocuments('std_9841');
      setDocuments(data || []);
    } catch (err) {
      console.warn('Failed to load documents:', err.message);
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await notificationService.getNotifications('std_9841');
      setNotifications(data || []);
    } catch (err) {
      console.warn('Failed to load notifications:', err.message);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchApplication(), fetchDocuments(), fetchNotifications()]);
    setLoading(false);
  }, [fetchApplication, fetchDocuments, fetchNotifications]);

  useEffect(() => {
    refreshAll();

    // Poll for real-time verification updates from counselor/admin
    const interval = setInterval(() => {
      fetchDocuments();
      fetchNotifications();
    }, 3000);

    // Refresh when user returns to tab
    const handleFocus = () => {
      fetchDocuments();
      fetchNotifications();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshAll, fetchDocuments, fetchNotifications]);

  const saveApplication = async (data) => {
    const updated = await applicationService.saveApplication(data);
    setApplication(updated);
    return updated;
  };

  const markNotificationRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Failed to mark notification read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingDocsCount = documents.filter(d => d.status === 'Missing' || d.status === 'Needs Review').length;

  return (
    <ApplicationContext.Provider
      value={{
        application,
        documents,
        notifications,
        unreadCount,
        pendingDocsCount,
        loading,
        refreshAll,
        fetchApplication,
        fetchDocuments,
        fetchNotifications,
        saveApplication,
        markNotificationRead
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
}
