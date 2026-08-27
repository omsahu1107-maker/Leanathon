import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  Bot,
  FileText,
  Files,
  Activity,
  Bell,
  User,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Sun,
  Moon,
  Phone,
  Landmark,
  LogIn,
  LogOut,
  ShieldCheck,
  Home as HomeIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';
import { useTheme } from '../context/ThemeContext';
import Badge from '../components/common/Badge';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'About GIETU', path: '/about-giet', icon: Landmark },
  { name: 'Courses', path: '/courses', icon: GraduationCap },
  { name: 'AI Assistant', path: '/ai-assistant', icon: Bot, highlight: true },
  { name: 'My Application', path: '/application', icon: FileText },
  { name: 'Documents', path: '/documents', icon: Files, badgeKey: 'pendingDocs' },
  { name: 'App Status', path: '/application-status', icon: Activity },
  { name: 'Notifications', path: '/notifications', icon: Bell, badgeKey: 'unreadNotifs' },
  { name: 'Contact Us', path: '/contact', icon: Phone },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Admin Desk', path: '/admin', icon: ShieldCheck }
];

export default function StudentLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { application, unreadCount, pendingDocsCount, notifications, markNotificationRead } = useApplication();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-200 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* ====== DESKTOP SIDEBAR ====== */}
      <aside className={`hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-0 z-30 border-r transition-colors duration-200 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 border-slate-800'}`}>
        {/* Logo */}
        <Link to="/" className="h-16 flex items-center px-6 border-b border-slate-800/80 bg-slate-950/40 hover:bg-slate-950/60 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center shrink-0">
              <img src="/giet-logo.png" alt="GIET University Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white tracking-tight text-base">GIET<span className="text-blue-400"> University</span></span>
                <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">NAAC A+</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Gunupur • Admission Portal</p>
            </div>
          </div>
        </Link>

        {/* Student Quick Status */}
        <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-900/50">
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 font-medium">Application ID</span>
              <span className="font-mono text-blue-300 font-semibold">{application?.id || user?.applicationId || 'ADM-2026-8941'}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Stage: <span className="text-white font-medium">{application?.currentStage?.split(' ')[0] || 'Document'}</span></span>
              <span className="text-emerald-400 font-semibold">{application?.completionPercentage || 68}%</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={() => `
                  group flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                  ${item.highlight && !isActive ? 'text-indigo-300 hover:bg-indigo-950/40' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400 group-hover:text-white'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badgeKey === 'unreadNotifs' && unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
                )}
                {item.badgeKey === 'pendingDocs' && pendingDocsCount > 0 && (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pendingDocsCount}</span>
                )}
                {item.highlight && !isActive && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded border border-indigo-500/30">
                    <Sparkles className="w-2.5 h-2.5 text-indigo-400" />AI
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* AI Quick Callout */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-700/30">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                <Bot className="w-3 h-3" />
              </div>
              <span className="text-xs font-semibold text-white">AdmitAI Guide</span>
            </div>
            <p className="text-[10px] text-slate-300 mb-2 leading-relaxed">Ask anything about fees, cutoffs, or hostels.</p>
            <button
              onClick={() => navigate('/ai-assistant')}
              className="w-full py-1.5 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Ask AI Guide</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Logout Button in Sidebar */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors border border-rose-900/30"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </div>
            <span className="text-[10px] text-slate-500">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ====== MAIN CONTENT ====== */}
      <div className="flex-1 md:pl-64 lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className={`sticky top-0 z-20 backdrop-blur border-b h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
          isDark
            ? 'bg-slate-900/95 border-slate-800'
            : 'bg-white/95 border-slate-200/80'
        }`}>
          {/* Mobile Menu + Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Page context logo on mobile */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">G</div>
              <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>GIET <span className="text-blue-500">University</span></span>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* AI Quick Access */}
            <button
              onClick={() => navigate('/ai-assistant')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm border ${
                isDark
                  ? 'bg-blue-900/50 hover:bg-blue-900 text-blue-300 border-blue-800'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask AI Guide</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? 'text-amber-400 hover:text-amber-300 hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="Toggle dark mode"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className={`relative p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notifDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                  onClick={() => setNotifDropdownOpen(false)}
                >
                  <div className={`px-3 py-2 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                    <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Notifications ({unreadCount} new)</span>
                    <NavLink to="/notifications" className="text-xs text-blue-500 hover:underline font-medium">View All</NavLink>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 py-1">
                    {notifications.slice(0, 3).map(n => (
                      <div
                        key={n.id}
                        className={`p-3 text-xs transition-colors cursor-pointer rounded-lg ${
                          !n.read
                            ? isDark ? 'bg-blue-950/60' : 'bg-blue-50/30'
                            : isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
                        }`}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.actionUrl) navigate(n.actionUrl);
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{n.title}</span>
                          {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
                        </div>
                        <p className={`line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Desk Quick Access for logged-in user */}
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isDark
                  ? 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border-amber-800/60'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
              }`}
              title="Counselor & Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Admin Desk</span>
            </Link>

            {/* Profile Avatar & Actions */}
            <div className="flex items-center gap-1.5">
              <NavLink
                to="/profile"
                className={`flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full transition-colors border border-transparent ${
                  isDark ? 'hover:bg-slate-800 hover:border-slate-700' : 'hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                  alt={user?.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500"
                />
                <div className="hidden sm:block text-left">
                  <p className={`text-xs font-semibold leading-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{user?.name || 'Applicant'}</p>
                  <p className={`text-[10px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Candidate</p>
                </div>
              </NavLink>

              <button
                onClick={handleLogout}
                title="Log Out"
                className={`hidden sm:flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${
                  isDark
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-rose-400 border-slate-700 hover:border-rose-500/50'
                    : 'bg-slate-100 hover:bg-rose-50 text-rose-600 border-slate-200 hover:border-rose-500/50'
                }`}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* ====== MOBILE DRAWER ====== */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-slate-900/70 backdrop-blur-sm">
            <div className={`fixed inset-y-0 left-0 w-72 p-5 shadow-2xl flex flex-col justify-between transition-colors ${isDark ? 'bg-slate-900' : 'bg-slate-900'}`}>
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">G</div>
                    <span className="font-bold text-white text-base">GIET<span className="text-blue-400"> Portal</span></span>
                  </div>
                  <button onClick={closeMobileMenu} className="text-slate-400 hover:text-white p-1">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="mt-5 space-y-1.5">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={({ isActive }) => `
                          flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium
                          ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.badgeKey === 'unreadNotifs' && unreadCount > 0 && (
                          <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer footer actions */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
