const { auth, isFirebaseInitialized } = require('../config/firebase');
const { mockStudentProfile } = require('../data/mockData');

/**
 * Auth Middleware
 * Verifies Firebase token if available; otherwise populates student context for development
 */
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (isFirebaseInitialized && auth && authHeader && authHeader.startsWith('Bearer ')) {
    const idToken = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req.user = decodedToken;
      return next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid Firebase token'
      });
    }
  }

  // Development / Default Mock User Context
  req.user = {
    uid: mockStudentProfile.id,
    email: mockStudentProfile.email,
    name: mockStudentProfile.name,
    role: 'student'
  };

  next();
}

module.exports = {
  authenticate
};
