const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// GET /api/auth/me
router.get('/me', authController.getCurrentUser);

// POST /api/auth/login
router.post('/login', authController.loginMock);

// POST /api/auth/register (Optimized Student Registration)
router.post('/register', authController.registerStudent);

module.exports = router;
