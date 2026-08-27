import React from 'react';
import { Clock, GraduationCap, ArrowRight, Bot, IndianRupee, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <Card hoverable className="flex flex-col justify-between h-full border-slate-200/90">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="primary" size="sm">{course.category}</Badge>
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.seats?.available || 30} seats left</span>
          </span>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-brand-600 transition-colors">
          {course.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {course.shortDescription}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-slate-100 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block">Duration</span>
              <span className="font-semibold text-slate-700">{course.duration.split(' ')[0]} {course.duration.split(' ')[1]}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-400 block">Annual Fee</span>
              <span className="font-semibold text-slate-700">{course.fees?.annual || '₹2.3 LPA'}</span>
            </div>
          </div>
        </div>

        {/* Eligibility Snapshot */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Eligibility</span>
          <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
            {course.eligibility}
          </p>
        </div>
      </div>

      {/* Action Buttons: [View Details], [Apply Now], [Ask AI] */}
      <div className="pt-2 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            View Details
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/application?course=${course.id}`)}
          >
            Apply Now
          </Button>
        </div>

        <Button
          variant="subtle"
          size="sm"
          className="w-full text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-100"
          icon={Bot}
          onClick={() => navigate(`/ai-assistant?course=${course.id}`)}
        >
          Ask AI About This Course
        </Button>
      </div>
    </Card>
  );
}
