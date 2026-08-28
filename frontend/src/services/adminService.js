import api from './api';
import {
  mockDocuments,
  mockStudentProfile,
  mockApplication
} from '../data/mockData';

const defaultOverview = {
  totalApplicants: 1248,
  activeNow: 42,
  verificationPending: 18,
  conversions: 892,
  conversionRate: '71.4%',
  scholarshipsAwarded: '₹1.84 Cr'
};

const defaultActiveSessions = [
  {
    sessionId: 'sess_live_101',
    studentName: 'Rohan Sharma',
    program: 'B.Tech in CSE (AI & ML)',
    stage: 'Document Upload',
    lastActive: 'Just now',
    location: 'Bhubaneswar, Odisha',
    ip: '103.24.12.89',
    device: 'Chrome / Windows 11'
  },
  {
    sessionId: 'sess_live_102',
    studentName: 'Priya Mahapatra',
    program: 'MBA in Business Analytics',
    stage: 'Fee Payment',
    lastActive: '2 mins ago',
    location: 'Ranchi, Jharkhand',
    ip: '103.77.45.12',
    device: 'Safari / iPhone 15'
  },
  {
    sessionId: 'sess_live_103',
    studentName: 'Aditya Mohanty',
    program: 'B.Tech in CSE',
    stage: 'Application Review',
    lastActive: 'Just now',
    location: 'Gunupur, Odisha',
    ip: '115.240.90.14',
    device: 'Firefox / macOS'
  }
];

export async function getAdminOverview() {
  try {
    const response = await api.get('/admin/overview');
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, using client fallback overview:', error.message);
  }
  return defaultOverview;
}

export async function getStudents(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'All') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/admin/students?${params.toString()}`);
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, using client fallback students:', error.message);
  }

  let list = mockStudents && mockStudents.length > 0 ? mockStudents : [
    {
      id: 'std_9841',
      name: 'Aditya Mohanty',
      email: 'aditya.mohanty@example.com',
      applicationId: 'ADM-2026-8941',
      phone: '+91 94371 88290',
      program: 'B.Tech in Computer Science & Engineering',
      status: 'In Review',
      submittedAt: '2026-08-20'
    },
    {
      id: 'std_9842',
      name: 'Rishi Kumar Sahu',
      email: 'rishi.sahu@example.com',
      applicationId: 'ADM-2026-9842',
      phone: '+91 98765 43210',
      program: 'B.Tech in CSE (Artificial Intelligence & ML)',
      status: 'Approved',
      submittedAt: '2026-08-22'
    }
  ];

  if (filters.status && filters.status !== 'All') {
    list = list.filter(s => s.status === filters.status);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(s => s.name.toLowerCase().includes(q) || s.applicationId.toLowerCase().includes(q));
  }
  return list;
}

export async function getStudentDetails(id) {
  try {
    const response = await api.get(`/admin/students/${id}`);
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, using fallback student details:', error.message);
  }
  return mockStudentProfile;
}

export async function updateStudentStatus(id, status, remarks = '') {
  try {
    const response = await api.patch(`/admin/students/${id}/status`, { status, remarks });
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, updating student in client state:', error.message);
  }
  return { id, status, remarks, updatedAt: new Date().toISOString() };
}

export async function getActiveSessions() {
  try {
    const response = await api.get('/admin/active-sessions');
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, using fallback active sessions:', error.message);
  }
  return defaultActiveSessions;
}

const defaultMessages = [
  {
    id: 'msg-1',
    studentName: 'Rohan Sharma',
    channel: 'Website Chat',
    subject: 'B.Tech CSE Seat Availability',
    status: 'Open',
    timestamp: '10 mins ago',
    message: 'Hello, what is the cutoff for CSE (AI & ML) through OJEE?'
  },
  {
    id: 'msg-2',
    studentName: 'Priya Mahapatra',
    channel: 'Email Helpdesk',
    subject: 'Scholarship Eligibility Verification',
    status: 'Pending',
    timestamp: '1 hour ago',
    message: 'I scored 91.4% in 12th CBSE. Can I get a 50% tuition waiver?'
  }
];

export async function getMessages(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.channel && filters.channel !== 'All') params.append('channel', filters.channel);
    if (filters.status && filters.status !== 'All') params.append('status', filters.status);

    const response = await api.get(`/admin/messages?${params.toString()}`);
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, using fallback messages:', error.message);
  }
  return defaultMessages;
}

export async function replyToMessage(id, replyText, counselorName = 'Dr. S. K. Patnaik') {
  try {
    const response = await api.post(`/admin/messages/${id}/reply`, { replyText, counselorName });
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, simulating message reply in client state:', error.message);
  }
  return { id, replyText, counselorName, repliedAt: new Date().toISOString(), status: 'Replied' };
}

export async function getDocuments(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.studentId && filters.studentId !== 'All') params.append('studentId', filters.studentId);
    if (filters.status && filters.status !== 'All') params.append('status', filters.status);
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/admin/documents?${params.toString()}`);
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, using fallback admin documents:', error.message);
  }
  return mockDocuments || [];
}

export async function getDocumentDetails(id) {
  try {
    const response = await api.get(`/admin/documents/${id}`);
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, using fallback document details:', error.message);
  }
  return mockDocuments.find(d => d.id === id) || mockDocuments[0];
}

export async function verifyDocument(id, status, remarks = '', counselorName = 'Dr. S. K. Patnaik') {
  try {
    const response = await api.patch(`/admin/documents/${id}/verify`, { status, remarks, counselorName });
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('[AdminService] Backend offline, verifying document in client state:', error.message);
  }
  return { id, status, remarks, counselorName, verifiedAt: new Date().toISOString() };
}

export default {
  getAdminOverview,
  getStudents,
  getStudentDetails,
  updateStudentStatus,
  getActiveSessions,
  getMessages,
  replyToMessage,
  getDocuments,
  getDocumentDetails,
  verifyDocument
};
