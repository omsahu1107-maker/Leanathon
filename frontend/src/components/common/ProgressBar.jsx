import React from 'react';
import { clsx } from 'clsx';

export default function ProgressBar({
  percentage = 0,
  showLabel = false,
  size = 'md', // sm, md, lg
  color = 'brand', // brand, success, warning, indigo
  className
}) {
  const safePercentage = Math.min(100, Math.max(0, percentage));

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const colors = {
    brand: 'bg-brand-600',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    indigo: 'bg-indigo-600'
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
          <span>Application Progress</span>
          <span className="text-brand-600 font-bold">{safePercentage}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-slate-100 rounded-full overflow-hidden', heights[size])}>
        <div
          className={clsx('rounded-full transition-all duration-500 ease-out', heights[size], colors[color])}
          style={{ width: `${safePercentage}%` }}
        />
      </div>
    </div>
  );
}
