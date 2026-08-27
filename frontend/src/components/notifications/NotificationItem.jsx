import React from 'react';
import { AlertCircle, Clock, CheckCircle2, ArrowRight, Bell } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/formatters';

export default function NotificationItem({ notification, onMarkRead }) {
  const navigate = useNavigate();

  const isActionRequired = notification.type === 'action_required';
  const isUpcoming = notification.type === 'upcoming';
  const isCompleted = notification.type === 'completed';

  const handleActionClick = () => {
    if (!notification.read && onMarkRead) {
      onMarkRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        !notification.read
          ? 'bg-white border-brand-200 shadow-sm ring-1 ring-brand-100'
          : 'bg-slate-50/70 border-slate-200/80 opacity-90'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Category Icon */}
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            isActionRequired
              ? 'bg-rose-100 text-rose-600'
              : isUpcoming
              ? 'bg-amber-100 text-amber-600'
              : 'bg-emerald-100 text-emerald-600'
          }`}
        >
          {isActionRequired ? (
            <AlertCircle className="w-5 h-5" />
          ) : isUpcoming ? (
            <Clock className="w-5 h-5" />
          ) : (
            <CheckCircle2 className="w-5 h-5" />
          )}
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900 leading-snug">{notification.title}</h4>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
            )}
            <Badge
              variant={
                isActionRequired ? 'danger' : isUpcoming ? 'warning' : 'success'
              }
              size="sm"
            >
              {isActionRequired
                ? 'Action Required'
                : isUpcoming
                ? 'Upcoming'
                : 'Completed'}
            </Badge>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
            {notification.description}
          </p>

          <span className="text-[11px] text-slate-400 block pt-0.5">
            {formatDateTime(notification.timestamp)}
          </span>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        {!notification.read && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-200/60 font-medium"
          >
            Mark read
          </button>
        )}

        {notification.actionText && (
          <Button
            variant={isActionRequired ? 'danger' : 'outline'}
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleActionClick}
          >
            {notification.actionText}
          </Button>
        )}
      </div>
    </div>
  );
}
