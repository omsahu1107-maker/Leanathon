import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  IndianRupee,
  Users,
  Award,
  Calendar,
  Briefcase,
  BookOpen,
  Bot,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import courseService from '../services/courseService';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      setLoading(true);
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error('Failed to load course details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Fetching comprehensive syllabus & fee structure..." />;
  }

  if (!course) {
    return (
      <EmptyState
        title="Course Not Found"
        description="The requested degree program does not exist or has been archived."
        actionText="Back to All Courses"
        onAction={() => navigate('/courses')}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/courses')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Directory</span>
      </button>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">{course.category}</Badge>
              <Badge variant="default" size="sm">{course.level}</Badge>
              <span className="text-xs text-slate-400 font-mono">Code: {course.code}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {course.name}
            </h1>

            <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(`/application?course=${course.id}`)}
              className="font-semibold shadow-md"
            >
              Apply Now
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={Bot}
              onClick={() => navigate(`/ai-assistant?course=${course.id}`)}
              className="font-semibold"
            >
              Ask AI About This Course
            </Button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Program Duration</span>
            <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Annual Tuition</span>
            <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              <span>{course.fees?.annual || '₹2.3 LPA'}</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Seat Availability</span>
            <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>{course.seats?.available} / {course.seats?.total} Open</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Course Rating</span>
            <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800 text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{course.rating || 4.9} ★ (Accredited)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Eligibility, Curriculum, Career Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Eligibility Criteria */}
          <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-600" /> Minimum Eligibility Criteria</h3>}>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {course.eligibility}
            </p>
            <div className="mt-4 p-3.5 rounded-xl bg-brand-50/70 border border-brand-200/70 text-xs text-brand-900 flex items-start gap-2.5">
              <Bot className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Automated Evaluation:</span>
                <p className="text-brand-800 mt-0.5">
                  AdmitAI automatically matches your 12th board marks and entrance rank against cutoff criteria.
                </p>
              </div>
            </div>
          </Card>

          {/* Curriculum Highlights */}
          <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-600" /> Curriculum & Syllabus Highlights</h3>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {course.curriculumHighlights?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Career Opportunities */}
          <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-600" /> Career & Industry Placement Roles</h3>}>
            <div className="flex flex-wrap gap-2">
              {course.careerOpportunities?.map((role, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold"
                >
                  💼 {role}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Fees Breakdown, Scholarships, Important Dates */}
        <div className="space-y-6">
          {/* Fees Breakdown Card */}
          <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><IndianRupee className="w-4 h-4 text-slate-700" /> Fee Structure</h3>}>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Per Semester</span>
                <span className="font-semibold text-slate-800">{course.fees?.perSemester}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Annual Tuition Fee</span>
                <span className="font-semibold text-slate-800">{course.fees?.annual}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Caution Deposit (Refundable)</span>
                <span className="font-semibold text-slate-800">{course.fees?.cautionDeposit}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-bold text-slate-900">Total 4-Year Cost</span>
                <span className="font-bold text-brand-600 text-sm">{course.fees?.total}</span>
              </div>
            </div>
          </Card>

          {/* Scholarships & Financial Aid */}
          <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /> Scholarships & Grants</h3>}>
            <div className="space-y-3 text-xs">
              {course.scholarships?.map((sch, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{sch.title}</span>
                    <span className="font-mono text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                      {sch.code}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{sch.benefit}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Important Dates */}
          <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-600" /> Key Admission Dates</h3>}>
            <div className="space-y-2.5 text-xs">
              {course.importantDates?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600">{item.event}</span>
                  <span className="font-semibold text-slate-900 font-mono text-[11px]">{item.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
