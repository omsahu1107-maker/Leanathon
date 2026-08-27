const { mockDocuments } = require('../data/mockData');
const { db, bucket, isFirebaseInitialized } = require('../config/firebase');
const emailService = require('./emailService');

// In-Memory / Firestore-backed document records
let documentsStore = [
  {
    id: 'doc-101',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    documentType: '10th Marksheet/Certificate',
    name: '10th Marksheet/Certificate',
    category: 'Academic',
    fileName: '10th_Marksheet_CBSE_Rahul.pdf',
    storagePath: 'students/std_9841/10th_Marksheet_CBSE_Rahul.pdf',
    downloadURL: '/documents/marksheet_12th.jpg',
    fileUrl: '/documents/marksheet_12th.jpg',
    imageUrl: '/documents/marksheet_12th.jpg',
    fileSize: '1.8 MB',
    uploadedAt: '2026-08-18T10:45:00.000Z',
    status: 'Approved', // 'Pending' | 'Approved' | 'Rejected' | 'Re-upload Required'
    adminRemark: 'Board authentication and date of birth verified (DOB: 14-07-2008).',
    verifiedAt: '2026-08-18T10:46:00.000Z',
    verifiedBy: 'Dr. S. K. Patnaik',
    confidenceScore: 100
  },
  {
    id: 'doc-102',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    documentType: '12th Marksheet/Certificate',
    name: '12th Marksheet/Certificate',
    category: 'Academic',
    fileName: 'Rahul_Sharma_CHSE_12th_Marksheet.pdf',
    storagePath: 'students/std_9841/Rahul_Sharma_CHSE_12th_Marksheet.pdf',
    downloadURL: '/documents/marksheet_12th.jpg',
    fileUrl: '/documents/marksheet_12th.jpg',
    imageUrl: '/documents/marksheet_12th.jpg',
    fileSize: '2.14 MB',
    uploadedAt: '2026-08-20T14:35:00.000Z',
    status: 'Approved',
    adminRemark: 'PCM percentage 91.2% confirmed. Validated for B.Tech Computer Science.',
    verifiedAt: '2026-08-20T14:36:00.000Z',
    verifiedBy: 'Dr. S. K. Patnaik',
    confidenceScore: 99.2
  },
  {
    id: 'doc-103',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    documentType: 'Aadhaar/ID Proof',
    name: 'Aadhaar/ID Proof',
    category: 'Identity',
    fileName: 'Aadhaar_Card_Masked_Rahul.pdf',
    storagePath: 'students/std_9841/Aadhaar_Card_Masked_Rahul.pdf',
    downloadURL: '/documents/aadhaar_card.jpg',
    fileUrl: '/documents/aadhaar_card.jpg',
    imageUrl: '/documents/aadhaar_card.jpg',
    fileSize: '890 KB',
    uploadedAt: '2026-08-18T11:00:00.000Z',
    status: 'Approved',
    adminRemark: 'UIDAI QR code cryptographically validated. Address: Bhubaneswar, Odisha.',
    verifiedAt: '2026-08-18T11:01:00.000Z',
    verifiedBy: 'Dr. S. K. Patnaik',
    confidenceScore: 97.5
  },
  {
    id: 'doc-104',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    documentType: 'Passport-Size Photograph',
    name: 'Passport-Size Photograph',
    category: 'Identity',
    fileName: 'Passport_Photo_Rahul.jpg',
    storagePath: 'students/std_9841/Passport_Photo_Rahul.jpg',
    downloadURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
    fileUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
    fileSize: '420 KB',
    uploadedAt: '2026-08-18T11:25:00.000Z',
    status: 'Approved',
    adminRemark: 'Photo dimensions and plain background accepted.',
    verifiedAt: '2026-08-18T11:26:00.000Z',
    verifiedBy: 'Dr. S. K. Patnaik',
    confidenceScore: 95
  },
  {
    id: 'doc-105',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    documentType: 'Signature',
    name: 'Signature Scan',
    category: 'Identity',
    fileName: 'Rahul_Signature.png',
    storagePath: 'students/std_9841/Rahul_Signature.png',
    downloadURL: '/documents/aadhaar_card.jpg',
    fileUrl: '/documents/aadhaar_card.jpg',
    imageUrl: '/documents/aadhaar_card.jpg',
    fileSize: '150 KB',
    uploadedAt: '2026-08-18T11:30:00.000Z',
    status: 'Approved',
    adminRemark: 'Specimen signature matched application declaration.',
    verifiedAt: '2026-08-18T11:31:00.000Z',
    verifiedBy: 'Dr. S. K. Patnaik',
    confidenceScore: 98
  },
  {
    id: 'doc-106',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    documentType: 'Other',
    name: 'JEE Main 2026 Rank Card',
    category: 'Entrance',
    fileName: 'JEE_Main_2026_Rahul_Scorecard.pdf',
    storagePath: 'students/std_9841/JEE_Main_2026_Rahul_Scorecard.pdf',
    downloadURL: '/documents/jee_scorecard.jpg',
    fileUrl: '/documents/jee_scorecard.jpg',
    imageUrl: '/documents/jee_scorecard.jpg',
    fileSize: '1.45 MB',
    uploadedAt: '2026-08-21T11:20:00.000Z',
    status: 'Approved',
    adminRemark: 'JEE NTA score 94.2045 percentile verified. All India Rank #18450 confirmed.',
    verifiedAt: '2026-08-21T15:40:00.000Z',
    verifiedBy: 'Dr. S. K. Patnaik',
    confidenceScore: 98.7
  },
  {
    id: 'doc-107',
    studentId: 'std_9841',
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    documentType: 'Diploma Certificate',
    name: 'Diploma Certificate (Lateral Entry)',
    category: 'Academic',
    fileName: null,
    storagePath: null,
    downloadURL: null,
    fileUrl: null,
    imageUrl: null,
    fileSize: null,
    uploadedAt: null,
    status: 'Pending', // Optional for 1st year B.Tech, required for Lateral Entry
    adminRemark: 'Upload if seeking direct 2nd Year Lateral Entry admission.',
    verifiedAt: null,
    verifiedBy: null,
    confidenceScore: null
  }
];

async function getDocumentsByStudentId(studentId) {
  const sId = studentId || 'std_9841';

  if (isFirebaseInitialized && db) {
    try {
      const snapshot = await db.collection('documents').where('studentId', '==', sId).get();
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('[DocumentService] Firestore fetch failed:', err.message);
    }
  }

  const existing = documentsStore.filter(d => !studentId || d.studentId === sId || d.studentId === 'std_9841');
  if (existing && existing.length > 0) {
    return existing;
  }

  // If empty, generate standard required document slots
  return createFreshStudentDocuments(sId, 'ADM-2026-8941', 'Student');
}

/**
 * Handle new document upload by student (Stores file in Storage and metadata in Firestore)
 */
async function uploadDocumentRecord({ studentId, docId, docName, documentType, category, fileInfo }) {
  const sId = studentId || 'std_9841';
  const fileUrl = fileInfo ? `http://localhost:5000/uploads/${fileInfo.filename}` : null;
  const isImage = fileInfo?.mimetype?.startsWith('image/') || false;

  let storagePath = fileInfo ? `students/${sId}/${fileInfo.filename}` : null;
  let downloadURL = fileUrl || '/documents/marksheet_12th.jpg';

  // Live Firebase Storage upload if initialized
  if (isFirebaseInitialized && bucket && fileInfo?.path) {
    try {
      const destination = `students/${sId}/${fileInfo.filename}`;
      await bucket.upload(fileInfo.path, {
        destination,
        metadata: {
          contentType: fileInfo.mimetype
        }
      });
      const [signedUrl] = await bucket.file(destination).getSignedUrl({
        action: 'read',
        expires: '03-17-2030'
      });
      downloadURL = signedUrl;
      storagePath = destination;
      console.log(`[DocumentService] File uploaded to Firebase Storage: ${destination}`);
    } catch (err) {
      console.warn('[DocumentService] Firebase Storage upload failed:', err.message);
    }
  }

  const existingIdx = documentsStore.findIndex(d => 
    (docId && d.id === docId) || 
    (d.name.toLowerCase() === (docName || '').toLowerCase() && d.studentId === sId) ||
    (documentType && d.documentType?.toLowerCase() === documentType.toLowerCase() && d.studentId === sId)
  );

  const newDoc = {
    id: docId || `doc-${Date.now()}`,
    studentId: sId,
    registrationNumber: 'ADM-2026-8941',
    rollNumber: '26084918',
    studentName: 'Rahul Sharma',
    documentType: documentType || docName || 'Other',
    name: docName || documentType || 'Uploaded Document',
    category: category || 'Academic',
    fileName: fileInfo?.originalname || 'Uploaded_File.pdf',
    storagePath,
    downloadURL,
    fileUrl: downloadURL,
    imageUrl: isImage ? downloadURL : '/documents/marksheet_12th.jpg',
    fileSize: fileInfo ? `${(fileInfo.size / (1024 * 1024)).toFixed(2)} MB` : '1.5 MB',
    uploadedAt: new Date().toISOString(),
    status: 'Pending', // Fresh upload starts in Pending for Admin audit
    verifiedAt: null,
    verifiedBy: null,
    confidenceScore: 96.5,
    adminRemark: 'Document uploaded successfully. Awaiting administrative review.'
  };

  if (existingIdx >= 0) {
    documentsStore[existingIdx] = {
      ...documentsStore[existingIdx],
      ...newDoc,
      id: documentsStore[existingIdx].id
    };
  } else {
    documentsStore.push(newDoc);
  }

  // Save/Update metadata in Cloud Firestore
  if (isFirebaseInitialized && db) {
    try {
      await db.collection('documents').doc(newDoc.id).set(newDoc, { merge: true });
      console.log(`[DocumentService] Document metadata saved in Firestore: ${newDoc.id}`);
    } catch (err) {
      console.warn('[DocumentService] Firestore write failed:', err.message);
    }
  }

  // Sync to Admin Document Audit Queue
  try {
    const adminService = require('./adminService');
    adminService.addOrUpdateUploadedDocument({
      ...newDoc,
      courseApplied: 'B.Tech in Computer Science & Engineering'
    });
  } catch (err) {
    console.warn('[DocumentService] Could not sync upload to adminService:', err.message);
  }

  return newDoc;
}

/**
 * Update document verification status (called by Admin / Counselor)
 * Statuses: 'Approved', 'Rejected', 'Re-upload Required', 'Pending'
 */
async function updateDocumentStatus(idOrName, status, remarks, counselorName = 'Dr. S. K. Patnaik') {
  if (!idOrName) return null;
  const q = idOrName.toLowerCase();

  // Normalize status naming: 'Verified' -> 'Approved'
  let normalizedStatus = status;
  if (status === 'Verified') normalizedStatus = 'Approved';

  const doc = documentsStore.find(d => 
    d.id.toLowerCase() === q ||
    d.name.toLowerCase() === q ||
    d.documentType?.toLowerCase() === q ||
    d.name.toLowerCase().includes(q) ||
    q.includes(d.name.toLowerCase()) ||
    (q.includes('12th') && d.name.toLowerCase().includes('12th')) ||
    (q.includes('jee') && d.name.toLowerCase().includes('jee')) ||
    (q.includes('10th') && d.name.toLowerCase().includes('10th')) ||
    (q.includes('aadhaar') && (d.name.toLowerCase().includes('aadhaar') || d.name.toLowerCase().includes('id'))) ||
    (q.includes('photo') && d.name.toLowerCase().includes('photo')) ||
    (q.includes('signature') && d.name.toLowerCase().includes('signature')) ||
    (q.includes('diploma') && d.name.toLowerCase().includes('diploma'))
  );

  if (doc) {
    doc.status = normalizedStatus;
    if (remarks) doc.adminRemark = remarks;
    doc.verifiedBy = counselorName;

    if (normalizedStatus === 'Approved') {
      doc.verifiedAt = new Date().toISOString();
    } else {
      doc.verifiedAt = null;
    }

    // Update in Cloud Firestore
    if (isFirebaseInitialized && db) {
      try {
        await db.collection('documents').doc(doc.id).update({
          status: normalizedStatus,
          adminRemark: doc.adminRemark,
          verifiedBy: doc.verifiedBy,
          verifiedAt: doc.verifiedAt
        });
      } catch (err) {
        console.warn('[DocumentService] Firestore update status failed:', err.message);
      }
    }

    // Send email notification to the student
    try {
      await emailService.sendDocumentVerificationEmail({
        studentEmail: 'rahul.sharma@example.com',
        studentName: doc.studentName || 'Rahul Sharma',
        documentName: doc.name,
        status: normalizedStatus,
        adminRemark: doc.adminRemark,
        counselorName: doc.verifiedBy
      });
    } catch (err) {
      console.warn('[DocumentService] Email notification error:', err.message);
    }

    return doc;
  }
  return null;
}

async function createFreshStudentDocuments(studentId, applicationId, studentName) {
  const sId = studentId || 'std_9841';
  const appId = applicationId || 'ADM-2026-8941';
  const name = studentName || 'Applicant';

  documentsStore = [
    {
      id: `doc-${sId}-101`,
      studentId: sId,
      registrationNumber: appId,
      rollNumber: '',
      studentName: name,
      documentType: '10th Marksheet/Certificate',
      name: '10th Marksheet / Passing Certificate',
      category: 'Academic',
      fileName: null,
      storagePath: null,
      downloadURL: null,
      fileUrl: null,
      imageUrl: null,
      fileSize: null,
      uploadedAt: null,
      status: 'Missing',
      adminRemark: 'Mandatory: Upload scanned 10th marksheet for Date of Birth & Board verification.',
      verifiedAt: null,
      verifiedBy: null,
      confidenceScore: null
    },
    {
      id: `doc-${sId}-102`,
      studentId: sId,
      registrationNumber: appId,
      rollNumber: '',
      studentName: name,
      documentType: '12th Marksheet/Certificate',
      name: '12th (PCM/PCB) Science Marksheet',
      category: 'Academic',
      fileName: null,
      storagePath: null,
      downloadURL: null,
      fileUrl: null,
      imageUrl: null,
      fileSize: null,
      uploadedAt: null,
      status: 'Missing',
      adminRemark: 'Mandatory: Upload 12th Board marksheet for branch eligibility evaluation.',
      verifiedAt: null,
      verifiedBy: null,
      confidenceScore: null
    },
    {
      id: `doc-${sId}-103`,
      studentId: sId,
      registrationNumber: appId,
      rollNumber: '',
      studentName: name,
      documentType: 'Aadhaar/ID Proof',
      name: 'Govt ID Proof (Aadhaar / Passport)',
      category: 'Identity',
      fileName: null,
      storagePath: null,
      downloadURL: null,
      fileUrl: null,
      imageUrl: null,
      fileSize: null,
      uploadedAt: null,
      status: 'Missing',
      adminRemark: 'Mandatory: Upload Govt. issued photo identity proof for KYC compliance.',
      verifiedAt: null,
      verifiedBy: null,
      confidenceScore: null
    },
    {
      id: `doc-${sId}-104`,
      studentId: sId,
      registrationNumber: appId,
      rollNumber: '',
      studentName: name,
      documentType: 'Passport-Size Photograph',
      name: 'Recent Passport-Size Color Photograph',
      category: 'Identity',
      fileName: null,
      storagePath: null,
      downloadURL: null,
      fileUrl: null,
      imageUrl: null,
      fileSize: null,
      uploadedAt: null,
      status: 'Missing',
      adminRemark: 'Upload recent color passport photo with clear plain background.',
      verifiedAt: null,
      verifiedBy: null,
      confidenceScore: null
    },
    {
      id: `doc-${sId}-105`,
      studentId: sId,
      registrationNumber: appId,
      rollNumber: '',
      studentName: name,
      documentType: 'Signature',
      name: 'Specimen Signature Scan',
      category: 'Identity',
      fileName: null,
      storagePath: null,
      downloadURL: null,
      fileUrl: null,
      imageUrl: null,
      fileSize: null,
      uploadedAt: null,
      status: 'Missing',
      adminRemark: 'Upload clear specimen signature on white paper.',
      verifiedAt: null,
      verifiedBy: null,
      confidenceScore: null
    },
    {
      id: `doc-${sId}-106`,
      studentId: sId,
      registrationNumber: appId,
      rollNumber: '',
      studentName: name,
      documentType: 'Other',
      name: 'JEE Main 2026 / OJEE Entrance Rank Card',
      category: 'Entrance',
      fileName: null,
      storagePath: null,
      downloadURL: null,
      fileUrl: null,
      imageUrl: null,
      fileSize: null,
      uploadedAt: null,
      status: 'Missing',
      adminRemark: 'Optional: Upload JEE/OJEE scorecard for quota & merit scholarship consideration.',
      verifiedAt: null,
      verifiedBy: null,
      confidenceScore: null
    }
  ];

  return documentsStore;
}

module.exports = {
  getDocumentsByStudentId,
  uploadDocumentRecord,
  updateDocumentStatus,
  createFreshStudentDocuments,
  documentsStore
};
