const { mockCourses } = require('../data/mockData');
const { db, isFirebaseInitialized } = require('../config/firebase');

/**
 * Course Service
 * Supports Firestore collection 'courses' with fallback to mock data
 */
async function getAllCourses(filters = {}) {
  const { category, search, level } = filters;

  if (isFirebaseInitialized && db) {
    try {
      let query = db.collection('courses');
      if (category && category !== 'All') {
        query = query.where('category', '==', category);
      }
      const snapshot = await query.get();
      if (!snapshot.empty) {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    } catch (err) {
      console.warn('[CourseService] Firestore fetch failed, using fallback mock courses:', err.message);
    }
  }

  let result = [...mockCourses];

  if (category && category !== 'All') {
    result = result.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }

  if (level && level !== 'All') {
    result = result.filter(c => c.level.toLowerCase() === level.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.careerOpportunities.some(o => o.toLowerCase().includes(q))
    );
  }

  return result;
}

async function getCourseById(id) {
  if (isFirebaseInitialized && db) {
    try {
      const doc = await db.collection('courses').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      console.warn('[CourseService] Firestore single fetch failed, using fallback:', err.message);
    }
  }

  return mockCourses.find(c => c.id === id) || null;
}

module.exports = {
  getAllCourses,
  getCourseById
};
