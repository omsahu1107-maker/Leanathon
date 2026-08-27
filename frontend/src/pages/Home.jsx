import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  Bot,
  FileText,
  Activity,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Award,
  Landmark,
  Building2,
  MapPin,
  Briefcase,
  Users,
  Layers,
  BookOpen,
  DollarSign,
  PhoneCall,
  UserPlus,
  LogIn,
  Check
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  const academicSchools = [
    {
      id: 'eng',
      title: 'School of Engineering & Technology',
      desc: 'B.Tech in CSE, AI & ML, Data Science, ECE, EE, Mechanical, Civil & Biotech.',
      tag: 'NBA Accredited',
      color: 'from-blue-600 to-indigo-700',
      icon: Layers,
      count: '16+ Specializations'
    },
    {
      id: 'ca',
      title: 'School of Computer Applications',
      desc: 'Master of Computer Applications (MCA) & BCA with industry software bootcamps.',
      tag: 'High Placement',
      color: 'from-indigo-600 to-purple-700',
      icon: Bot,
      count: 'Industry Integrated'
    },
    {
      id: 'mgmt',
      title: 'School of Management Studies',
      desc: 'MBA in Business Analytics, Marketing, HR, Finance & Supply Chain.',
      tag: 'Dual Specialization',
      color: 'from-amber-600 to-orange-700',
      icon: Briefcase,
      count: '100% Internship'
    },
    {
      id: 'agri',
      title: 'School of Agricultural Sciences',
      desc: 'B.Sc. (Hons) Agriculture with hands-on research farms & agritech labs.',
      tag: 'ICAR Approved',
      color: 'from-emerald-600 to-teal-700',
      icon: Landmark,
      count: '100+ Acre Farmlands'
    }
  ];

  const admissionSteps = [
    {
      step: '01',
      title: 'Register Online',
      desc: 'Create your admission candidate account with basic contact and academic profile details in under 2 minutes.',
      icon: UserPlus
    },
    {
      step: '02',
      title: 'Select Program',
      desc: 'Choose from 50+ degree programs across engineering, computing, management, or agriculture.',
      icon: GraduationCap
    },
    {
      step: '03',
      title: 'Upload Marksheets',
      desc: 'Upload 10th/12th marksheets, JEE scorecard, and ID proof for instant OCR eligibility evaluation.',
      icon: FileText
    },
    {
      step: '04',
      title: 'Provisional Seat',
      desc: 'Receive your verified admission offer, merit scholarship calculation, and counseling confirmation.',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="space-y-12 pb-6">
      
      {/* ========================================================
          1. HERO SECTION
      ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-12 shadow-2xl border border-slate-800">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GIET University Gunupur • NAAC 'A+' Accredited</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Admissions Open for 2026–27 Academic Session</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-sky-200">
              Excellence-Our Essence
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Welcome to GIET University, Gunupur (Est. 1997). Spanning a 100+ acre lush riverfront campus with 50+ accredited degree programs, 93.8%+ placement track record, and AI-assisted counseling guidance.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 border-0"
                >
                  Apply Online Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm font-semibold"
                >
                  Candidate Login
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/application')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 border-0"
              >
                Go to My Application
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/courses')}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm font-semibold"
              icon={GraduationCap}
            >
              Explore 50+ Courses
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/ai-assistant')}
              className="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border-indigo-500/40 backdrop-blur-sm font-semibold"
              icon={Bot}
            >
              Ask AI Counselor
            </Button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. INSTITUTIONAL KEY METRICS
      ======================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">93.8%</p>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Placement Rate</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">500+ Top MNC Recruiters</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-2xl sm:text-3xl font-black text-amber-500">₹26 LPA</p>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Highest Package</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">₹5.5 - 6.5 LPA Average</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">100+ Acre</p>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Riverfront Campus</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Lush Eco-Green Environment</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">₹1 Lakh</p>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Merit Scholarships</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">JEE / 12th Board Toppers</p>
        </div>
      </div>

      {/* ========================================================
          3. ACADEMIC SCHOOLS & PROGRAMS
      ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20 mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Programs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore Academic Schools & Degrees
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Choose from 50+ UGC, AICTE, and ICAR approved undergraduate and postgraduate courses.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All 50+ Programs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {academicSchools.map((school) => {
            const Icon = school.icon;
            return (
              <div
                key={school.id}
                onClick={() => navigate('/courses')}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${school.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {school.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {school.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {school.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">{school.count}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          4. 4-STEP ADMISSION JOURNEY
      ======================================================== */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Seamless Admission Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How Admission Works in 4 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Apply online, verify academic credentials with instant AI assistance, and confirm your seat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {admissionSteps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3 relative">
                <span className="text-3xl font-black text-slate-700 block select-none">{s.step}</span>
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/register')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30"
          >
            Start Your Admission Journey
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* ========================================================
          5. AUTONOMOUS AI COUNSELING CALLOUT
      ======================================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
            <Bot className="w-3.5 h-3.5" />
            <span>24/7 Intelligent Admission Assistant</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Have Questions About Cutoffs, Fees, or Hostels?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Chat instantly with <strong>AdmitAI</strong>, our official AI Admissions Guide powered by live institutional data and Google Gemini.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/ai-assistant')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-600/20"
          >
            <Bot className="w-4 h-4 mr-2" />
            Chat with AdmitAI
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/contact')}
          >
            Contact Helpdesk
          </Button>
        </div>
      </div>

    </div>
  );
}
