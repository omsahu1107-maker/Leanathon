import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  Upload,
  RefreshCw,
  Eye,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { getStatusBadgeVariant, formatDate } from '../../utils/formatters';

export default function DocumentCard({
  document,
  onUploadClick,
  onViewClick
}) {
  const isApproved = document.status === 'Approved' || document.status === 'Verified';
  const isPending = document.status === 'Pending' || document.status === 'Processing';
  const isMissing = document.status === 'Missing' || !document.fileName;
  const isReupload = document.status === 'Re-upload Required';
  const isRejected = document.status === 'Rejected';

  const badgeVariant = getStatusBadgeVariant(document.status);

  return (
    <Card hoverable className="flex flex-col justify-between h-full border-slate-200/90 transition-all">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                isApproved
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                  : isReupload
                  ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                  : isRejected
                  ? 'bg-red-50 text-red-600 border border-red-200/60'
                  : isMissing
                  ? 'bg-slate-100 text-slate-500 border border-slate-200'
                  : 'bg-amber-50 text-amber-600 border border-amber-200/60'
              }`}
            >
              {isApproved ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : isReupload ? (
                <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
              ) : isRejected ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : isPending ? (
                <Clock className="w-5 h-5 text-amber-500" />
              ) : (
                <Upload className="w-5 h-5 text-slate-400" />
              )}
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">{document.name}</h4>
              <span className="text-[11px] font-medium text-slate-400">
                {document.documentType || document.category || 'Academic'}
              </span>
            </div>
          </div>

          <Badge variant={badgeVariant} dot size="sm">
            {document.status === 'Approved' ? 'Approved' :
             document.status === 'Re-upload Required' ? 'Re-upload Required' :
             document.status === 'Rejected' ? 'Rejected' :
             document.status === 'Pending' ? 'Pending' :
             document.status}
          </Badge>
        </div>

        {/* File Info / Remarks */}
        <div className={`p-3 rounded-xl border mb-3 text-xs space-y-2 ${
          isReupload ? 'bg-rose-50/70 border-rose-200 text-rose-900' :
          isApproved ? 'bg-slate-50 border-slate-100' :
          'bg-slate-50 border-slate-100'
        }`}>
          {document.fileName ? (
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-mono text-[11px] truncate max-w-[170px]" title={document.fileName}>
                {document.fileName}
              </span>
              <span className="text-slate-400 text-[10px] shrink-0">{document.fileSize}</span>
            </div>
          ) : (
            <div className="text-slate-500 font-medium flex items-center gap-1 text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>No file uploaded yet</span>
            </div>
          )}

          {/* Admin Remark Box */}
          {(document.adminRemark || document.remarks) && (
            <div className={`p-2 rounded-lg text-[11px] leading-relaxed ${
              isReupload ? 'bg-white border border-rose-200 text-rose-900 font-medium' :
              isApproved ? 'text-slate-600 italic' :
              'text-slate-600'
            }`}>
              <strong className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                {isApproved ? 'Verification Remark:' : 'Admin Note:'}
              </strong>
              "{document.adminRemark || document.remarks}"
            </div>
          )}

          {document.confidenceScore && isApproved && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 pt-0.5">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              <span>OCR Match: {document.confidenceScore}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-[10px] text-slate-400">
          {document.uploadedAt ? `Updated: ${formatDate(document.uploadedAt)}` : 'Pending Submission'}
        </div>

        <div className="flex items-center gap-1.5">
          {isReupload ? (
            <Button
              variant="danger"
              size="sm"
              icon={RefreshCw}
              onClick={() => onUploadClick(document)}
              className="font-bold shadow-sm"
            >
              Re-upload File
            </Button>
          ) : isMissing ? (
            <Button
              variant="primary"
              size="sm"
              icon={Upload}
              onClick={() => onUploadClick(document)}
            >
              Upload
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={() => onUploadClick(document)}
            >
              Re-upload
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
