import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Sparkles,
  Award,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  X,
  ExternalLink,
  ChevronRight,
  Download,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import adminService from '../../services/adminService';

const STATUS_FILTERS = [
  'All',
  'Documents Verified',
  'Merit Listed',
  'Under Review',
  'Fee Paid',
  'Action Required'
];

export default function AdminStudents() {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [updating, setUpdating] = useState(false);
  const [remarksInput, setRemarksInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Load students from API
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await adminService.getStudents({
        status: statusFilter,
        search: searchQuery
      });
      setStudents(data || []);

      // Check if URL has ?id=std_xxx to auto-select
      const paramId = searchParams.get('id');
      if (paramId && data.length > 0) {
        const found = data.find(s => s.id === paramId || s.applicationId === paramId);
        if (found) {
          setSelectedStudent(found);
          setStatusInput(found.status);
          setRemarksInput(found.notes || '');
        }
      }
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [statusFilter, searchQuery]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setStatusInput(student.status);
    setRemarksInput(student.notes || '');
    setFeedbackMsg('');
    setSearchParams({ id: student.id });
  };

  const handleCloseDrawer = () => {
    setSelectedStudent(null);
    setSearchParams({});
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    setUpdating(true);
    setFeedbackMsg('');

    try {
      const updated = await adminService.updateStudentStatus(selectedStudent.id, statusInput, remarksInput);
      setSelectedStudent(updated);
      setFeedbackMsg('Application status updated successfully!');
      fetchStudents();
    } catch (err) {
      setFeedbackMsg('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ============================================================
          HEADER
      ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Application Directory
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Audit candidate academic profiles, merit scores, entrance ranks, and manage admission status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Total Candidates: <strong>{students.length}</strong>
          </span>
        </div>
      </div>

      {/* ============================================================
          SEARCH & STATUS FILTERS
      ============================================================ */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name, App ID (ADM-...), Email, Course..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs outline-none border transition-colors ${
              isDark
                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
            }`}
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDark
                    ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          STUDENT DIRECTORY TABLE
      ============================================================ */}
      <div className={`rounded-2xl border overflow-hidden ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400 bg-slate-950/40' : 'border-slate-200 text-slate-500 bg-slate-50'}`}>
                <th className="py-3 px-4 font-semibold">Applicant</th>
                <th className="py-3 px-4 font-semibold">Applied Program</th>
                <th className="py-3 px-4 font-semibold">Academic & Entrance Scores</th>
                <th className="py-3 px-4 font-semibold">Admission Status</th>
                <th className="py-3 px-4 font-semibold">Document Audit</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>

            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
              {students.map((student) => {
                const isSelected = selectedStudent?.id === student.id;
                return (
                  <tr
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? isDark ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : 'bg-indigo-50/60 border-l-4 border-indigo-500'
                        : isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatarUrl}
                          alt={student.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            {student.name}
                            {student.onlineStatus === 'Online' && (
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Currently Online in Student Portal" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{student.applicationId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{student.courseApplied}</div>
                      <div className="text-[11px] text-slate-400">
                        {student.academicLevel} · {student.city}, {student.state}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-indigo-400">
                        {student.academicScores?.entranceExam}: {student.academicScores?.percentile}%ile
                      </div>
                      <div className="text-[11px] text-slate-400">
                        12th: {student.academicScores?.twelfthPercentage}% | 10th: {student.academicScores?.tenthPercentage}%
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
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

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{student.documentsSummary?.verified}/{student.documentsSummary?.total} verified</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStudent(student);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors shadow-sm"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================
          DETAILED STUDENT INSPECTION DRAWER / MODAL
      ============================================================ */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-xl h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between border-l transition-colors duration-200 ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedStudent.avatarUrl}
                    alt={selectedStudent.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      {selectedStudent.name}
                      {selectedStudent.onlineStatus === 'Online' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ● Online
                        </span>
                      )}
                    </h2>
                    <span className="text-xs text-indigo-400 font-mono">{selectedStudent.applicationId}</span>
                  </div>
                </div>

                <button
                  onClick={handleCloseDrawer}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Information Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" /> Email Address
                  </span>
                  <p className="font-semibold truncate text-white">{selectedStudent.email}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-500" /> Mobile Number
                  </span>
                  <p className="font-semibold text-white">{selectedStudent.phone}</p>
                </div>
              </div>

              {/* Applied Course & Academic Merit Matrix */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Applied Academic Program</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-400">
                    {selectedStudent.courseCode}
                  </span>
                </div>
                <p className="text-sm font-bold text-white">{selectedStudent.courseApplied}</p>

                {/* Score breakdown */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
                  <div className="p-2 rounded-lg bg-slate-900">
                    <span className="text-[10px] text-slate-400 block">Class 10th</span>
                    <span className="text-xs font-bold text-white">{selectedStudent.academicScores?.tenthPercentage}%</span>
                    <span className="text-[9px] text-slate-500 block">{selectedStudent.academicScores?.tenthBoard}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900">
                    <span className="text-[10px] text-slate-400 block">Class 12th PCM</span>
                    <span className="text-xs font-bold text-white">{selectedStudent.academicScores?.twelfthPercentage}%</span>
                    <span className="text-[9px] text-slate-500 block">{selectedStudent.academicScores?.twelfthBoard}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900">
                    <span className="text-[10px] text-slate-400 block">Entrance Exam</span>
                    <span className="text-xs font-bold text-indigo-400">{selectedStudent.academicScores?.percentile}%ile</span>
                    <span className="text-[9px] text-slate-500 block">AIR: #{selectedStudent.academicScores?.entranceRank}</span>
                  </div>
                </div>
              </div>

              {/* Counselor Assignment & Scholarship Tag */}
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-indigo-300 font-bold">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Scholarship & Merit Assessment</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{selectedStudent.notes}</p>
                <div className="pt-2 text-[11px] text-slate-400">
                  Assigned Counselor: <strong className="text-white">{selectedStudent.counselorAssigned}</strong>
                </div>

                <div className="pt-2">
                  <a
                    href={`/admin/documents?search=${encodeURIComponent(selectedStudent.name)}`}
                    className="w-full py-2 px-3 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>View {selectedStudent.name}'s Uploaded Documents & Marksheets →</span>
                  </a>
                </div>
              </div>

              {/* Status Update & Approval Form */}
              <form onSubmit={handleStatusUpdate} className="space-y-3 pt-2">
                <label className="text-xs font-bold text-white block">
                  Update Application Status & Counselor Decision
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Documents Verified',
                    'Merit Listed',
                    'Under Review',
                    'Fee Paid',
                    'Action Required'
                  ].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusInput(st)}
                      className={`p-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                        statusInput === st
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Counselor Audit Remarks / Decision Notes</label>
                  <textarea
                    rows={2}
                    value={remarksInput}
                    onChange={(e) => setRemarksInput(e.target.value)}
                    placeholder="Add notes for student or admission records..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                  />
                </div>

                {feedbackMsg && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                    {feedbackMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {updating ? 'Saving Changes...' : 'Save & Publish Admission Status'}
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center">
              <button
                onClick={handleCloseDrawer}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
