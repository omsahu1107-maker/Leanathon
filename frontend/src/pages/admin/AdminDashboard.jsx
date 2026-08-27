import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  FileCheck,
  TrendingUp,
  Activity,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Award,
  GraduationCap,
  Clock,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import adminService from '../../services/adminService';

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [overview, setOverview] = useState(null);
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [overviewData, sessionsData] = await Promise.all([
          adminService.getAdminOverview(),
          adminService.getActiveSessions()
        ]);
        setOverview(overviewData);
        setActiveSessions(sessionsData || []);
      } catch (err) {
        console.error('Failed to load admin overview:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const metrics = overview?.metrics || {
    totalApplications: 1435,
    verifiedApplications: 1245,
    pendingVerification: 188,
    liveActiveStudents: 5,
    totalInquiries: 3890,
    pendingCounselorInquiries: 3,
    conversionRate: '84.6%',
    averageAiResponseTime: '1.2s'
  };

  const funnel = overview?.funnel || [
    { stage: 'Inquiries / Leads', count: 3890, percentage: 100 },
    { stage: 'Applications Started', count: 1850, percentage: 47.5 },
    { stage: 'Documents Uploaded', count: 1428, percentage: 36.7 },
    { stage: 'Verified & Merit Listed', count: 1240, percentage: 31.8 },
    { stage: 'Confirmed Enrolment', count: 980, percentage: 25.1 }
  ];

  return (
    <div className="space-y-6">
      
      {/* ============================================================
          TOP BANNER & TITLE
      ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 font-mono">
              Academic Session 2026–27
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span className="text-xs text-slate-400">GIET University Central Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Admissions Command Center
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Real-time telemetry across student applications, autonomous AI document validation, and online portal traffic.
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-2">
          <Link
            to="/admin/active-sessions"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{activeSessions.length} Logged In Live</span>
          </Link>
          <Link
            to="/admin/students"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
          >
            <span>Review Applications</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ============================================================
          1. EXECUTIVE KPI METRICS
      ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Applications */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Total Applications
            </span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-500 mb-1">
            {metrics.totalApplications.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        {/* Verified Documents */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Verified by AI & Staff
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-400 mb-1">
            {metrics.verifiedApplications.toLocaleString()}
          </div>
          <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>{metrics.pendingVerification} in pending queue</span>
          </div>
        </div>

        {/* Live Active Students Online */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Active Portal Users
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-400 mb-1 flex items-center gap-2">
            <span>{activeSessions.length}</span>
            <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active Now
            </span>
          </div>
          <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>Realtime terminal tracking</span>
          </div>
        </div>

        {/* AI Inquiries Handled */}
        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Inquiries & AI Chats
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-amber-400 mb-1">
            {metrics.totalInquiries.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-brand-400 font-medium">
            <Bot className="w-3 h-3" />
            <span>Avg AI speed: {metrics.averageAiResponseTime}</span>
          </div>
        </div>

      </div>

      {/* ============================================================
          2. CONVERSION FUNNEL & LIVE LOGGED-IN TELEMETRY ROW
      ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Conversion Funnel (2 Cols) */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border flex flex-col justify-between ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">Admission Pipeline & Conversion Velocity</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  {metrics.conversionRate} Conversion
                </span>
              </div>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>2026 Season</span>
            </div>
            <p className={`text-xs mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Stage-by-stage progression from prospective inquiry to confirmed registration.
            </p>

            {/* Stages Bar Stack */}
            <div className="space-y-4">
              {funnel.map((item, idx) => (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">{item.stage}</span>
                    <span className="font-mono font-bold text-indigo-400">
                      {item.count.toLocaleString()} <span className="font-normal text-slate-400">({item.percentage}%)</span>
                    </span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        idx === 0 ? 'bg-indigo-500' :
                        idx === 1 ? 'bg-brand-500' :
                        idx === 2 ? 'bg-purple-500' :
                        idx === 3 ? 'bg-emerald-500' : 'bg-amber-400'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
              Overall Lead-to-Enrolment Conversion: <strong>25.1%</strong>
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Target Achieved (102%)
            </span>
          </div>
        </div>

        {/* Live Active Sessions Peek (1 Col) */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <h3 className="text-base font-bold">Online Students Telemetry</h3>
              </div>
              <Link to="/admin/active-sessions" className="text-xs text-indigo-400 hover:underline">
                View All ({activeSessions.length}) →
              </Link>
            </div>
            <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Who is actively browsing the student portal right now.
            </p>

            {/* List of active users */}
            <div className="space-y-3">
              {activeSessions.slice(0, 4).map((sess) => (
                <div
                  key={sess.id}
                  className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <img
                      src={sess.avatarUrl}
                      alt={sess.name}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-500/40 shrink-0"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs font-bold truncate flex items-center gap-1.5">
                        {sess.name}
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </span>
                      <span className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {sess.currentPage}
                      </span>
                      <span className="text-[10px] text-indigo-400 font-mono mt-0.5">
                        {sess.action}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800">
            <Link
              to="/admin/active-sessions"
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect Live Terminals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* ============================================================
          3. RECENT STUDENT REGISTRATIONS & QUICK ACTIONS TABLE
      ============================================================ */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <span>Recent Applicant Registry</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                Latest submissions
              </span>
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Click any student to inspect academic scores, documents, and counselor assignments.
            </p>
          </div>

          <Link
            to="/admin/students"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            <span>Open Full Directory</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="pb-3 font-semibold">Applicant</th>
                <th className="pb-3 font-semibold">Course Applied</th>
                <th className="pb-3 font-semibold">Scores / Merit</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Documents</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
              {overview?.recentRegistrations?.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => navigate(`/admin/students?id=${student.id}`)}
                  className={`hover:bg-indigo-500/5 cursor-pointer transition-colors ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}
                >
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatarUrl}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          {student.name}
                          {student.onlineStatus === 'Online' && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Online now" />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{student.applicationId}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 pr-4">
                    <div className="font-medium text-white">{student.courseApplied}</div>
                    <div className="text-[11px] text-slate-400">{student.category} Quota · {student.state}</div>
                  </td>

                  <td className="py-3.5 pr-4">
                    <div className="font-mono font-bold text-indigo-400">
                      JEE: {student.academicScores?.percentile || '—'}%ile
                    </div>
                    <div className="text-[11px] text-slate-400">
                      12th: {student.academicScores?.twelfthPercentage}% ({student.academicScores?.twelfthBoard})
                    </div>
                  </td>

                  <td className="py-3.5 pr-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      student.status === 'Documents Verified' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                      student.status === 'Merit Listed' ? 'bg-purple-500/15 text-purple-400 border-purple-500/30' :
                      student.status === 'Fee Paid' ? 'bg-brand-500/15 text-brand-400 border-brand-500/30' :
                      student.status === 'Action Required' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                      'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}>
                      {student.status}
                    </span>
                  </td>

                  <td className="py-3.5 pr-4">
                    <span className="text-xs font-mono">
                      {student.documentsSummary?.verified} / {student.documentsSummary?.total} Verified
                    </span>
                  </td>

                  <td className="py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/students?id=${student.id}`);
                      }}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                    >
                      Audit Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
