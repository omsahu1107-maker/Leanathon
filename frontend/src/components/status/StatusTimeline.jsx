import React from 'react';
import { Check, Clock, Circle } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function StatusTimeline({ stages = [], currentStageId = 5 }) {
  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Admission Progression Timeline</h3>
          <p className="text-xs text-slate-500 mt-0.5">8-Stage Autonomous Student Admission Funnel</p>
        </div>
        <Badge variant="primary" size="sm">
          Stage {currentStageId} of {stages.length || 8}
        </Badge>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {stages.map((stage, idx) => {
          const isCompleted = stage.status === 'completed' || stage.id < currentStageId;
          const isCurrent = stage.id === currentStageId || stage.status === 'current';
          const isUpcoming = !isCompleted && !isCurrent;

          return (
            <div key={stage.id} className="relative group">
              {/* Timeline Icon Marker */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50'
                    : isCurrent
                    ? 'bg-brand-600 text-white shadow-md ring-4 ring-brand-100 animate-pulse-subtle'
                    : 'bg-white text-slate-300 border-2 border-slate-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <span className="text-[10px]">{stage.id}</span>
                )}
              </div>

              {/* Stage Content Card */}
              <div
                className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-brand-50/50 border-brand-200 shadow-sm'
                    : isCompleted
                    ? 'bg-white border-slate-200/90'
                    : 'bg-slate-50/60 border-dashed border-slate-200 opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">0{stage.id}.</span>
                    <h4
                      className={`text-sm font-bold ${
                        isCurrent
                          ? 'text-brand-900'
                          : isCompleted
                          ? 'text-slate-900'
                          : 'text-slate-500'
                      }`}
                    >
                      {stage.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{stage.date || 'Pending'}</span>
                    <Badge
                      variant={
                        isCompleted
                          ? 'success'
                          : isCurrent
                          ? 'primary'
                          : 'default'
                      }
                      size="sm"
                      dot={isCurrent}
                    >
                      {isCompleted
                        ? 'Completed'
                        : isCurrent
                        ? 'In Progress'
                        : 'Upcoming'}
                    </Badge>
                  </div>
                </div>

                {isCurrent && (
                  <p className="text-xs text-brand-700 mt-2 bg-white/80 p-2.5 rounded-lg border border-brand-100 leading-relaxed">
                    🎯 <strong>Current Active Stage:</strong> Admission system is validating submitted marksheets and certificates. Keep your documents uploaded to avoid delays.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
