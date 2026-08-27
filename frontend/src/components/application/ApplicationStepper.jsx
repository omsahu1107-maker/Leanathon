import React from 'react';
import { Check, User, GraduationCap, BookOpen, Files, ClipboardCheck } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Personal', icon: User },
  { id: 2, title: 'Academic', icon: GraduationCap },
  { id: 3, title: 'Course', icon: BookOpen },
  { id: 4, title: 'Documents', icon: Files },
  { id: 5, title: 'Review', icon: ClipboardCheck },
];

export default function ApplicationStepper({ currentStep, onStepClick, completedSteps = [] }) {
  return (
    <div className="w-full py-4 mb-6">
      {/* Mobile Indicator */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
            {currentStep}
          </span>
          <span className="font-semibold text-slate-800 text-sm">
            Step {currentStep}: {STEPS[currentStep - 1]?.title} Information
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium">5 Steps Total</span>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-slate-200 -z-0" />

        {STEPS.map((step) => {
          const Icon = step.icon;
          const isCurrent = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id) || currentStep > step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group cursor-pointer" onClick={() => onStepClick && onStepClick(step.id)}>
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                  isCurrent
                    ? 'bg-brand-600 text-white ring-4 ring-brand-100 shadow-md scale-105'
                    : isCompleted
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-400 border-2 border-slate-300 group-hover:border-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>

              <div className="mt-2 text-center">
                <span
                  className={`text-xs font-semibold block ${
                    isCurrent ? 'text-brand-600' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[10px] text-slate-400">Step {step.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
