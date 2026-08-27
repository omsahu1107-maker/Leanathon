import api from './api';

/**
 * AI Admission Assistant Service
 * POST /api/ai/chat
 * Response shape from backend: { success: true, data: { text, suggestions, action }, timestamp }
 */
export async function sendMessage(message, studentContext = {}, courseContext = null) {
  const response = await api.post('/ai/chat', {
    message,
    studentContext,
    courseContext
  });
  // api interceptor returns the full JSON body: { success, data, timestamp }
  // response.data is the nested AI response object: { text, suggestions, action }
  return response.data;
}

export default {
  sendMessage
};
