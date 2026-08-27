import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  GraduationCap,
  Sparkles,
  LogIn,
  UserPlus,
  LogOut,
  Sun,
  Moon,
  ShieldCheck,
  Bot,
  User,
  LayoutDashboard,
  Landmark,
  Phone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About GIET', path: '/about-giet' },
    { name: 'Courses', path: '/courses' },
    { name: 'AI Assistant', path: '/ai-assistant', highlight: true },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-200 ${
      isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: GIET Logo & Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img src="/giet-logo.png" alt="GIET University Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-bold text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                GIET<span className="text-blue-500"> University</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                NAAC A+
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Gunupur • Admission Portal</p>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isActive = item.path === '/' 
              ? location.pathname === '/' 
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.highlight && <Sparkles className="w-3 h-3 text-amber-400" />}
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Auth Buttons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all ${
              isDark ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Unauthenticated Visitor Controls */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isDark
                    ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-blue-500" />
                <span>Login</span>
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </Link>
            </div>
          ) : (
            /* Logged-in User Controls (Student Side) */
            <div className="flex items-center gap-2">
              {/* Admin Portal Button for logged in user */}
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 transition-all"
                title="Counselor & Admin Desk"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Desk</span>
              </Link>

              <Link
                to="/application"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Student Dashboard</span>
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-2 p-1 rounded-full border ${
                  isDark ? 'border-slate-700 bg-slate-800 hover:bg-slate-700' : 'border-slate-200 bg-slate-100 hover:bg-slate-200'
                }`}
                title="View Profile"
              >
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                  alt={user?.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500"
                />
                <span className={`hidden md:inline text-xs font-semibold pr-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {user?.name?.split(' ')[0] || 'Student'}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                title="Log Out"
                className={`p-2 rounded-xl border transition-all ${
                  isDark ? 'border-slate-700 text-rose-400 hover:bg-rose-950/30' : 'border-slate-200 text-rose-600 hover:bg-rose-50'
                }`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-xl ${isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
            aria-label="Toggle Mobile Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-4 py-4 space-y-3 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {item.highlight && <Sparkles className="w-4 h-4 text-amber-400" />}
                  <span>{item.name}</span>
                </div>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border ${
                    isDark ? 'bg-slate-800 text-slate-200 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <LogIn className="w-4 h-4 text-blue-500" />
                  <span>Student & Staff Login</span>
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-600/20"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register for Admission 2026</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/application"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open Student Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
