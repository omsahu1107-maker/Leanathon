import React, { useState, useRef } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';
import documentService from '../../services/documentService';

export default function DocumentUploadModal({
  isOpen,
  onClose,
  documentData,
  onUploadSuccess
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, processing, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const resetState = () => {
    setSelectedFile(null);
    setUploadState('idle');
    setUploadProgress(0);
    setErrorMessage('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds 10MB limit.');
        return;
      }
      setSelectedFile(file);
      setErrorMessage('');
    }
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setUploadState('uploading');
    setUploadProgress(30);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('docId', documentData?.id || '');
      formData.append('docName', documentData?.name || selectedFile.name);
      formData.append('category', documentData?.category || 'Academic');
      formData.append('studentId', 'std_9841');

      // Simulate network upload progress
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + 20;
        });
      }, 150);

      const result = await documentService.uploadDocument(formData);
      clearInterval(progressTimer);
      setUploadProgress(100);
      setUploadState('processing'); // AI verification pipeline state

      setTimeout(() => {
        setUploadState('success');
        if (onUploadSuccess) onUploadSuccess(result);
        setTimeout(() => {
          resetState();
          onClose();
        }, 1200);
      }, 1000);
    } catch (err) {
      setUploadState('error');
      setErrorMessage(err.message || 'Failed to upload document. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetState();
        onClose();
      }}
      title={`Upload ${documentData?.name || 'Document'}`}
      subtitle={`Category: ${documentData?.category || 'General'} • Max 10MB (PDF, JPG, PNG)`}
    >
      <div className="space-y-4">
        {/* Upload Zone */}
        {uploadState === 'idle' && (
          <div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/60 hover:bg-brand-50/30 group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <div className="w-12 h-12 rounded-xl bg-white text-slate-400 group-hover:text-brand-600 shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-3 transition-colors">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Click to browse or drag and drop file here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Accepted formats: PDF, JPG, PNG (up to 10MB)
              </p>
            </div>

            {selectedFile && (
              <div className="mt-3 p-3 rounded-lg bg-brand-50/60 border border-brand-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{selectedFile.name}</p>
                    <p className="text-[10px] text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Uploading State */}
        {uploadState === 'uploading' && (
          <div className="text-center py-6 space-y-3">
            <ProgressBar percentage={uploadProgress} size="md" color="brand" showLabel />
            <p className="text-xs text-slate-500">Transmitting encrypted document to secure server...</p>
          </div>
        )}

        {/* Processing State (Document AI OCR) */}
        {uploadState === 'processing' && (
          <div className="text-center py-6 space-y-3 bg-brand-50/50 rounded-xl border border-brand-100 p-4">
            <div className="flex items-center justify-center gap-2 text-brand-600">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-semibold text-sm">AI Document Verification in Progress</span>
            </div>
            <p className="text-xs text-slate-600">
              Extracting candidate name, roll number, and marks via OCR engine...
            </p>
          </div>
        )}

        {/* Success State */}
        {uploadState === 'success' && (
          <div className="text-center py-6 space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Document Uploaded Successfully</h4>
            <p className="text-xs text-slate-500">Verification record has been updated.</p>
          </div>
        )}

        {/* Error State */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        {uploadState === 'idle' && (
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetState();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={!selectedFile}
              onClick={handleUploadSubmit}
            >
              Start Upload & Verify
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
