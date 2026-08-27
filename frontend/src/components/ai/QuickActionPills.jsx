import React from 'react';
import { Sparkles } from 'lucide-react';

const DEFAULT_QUICK_ACTIONS = [
  { label: 'About GIET University', prompt: 'Tell me about GIET University Gunupur, its legacy, campus, and NAAC accreditation.', icon: '🏛️' },
  { label: 'Check my eligibility', prompt: 'What is my admission eligibility for B.Tech & B.Sc Agriculture with my 88.6% 12th score?', icon: '🎓' },
  { label: 'Placements & Packages', prompt: 'What are the placement statistics, highest salary packages, and top recruiting companies at GIET University?', icon: '💼' },
  { label: 'Fees & Scholarships', prompt: 'What are the tuition fees and available merit scholarships for GIET University programs?', icon: '💰' },
  { label: 'Hostel & Facilities', prompt: 'What are the residential hostel, dining, sports, and library facilities on the 100+ acre Gunupur campus?', icon: '🏫' },
  { label: 'Required Documents', prompt: 'Which documents are required for GIET University admission and document verification?', icon: '📄' }
];

export default function QuickActionPills({ onSelectAction }) {
  return (
    <div className="py-2">
      <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
        <span>Frequently Asked Inquiries</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {DEFAULT_QUICK_ACTIONS.map((action, idx) => (
          <button
            key={idx}
            onClick={() => onSelectAction(action.prompt)}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white hover:bg-brand-50/60 border border-slate-200/80 hover:border-brand-300 text-left transition-all text-xs group shadow-subtle hover:shadow"
          >
            <span className="text-base shrink-0">{action.icon}</span>
            <span className="font-medium text-slate-700 group-hover:text-brand-700 leading-snug line-clamp-2">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
