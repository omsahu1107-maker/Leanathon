import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { CheckCircle, ShieldCheck, AlertCircle, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApplicationReview({
  formData,
  documents = [],
  onSubmit,
  isSubmitting = false
}) {
  const [declared, setDeclared] = useState(false);
  const academics = formData.academics || {};
  const preferences = formData.coursePreferences || [];

  const handleFinalSubmit = () => {
    if (!declared) return;
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-brand-50/80 border border-brand-200/80 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-brand-900">Application Ready for Submission</h4>
          <p className="text-xs text-brand-700 mt-0.5 leading-relaxed">
            Please carefully review the summarized details below before submitting your official admission dossier.
          </p>
        </div>
      </div>

      {/* 1. Personal & Contact Review */}
      <Card header={<h4 className="font-semibold text-slate-800 text-sm">1. Personal & Contact Information</h4>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-xs">
          <div>
            <span className="text-slate-400 block">Full Name</span>
            <span className="font-semibold text-slate-800">{formData.name || 'Rahul Sharma'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Date of Birth</span>
            <span className="font-semibold text-slate-800">{formData.dob || '2005-04-14'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Gender / Category</span>
            <span className="font-semibold text-slate-800">{formData.gender || 'Male'} ({formData.category || 'General'})</span>
          </div>
          <div>
            <span className="text-slate-400 block">Email Address</span>
            <span className="font-semibold text-slate-800">{formData.email || 'rahul.sharma@example.com'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Phone Number</span>
            <span className="font-semibold text-slate-800">{formData.phone || '+91 98765 43210'}</span>
          </div>
          <div>
            <span className="text-slate-400 block">City & State</span>
            <span className="font-semibold text-slate-800">{formData.address?.city || 'Noida'}, {formData.address?.state || 'Uttar Pradesh'}</span>
          </div>
        </div>
      </Card>

      {/* 2. Academic Scores Review */}
      <Card header={<h4 className="font-semibold text-slate-800 text-sm">2. Academic Record</h4>}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
            <span className="text-slate-400 block font-medium">10th Standard</span>
            <div className="mt-1">
              <span className="font-bold text-slate-900 text-base">{academics.tenth?.percentage || '92.4'}%</span>
              <p className="text-slate-500 text-[11px]">{academics.tenth?.board || 'CBSE'} • {academics.tenth?.passingYear || '2022'}</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
            <span className="text-slate-400 block font-medium">12th Standard (PCM)</span>
            <div className="mt-1">
              <span className="font-bold text-slate-900 text-base">{academics.twelfth?.percentage || '88.6'}%</span>
              <p className="text-slate-500 text-[11px]">{academics.twelfth?.board || 'CBSE'} • {academics.twelfth?.passingYear || '2024'}</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
            <span className="text-slate-400 block font-medium">Entrance Exam</span>
            <div className="mt-1">
              <span className="font-bold text-brand-600 text-base">{academics.entranceExam?.scorePercentile || '94.8'} %tile</span>
              <p className="text-slate-500 text-[11px]">{academics.entranceExam?.examName || 'JEE Main 2026'} • Rank {academics.entranceExam?.rank || '21450'}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Program Preferences */}
      <Card header={<h4 className="font-semibold text-slate-800 text-sm">3. Program Preferences</h4>}>
        <div className="space-y-2 text-xs">
          {preferences.map((pref, i) => (
            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-medium text-slate-800">
                <span className="font-bold text-brand-600 mr-2">Preference {pref.priority}:</span>
                {pref.courseName || 'Selected Branch'}
              </span>
              <Badge variant={pref.priority === 1 ? 'primary' : 'default'} size="sm">
                Priority #{pref.priority}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Document Verification Checklist */}
      <Card header={<h4 className="font-semibold text-slate-800 text-sm">4. Verification Summary</h4>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-700 font-medium">{doc.name}</span>
              <Badge
                variant={
                  doc.status === 'Verified'
                    ? 'success'
                    : doc.status === 'Processing'
                    ? 'info'
                    : doc.status === 'Needs Review'
                    ? 'warning'
                    : 'danger'
                }
                size="sm"
                dot
              >
                {doc.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Declaration Checkbox */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={declared}
            onChange={(e) => setDeclared(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 cursor-pointer"
          />
          <span className="text-xs text-slate-700 leading-relaxed">
            I hereby declare that all particulars stated in this application are true, complete, and correct to the best of my knowledge and belief. I understand that false or misleading statements may result in denial or revocation of admission.
          </span>
        </label>
      </div>

      {/* Final Submit Button */}
      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          size="lg"
          disabled={!declared || isSubmitting}
          loading={isSubmitting}
          icon={Send}
          iconPosition="right"
          onClick={handleFinalSubmit}
        >
          Submit Official Application
        </Button>
      </div>
    </div>
  );
}
