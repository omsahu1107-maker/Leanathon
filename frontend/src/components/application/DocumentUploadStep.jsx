import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { Upload, CheckCircle2, AlertTriangle, Clock, FileCheck, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import documentService from '../../services/documentService';
import DocumentUploadModal from '../documents/DocumentUploadModal';

export default function DocumentUploadStep({ documents = [], onRefreshDocs }) {
  const navigate = useNavigate();
  const [selectedDocForUpload, setSelectedDocForUpload] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const defaultRequiredDocs = [
    {
      id: 'doc-101',
      name: 'Class 10th Board Marksheet / Certificate',
      documentType: '10th Marksheet/Certificate',
      category: 'Academic',
      status: 'Missing',
      adminRemark: 'Mandatory: Date of Birth & 10th Board passing verification (Max 5 MB, PDF/JPG).'
    },
    {
      id: 'doc-102',
      name: 'Class 12th (Science / PCM) Marksheet',
      documentType: '12th Marksheet/Certificate',
      category: 'Academic',
      status: 'Missing',
      adminRemark: 'Mandatory: Physics, Chemistry & Math aggregate evaluation for B.Tech admission.'
    },
    {
      id: 'doc-103',
      name: 'Government ID Proof (Aadhaar / Passport)',
      documentType: 'Aadhaar/ID Proof',
      category: 'Identity',
      status: 'Missing',
      adminRemark: 'Mandatory: Official Government photo identity proof for KYC registration.'
    },
    {
      id: 'doc-104',
      name: 'Recent Passport-Size Color Photograph',
      documentType: 'Passport-Size Photograph',
      category: 'Identity',
      status: 'Missing',
      adminRemark: 'Mandatory: Clear color photo with plain background for Student ID card.'
    },
    {
      id: 'doc-105',
      name: 'Candidate Specimen Signature Scan',
      documentType: 'Signature',
      category: 'Identity',
      status: 'Missing',
      adminRemark: 'Mandatory: Clear specimen signature on plain white paper (Max 2 MB).'
    },
    {
      id: 'doc-106',
      name: 'JEE (Main) 2026 / OJEE Entrance Scorecard',
      documentType: 'Other',
      category: 'Entrance',
      status: 'Missing',
      adminRemark: 'Recommended: National/State entrance rank card for scholarship and branch preference.'
    }
  ];

  const docsToRender = documents && documents.length > 0 ? documents : defaultRequiredDocs;
  const verifiedCount = docsToRender.filter(d => d.status === 'Verified' || d.status === 'Approved').length;

  const handleOpenUpload = (doc) => {
    setSelectedDocForUpload(doc);
    setModalOpen(true);
  };

  const handleUploadSuccess = () => {
    if (onRefreshDocs) onRefreshDocs();
  };

  return (
    <Card className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Mandatory Document Upload Checklist</h3>
            <Badge variant="primary" size="sm">
              Step 4 of 5
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit required academic certificates, identity proofs, and photographs for official admission verification.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="md">
            {verifiedCount}/{docsToRender.length} Verified
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/documents')}
            icon={ArrowUpRight}
            iconPosition="right"
          >
            Full Document Center
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {docsToRender.map((doc) => {
          const isVerified = doc.status === 'Verified' || doc.status === 'Approved';
          const isMissing = doc.status === 'Missing' || doc.status === 'Re-upload Required' || doc.status === 'Pending';
          const isProcessing = doc.status === 'Processing';

          return (
            <div
              key={doc.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isVerified
                  ? 'bg-emerald-50/40 border-emerald-200/80'
                  : isMissing
                  ? 'bg-amber-50/40 border-amber-200/80'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isVerified
                    ? 'bg-emerald-100 text-emerald-700'
                    : isMissing
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {isVerified ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isMissing ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5 animate-spin" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">{doc.name}</h4>
                    <span className="text-[10px] uppercase font-bold text-slate-400">({doc.category})</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {doc.fileName ? `${doc.fileName} • ${doc.fileSize || '1.8 MB'}` : doc.adminRemark || 'Upload mandatory document file (PDF/JPG/PNG)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {isVerified ? (
                  <Badge variant="success" size="sm" dot>
                    Verified ✓
                  </Badge>
                ) : isProcessing ? (
                  <Badge variant="info" size="sm" dot>
                    Processing...
                  </Badge>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Upload}
                    onClick={() => handleOpenUpload(doc)}
                  >
                    Upload File
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        documentData={selectedDocForUpload}
        onUploadSuccess={handleUploadSuccess}
      />
    </Card>
  );
}
