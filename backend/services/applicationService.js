const { db, isFirebaseInitialized } = require('../config/firebase');

let activeApplication = {
  id: 'ADM-2026-8941',
  studentId: 'std_9841',
  studentName: 'Applicant',
  program: 'B.Tech in Computer Science & Engineering',
  academicYear: '2026-2027',
  currentStage: 'Personal Details',
  currentStageNumber: 1,
  overallStatus: 'Documents Pending',
  statusRemark: 'Application initiated. Please complete your academic details and upload required marksheets.',
  completionPercentage: 20,
  dropOffRisk: 'Medium',
  riskFactor: 'New applicant. Step 1 of 5 completed during initial registration.',
  lastUpdated: new Date().toISOString(),
  coursePreferences: [
    { priority: 1, courseId: 'btech-cse', courseName: 'B.Tech in Computer Science & Engineering' }
  ],
  progressChecklist: {
    personal: true,
    academic: false,
    courseSelection: true,
    documents: false,
    finalReview: false
  },
  stages: [
    {
      id: 1,
      name: 'Registration & Initial Sign Up',
      status: 'completed',
      completedAt: new Date().toISOString(),
      description: 'Student account created and fast-track registration confirmed.'
    },
    {
      id: 2,
      name: 'Personal & Residential Details',
      status: 'in-progress',
      completedAt: null,
      description: 'Complete parent info, contact addresses, and identity details.'
    },
    {
      id: 3,
      name: 'Academic Records Entry',
      status: 'pending',
      completedAt: null,
      description: 'Enter 10th and 12th board marks and entrance roll numbers.'
    },
    {
      id: 4,
      name: 'Document Upload & Verification',
      status: 'pending',
      completedAt: null,
      description: 'Upload required marksheets, photo, and ID proofs for review.'
    },
    {
      id: 5,
      name: 'Administrative Audit & Final Review',
      status: 'pending',
      completedAt: null,
      description: 'Counselor verification and provisional seat allocation.'
    }
  ]
};

/**
 * Calculate dynamic application progress percentage & overall admission status
 */
function recalculateApplicationState(app) {
  const documentService = require('./documentService');
  const docs = documentService.documentsStore || [];
  const studentDocs = docs.filter(d => d.studentId === app.studentId || d.studentId === 'std_9841');

  const hasReupload = studentDocs.some(d => d.status === 'Re-upload Required');
  const hasPending = studentDocs.some(d => d.status === 'Pending' || d.status === 'Processing');
  const hasRejected = studentDocs.some(d => d.status === 'Rejected');
  const approvedCount = studentDocs.filter(d => d.status === 'Approved' || d.status === 'Verified').length;
  const uploadedCount = studentDocs.filter(d => d.status && d.status !== 'Missing').length;

  // Determine Overall Application Status
  if (hasReupload) {
    app.overallStatus = 'Re-upload Required';
    app.statusRemark = 'One or more uploaded documents were flagged by admissions. Please upload required files.';
  } else if (hasRejected) {
    app.overallStatus = 'Application Rejected';
    app.statusRemark = 'Document verification failed eligibility criteria.';
  } else if (hasPending) {
    app.overallStatus = 'Under Verification';
    app.statusRemark = 'Documents are currently undergoing administrative OCR & credential review.';
  } else if (approvedCount >= 5) {
    app.overallStatus = 'Documents Approved';
    app.statusRemark = 'All submitted academic credentials and identity proofs are verified.';
  } else if (uploadedCount > 0) {
    app.overallStatus = 'Under Verification';
    app.statusRemark = 'Uploaded marksheets are queued for counselor verification.';
  } else {
    app.overallStatus = 'Documents Pending';
    app.statusRemark = 'Please complete document uploads to progress your application.';
  }

  let score = 20; // 20% for completed registration
  if (app.progressChecklist?.academic) score += 20;
  if (app.progressChecklist?.courseSelection) score += 20;
  if (uploadedCount >= 3) score += 20;
  if (approvedCount >= 4) score += 20;

  app.completionPercentage = Math.min(100, score);

  if (app.completionPercentage >= 90) {
    app.dropOffRisk = 'Low';
    app.riskFactor = 'Application nearly complete. Awaiting enrollment confirmation.';
  } else if (app.completionPercentage >= 50) {
    app.dropOffRisk = 'Medium';
    app.riskFactor = 'Pending documents require attention before admission phase deadline.';
  } else {
    app.dropOffRisk = 'Medium';
    app.riskFactor = 'Fresh candidate. Please complete academic records and document uploads.';
  }

  return app;
}

async function getApplicationById(id) {
  if (isFirebaseInitialized && db) {
    try {
      const doc = await db.collection('applications').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    } catch (err) {
      console.warn('[ApplicationService] Firestore fetch failed:', err.message);
    }
  }

  return recalculateApplicationState(activeApplication);
}

async function updateApplication(id, updateData) {
  activeApplication = {
    ...activeApplication,
    ...updateData,
    lastUpdated: new Date().toISOString()
  };

  const updated = recalculateApplicationState(activeApplication);

  if (isFirebaseInitialized && db) {
    try {
      await db.collection('applications').doc(id).set(updated, { merge: true });
    } catch (err) {
      console.warn('[ApplicationService] Firestore update failed:', err.message);
    }
  }

  return updated;
}

async function setOverallStatus(status, remarks = '') {
  activeApplication.overallStatus = status;
  if (remarks) activeApplication.statusRemark = remarks;
  activeApplication.lastUpdated = new Date().toISOString();
  return recalculateApplicationState(activeApplication);
}

async function createFreshStudentApplication(studentId, applicationId, studentName, program, pcmPercentage, state) {
  const sId = studentId || 'std_9841';
  const appId = applicationId || 'ADM-2026-8941';
  const name = studentName || 'Applicant';
  const prog = program || 'B.Tech in Computer Science & Engineering';

  activeApplication = {
    id: appId,
    studentId: sId,
    studentName: name,
    program: prog,
    academicYear: '2026-2027',
    currentStage: 'Personal Details',
    currentStageNumber: 1,
    overallStatus: 'Documents Pending',
    statusRemark: 'Application initiated. Please complete your academic details and upload required marksheets.',
    completionPercentage: 20,
    dropOffRisk: 'Medium',
    riskFactor: 'New applicant. Step 1 of 5 completed during initial registration.',
    lastUpdated: new Date().toISOString(),
    coursePreferences: [
      { priority: 1, courseId: 'btech-cse', courseName: prog }
    ],
    progressChecklist: {
      personal: true,
      academic: false,
      courseSelection: true,
      documents: false,
      finalReview: false
    },
    stages: [
      {
        id: 1,
        name: 'Registration & Initial Sign Up',
        status: 'completed',
        completedAt: new Date().toISOString(),
        description: 'Student account created and fast-track registration confirmed.'
      },
      {
        id: 2,
        name: 'Personal & Residential Details',
        status: 'in-progress',
        completedAt: null,
        description: 'Complete parent info, contact addresses, and identity details.'
      },
      {
        id: 3,
        name: 'Academic Records Entry',
        status: 'pending',
        completedAt: null,
        description: 'Enter 10th and 12th board marks and entrance roll numbers.'
      },
      {
        id: 4,
        name: 'Document Upload & Verification',
        status: 'pending',
        completedAt: null,
        description: 'Upload required marksheets, photo, and ID proofs for review.'
      },
      {
        id: 5,
        name: 'Administrative Audit & Final Review',
        status: 'pending',
        completedAt: null,
        description: 'Counselor verification and provisional seat allocation.'
      }
    ]
  };

  return activeApplication;
}

module.exports = {
  getApplicationById,
  updateApplication,
  setOverallStatus,
  createFreshStudentApplication
};
