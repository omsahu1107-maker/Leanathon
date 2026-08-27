import api from './api';

/**
 * Document Service — connects to backend REST API
 * Backend response shape:
 *   GET:    { success: true, count: N, data: [...documents] }
 *   POST:   { success: true, message: '...', data: { ...docRecord } }
 *   PATCH:  { success: true, message: '...', data: { ...updatedDoc } }
 */

export async function getDocuments(studentId = 'std_9841') {
  const response = await api.get(`/documents/${studentId}`);
  return response.data; // array of documents
}

export async function uploadDocument(formData) {
  // formData is a FormData object with fields: file, docId, docName, category, studentId
  const response = await api.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data; // uploaded document record
}

export async function updateDocumentStatus(id, status, remarks) {
  const response = await api.patch(`/documents/${id}/status`, { status, remarks });
  return response.data; // updated document record
}

export default {
  getDocuments,
  uploadDocument,
  updateDocumentStatus
};
