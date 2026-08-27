import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public & Student Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import AIAssistant from './pages/AIAssistant';
import Application from './pages/Application';
import Documents from './pages/Documents';
import ApplicationStatus from './pages/ApplicationStatus';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ContactUs from './pages/ContactUs';
import AboutGIET from './pages/AboutGIET';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminActiveSessions from './pages/admin/AdminActiveSessions';
import AdminMessages from './pages/admin/AdminMessages';
import AdminDocuments from './pages/admin/AdminDocuments';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ApplicationProvider>
            <Routes>
              {/* ========================================================
                  1. PUBLIC ACCESS ROUTES (No Login Required)
              ======================================================== */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about-giet" element={<AboutGIET />} />
                <Route path="/about" element={<AboutGIET />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetails />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
              </Route>

              {/* ========================================================
                  2. STANDALONE LOGIN & REGISTRATION
              ======================================================== */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login initialMode="register" />} />

              {/* ========================================================
                  3. PROTECTED STUDENT PORTAL (Authentication Required)
              ======================================================== */}
              <Route
                element={
                  <ProtectedRoute>
                    <StudentLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/application" element={<Application />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/application-status" element={<ApplicationStatus />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* ========================================================
                  4. ADMINISTRATIVE COUNSELOR DESK
              ======================================================== */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="active-sessions" element={<AdminActiveSessions />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="documents" element={<AdminDocuments />} />
              </Route>

              {/* Fallback Catch-all -> Public Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ApplicationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
