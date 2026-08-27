import React from 'react';
import StatusTimeline from '../components/status/StatusTimeline';
import AIRecommendationCard from '../components/status/AIRecommendationCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import {
  ShieldCheck,
  Calendar,
  Clock,
  AlertTriangle,
  ArrowRight,
  Bot,
  Download,
  FileCheck,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { useApplication } from '../context/ApplicationContext';
import { formatDate } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

export default function ApplicationStatus() {
  const navigate = useNavigate();
  const { application, documents, loading } = useApplication();

  if (loading && !application) {
    return <LoadingSpinner message="Retrieving real-time admission telemetry..." />;
  }

  const completion = application?.completionPercentage || 88;
  const stages = application?.stages || [];
  const overallStatus = application?.overallStatus || 'Documents Approved';
  const statusRemark = application?.statusRemark || 'All submitted academic credentials and identity proofs are verified.';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Application Tracker</h1>
            <Badge variant="primary" size="sm">Live Firestore Registry</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time status tracking for your admission application to Academic Session 2026.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Bot}
            onClick={() => navigate('/ai-assistant?prompt=application-status')}
          >
            Ask AI Assistant
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/application')}
          >
            Edit Application
          </Button>
        </div>
      </div>

      {/* ============================================================
          OVERALL APPLICATION STATUS CALLOUT BANNER
      ============================================================ */}
      <div className={`p-5 rounded-2xl border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        overallStatus === 'Documents Approved' || overallStatus === 'Application Approved'
          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
          : overallStatus === 'Re-upload Required'
          ? 'bg-rose-50/90 border-rose-200 text-rose-950 animate-pulse'
          : overallStatus === 'Under Verification'
          ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
          : overallStatus === 'Application Rejected'
          ? 'bg-red-50/90 border-red-200 text-red-950'
          : 'bg-amber-50/80 border-amber-200 text-amber-950'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            overallStatus === 'Documents Approved' || overallStatus === 'Application Approved'
              ? 'bg-emerald-600 text-white'
              : overallStatus === 'Re-upload Required'
              ? 'bg-rose-600 text-white'
              : overallStatus === 'Under Verification'
              ? 'bg-indigo-600 text-white'
              : 'bg-amber-600 text-white'
          }`}>
            {overallStatus === 'Documents Approved' || overallStatus === 'Application Approved' ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : overallStatus === 'Re-upload Required' ? (
              <AlertTriangle className="w-6 h-6" />
            ) : overallStatus === 'Application Rejected' ? (
              <XCircle className="w-6 h-6" />
            ) : (
              <Clock className="w-6 h-6" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold opacity-75">Application Decision State</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white/80 border border-current">
                {overallStatus}
              </span>
            </div>
            <p className="text-sm font-semibold mt-1">{statusRemark}</p>
          </div>
        </div>

        {overallStatus === 'Re-upload Required' && (
          <Button
            variant="danger"
            size="md"
            icon={RefreshCw}
            onClick={() => navigate('/documents')}
            className="shrink-0 font-bold"
          >
            Re-upload Documents Now
          </Button>
        )}
        {overallStatus === 'Documents Approved' && (
          <Button
            variant="primary"
            size="md"
            icon={Download}
            onClick={() => alert('Downloading Provisional Admission Offer Letter (PDF)...')}
            className="shrink-0 font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Download Offer Letter
          </Button>
        )}
      </div>

      {/* Primary Telemetry Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Application ID */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Application ID</span>
          <span className="text-base font-bold font-mono text-brand-600 mt-1 block truncate">
            {application?.id || 'ADM-2026-8941'}
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Central Admission Dossier</span>
        </div>

        {/* Current Stage */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Current Stage</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-sm font-bold text-slate-900 truncate">{application?.currentStage || 'Document Verification'}</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Stage {application?.currentStageNumber || 5} of 8</span>
        </div>

        {/* Completion Gauge */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Completion</span>
            <span className="text-sm font-black text-emerald-600">{completion}%</span>
          </div>
          <ProgressBar percentage={completion} size="sm" color="brand" className="mt-2 mb-1" />
          <span className="text-[10px] text-slate-500 block">{8 - (application?.currentStageNumber || 5)} milestones remaining</span>
        </div>

        {/* Last Updated */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Last Updated</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-800">{formatDate(application?.lastUpdated)}</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">✓ Automated Synced</span>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Interactive Application Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Admission Process Milestones</h3>
                <p className="text-xs text-slate-500">Autonomous workflow tracking from submission to classroom onboarding.</p>
              </div>
              <Badge variant="info" size="sm">Active Phase 1</Badge>
            </div>

            <StatusTimeline stages={stages} />
          </div>
        </div>

        {/* Right: AI Guidance & Checklist */}
        <div className="space-y-4">
          <AIRecommendationCard
            title={application?.aiRecommendation?.title || "Complete Document Verification"}
            message={application?.aiRecommendation?.message || "Ensure all uploaded credentials meet state criteria to unlock Merit Scholarship evaluation."}
            actionText={application?.aiRecommendation?.actionText || "View Documents"}
            actionRoute={application?.aiRecommendation?.actionRoute || "/documents"}
            severity={application?.aiRecommendation?.severity || "info"}
          />

          <Card title="Admission Checklist" headerAction={<span className="text-xs font-bold text-brand-600">{completion}%</span>}>
            <div className="space-y-3">
              {[
                { label: 'Basic Personal Profile', done: application?.progressChecklist?.personal !== false },
                { label: 'Academic Qualifications', done: application?.progressChecklist?.academic !== false },
                { label: 'Course Preferences Selected', done: application?.progressChecklist?.courseSelection !== false },
                { label: 'Mandatory Documents Uploaded', done: application?.progressChecklist?.documents !== false },
                { label: 'Eligibility Verified by AI & Admin', done: overallStatus === 'Documents Approved' || overallStatus === 'Application Approved' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                  <span className={item.done ? 'text-slate-800 font-medium' : 'text-slate-400'}>{item.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.done ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {item.done ? '✓ Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}
