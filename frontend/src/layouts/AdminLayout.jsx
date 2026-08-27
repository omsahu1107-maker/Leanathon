import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Activity,
  MessageSquareText,
  FileCheck2,
  ShieldCheck,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import adminService from '../services/adminService';

const ADMIN_NAV = [
  { name: 'Executive Overview', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Student Applications', path: '/admin/students', icon: Users, badgeKey: 'studentsCount' },
  { name: 'Live Active Sessions', path: '/admin/active-sessions', icon: Activity, live: true },
  { name: 'Messages & AI Chat Logs', path: '/admin/messages', icon: MessageSquareText, badgeKey: 'pendingMsgs' },
  { name: 'Document Audit Queue', path: '/admin/documents', icon: FileCheck2 },
];

export default function AdminLayout() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSessionsCount, setActiveSessionsCount] = useState(5);
  const [pendingMessagesCount, setPendingMessagesCount] = useState(3);

  useEffect(() => {
    async function loadQuickStats() {
      try {
        const overview = await adminService.getAdminOverview();
        if (overview?.metrics) {
          setActiveSessionsCount(overview.metrics.liveActiveStudents || 5);
          setPendingMessagesCount(overview.metrics.pendingCounselorInquiries || 3);
        }
      } catch (err) {
        console.warn('Admin layout stats loaded from fallback:', err.message);
      }
    }
    loadQuickStats();
    const interval = setInterval(loadQuickStats, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* ============================================================
          ADMIN DESKTOP SIDEBAR
      ============================================================ */}
      <aside className={`hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-0 z-30 border-r transition-colors duration-200 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        {/* Logo / Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950/60">
          <Link to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
                AdmitAI <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">ADMIN</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                GIET University Desk
              </span>
            </div>
          </Link>
        </div>

        {/* Live Active Students Pulse Pill */}
        <div className="px-4 pt-4 pb-2">
          <Link
            to="/admin/active-sessions"
            className="w-full px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-all flex items-center justify-between text-xs text-emerald-300 group"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold">{activeSessionsCount} Students Online</span>
            </div>
            <span className="text-[10px] text-emerald-400/80 font-mono group-hover:translate-x-0.5 transition-transform">
              Live →
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Admissions Management
          </div>

          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.live && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}

                  {item.badgeKey === 'pendingMsgs' && pendingMessagesCount > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
                      {pendingMessagesCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Portal Switcher Banner */}
          <div className="pt-6">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <GraduationCap className="w-4 h-4 text-brand-400" />
                <span>Student Perspective</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Test the applicant experience, browse courses, and try the AI assistant.
              </p>
              <Link
                to="/"
                className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Student Portal</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Counselor / Admin Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-indigo-500/30">
                SP
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Dr. S. K. Patnaik</span>
                <span className="text-[10px] text-slate-400">Chief Admissions Officer</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/login')}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================================
          ADMIN MAIN VIEWPORT
      ============================================================ */}
      <div className="flex-1 md:pl-64 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Sticky Header */}
        <header className={`sticky top-0 z-20 backdrop-blur border-b h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
          isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
        }`}>
          {/* Mobile menu trigger + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="md:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="font-bold text-sm">AdmitAI <span className="text-indigo-500">Admin</span></span>
            </div>

            {/* Desktop Quick Breadcrumb / System Live indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs">
              <span className="text-slate-400">GIET University</span>
              <span className="text-slate-600">/</span>
              <span className="font-semibold text-indigo-500">Admission Control Center</span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Live Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Realtime Telemetry</span>
            </div>

            {/* Quick Link to Student Portal */}
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-brand-500" />
              <span className="hidden sm:inline">Student Portal</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm">
            <div className="fixed inset-y-0 left-0 w-72 p-5 bg-slate-900 text-white flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    <span className="font-bold text-base">AdmitAI Admin</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white p-1">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="mt-4 space-y-1">
                  {ADMIN_NAV.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                        location.pathname === item.path ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                    </NavLink>
                  ))}
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-brand-400 hover:bg-slate-800 mt-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Go to Student Portal ↗</span>
                  </Link>
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800"
                >
                  <span>Appearance</span>
                  <span>{isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
