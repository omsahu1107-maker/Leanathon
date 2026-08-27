const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const config = require('./config');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const aiRoutes = require('./routes/aiRoutes');
const courseRoutes = require('./routes/courseRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const documentRoutes = require('./routes/documentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const verificationRoutes = require('./routes/verificationRoutes');

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================
app.use(cors({
  origin: [config.clientUrl, 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// ============================================================
// API HEALTH CHECK
// ============================================================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'AdmitAI API Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    env: config.nodeEnv,
    endpoints: {
      ai: '/api/ai/chat',
      courses: '/api/courses',
      applications: '/api/applications/:id',
      documents: '/api/documents/:studentId',
      notifications: '/api/notifications/:studentId',
      students: '/api/students/profile/:id',
      auth: '/api/auth/me'
    }
  });
});

// ============================================================
// API ROUTES
// ============================================================
app.use('/api/ai', aiRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/verification', verificationRoutes);

// ============================================================
// 404 HANDLER
// ============================================================
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `API route '${req.method} ${req.originalUrl}' not found.`,
    availableRoutes: [
      'GET  /api/health',
      'POST /api/ai/chat',
      'GET  /api/courses',
      'GET  /api/courses/:id',
      'GET  /api/applications/:id',
      'PUT  /api/applications/:id',
      'POST /api/applications/:id/submit',
      'GET  /api/documents/:studentId',
      'POST /api/documents/upload',
      'GET  /api/notifications/:studentId',
      'GET  /api/students/profile/:id',
      'PUT  /api/students/profile/:id',
      'GET  /api/students/activity/:id',
      'GET  /api/auth/me',
      'POST /api/auth/login'
    ]
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================
app.use(errorHandler);

// ============================================================
// START SERVER
// ============================================================
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`\n====================================================`);
  console.log(`🚀 AdmitAI Backend Server — RUNNING`);
  console.log(`====================================================`);
  console.log(`📡 Port:    ${PORT}  |  Mode: ${config.nodeEnv}`);
  console.log(`🌐 Health:  http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI:      http://localhost:${PORT}/api/ai/chat`);
  console.log(`📚 Courses: http://localhost:${PORT}/api/courses`);
  console.log(`📝 Apps:    http://localhost:${PORT}/api/applications`);
  console.log(`📁 Docs:    http://localhost:${PORT}/api/documents`);
  console.log(`🔔 Notifs:  http://localhost:${PORT}/api/notifications`);
  console.log(`====================================================\n`);
});

module.exports = app;
