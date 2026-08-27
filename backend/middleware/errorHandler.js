/**
 * AdmitAI Global Error Handler Middleware
 * Catches all errors passed via next(error) in route handlers
 */
function errorHandler(err, req, res, next) {
  console.error(`\n[AdmitAI Server Error] ${req.method} ${req.originalUrl}`);
  console.error('  Message:', err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error('  Stack:', err.stack);
  }

  // Handle multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size exceeds the 10MB limit. Please upload a smaller file.'
    });
  }

  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;
