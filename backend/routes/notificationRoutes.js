const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// POST /api/notifications/mark-all-read  ← BEFORE /:studentId to prevent route conflict
router.post('/mark-all-read', notificationController.markAllAsRead);

// PATCH /api/notifications/:id/read
router.patch('/:id/read', notificationController.markAsRead);

// GET /api/notifications/:studentId
router.get('/:studentId?', notificationController.getNotifications);

module.exports = router;
