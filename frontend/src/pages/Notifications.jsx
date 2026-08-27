import React, { useState } from 'react';
import NotificationItem from '../components/notifications/NotificationItem';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Bell, CheckCheck, Filter, Mail, CheckCircle2, Send } from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';
import notificationService from '../services/notificationService';

export default function Notifications() {
  const { notifications, fetchNotifications, markNotificationRead, unreadCount, loading } = useApplication();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all'); // all, action_required, upcoming, completed

  const tabs = [
    { key: 'all', label: 'All Notifications' },
    { key: 'action_required', label: 'Action Required', badge: notifications.filter(n => n.type === 'action_required' && !n.read).length, color: 'danger' },
    { key: 'upcoming', label: 'Upcoming', badge: notifications.filter(n => n.type === 'upcoming').length, color: 'warning' },
    { key: 'completed', label: 'Completed', badge: notifications.filter(n => n.type === 'completed').length, color: 'success' },
  ];

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const handleMarkAllRead = async () => {
    try {
      const studentId = user?.id || 'std_9841';
      await notificationService.markAllAsRead(studentId);
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notifications & Email Alerts</h1>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Stay informed on document verifications, admission milestones, and deadline reminders.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            icon={CheckCheck}
            onClick={handleMarkAllRead}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Real-time Email Mirroring Banner */}
      <div className="p-3.5 rounded-2xl bg-blue-900/10 border border-blue-200/80 text-xs text-slate-700 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">Live Email Sync Active</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">
                Connected
              </span>
            </div>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Every website notification is automatically delivered to your registered email: <strong className="text-blue-700 font-mono">{user?.email || 'rishi@gmail.com'}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Categorized Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notification Stream */}
      {loading ? (
        <LoadingSpinner message="Checking for admission alerts..." />
      ) : filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No Notifications in this Category"
          description="You're all caught up! Important reminders and verification updates will appear here."
          actionText="View All Notifications"
          onAction={() => setActiveTab('all')}
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkRead={markNotificationRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
