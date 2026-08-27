const adminService = require('../services/adminService');

async function getOverview(req, res, next) {
  try {
    const data = await adminService.getAdminOverview();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
}

async function getStudents(req, res, next) {
  try {
    const { status, search } = req.query;
    const students = await adminService.getAllStudents({ status, search });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
}

async function getStudentDetails(req, res, next) {
  try {
    const { id } = req.params;
    const student = await adminService.getStudentById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: `Student record ${id} not found.`
      });
    }
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
}

async function updateStudentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    const updated = await adminService.updateStudentStatus(id, status, remarks);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Student ${id} not found.`
      });
    }
    res.status(200).json({
      success: true,
      message: 'Student application status updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

async function getActiveSessions(req, res, next) {
  try {
    const sessions = await adminService.getActiveSessions();
    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (error) {
    next(error);
  }
}

async function getMessages(req, res, next) {
  try {
    const { channel, status } = req.query;
    const messages = await adminService.getMessages({ channel, status });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
}

async function replyToMessage(req, res, next) {
  try {
    const { id } = req.params;
    const { replyText, counselorName } = req.body;
    const updated = await adminService.replyToMessage(id, replyText, counselorName);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Inquiry ticket ${id} not found.`
      });
    }
    res.status(200).json({
      success: true,
      message: 'Counselor reply sent and recorded',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

async function getDocuments(req, res, next) {
  try {
    const { studentId, status, category, search } = req.query;
    const docs = await adminService.getAllUploadedDocuments({ studentId, status, category, search });
    res.status(200).json({
      success: true,
      count: docs.length,
      data: docs
    });
  } catch (error) {
    next(error);
  }
}

async function getDocumentDetails(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await adminService.getDocumentById(id);
    if (!doc) {
      return res.status(404).json({
        success: false,
        error: `Document ${id} not found.`
      });
    }
    res.status(200).json({
      success: true,
      data: doc
    });
  } catch (error) {
    next(error);
  }
}

async function verifyDocument(req, res, next) {
  try {
    const { id } = req.params;
    const { status, remarks, counselorName } = req.body;
    const updated = await adminService.verifyDocument(id, status, remarks, counselorName);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Document ${id} not found.`
      });
    }
    res.status(200).json({
      success: true,
      message: `Document status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOverview,
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

