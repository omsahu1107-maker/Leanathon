const { mockNotifications } = require('../data/mockData');
const { db, isFirebaseInitialized } = require('../config/firebase');
const emailService = require('./emailService');
const studentService = require('./studentService');

let notificationsStore = [...mockNotifications];

async function getNotificationsByStudentId(studentId) {
  if (isFirebaseInitialized && db) {
    try {
      const snapshot = await db.collection('notifications').where('studentId', '==', studentId).get();
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('[NotificationService] Firestore fetch failed:', err.message);
    }
  }

  return notificationsStore;
}

async function markNotificationAsRead(id) {
  const notif = notificationsStore.find(n => n.id === id);
  if (notif) {
    notif.read = true;
    return notif;
  }
  return null;
}

async function markAllNotificationsAsRead(studentId) {
  notificationsStore.forEach(n => {
    if (!studentId || n.studentId === studentId) {
      n.read = true;
    }
  });
  return notificationsStore;
}

/**
 * Add a notification to the portal and dispatch the identical notification to student email
 */
async function addNotification(studentId, notif) {
  const sId = studentId || 'std_9841';

  const newNotif = {
    id: `notif-${Date.now()}`,
    studentId: sId,
    type: notif.type || 'completed',
    title: notif.title || 'Document Update',
    description: notif.description || 'Your document status has been updated.',
    timestamp: new Date().toISOString(),
    read: false,
    actionUrl: notif.actionUrl || '/documents',
    actionText: notif.actionText || 'View Documents',
    badgeColor: notif.badgeColor || 'green'
  };

  notificationsStore.unshift(newNotif);

  // 1. Save to Cloud Firestore if connected
  if (isFirebaseInitialized && db) {
    try {
      await db.collection('notifications').doc(newNotif.id).set(newNotif);
    } catch (e) {}
  }

  // 2. Dispatch exact same notification to Student Email
  try {
    const profile = await studentService.getStudentProfile(sId);
    const studentEmail = notif.studentEmail || profile?.email || 'student@giet.edu';
    const studentName = notif.studentName || profile?.name || 'Student';

    await emailService.sendDirectNotificationEmail({
      studentEmail,
      studentName,
      title: newNotif.title,
      description: newNotif.description,
      actionUrl: newNotif.actionUrl,
      actionText: newNotif.actionText,
      type: newNotif.type
    });
  } catch (err) {
    console.warn('[NotificationService] Email mirroring error:', err.message);
  }

  return newNotif;
}

/**
 * Initialize fresh notifications and send Welcome Onboarding Email to Student
 */
async function createFreshStudentNotifications(studentId, studentName, applicationId) {
  const sId = studentId || 'std_9841';
  const appId = applicationId || 'ADM-2026-8941';
  const name = studentName || 'Student';

  const welcomeNotif = {
    id: `notif-${Date.now()}`,
    studentId: sId,
    type: 'completed',
    title: `Welcome to GIET University, ${name}!`,
    description: `Your application (${appId}) has started. Please proceed to fill your personal/academic details and upload mandatory marksheets in the Documents tab.`,
    timestamp: new Date().toISOString(),
    read: false,
    actionUrl: '/application',
    actionText: 'Complete Form',
    badgeColor: 'blue'
  };

  notificationsStore = [welcomeNotif];

  // Dispatch Welcome Email to Student Inbox
  try {
    const profile = await studentService.getStudentProfile(sId);
    const studentEmail = profile?.email || 'student@giet.edu';

    await emailService.sendDirectNotificationEmail({
      studentEmail,
      studentName: name,
      title: welcomeNotif.title,
      description: welcomeNotif.description,
      actionUrl: welcomeNotif.actionUrl,
      actionText: welcomeNotif.actionText,
      type: 'completed'
    });
  } catch (err) {
    console.warn('[NotificationService] Welcome email dispatch error:', err.message);
  }

  return notificationsStore;
}

module.exports = {
  getNotificationsByStudentId,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  addNotification,
  createFreshStudentNotifications,
  notificationsStore
};
