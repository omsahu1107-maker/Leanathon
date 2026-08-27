const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// GET /api/courses
router.get('/', courseController.getCourses);

// GET /api/courses/:id
router.get('/:id', courseController.getCourseById);

module.exports = router;
