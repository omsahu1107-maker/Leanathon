import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Card({
  children,
  className,
  header,
  footer,
  hoverable = false,
  padded = true,
  ...props
}) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white border border-slate-200/80 rounded-xl shadow-card transition-all duration-200 overflow-hidden',
          hoverable && 'hover:shadow-dropdown hover:border-slate-300 transition-transform duration-200 hover:-translate-y-0.5',
          className
        )
      )}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          {header}
        </div>
      )}
      <div className={clsx(padded && 'p-6')}>{children}</div>
      {footer && (
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/40">
          {footer}
        </div>
      )}
    </div>
  );
}
