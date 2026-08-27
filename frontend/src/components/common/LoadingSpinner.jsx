import React from 'react';

export default function LoadingSpinner({ size = 'md', message = 'Loading admission data...' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div
        className={`${sizes[size]} rounded-full border-brand-200 border-t-brand-600 animate-spin`}
      />
      {message && <p className="mt-3 text-sm font-medium text-slate-500">{message}</p>}
    </div>
  );
}
