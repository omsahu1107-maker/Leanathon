/**
 * AdmitAI Admin Service
 * Handles administrative telemetry, student directory, active sessions, message logs, and admission approvals.
 */
const documentService = require('./documentService');
const notificationService = require('./notificationService');

// Comprehensive student applications database
let mockAdminStudents = [
  {
    id: 'std_9841',
    applicationId: 'ADM-2026-8941',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    gender: 'Male',
    category: 'General',
    state: 'Odisha',
    city: 'Bhubaneswar',
    courseApplied: 'B.Tech in Computer Science & Engineering',
    courseCode: 'CS-101',
    academicLevel: 'Undergraduate',
    appliedDate: '2026-08-18T10:30:00.000Z',
    status: 'Documents Verified', // 'Under Review' | 'Documents Verified' | 'Merit Listed' | 'Fee Paid' | 'Action Required'
    completionPercentage: 90,
    academicScores: {
      tenthBoard: 'CBSE',
      tenthPercentage: 92.4,
      twelfthBoard: 'CHSE Odisha',
      twelfthPercentage: 88.6,
      pcmPercentage: 91.2,
      entranceExam: 'JEE Main 2026',
      entranceRank: 18450,
      percentile: 94.2
    },
    documentsSummary: { total: 6, verified: 5, pending: 1, rejected: 0 },
    counselorAssigned: 'Dr. S. K. Patnaik (CSE Dept)',
    notes: 'Eligible for MERIT50 scholarship (50% tuition waiver). Outstanding JEE score.',
    onlineStatus: 'Online'
  },
  {
    id: 'std_9842',
    applicationId: 'ADM-2026-8942',
    name: 'Ananya Mishra',
    email: 'ananya.mishra@gmail.com',
    phone: '+91 94371 88920',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    gender: 'Female',
    category: 'General',
    state: 'Odisha',
    city: 'Cuttack',
    courseApplied: 'B.Tech in CSE (Artificial Intelligence & Machine Learning)',
    courseCode: 'AI-102',
    academicLevel: 'Undergraduate',
    appliedDate: '2026-08-20T14:15:00.000Z',
    status: 'Merit Listed',
    completionPercentage: 100,
    academicScores: {
      tenthBoard: 'ICSE',
      tenthPercentage: 95.8,
      twelfthBoard: 'CBSE',
      twelfthPercentage: 94.2,
      pcmPercentage: 96.0,
      entranceExam: 'JEE Main 2026',
      entranceRank: 8210,
      percentile: 98.1
    },
    documentsSummary: { total: 6, verified: 6, pending: 0, rejected: 0 },
    counselorAssigned: 'Prof. R. N. Rath (AI/ML Lead)',
    notes: 'Top 1% candidate in GIETEE merit quota. Recommended for AI Innovator Fellowship.',
    onlineStatus: 'Online'
  },
  {
    id: 'std_9843',
    applicationId: 'ADM-2026-8943',
    name: 'Priya Patel',
    email: 'priya.patel@outlook.com',
    phone: '+91 98250 11234',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    gender: 'Female',
    category: 'OBC',
    state: 'Gujarat',
    city: 'Ahmedabad',
    courseApplied: 'MBA in Business Analytics & Data Science',
    courseCode: 'MBA-201',
    academicLevel: 'Postgraduate',
    appliedDate: '2026-08-21T09:45:00.000Z',
    status: 'Under Review',
    completionPercentage: 75,
    academicScores: {
      tenthBoard: 'GSEB',
      tenthPercentage: 86.5,
      twelfthBoard: 'CBSE',
      twelfthPercentage: 84.0,
      graduationScore: 8.42,
      entranceExam: 'CAT 2025',
      entranceRank: 14200,
      percentile: 88.5
    },
    documentsSummary: { total: 5, verified: 3, pending: 2, rejected: 0 },
    counselorAssigned: 'Dr. M. K. Samal (School of Management)',
    notes: 'Graduation degree certificate verification in progress.',
    onlineStatus: 'Online'
  },
  {
    id: 'std_9844',
    applicationId: 'ADM-2026-8944',
    name: 'Amitabh Senapati',
    email: 'amitabh.sen@rediffmail.com',
    phone: '+91 70081 23456',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    gender: 'Male',
    category: 'General',
    state: 'West Bengal',
    city: 'Kolkata',
    courseApplied: 'B.Tech in Mechanical Engineering',
    courseCode: 'ME-105',
    academicLevel: 'Undergraduate',
    appliedDate: '2026-08-22T16:20:00.000Z',
    status: 'Fee Paid',
    completionPercentage: 100,
    academicScores: {
      tenthBoard: 'WBBSE',
      tenthPercentage: 89.2,
      twelfthBoard: 'WBCHSE',
      twelfthPercentage: 85.6,
      pcmPercentage: 87.0,
      entranceExam: 'WBJEE / OJEE',
      entranceRank: 9400,
      percentile: 91.0
    },
    documentsSummary: { total: 6, verified: 6, pending: 0, rejected: 0 },
    counselorAssigned: 'Prof. A. K. Nayak (Mechanical)',
    notes: 'First semester tuition fee (₹95,000) received via UPI/Netbanking. Hostel room allotted (Block-B).',
    onlineStatus: 'Offline'
  },
  {
    id: 'std_9845',
    applicationId: 'ADM-2026-8945',
    name: 'Sneha Subhadarshini',
    email: 'sneha.subha@gmail.com',
    phone: '+91 93370 54321',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    gender: 'Female',
    category: 'SC',
    state: 'Odisha',
    city: 'Berhampur',
    courseApplied: 'B.Sc. (Hons) in Agriculture',
    courseCode: 'AG-101',
    academicLevel: 'Undergraduate',
    appliedDate: '2026-08-23T11:00:00.000Z',
    status: 'Documents Verified',
    completionPercentage: 90,
    academicScores: {
      tenthBoard: 'BSE Odisha',
      tenthPercentage: 91.0,
      twelfthBoard: 'CHSE Odisha',
      twelfthPercentage: 89.4,
      pcbPercentage: 92.5,
      entranceExam: 'OUAT / GIETEE',
      entranceRank: 4120,
      percentile: 93.8
    },
    documentsSummary: { total: 5, verified: 5, pending: 0, rejected: 0 },
    counselorAssigned: 'Dr. B. K. Jena (School of Agriculture)',
    notes: 'Community certificate and resident certificate approved. Seat provisional confirmed.',
    onlineStatus: 'Online'
  },
  {
    id: 'std_9846',
    applicationId: 'ADM-2026-8946',
    name: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@gmail.com',
    phone: '+91 98220 99887',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    gender: 'Male',
    category: 'General',
    state: 'Maharashtra',
    city: 'Pune',
    courseApplied: 'B.Tech in Computer Science and Engineering (Data Science)',
    courseCode: 'CS-104',
    academicLevel: 'Undergraduate',
    appliedDate: '2026-08-24T15:30:00.000Z',
    status: 'Action Required',
    completionPercentage: 60,
    academicScores: {
      tenthBoard: 'MSBSHSE',
      tenthPercentage: 84.5,
      twelfthBoard: 'CBSE',
      twelfthPercentage: 81.2,
      pcmPercentage: 82.0,
      entranceExam: 'MHT-CET / JEE Main',
      entranceRank: 22500,
      percentile: 89.4
    },
    documentsSummary: { total: 6, verified: 3, pending: 2, rejected: 1 },
    counselorAssigned: 'Prof. S. R. Mohanty (Data Science)',
    notes: 'Class 12th marksheet scan was blurry. System requested fresh upload.',
    onlineStatus: 'Online'
  },
  {
    id: 'std_9847',
    applicationId: 'ADM-2026-8947',
    name: 'Kavita Reddy',
    email: 'kavita.reddy@gmail.com',
    phone: '+91 94400 33221',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    gender: 'Female',
    category: 'General',
    state: 'Andhra Pradesh',
    city: 'Visakhapatnam',
    courseApplied: 'B.Tech in Electronics & Communication Engineering',
    courseCode: 'ECE-101',
    academicLevel: 'Undergraduate',
    appliedDate: '2026-08-24T18:10:00.000Z',
    status: 'Documents Verified',
    completionPercentage: 90,
    academicScores: {
      tenthBoard: 'AP Board',
      tenthPercentage: 94.0,
      twelfthBoard: 'AP Inter',
      twelfthPercentage: 93.5,
      pcmPercentage: 94.0,
      entranceExam: 'AP EAMCET / JEE Main',
      entranceRank: 12100,
      percentile: 95.0
    },
    documentsSummary: { total: 6, verified: 6, pending: 0, rejected: 0 },
    counselorAssigned: 'Dr. G. V. Rao (ECE Dept)',
    notes: 'Eligible for Girl Child STEM Empowerment Scholarship (₹25,000 grant).',
    onlineStatus: 'Offline'
  }
];

// Live Active Sessions (Telemetry for "Who is Logged In")
let mockActiveSessions = [
  {
    id: 'sess_1',
    studentId: 'std_9841',
    name: 'Rahul Sharma',
    applicationId: 'ADM-2026-8941',
    email: 'rahul.sharma@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    currentPage: '/application',
    pageTitle: 'My Application Form (Step 3: Document Upload)',
    ipAddress: '157.42.189.44 (Bhubaneswar, IN)',
    device: 'Chrome 128 · Windows 11 (Desktop)',
    loginTime: 'Today at 09:12 AM',
    lastActive: 'Just now (12s ago)',
    sessionDuration: '36 mins',
    action: 'Editing course preferences (B.Tech CSE)',
    status: 'active'
  },
  {
    id: 'sess_2',
    studentId: 'std_9842',
    name: 'Ananya Mishra',
    applicationId: 'ADM-2026-8942',
    email: 'ananya.mishra@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    currentPage: '/ai-assistant',
    pageTitle: 'AI Admission Agent Chat',
    ipAddress: '103.24.120.12 (Cuttack, IN)',
    device: 'Safari · macOS Sonoma (MacBook Pro)',
    loginTime: 'Today at 09:34 AM',
    lastActive: '1 min ago',
    sessionDuration: '14 mins',
    action: 'Asking AI: "What are the hostel fee payment deadlines for AIML?"',
    status: 'active'
  },
  {
    id: 'sess_3',
    studentId: 'std_9843',
    name: 'Priya Patel',
    applicationId: 'ADM-2026-8943',
    email: 'priya.patel@outlook.com',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    currentPage: '/documents',
    pageTitle: 'Document Upload & AI Verification',
    ipAddress: '27.56.89.210 (Ahmedabad, IN)',
    device: 'Mobile Chrome · Android 14 (OnePlus 12)',
    loginTime: 'Today at 09:28 AM',
    lastActive: '3 mins ago',
    sessionDuration: '20 mins',
    action: 'Uploaded: "Graduation_Marksheet_Sem6.pdf"',
    status: 'active'
  },
  {
    id: 'sess_4',
    studentId: 'std_9845',
    name: 'Sneha Subhadarshini',
    applicationId: 'ADM-2026-8945',
    email: 'sneha.subha@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    currentPage: '/application-status',
    pageTitle: 'Live Application Tracker & Verification Matrix',
    ipAddress: '106.211.45.19 (Berhampur, IN)',
    device: 'Chrome 127 · Windows 10 (Laptop)',
    loginTime: 'Today at 09:40 AM',
    lastActive: '45s ago',
    sessionDuration: '8 mins',
    action: 'Checking scholarship status for Agriculture (B.Sc)',
    status: 'active'
  },
  {
    id: 'sess_5',
    studentId: 'std_9846',
    name: 'Rohan Deshmukh',
    applicationId: 'ADM-2026-8946',
    email: 'rohan.deshmukh@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    currentPage: '/documents',
    pageTitle: 'Documents Portal (Re-upload Request)',
    ipAddress: '49.36.192.88 (Pune, IN)',
    device: 'Safari Mobile · iOS 17.6 (iPhone 15)',
    loginTime: 'Today at 09:44 AM',
    lastActive: 'Just now (5s ago)',
    sessionDuration: '4 mins',
    action: 'Replacing rejected 12th certificate with high-res scan',
    status: 'active'
  }
];

// Student Inquiries & AI Chat Messages Database
let mockStudentMessages = [
  {
    id: 'msg_1',
    studentId: 'std_9841',
    studentName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    channel: 'AI Assistant', // 'AI Assistant' | 'Contact Form' | 'Direct Ticket'
    subject: 'Scholarship eligibility for 91.2% in PCM',
    lastMessage: 'I scored 91.2% in PCM and 94.2 percentile in JEE Main. Can I get a 50% tuition waiver for B.Tech CSE?',
    aiResponse: 'Yes Rahul! Under the GIETU Merit Scholarship Scheme, applicants with >90% PCM or >90 percentile in JEE Main qualify for the MERIT50 scholarship (50% tuition waiver). Your application is flagged for counselor verification.',
    timestamp: 'Today at 09:15 AM',
    status: 'Resolved by AI', // 'Pending Counselor' | 'Resolved by AI' | 'Replied'
    priority: 'High',
    courseInterest: 'B.Tech in Computer Science & Engineering',
    category: 'Scholarship & Fees'
  },
  {
    id: 'msg_2',
    studentId: 'std_9842',
    studentName: 'Ananya Mishra',
    email: 'ananya.mishra@gmail.com',
    phone: '+91 94371 88920',
    channel: 'AI Assistant',
    subject: 'Hostel accommodation & AC room allocation',
    lastMessage: 'Are single-occupancy AC hostel rooms available in the girls hostel on campus?',
    aiResponse: 'GIET University provides 2-sharing and 3-sharing AC and Non-AC hostel rooms across 11 resident halls. Single rooms are allotted on a first-come-first-serve basis after payment of the seat confirmation fee.',
    timestamp: 'Today at 09:35 AM',
    status: 'Pending Counselor',
    priority: 'Medium',
    courseInterest: 'B.Tech in CSE (AI & ML)',
    category: 'Hostel & Campus Facilities'
  },
  {
    id: 'msg_3',
    studentId: 'std_9843',
    studentName: 'Priya Patel',
    email: 'priya.patel@outlook.com',
    phone: '+91 98250 11234',
    channel: 'Contact Form',
    subject: 'Dual specialization options in MBA Data Science',
    lastMessage: 'Can I opt for Marketing minor alongside Business Analytics in MBA program?',
    aiResponse: null,
    timestamp: 'Yesterday at 04:20 PM',
    status: 'Pending Counselor',
    priority: 'High',
    courseInterest: 'MBA in Business Analytics & Data Science',
    category: 'Curriculum & Specializations'
  },
  {
    id: 'msg_4',
    studentId: 'std_9846',
    studentName: 'Rohan Deshmukh',
    email: 'rohan.deshmukh@gmail.com',
    phone: '+91 98220 99887',
    channel: 'Direct Ticket',
    subject: 'Issue with OCR document verification on 12th certificate',
    lastMessage: 'The automated system flagged my certificate as blurry. I have re-scanned it at 300 DPI.',
    aiResponse: 'Automated response: Your newly uploaded document has been placed in the priority manual verification queue for Admissions Officer review.',
    timestamp: 'Today at 09:45 AM',
    status: 'Pending Counselor',
    priority: 'Urgent',
    courseInterest: 'B.Tech in CSE (Data Science)',
    category: 'Document Audit'
  }
];

// ============================================================
// SERVICE METHODS
// ============================================================

async function getAdminOverview() {
  const totalStudents = mockAdminStudents.length;
  const verifiedDocs = mockAdminStudents.filter(s => s.status === 'Documents Verified' || s.status === 'Merit Listed' || s.status === 'Fee Paid').length;
  const activeSessions = mockActiveSessions.length;
  const pendingInquiries = mockStudentMessages.filter(m => m.status === 'Pending Counselor').length;

  return {
    metrics: {
      totalApplications: 1428 + totalStudents,
      verifiedApplications: 1240 + verifiedDocs,
      pendingVerification: 188,
      liveActiveStudents: activeSessions,
      totalInquiries: 3890,
      pendingCounselorInquiries: pendingInquiries,
      conversionRate: '84.6%',
      averageAiResponseTime: '1.2s'
    },
    funnel: [
      { stage: 'Inquiries / Leads', count: 3890, percentage: 100 },
      { stage: 'Applications Started', count: 1850, percentage: 47.5 },
      { stage: 'Documents Uploaded', count: 1428, percentage: 36.7 },
      { stage: 'Verified & Merit Listed', count: 1240, percentage: 31.8 },
      { stage: 'Confirmed Enrolment', count: 980, percentage: 25.1 }
    ],
    recentRegistrations: mockAdminStudents.slice(0, 5)
  };
}

async function getAllStudents(filters = {}) {
  let result = [...mockAdminStudents];

  if (filters.status && filters.status !== 'All') {
    result = result.filter(s => s.status.toLowerCase() === filters.status.toLowerCase());
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.applicationId.toLowerCase().includes(q) ||
      s.courseApplied.toLowerCase().includes(q)
    );
  }

  return result;
}

async function getStudentById(id) {
  const student = mockAdminStudents.find(s => s.id === id || s.applicationId === id);
  return student || mockAdminStudents[0];
}

async function updateStudentStatus(id, newStatus, remarks) {
  const studentIndex = mockAdminStudents.findIndex(s => s.id === id || s.applicationId === id);
  if (studentIndex !== -1) {
    mockAdminStudents[studentIndex].status = newStatus;
    if (remarks) {
      mockAdminStudents[studentIndex].notes = remarks;
    }
    return mockAdminStudents[studentIndex];
  }
  return null;
}

async function getActiveSessions() {
  return mockActiveSessions;
}

async function getMessages(filters = {}) {
  let result = [...mockStudentMessages];
  if (filters.channel && filters.channel !== 'All') {
    result = result.filter(m => m.channel === filters.channel);
  }
  if (filters.status && filters.status !== 'All') {
    result = result.filter(m => m.status === filters.status);
  }
  return result;
}

async function replyToMessage(id, replyText, counselorName = 'Dr. S. K. Patnaik') {
  const msgIndex = mockStudentMessages.findIndex(m => m.id === id);
  if (msgIndex !== -1) {
    mockStudentMessages[msgIndex].counselorReply = replyText;
    mockStudentMessages[msgIndex].counselorName = counselorName;
    mockStudentMessages[msgIndex].status = 'Replied';
    mockStudentMessages[msgIndex].repliedAt = new Date().toISOString();
    return mockStudentMessages[msgIndex];
  }
  return null;
}

// Full repository of student uploaded documents with OCR telemetry
let mockUploadedDocuments = [
  {
    id: 'DOC-9841-01',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    applicationId: 'ADM-2026-8941',
    courseApplied: 'B.Tech in Computer Science & Engineering',
    documentType: '12th Marksheet/Certificate',
    name: 'Class 12th (PCM) Science Marksheet',
    category: 'Academic',
    fileName: 'Rahul_Sharma_CHSE_12th_Marksheet.pdf',
    fileSize: '2.14 MB',
    uploadedAt: '2026-08-20 14:35',
    status: 'Approved',
    confidenceScore: 99.2,
    verifiedBy: 'Dr. S. K. Patnaik',
    verifiedAt: '2026-08-20 14:36',
    adminRemark: 'Candidate name, roll number, and PCM aggregate (91.2%) validated against CHSE Board ledger.',
    remarks: 'Candidate name, roll number, and PCM aggregate (91.2%) validated against CHSE Board ledger.',
    fileUrl: '/documents/marksheet_12th.jpg',
    imageUrl: '/documents/marksheet_12th.jpg',
    ocrData: {
      candidateName: 'RAHUL SHARMA',
      fatherName: 'B. K. SHARMA',
      rollNumber: '26084918',
      institution: 'Bhubaneswar Junior College of Science',
      board: 'Council of Higher Secondary Education, Odisha',
      passingYear: '2026',
      totalMarksObtained: '443 / 500',
      aggregatePercentage: '88.6%',
      pcmScore: '91.2% (Physics: 92, Chemistry: 89, Mathematics: 93)',
      subjects: [
        { name: 'Physics (Theory + Practical)', max: 100, secured: 92, grade: 'A1' },
        { name: 'Chemistry (Theory + Practical)', max: 100, secured: 89, grade: 'A2' },
        { name: 'Mathematics', max: 100, secured: 93, grade: 'A1' },
        { name: 'English Core', max: 100, secured: 85, grade: 'B1' },
        { name: 'Computer Science', max: 100, secured: 94, grade: 'A1' }
      ]
    }
  },
  {
    id: 'DOC-9841-02',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    applicationId: 'ADM-2026-8941',
    courseApplied: 'B.Tech in Computer Science & Engineering',
    documentType: 'Other',
    name: 'JEE Main 2026 Rank Card',
    category: 'Entrance',
    fileName: 'JEE_Main_2026_Rahul_Scorecard.pdf',
    fileSize: '1.45 MB',
    uploadedAt: '2026-08-21 11:20',
    status: 'Approved',
    confidenceScore: 98.7,
    verifiedBy: 'Dr. S. K. Patnaik',
    verifiedAt: '2026-08-21 15:40',
    adminRemark: 'JEE NTA score 94.2045 percentile verified. All India Rank #18450 matches central allocation database.',
    remarks: 'JEE NTA score 94.2045 percentile verified. All India Rank #18450 matches central allocation database.',
    fileUrl: '/documents/jee_scorecard.jpg',
    imageUrl: '/documents/jee_scorecard.jpg',
    ocrData: {
      candidateName: 'RAHUL SHARMA',
      applicationNumber: '26031094812',
      rollNumber: '26084918',
      examSession: 'JEE (Main) 2026 Session 2',
      ntaScorePhysics: '93.842',
      ntaScoreChemistry: '91.210',
      ntaScoreMaths: '96.120',
      totalNtaPercentile: '94.2045',
      allIndiaRank: '18450',
      categoryRank: 'N/A (General)',
      qualifyingStatus: 'Eligible for JEE Advanced & Central Engineering Counseling'
    }
  },
  {
    id: 'DOC-9841-03',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    applicationId: 'ADM-2026-8941',
    courseApplied: 'B.Tech in Computer Science & Engineering',
    documentType: '10th Marksheet/Certificate',
    name: 'Class 10th Passing Certificate & Date of Birth Proof',
    category: 'Academic',
    fileName: 'CBSE_Class_10_Certificate_Rahul.pdf',
    fileSize: '1.80 MB',
    uploadedAt: '2026-08-18 10:45',
    status: 'Approved',
    confidenceScore: 100,
    verifiedBy: 'Dr. S. K. Patnaik',
    verifiedAt: '2026-08-18 10:46',
    adminRemark: 'DOB: 14-07-2008 verified. CBSE Board authentication passed.',
    remarks: 'DOB: 14-07-2008 verified. CBSE Board authentication passed.',
    fileUrl: '/documents/marksheet_12th.jpg',
    imageUrl: '/documents/marksheet_12th.jpg',
    ocrData: {
      candidateName: 'RAHUL SHARMA',
      dateOfBirth: '14th July 2008',
      board: 'Central Board of Secondary Education (CBSE)',
      school: 'DAV Public School, Unit-8, Bhubaneswar',
      cgpaScore: '92.4% (Aggregate)',
      resultStatus: 'PASS'
    }
  },
  {
    id: 'DOC-9841-04',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    applicationId: 'ADM-2026-8941',
    courseApplied: 'B.Tech in Computer Science & Engineering',
    documentType: 'Aadhaar/ID Proof',
    name: 'National Aadhaar / Identity Verification Proof',
    category: 'Identity',
    fileName: 'Aadhaar_Card_Masked_Rahul.pdf',
    fileSize: '890 KB',
    uploadedAt: '2026-08-18 11:00',
    status: 'Approved',
    confidenceScore: 97.5,
    verifiedBy: 'Dr. S. K. Patnaik',
    verifiedAt: '2026-08-18 11:01',
    adminRemark: 'UIDAI QR code cryptographically validated. Address: Bhubaneswar, Odisha.',
    remarks: 'UIDAI QR code cryptographically validated. Address: Bhubaneswar, Odisha.',
    fileUrl: '/documents/aadhaar_card.jpg',
    imageUrl: '/documents/aadhaar_card.jpg',
    ocrData: {
      candidateName: 'Rahul Sharma',
      gender: 'Male',
      maskedUid: 'XXXX-XXXX-4819',
      address: 'Plot 412, Saheed Nagar, Bhubaneswar, Dist- Khordha, Odisha - 751007'
    }
  },
  {
    id: 'DOC-9842-01',
    studentId: 'std_9842',
    registrationNumber: 'ADM-2026-8942',
    rollNumber: '12648102',
    studentName: 'Ananya Mishra',
    applicationId: 'ADM-2026-8942',
    courseApplied: 'B.Tech in CSE (AI & ML)',
    documentType: '12th Marksheet/Certificate',
    name: 'Class 12th CBSE Science Marksheet',
    category: 'Academic',
    fileName: 'Ananya_Mishra_12th_CBSE.pdf',
    fileSize: '2.40 MB',
    uploadedAt: '2026-08-20 16:10',
    status: 'Approved',
    confidenceScore: 99.8,
    verifiedBy: 'Prof. R. N. Rath',
    verifiedAt: '2026-08-20 17:30',
    adminRemark: 'Exceptional 96.0% in PCM. Eligible for AI Innovator Merit Fellowship.',
    remarks: 'Exceptional 96.0% in PCM. Eligible for AI Innovator Merit Fellowship.',
    fileUrl: '/documents/marksheet_12th.jpg',
    imageUrl: '/documents/marksheet_12th.jpg',
    ocrData: {
      candidateName: 'ANANYA MISHRA',
      rollNumber: '12648102',
      board: 'Central Board of Secondary Education',
      school: 'Delhi Public School, Cuttack',
      totalMarks: '471 / 500',
      percentage: '94.2%',
      pcmScore: '96.0% (Phy: 95, Chem: 95, Math: 98)',
      subjects: [
        { name: 'Mathematics', max: 100, secured: 98, grade: 'A1' },
        { name: 'Physics', max: 100, secured: 95, grade: 'A1' },
        { name: 'Chemistry', max: 100, secured: 95, grade: 'A1' },
        { name: 'Informatics Practices', max: 100, secured: 99, grade: 'A1' },
        { name: 'English Core', max: 100, secured: 84, grade: 'B1' }
      ]
    }
  },
  {
    id: 'DOC-9843-01',
    studentId: 'std_9843',
    registrationNumber: 'ADM-2026-8943',
    rollNumber: 'GU84210',
    studentName: 'Priya Patel',
    applicationId: 'ADM-2026-8943',
    courseApplied: 'MBA in Business Analytics & Data Science',
    documentType: 'Other',
    name: 'Graduation Degree & Consolidated Sem-6 Marksheet',
    category: 'Academic',
    fileName: 'Priya_Patel_BBA_Graduation_Consolidated.pdf',
    fileSize: '3.10 MB',
    uploadedAt: '2026-08-21 10:15',
    status: 'Pending',
    confidenceScore: 89.4,
    verifiedBy: 'Pending Counselor Review',
    verifiedAt: null,
    adminRemark: 'Awaiting manual cross-verification of Gujarat University degree authenticity.',
    remarks: 'Awaiting manual cross-verification of Gujarat University degree authenticity.',
    fileUrl: '/documents/marksheet_12th.jpg',
    imageUrl: '/documents/marksheet_12th.jpg',
    ocrData: {
      candidateName: 'PRIYA PATEL',
      degree: 'Bachelor of Business Administration (BBA)',
      university: 'Gujarat University, Ahmedabad',
      cgpa: '8.42 / 10.0',
      passingYear: '2026',
      division: 'First Class with Distinction'
    }
  },
  {
    id: 'DOC-9846-01',
    studentId: 'std_9846',
    registrationNumber: 'ADM-2026-8946',
    rollNumber: 'MH48190',
    studentName: 'Rohan Deshmukh',
    applicationId: 'ADM-2026-8946',
    courseApplied: 'B.Tech in CSE (Data Science)',
    documentType: '12th Marksheet/Certificate',
    name: 'Class 12th Marksheet (Re-scanned High Resolution)',
    category: 'Academic',
    fileName: 'Rohan_Deshmukh_12th_CBSE_300DPI.pdf',
    fileSize: '2.80 MB',
    uploadedAt: '2026-08-24 15:45',
    status: 'Pending',
    confidenceScore: 94.0,
    verifiedBy: 'Pending Admission Officer Action',
    verifiedAt: null,
    adminRemark: 'Re-uploaded after previous scan was flagged for low resolution. Ready for manual sign-off.',
    remarks: 'Re-uploaded after previous scan was flagged for low resolution. Ready for manual sign-off.',
    fileUrl: '/documents/marksheet_12th.jpg',
    imageUrl: '/documents/marksheet_12th.jpg',
    ocrData: {
      candidateName: 'ROHAN DESHMUKH',
      board: 'Maharashtra State Board of Secondary and Higher Secondary Education',
      pcmPercentage: '82.0%',
      overallPercentage: '81.2%',
      passingYear: '2026'
    }
  },
  {
    id: 'DOC-9845-01',
    studentId: 'std_9845',
    registrationNumber: 'ADM-2026-8945',
    rollNumber: 'AG20264',
    studentName: 'Sneha Subhadarshini',
    applicationId: 'ADM-2026-8945',
    courseApplied: 'B.Sc. (Hons) in Agriculture',
    documentType: '12th Marksheet/Certificate',
    name: 'Class 12th PCB Biology & Science Marksheet',
    category: 'Academic',
    fileName: 'Sneha_CHSE_Biology_Marksheet.pdf',
    fileSize: '1.95 MB',
    uploadedAt: '2026-08-23 11:20',
    status: 'Approved',
    confidenceScore: 98.4,
    verifiedBy: 'Dr. B. K. Jena',
    verifiedAt: '2026-08-23 13:00',
    adminRemark: 'PCB aggregate 92.5% verified for Agriculture Honours admission quota.',
    remarks: 'PCB aggregate 92.5% verified for Agriculture Honours admission quota.',
    fileUrl: '/documents/marksheet_12th.jpg',
    imageUrl: '/documents/marksheet_12th.jpg',
    ocrData: {
      candidateName: 'SNEHA SUBHADARSHINI',
      board: 'Council of Higher Secondary Education, Odisha',
      pcbScore: '92.5% (Biology: 94, Chemistry: 91, Physics: 92.5)',
      passingYear: '2026'
    }
  }
];

async function addOrUpdateUploadedDocument(docData) {
  const existingIdx = mockUploadedDocuments.findIndex(d => 
    (docData.id && d.id === docData.id) ||
    (d.name.toLowerCase() === (docData.name || '').toLowerCase() && d.studentId === docData.studentId)
  );

  const docRecord = {
    id: docData.id || `DOC-${Date.now()}`,
    studentId: docData.studentId || 'std_9841',
    registrationNumber: docData.registrationNumber || 'ADM-2026-8941',
    rollNumber: docData.rollNumber || '26084918',
    studentName: docData.studentName || 'Rahul Sharma',
    applicationId: docData.applicationId || 'ADM-2026-8941',
    courseApplied: docData.courseApplied || 'B.Tech in Computer Science & Engineering',
    documentType: docData.documentType || 'Other',
    name: docData.name || 'Uploaded Document',
    category: docData.category || 'Academic',
    fileName: docData.fileName || 'Uploaded_File.pdf',
    fileSize: docData.fileSize || '1.5 MB',
    uploadedAt: docData.uploadedAt || new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: docData.status || 'Pending',
    confidenceScore: docData.confidenceScore || 94.5,
    verifiedBy: 'Pending Counselor Audit',
    verifiedAt: null,
    adminRemark: docData.adminRemark || docData.remarks || 'Fresh candidate upload. Ready for counselor verification.',
    remarks: docData.remarks || 'Fresh candidate upload. Ready for counselor verification.',
    fileUrl: docData.fileUrl || '/documents/marksheet_12th.jpg',
    imageUrl: docData.imageUrl || docData.fileUrl || '/documents/marksheet_12th.jpg',
    ocrData: docData.ocrData || {
      candidateName: docData.studentName || 'RAHUL SHARMA',
      board: 'State / Central Board',
      passingYear: '2026',
      totalMarks: 'Verified via Upload'
    }
  };

  if (existingIdx >= 0) {
    mockUploadedDocuments[existingIdx] = {
      ...mockUploadedDocuments[existingIdx],
      ...docRecord,
      id: mockUploadedDocuments[existingIdx].id
    };
    return mockUploadedDocuments[existingIdx];
  } else {
    mockUploadedDocuments.unshift(docRecord);
    return docRecord;
  }
}

async function getAllUploadedDocuments(filters = {}) {
  let result = [...mockUploadedDocuments];

  if (filters.studentId && filters.studentId !== 'All') {
    result = result.filter(d => d.studentId === filters.studentId || d.applicationId === filters.studentId);
  }
  if (filters.status && filters.status !== 'All') {
    result = result.filter(d => d.status.toLowerCase() === filters.status.toLowerCase());
  }
  if (filters.category && filters.category !== 'All') {
    result = result.filter(d => d.category.toLowerCase() === filters.category.toLowerCase());
  }
  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(d => 
      d.name.toLowerCase().includes(q) ||
      (d.documentType && d.documentType.toLowerCase().includes(q)) ||
      (d.studentName && d.studentName.toLowerCase().includes(q)) ||
      (d.applicationId && d.applicationId.toLowerCase().includes(q)) ||
      (d.registrationNumber && d.registrationNumber.toLowerCase().includes(q)) ||
      (d.rollNumber && d.rollNumber.toLowerCase().includes(q)) ||
      (d.ocrData?.rollNumber && d.ocrData.rollNumber.toLowerCase().includes(q)) ||
      (d.fileName && d.fileName.toLowerCase().includes(q))
    );
  }

  return result;
}

async function getDocumentById(id) {
  const q = (id || '').toLowerCase();
  const doc = mockUploadedDocuments.find(d => 
    d.id.toLowerCase() === q ||
    d.name.toLowerCase().includes(q) ||
    q.includes(d.name.toLowerCase()) ||
    (d.documentType && d.documentType.toLowerCase().includes(q))
  );
  return doc || mockUploadedDocuments[0];
}

async function verifyDocument(id, status, remarks = '', counselorName = 'Dr. S. K. Patnaik') {
  const q = (id || '').toLowerCase();
  let docIdx = mockUploadedDocuments.findIndex(d => 
    d.id.toLowerCase() === q ||
    d.name.toLowerCase() === q ||
    d.name.toLowerCase().includes(q) ||
    q.includes(d.name.toLowerCase()) ||
    (d.documentType && d.documentType.toLowerCase().includes(q)) ||
    (q.includes('12th') && d.name.toLowerCase().includes('12th')) ||
    (q.includes('10th') && d.name.toLowerCase().includes('10th')) ||
    (q.includes('jee') && d.name.toLowerCase().includes('jee')) ||
    (q.includes('aadhaar') && d.name.toLowerCase().includes('aadhaar'))
  );

  if (docIdx !== -1) {
    const doc = mockUploadedDocuments[docIdx];
    
    // Normalize status: 'Verified' -> 'Approved'
    let normalizedStatus = status;
    if (status === 'Verified') normalizedStatus = 'Approved';

    doc.status = normalizedStatus;
    if (remarks) {
      doc.remarks = remarks;
      doc.adminRemark = remarks;
    }
    doc.verifiedBy = counselorName;
    doc.verifiedAt = new Date().toISOString();

    // 1. Sync with student portal documentsStore in documentService
    try {
      await documentService.updateDocumentStatus(doc.name, normalizedStatus, remarks, counselorName);
    } catch (e) {
      console.warn('[AdminService] Could not sync with documentService:', e.message);
    }

    // 2. Dispatch real-time notification to the student's portal
    try {
      const isApproved = normalizedStatus === 'Approved';
      const isReupload = normalizedStatus === 'Re-upload Required';

      await notificationService.addNotification(doc.studentId, {
        type: isApproved ? 'completed' : isReupload ? 'action_required' : 'danger',
        title: isApproved ? `${doc.name} Approved` : isReupload ? `${doc.name} Re-upload Required` : `${doc.name} Rejected`,
        description: isApproved
          ? `Your ${doc.name} has been reviewed and approved by ${counselorName}.`
          : `Counselor note: ${remarks || 'Please re-upload a clear copy of your document.'}`,
        badgeColor: isApproved ? 'green' : isReupload ? 'yellow' : 'red',
        actionUrl: '/documents',
        actionText: 'View Documents'
      });
    } catch (e) {
      console.warn('[AdminService] Could not dispatch notification:', e.message);
    }

    return doc;
  }
  return null;
}

module.exports = {
  getAdminOverview,
  getAllStudents,
  getStudentById,
  updateStudentStatus,
  getActiveSessions,
  getMessages,
  replyToMessage,
  getAllUploadedDocuments,
  getDocumentById,
  verifyDocument,
  addOrUpdateUploadedDocument
};

