const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const documentController = require('../controllers/documentController');

// GET /api/verification/queue — List all documents queued for verification
router.get('/queue', adminController.getDocuments);

// GET /api/verification/document/:id — Get details of a single document
router.get('/document/:id', adminController.getDocumentDetails);

// POST /api/verification/document/:id/decision — Approve, Reject, or Request Re-upload
router.post('/document/:id/decision', adminController.verifyDocument);

// PATCH /api/verification/document/:id/decision
router.patch('/document/:id/decision', adminController.verifyDocument);

module.exports = router;
