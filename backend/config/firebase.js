const path = require('path');
const fs = require('fs');

let app = null;
let db = null;
let auth = null;
let bucket = null;
let isFirebaseInitialized = false;

try {
  const { initializeApp, cert } = require('firebase-admin/app');
  const { getFirestore } = require('firebase-admin/firestore');
  const { getAuth } = require('firebase-admin/auth');
  const { getStorage } = require('firebase-admin/storage');

  const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require('./serviceAccountKey.json');
    app = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id}.appspot.com`
    });
    db = getFirestore(app);
    auth = getAuth(app);
    try {
      bucket = getStorage(app).bucket();
    } catch (e) {}
    isFirebaseInitialized = true;
    console.log(`[Firebase] 🔥 Connected LIVE to Google Cloud Firestore & Storage Project: ${serviceAccount.project_id}`);
  } else {
    const config = require('./index');
    if (config.firebase && config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey) {
      app = initializeApp({
        credential: cert({
          projectId: config.firebase.projectId,
          clientEmail: config.firebase.clientEmail,
          privateKey: config.firebase.privateKey.replace(/\\n/g, '\n')
        }),
        storageBucket: config.firebase.storageBucket || `${config.firebase.projectId}.appspot.com`
      });
      db = getFirestore(app);
      auth = getAuth(app);
      try {
        bucket = getStorage(app).bucket();
      } catch (e) {}
      isFirebaseInitialized = true;
      console.log(`[Firebase] 🔥 Connected LIVE to Google Cloud Firestore & Storage Project: ${config.firebase.projectId}`);
    }
  }
} catch (e) {
  console.log('[Firebase] In-Memory Data Store Active (Firestore schema ready). Reason:', e.message);
}

module.exports = {
  app,
  db,
  auth,
  bucket,
  isFirebaseInitialized
};
