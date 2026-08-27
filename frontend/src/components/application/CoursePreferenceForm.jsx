import React from 'react';
import Card from '../common/Card';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const AVAILABLE_COURSES = [
  { id: 'btech-cse', name: 'B.Tech in Computer Science & Engineering', category: 'Engineering' },
  { id: 'btech-aiml', name: 'B.Tech in Artificial Intelligence & Machine Learning', category: 'Engineering' },
  { id: 'btech-ece', name: 'B.Tech in Electronics & Communication', category: 'Engineering' },
  { id: 'btech-mech', name: 'B.Tech in Mechanical & Mechatronics Engineering', category: 'Engineering' },
  { id: 'mca-cloud', name: 'Master of Computer Applications (Cloud & DevOps)', category: 'Computer Applications' },
  { id: 'mba-tech', name: 'MBA in Technology Management & Business Analytics', category: 'Management' },
];

export default function CoursePreferenceForm({ formData, onChange }) {
  const preferences = formData.coursePreferences || [
    { priority: 1, courseId: 'btech-cse', courseName: 'B.Tech in Computer Science & Engineering' },
    { priority: 2, courseId: 'btech-aiml', courseName: 'B.Tech in Artificial Intelligence & Machine Learning' },
    { priority: 3, courseId: 'btech-ece', courseName: 'B.Tech in Electronics & Communication' }
  ];

  const handleCourseSelect = (priority, courseId) => {
    const selected = AVAILABLE_COURSES.find(c => c.id === courseId);
    const updated = [...preferences];
    const index = updated.findIndex(p => p.priority === priority);

    const newPref = {
      priority,
      courseId,
      courseName: selected ? selected.name : ''
    };

    if (index >= 0) {
      updated[index] = newPref;
    } else {
      updated.push(newPref);
    }

    onChange('coursePreferences', updated);
  };

  const getPreference = (priority) => {
    return preferences.find(p => p.priority === priority)?.courseId || '';
  };

  return (
    <Card className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">Program & Branch Preferences</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select your prioritized choice of degree programs. Admission counseling allocates seats in order of this priority.
        </p>
      </div>

      {/* AI Smart Match Callout */}
      <div className="p-3.5 rounded-xl bg-brand-50/80 border border-brand-200/80 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-brand-900">AI Eligibility Match</h4>
          <p className="text-xs text-brand-700 mt-0.5 leading-relaxed">
            With your 88.6% PCM score and 94.8 JEE percentile, you are highly eligible for all 3 B.Tech Engineering tracks!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Preference 1 */}
        <div className="p-4 rounded-xl border border-brand-200 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px]">1</span>
              First Choice (Primary Preference) <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-brand-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Priority
            </span>
          </div>
          <select
            value={getPreference(1)}
            onChange={(e) => handleCourseSelect(1, e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none font-medium text-slate-800"
          >
            <option value="">Select your 1st preference</option>
            {AVAILABLE_COURSES.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
            ))}
          </select>
        </div>

        {/* Preference 2 */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">2</span>
              Second Choice (Alternate Preference)
            </label>
          </div>
          <select
            value={getPreference(2)}
            onChange={(e) => handleCourseSelect(2, e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none font-medium text-slate-800"
          >
            <option value="">Select your 2nd preference</option>
            {AVAILABLE_COURSES.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
            ))}
          </select>
        </div>

        {/* Preference 3 */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">3</span>
              Third Choice (Fallback Preference)
            </label>
          </div>
          <select
            value={getPreference(3)}
            onChange={(e) => handleCourseSelect(3, e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none font-medium text-slate-800"
          >
            <option value="">Select your 3rd preference</option>
            {AVAILABLE_COURSES.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
}
