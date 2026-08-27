import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { Bot, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AIRecommendationCard({
  title = '🤖 AI Admission Guide Recommendation',
  message,
  actionText = 'Take Action',
  actionRoute = '/documents',
  severity = 'info' // info, warning, success
}) {
  const navigate = useNavigate();

  const isWarning = severity === 'warning';
  const isSuccess = severity === 'success';

  return (
    <Card
      className={`border ${
        isWarning
          ? 'bg-gradient-to-br from-amber-500/10 via-white to-amber-50/30 border-amber-200 shadow-sm'
          : isSuccess
          ? 'bg-gradient-to-br from-emerald-500/10 via-white to-emerald-50/30 border-emerald-200 shadow-sm'
          : 'bg-gradient-to-br from-brand-600/10 via-white to-indigo-50/40 border-brand-200 shadow-sm'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
              isWarning
                ? 'bg-amber-600 text-white'
                : isSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-600 text-white'
            }`}
          >
            <Bot className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">{title}</h4>
              <Badge variant={isWarning ? 'warning' : isSuccess ? 'success' : 'primary'} size="sm">
                Proactive Insight
              </Badge>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
              {message ||
                'Your application is 68% complete. You have 1 missing document (Income Certificate). Complete it to qualify for scholarship review and advance to Eligibility Verification.'}
            </p>
          </div>
        </div>

        <div className="self-end sm:self-center shrink-0">
          <Button
            variant={isWarning ? 'primary' : 'secondary'}
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate(actionRoute)}
          >
            {actionText}
          </Button>
        </div>
      </div>
    </Card>
  );
}
