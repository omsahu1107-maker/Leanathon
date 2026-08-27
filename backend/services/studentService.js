const { mockStudentProfile, mockRecentActivity } = require('../data/mockData');
const { db, isFirebaseInitialized } = require('../config/firebase');

let currentProfile = { ...mockStudentProfile };

async function getStudentProfile(id) {
  if (isFirebaseInitialized && db) {
    try {
      const doc = await db.collection('students').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      console.warn('[StudentService] Firestore fetch failed:', err.message);
    }
  }

  return currentProfile;
}

async function updateStudentProfile(id, updates) {
  currentProfile = {
    ...currentProfile,
    ...updates,
    address: {
      ...currentProfile.address,
      ...(updates.address || {})
    },
    guardian: {
      ...currentProfile.guardian,
      ...(updates.guardian || {})
    },
    academics: {
      ...currentProfile.academics,
      ...(updates.academics || {})
    }
  };

  if (isFirebaseInitialized && db) {
    try {
      await db.collection('students').doc(id).set(currentProfile, { merge: true });
    } catch (err) {
      console.warn('[StudentService] Firestore save failed:', err.message);
    }
  }

  return currentProfile;
}

async function getStudentActivity(id) {
  return mockRecentActivity;
}

module.exports = {
  getStudentProfile,
  updateStudentProfile,
  getStudentActivity
};
