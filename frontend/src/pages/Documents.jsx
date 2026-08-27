import React, { useState, useEffect } from 'react';
import DocumentCard from '../components/documents/DocumentCard';
import DocumentUploadModal from '../components/documents/DocumentUploadModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import {
  Files,
  Upload,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  FileText,
  Info,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { useAuth } from '../context/AuthContext';

export default function Documents() {
  const { documents, fetchDocuments, loading } = useApplication();
  const { user } = useAuth();
  const [selectedDocForUpload, setSelectedDocForUpload] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const categories = ['All', 'Academic', 'Identity', 'Entrance', 'Optional'];

  // Default required document checklist definitions if list is empty
  const defaultRequiredDocs = [
    {
      id: 'doc-req-101',
      name: 'Class 10th Board Marksheet / Certificate',
      documentType: '10th Marksheet/Certificate',
      category: 'Academic',
      status: 'Missing',
      adminRemark: 'Mandatory: Date of Birth & 10th Board passing verification (Max 5 MB, PDF/JPG).',
      required: true
    },
    {
      id: 'doc-req-102',
      name: 'Class 12th (Science / PCM) Marksheet',
      documentType: '12th Marksheet/Certificate',
      category: 'Academic',
      status: 'Missing',
      adminRemark: 'Mandatory: Physics, Chemistry & Math aggregate evaluation for B.Tech admission.',
      required: true
    },
    {
      id: 'doc-req-103',
      name: 'Government ID Proof (Aadhaar / Passport)',
      documentType: 'Aadhaar/ID Proof',
      category: 'Identity',
      status: 'Missing',
      adminRemark: 'Mandatory: Official Government photo identity proof for KYC registration.',
      required: true
    },
    {
      id: 'doc-req-104',
      name: 'Recent Passport-Size Color Photograph',
      documentType: 'Passport-Size Photograph',
      category: 'Identity',
      status: 'Missing',
      adminRemark: 'Mandatory: Clear color photo with plain background for Student ID card (Max 2 MB).',
      required: true
    },
    {
      id: 'doc-req-105',
      name: 'Candidate Specimen Signature Scan',
      documentType: 'Signature',
      category: 'Identity',
      status: 'Missing',
      adminRemark: 'Mandatory: Clear specimen signature on plain white paper (Max 2 MB, PNG/JPG).',
      required: true
    },
    {
      id: 'doc-req-106',
      name: 'JEE (Main) 2026 / OJEE Scorecard',
      documentType: 'Other',
      category: 'Entrance',
      status: 'Missing',
      adminRemark: 'Recommended: National/State entrance rank card for scholarship and branch preference.',
      required: false
    },
    {
      id: 'doc-req-107',
      name: 'Diploma Certificate / Transcripts',
      documentType: 'Diploma Certificate',
      category: 'Academic',
      status: 'Missing',
      adminRemark: 'Required only for applicants applying for Direct 2nd Year Lateral Entry.',
      required: false
    }
  ];

  const displayDocs = documents && documents.length > 0 ? documents : defaultRequiredDocs;

  const filteredDocs = displayDocs.filter(d => {
    if (activeCategoryFilter === 'All') return true;
    return d.category?.toLowerCase() === activeCategoryFilter.toLowerCase();
  });

  const verifiedCount = displayDocs.filter(d => d.status === 'Verified' || d.status === 'Approved').length;
  const missingCount = displayDocs.filter(d => d.status === 'Missing' || d.status === 'Pending' || d.status === 'Re-upload Required').length;

  const handleOpenUpload = (doc) => {
    setSelectedDocForUpload(doc || defaultRequiredDocs[0]);
    setModalOpen(true);
  };

  const handleUploadSuccess = () => {
    fetchDocuments();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Document Verification Center</h1>
            <Badge variant="primary" size="sm">
              AI OCR & Administrative Audit
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload required academic certificates, identity proofs, and photographs for official admission verification.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Upload}
          onClick={() => handleOpenUpload(null)}
        >
          Upload Document
        </Button>
      </div>

      {/* Verification Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Verified Documents</span>
            <span className="text-xl font-black text-slate-900">{verifiedCount} / {displayDocs.length}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Uploads Required</span>
            <span className="text-xl font-black text-amber-600">{missingCount} Pending</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-blue-700 font-medium block">AI Real-Time Verification</span>
            <span className="text-xs font-bold text-slate-800">Direct Sync to Admissions Desk</span>
          </div>
        </div>
      </div>

      {/* Official Guidelines Callout Box */}
      <div className="p-4 rounded-2xl bg-blue-900/10 border border-blue-200/80 text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Mandatory Document Upload Guidelines (Session 2026–27)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-600">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>Accepted Formats:</strong> PDF, JPG, JPEG, PNG (Clean scans with all 4 corners visible).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>Size Limits:</strong> Up to 5 MB for marksheets & certificates; 2 MB for Photo & Signature.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span><strong>Verification Time:</strong> AI OCR pre-scan is instant; counselor verification within 24 hours.</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategoryFilter === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      {loading && displayDocs.length === 0 ? (
        <LoadingSpinner message="Loading document checklist..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onUploadClick={handleOpenUpload}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        documentData={selectedDocForUpload}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
