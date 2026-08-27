import React from 'react';
import { UserCheck, ShieldAlert, Sparkles, BookOpen, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';
import { useNavigate } from 'react-router-dom';

export default function StudentContextCard({ student, application, documents = [] }) {
  const navigate = useNavigate();

  const courseName = application?.coursePreferences?.[0]?.courseName || student?.targetCourseName || 'B.Tech in Computer Science';
  const stage = application?.currentStage || 'Document Verification';
  const completion = application?.completionPercentage || 68;
  const risk = application?.dropOffRisk || 'Medium';

  const riskBadgeVariant = risk === 'Low' ? 'success' : risk === 'Medium' ? 'warning' : 'danger';

  const pendingDocs = documents.filter(d => d.status === 'Missing' || d.status === 'Needs Review');

  return (
    <Card className="border-slate-200/90 shadow-card">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
          <h4 className="font-semibold text-slate-900 text-sm">Student Context</h4>
        </div>
        <Badge variant="primary" size="sm">Active Session</Badge>
      </div>

      <div className="space-y-3.5 text-xs">
        {/* Candidate Info */}
        <div>
          <span className="text-slate-400 block text-[11px]">Candidate</span>
          <span className="font-semibold text-slate-800 text-sm">{student?.name || 'Rahul Sharma'}</span>
          <span className="text-slate-500 block text-[11px]">ID: {student?.id || 'std_9841'}</span>
        </div>

        {/* Target Course */}
        <div>
          <span className="text-slate-400 block text-[11px]">Target Course</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span className="font-medium text-slate-800 line-clamp-1">{courseName}</span>
          </div>
        </div>

        {/* Application Stage */}
        <div>
          <span className="text-slate-400 block text-[11px]">Application Stage</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="font-semibold text-slate-800">{stage}</span>
            <span className="text-slate-400 text-[10px]">(Stage {application?.currentStageNumber || 5}/8)</span>
          </div>
        </div>

        {/* Completion Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-400 text-[11px]">Completion</span>
            <span className="font-bold text-brand-600">{completion}%</span>
          </div>
          <ProgressBar percentage={completion} size="sm" color="brand" />
        </div>

        {/* Drop-off Risk Assessment */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[11px] block">Drop-off Risk</span>
            <span className="text-[11px] text-slate-600">
              {risk === 'Low' ? 'On track' : risk === 'Medium' ? 'Action required' : 'High attention'}
            </span>
          </div>
          <Badge variant={riskBadgeVariant} dot size="sm">
            {risk} Risk
          </Badge>
        </div>

        {/* Action item hint */}
        {pendingDocs.length > 0 && (
          <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900">
            <div className="flex items-start gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{pendingDocs.length} pending document</p>
                <p className="text-amber-700 text-[10px] mt-0.5">Upload to eliminate drop-off risk</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/documents')}
              className="mt-2 w-full text-center py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-medium text-[11px] transition-colors flex items-center justify-center gap-1"
            >
              <span>Go to Documents</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
