const aiService = require('../services/aiService');

async function handleAIChat(req, res, next) {
  try {
    const { message, studentContext, courseContext } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string.'
      });
    }

    const aiResponse = await aiService.processChatMessage(message, studentContext, courseContext);

    return res.status(200).json({
      success: true,
      data: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleAIChat
};
