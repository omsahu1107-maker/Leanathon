const documentService = require('../services/documentService');

async function getDocuments(req, res, next) {
  try {
    const studentId = req.params.studentId || 'std_9841';
    const docs = await documentService.getDocumentsByStudentId(studentId);

    res.status(200).json({
      success: true,
      count: docs.length,
      data: docs
    });
  } catch (error) {
    next(error);
  }
}

async function uploadDocument(req, res, next) {
  try {
    const { studentId, docId, docName, category } = req.body;
    const file = req.file;

    const docRecord = await documentService.uploadDocumentRecord({
      studentId: studentId || 'std_9841',
      docId,
      docName,
      category,
      fileInfo: file
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully and queued for AI verification',
      data: docRecord
    });
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const updated = await documentService.updateDocumentStatus(id, status, remarks);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Document ${id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Document status updated',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDocuments,
  uploadDocument,
  updateStatus
};
