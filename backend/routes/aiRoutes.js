const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// POST /api/ai/chat
router.post('/chat', aiController.handleAIChat);

module.exports = router;
