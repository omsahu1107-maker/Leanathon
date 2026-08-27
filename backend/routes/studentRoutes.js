const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /api/students/profile/:id
router.get('/profile/:id?', studentController.getProfile);

// PUT /api/students/profile/:id
router.put('/profile/:id?', studentController.updateProfile);

// GET /api/students/activity/:id
router.get('/activity/:id?', studentController.getActivity);

module.exports = router;
