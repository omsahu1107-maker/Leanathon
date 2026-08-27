let app = null;
let auth = null;
let db = null;
let isFirebaseConfigured = false;

// Fallback to Express REST API backend proxy
console.log('[Firebase Client] Operating via Express REST API backend proxy.');

export { app, auth, db, isFirebaseConfigured };
