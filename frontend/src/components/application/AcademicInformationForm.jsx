import React from 'react';
import Card from '../common/Card';

export default function AcademicInformationForm({ formData, onChange }) {
  const academics = formData.academics || {};
  const tenth = academics.tenth || {};
  const twelfth = academics.twelfth || {};
  const entrance = academics.entranceExam || {};

  const handleTenthChange = (field, val) => {
    onChange('academics', {
      ...academics,
      tenth: { ...tenth, [field]: val }
    });
  };

  const handleTwelfthChange = (field, val) => {
    onChange('academics', {
      ...academics,
      twelfth: { ...twelfth, [field]: val }
    });
  };

  const handleEntranceChange = (field, val) => {
    onChange('academics', {
      ...academics,
      entranceExam: { ...entrance, [field]: val }
    });
  };

  return (
    <Card className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">Academic Qualifications</h3>
        <p className="text-xs text-slate-500 mt-0.5">Enter your high school, senior secondary, and entrance examination scores.</p>
      </div>

      {/* 10th Standard */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-600"></span>
          10th Standard / Secondary School Exam
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Board <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={tenth.board || 'CBSE'}
              onChange={(e) => handleTenthChange('board', e.target.value)}
              placeholder="e.g. CBSE, ICSE, State Board"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Percentage / CGPA <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={tenth.percentage || ''}
              onChange={(e) => handleTenthChange('percentage', e.target.value)}
              placeholder="e.g. 92.4%"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Passing Year <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={tenth.passingYear || '2022'}
              onChange={(e) => handleTenthChange('passingYear', e.target.value)}
              placeholder="e.g. 2022"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 12th Standard */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-600"></span>
          12th Standard / Senior Secondary Exam (PCM / Commerce / Arts)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Board <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={twelfth.board || 'CBSE'}
              onChange={(e) => handleTwelfthChange('board', e.target.value)}
              placeholder="e.g. CBSE"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">PCM Percentage <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={twelfth.percentage || ''}
              onChange={(e) => handleTwelfthChange('percentage', e.target.value)}
              placeholder="e.g. 88.6%"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Passing Year <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={twelfth.passingYear || '2024'}
              onChange={(e) => handleTwelfthChange('passingYear', e.target.value)}
              placeholder="e.g. 2024"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Stream / Subjects</label>
            <input
              type="text"
              value={twelfth.stream || 'Science (Physics, Chemistry, Mathematics, Computer Science)'}
              onChange={(e) => handleTwelfthChange('stream', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Entrance Exam Details */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          National / State Entrance Examination
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Name</label>
            <input
              type="text"
              value={entrance.examName || 'JEE Main 2026'}
              onChange={(e) => handleEntranceChange('examName', e.target.value)}
              placeholder="e.g. JEE Main, CUET, CET"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Score / Percentile</label>
            <input
              type="text"
              value={entrance.scorePercentile || '94.8'}
              onChange={(e) => handleEntranceChange('scorePercentile', e.target.value)}
              placeholder="e.g. 94.8 percentile"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">All India / State Rank</label>
            <input
              type="text"
              value={entrance.rank || '21450'}
              onChange={(e) => handleEntranceChange('rank', e.target.value)}
              placeholder="e.g. 21450"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
