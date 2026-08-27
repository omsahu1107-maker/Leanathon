const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// GET /api/applications/:id
router.get('/:id?', applicationController.getApplication);

// PUT /api/applications/:id
router.put('/:id?', applicationController.updateApplication);

// POST /api/applications/:id/submit
router.post('/:id?/submit', applicationController.submitApplication);

module.exports = router;
