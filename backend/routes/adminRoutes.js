const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET /api/admin/overview
router.get('/overview', adminController.getOverview);

// GET /api/admin/students
router.get('/students', adminController.getStudents);

// GET /api/admin/students/:id
router.get('/students/:id', adminController.getStudentDetails);

// PATCH /api/admin/students/:id/status
router.patch('/students/:id/status', adminController.updateStudentStatus);

// GET /api/admin/active-sessions
router.get('/active-sessions', adminController.getActiveSessions);

// GET /api/admin/messages
router.get('/messages', adminController.getMessages);

// POST /api/admin/messages/:id/reply
router.post('/messages/:id/reply', adminController.replyToMessage);

// GET /api/admin/documents
router.get('/documents', adminController.getDocuments);

// GET /api/admin/documents/:id
router.get('/documents/:id', adminController.getDocumentDetails);

// PATCH /api/admin/documents/:id/verify
router.patch('/documents/:id/verify', adminController.verifyDocument);

module.exports = router;
