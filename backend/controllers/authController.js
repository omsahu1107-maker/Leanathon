const { mockStudentProfile } = require('../data/mockData');
const { auth, db, isFirebaseInitialized } = require('../config/firebase');
const studentService = require('../services/studentService');
const applicationService = require('../services/applicationService');
const documentService = require('../services/documentService');
const notificationService = require('../services/notificationService');

async function getCurrentUser(req, res, next) {
  try {
    const profile = await studentService.getStudentProfile('std_9841');
    res.status(200).json({
      success: true,
      user: {
        id: profile.id || 'std_9841',
        name: profile.name || 'Rahul Sharma',
        email: profile.email || 'rahul.sharma@example.com',
        phone: profile.phone || '+91 98765 43210',
        avatarUrl: profile.avatarUrl,
        applicationId: profile.applicationId || 'ADM-2026-8941',
        role: 'student'
      }
    });
  } catch (error) {
    next(error);
  }
}

async function loginMock(req, res, next) {
  try {
    const { email, applicationId, password, role } = req.body;
    
    if (role === 'admin') {
      return res.status(200).json({
        success: true,
        message: 'Admin staff authenticated successfully',
        token: 'mock-jwt-token-admitai-admin-session',
        user: {
          id: 'adm_counselor_01',
          name: 'Dr. S. K. Patnaik',
          email: email || 'counselor@giet.edu',
          role: 'admin'
        }
      });
    }

    const current = await studentService.getStudentProfile('std_9841');

    res.status(200).json({
      success: true,
      message: 'Student logged in successfully',
      token: 'mock-jwt-token-admitai-student-session',
      user: {
        id: current.id || 'std_9841',
        name: current.name || 'Rahul Sharma',
        email: email || current.email,
        phone: current.phone,
        applicationId: applicationId || current.applicationId || 'ADM-2026-8941',
        role: 'student'
      }
    });
  } catch (error) {
    next(error);
  }
}

async function registerStudent(req, res, next) {
  try {
    const { name, email, phone, program, state, pcmPercentage, password } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Name, Email, and Mobile Number are required for registration.'
      });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newStudentId = `std_${randomSuffix}`;
    const newApplicationId = `ADM-2026-${randomSuffix}`;

    const newStudent = {
      id: newStudentId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      applicationId: newApplicationId,
      category: 'General',
      bloodGroup: 'B+',
      targetProgram: program || 'B.Tech in Computer Science & Engineering',
      registeredAt: new Date().toISOString(),
      role: 'student',
      status: 'Registered',
      address: {
        line1: 'Campus Residence / Native Address',
        city: 'Bhubaneswar',
        state: state || 'Odisha',
        pincode: '751024',
        country: 'India'
      },
      guardian: {
        name: 'Parent / Guardian',
        relation: 'Father',
        phone: phone.trim(),
        occupation: 'Professional'
      },
      academics: {
        tenth: {
          school: '',
          board: 'CBSE / State Board',
          passingYear: '2024',
          percentage: ''
        },
        twelfth: {
          school: '',
          board: 'CHSE / CBSE Board',
          passingYear: '2026',
          stream: 'Science (PCM)',
          percentage: parseFloat(pcmPercentage) || 89.5,
          pcmPercentage: parseFloat(pcmPercentage) || 89.5
        },
        entranceExam: {
          name: 'JEE (Main) 2026',
          rollNumber: `2608${randomSuffix}`,
          rank: '18450',
          percentile: 94.2
        }
      }
    };

    // 1. Update active student profile in memory
    await studentService.updateStudentProfile('std_9841', newStudent);
    await studentService.updateStudentProfile(newStudentId, newStudent);

    // 2. Initialize clean, fresh documents checklist for the new student
    if (documentService.createFreshStudentDocuments) {
      await documentService.createFreshStudentDocuments('std_9841', newApplicationId, name.trim());
      await documentService.createFreshStudentDocuments(newStudentId, newApplicationId, name.trim());
    }

    // 3. Initialize clean, fresh application starting at Step 1
    let freshApp;
    if (applicationService.createFreshStudentApplication) {
      freshApp = await applicationService.createFreshStudentApplication(
        'std_9841',
        newApplicationId,
        name.trim(),
        newStudent.targetProgram,
        pcmPercentage,
        state
      );
    }

    // 4. Initialize fresh welcome notification
    if (notificationService.createFreshStudentNotifications) {
      await notificationService.createFreshStudentNotifications('std_9841', name.trim(), newApplicationId);
      await notificationService.createFreshStudentNotifications(newStudentId, name.trim(), newApplicationId);
    }

    // 5. Save to Cloud Firestore if initialized
    if (isFirebaseInitialized && db) {
      try {
        await db.collection('students').doc(newStudentId).set(newStudent);
        await db.collection('applications').doc(newApplicationId).set(freshApp || {
          id: newApplicationId,
          studentId: newStudentId,
          studentName: name,
          program: newStudent.targetProgram,
          overallStatus: 'Documents Pending',
          statusRemark: 'Account registered. Please proceed to upload mandatory documents.',
          completionPercentage: 20,
          createdAt: new Date().toISOString()
        });
        console.log(`[Firebase Auth] New student registered freshly in Firestore: ${newStudentId} (${newApplicationId})`);
      } catch (err) {
        console.warn('[Firebase Auth] Firestore registration save failed:', err.message);
      }
    }

    res.status(201).json({
      success: true,
      message: `Registration successful! Your Application ID is ${newApplicationId}`,
      token: `token-session-${newStudentId}`,
      user: newStudent,
      profile: newStudent,
      application: freshApp,
      applicationId: newApplicationId
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCurrentUser,
  loginMock,
  registerStudent
};
