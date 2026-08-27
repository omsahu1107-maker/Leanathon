import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Building2,
  PhoneCall,
  Sun,
  Moon,
  HelpCircle,
  Award,
  BookOpen,
  ArrowLeft,
  UserPlus,
  Briefcase,
  Check,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Login({ initialMode = 'login' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Mode: 'login' | 'register'
  const isRegisterRoute = location.pathname === '/register' || initialMode === 'register';
  const [mode, setMode] = useState(isRegisterRoute ? 'register' : 'login');

  // Role Tab in Login: 'student' | 'admin'
  const [activeTab, setActiveTab] = useState('student');

  // Login Form States
  const [identifier, setIdentifier] = useState('ADM-2026-8941');
  const [password, setPassword] = useState('admitai@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Registration Form States
  const [regName, setRegName] = useState('Aditya Mohanty');
  const [regEmail, setRegEmail] = useState('aditya.mohanty@example.com');
  const [regPhone, setRegPhone] = useState('+91 94371 88290');
  const [regProgram, setRegProgram] = useState('B.Tech in Computer Science & Engineering');
  const [regPcm, setRegPcm] = useState('89.5');
  const [regState, setRegState] = useState('Odisha');
  const [regPassword, setRegPassword] = useState('Admit2026@Pass');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Feedback States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generatedAppId, setGeneratedAppId] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const programsList = [
    'B.Tech in Computer Science & Engineering',
    'B.Tech in CSE (Artificial Intelligence & ML)',
    'B.Tech in CSE (Data Science)',
    'B.Tech in Electronics & Communication (ECE)',
    'B.Tech in Mechanical Engineering',
    'B.Tech (Lateral Entry - 2nd Year)',
    'MBA (Business Analytics & Finance)',
    'B.Sc. (Hons) in Agriculture',
    'Master of Computer Applications (MCA)'
  ];

  // Quick Demo Autofill
  const handleQuickDemo = (role) => {
    setMode('login');
    if (role === 'student') {
      setActiveTab('student');
      setIdentifier('ADM-2026-8941');
      setPassword('admitai@2026');
      setError('');
    } else {
      setActiveTab('admin');
      setIdentifier('counselor@giet.edu');
      setPassword('admin@giet2026');
      setError('');
    }
  };

  const handleQuickDemoRegister = () => {
    setMode('register');
    setRegName('Aditya Mohanty');
    setRegEmail('aditya.mohanty@example.com');
    setRegPhone('+91 94371 88290');
    setRegProgram('B.Tech in CSE (Artificial Intelligence & ML)');
    setRegPcm('91.4');
    setRegState('Odisha');
    setRegPassword('Admit2026@Pass');
    setError('');
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError(activeTab === 'student' ? 'Please enter your Application ID or Email.' : 'Please enter your Official Staff Email.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      await login({
        email: identifier.includes('@') ? identifier : undefined,
        applicationId: !identifier.includes('@') ? identifier : undefined,
        password,
        role: activeTab
      });

      setSuccessMessage(activeTab === 'admin' ? 'Authenticated successfully. Redirecting to Counselor Desk...' : 'Login successful. Loading student dashboard...');
      setTimeout(() => {
        if (activeTab === 'admin') {
          navigate('/admin');
        } else {
          const destination = location.state?.from?.pathname || '/application';
          navigate(destination);
        }
      }, 800);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Registration Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
      setError('Full Name, Email Address, and Mobile Contact are required.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the admission declaration and eligibility terms.');
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        program: regProgram,
        pcmPercentage: regPcm,
        state: regState,
        password: regPassword
      });

      const appId = result.applicationId || `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedAppId(appId);
      setSuccessMessage(`Registration completed successfully! Your Application ID is ${appId}`);

      setTimeout(() => {
        navigate('/application');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between font-sans text-slate-100 bg-slate-950 overflow-x-hidden">
      
      {/* ============================================================
          AUTHENTIC CAMPUS PHOTO BACKGROUND WITH INSTITUTIONAL OVERLAY
      ============================================================ */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{
          backgroundImage: `url('/giet-campus.jpg')`,
        }}
      >
        {/* Professional Multi-stop Gradient Tint: Rich Navy to Slate */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-950/85 backdrop-blur-[2px]" />
      </div>

      {/* Top Navbar Header */}
      <header className="relative z-10 w-full px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-lg border border-white/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img src="/giet-logo.png" alt="GIET University Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-wide">GIET UNIVERSITY</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                GUNUPUR
              </span>
            </div>
            <p className="text-[11px] text-slate-300">Central Admission & Counseling Portal 2026–27</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            University Website
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-300" />}
          </button>
        </div>
      </header>

      {/* Main Content: 2-Column Campus Showcase & Auth Box */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Left Column: Official Admission Information & Accreditations */}
        <div className="lg:w-1/2 space-y-6 text-left">
          {/* Institutional Crest Card */}
          <div className="inline-flex items-center gap-3.5 p-2.5 pr-4 rounded-2xl bg-slate-900/80 border border-white/15 backdrop-blur-md shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center shrink-0">
              <img src="/giet-logo.png" alt="GIET Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">GIET UNIVERSITY</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  AUTONOMOUS
                </span>
              </div>
              <p className="text-[11px] text-blue-300 font-medium">Excellence - Our Essence</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-300 text-xs font-semibold block w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Online Admissions Open for Academic Year 2026–27
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Empowering Your Future at <span className="text-blue-400">GIET University</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Welcome to the official online admissions portal. Register your application, upload academic certificates for verification, and track your admission progress from home.
          </p>

          {/* Authentic University Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
              <Award className="w-5 h-5 text-amber-400 mb-1" />
              <h4 className="text-xs font-bold text-white">NAAC 'A+' Grade</h4>
              <p className="text-[11px] text-slate-400">UGC & AICTE Approved</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
              <Briefcase className="w-5 h-5 text-emerald-400 mb-1" />
              <h4 className="text-xs font-bold text-white">93.8% Placements</h4>
              <p className="text-[11px] text-slate-400">500+ Top Recruiters</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-blue-400 mb-1" />
              <h4 className="text-xs font-bold text-white">Instant Verification</h4>
              <p className="text-[11px] text-slate-400">Online Document Audit</p>
            </div>
          </div>

          {/* Admission Helpline Notice */}
          <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-700/40 text-xs text-slate-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Admissions Helpdesk: <strong>+91 (06857) 250172</strong> / <strong>admissions@giet.edu</strong></span>
            </div>
            <span className="text-[10px] font-mono text-blue-300 bg-blue-900/60 px-2 py-0.5 rounded">9 AM - 6 PM</span>
          </div>
        </div>

        {/* Right Column: Clean Institutional Login / Registration Card */}
        <div className="w-full lg:w-5/12 max-w-md">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-700/70 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
            
            {/* Top Switcher Tabs: Sign In vs Register */}
            <div className="p-1 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'login'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                Sign In
              </button>

              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'register'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                New Registration
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <p>{successMessage}</p>
                  {generatedAppId && (
                    <p className="font-mono text-emerald-200 mt-0.5">Application ID: <strong>{generatedAppId}</strong></p>
                  )}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* ============================================================
                VIEW 1: SIGN IN
            ============================================================ */}
            {mode === 'login' && (
              <div className="space-y-4">
                {/* Role Switcher */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg font-bold text-white">Account Login</h2>
                    <p className="text-xs text-slate-400">Select portal access type</p>
                  </div>

                  <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
                    <button
                      type="button"
                      onClick={() => handleQuickDemo('student')}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold transition-colors ${
                        activeTab === 'student'
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Applicant
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemo('admin')}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold transition-colors ${
                        activeTab === 'admin'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Counselor
                    </button>
                  </div>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {activeTab === 'student' ? 'Application ID or Registered Email' : 'Official Staff Email'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        {activeTab === 'student' ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                      </div>
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={activeTab === 'student' ? 'e.g. ADM-2026-8941 or email@domain.com' : 'e.g. counselor@giet.edu'}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-300">Password</label>
                      <button
                        type="button"
                        onClick={() => setForgotModalOpen(true)}
                        className="text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Keep me signed in</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      <>
                        <span>{activeTab === 'admin' ? 'Open Counselor Desk' : 'Sign In to Portal'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Demo Quick Access */}
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quick Demo Credentials:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemo('student')}
                      className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-mono transition-colors"
                    >
                      👤 Student (Rahul)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickDemo('admin')}
                      className="px-2.5 py-1 rounded bg-blue-900/60 hover:bg-blue-800/80 border border-blue-700/50 text-blue-200 text-xs font-mono transition-colors"
                    >
                      🛡️ Counselor (Staff)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================
                VIEW 2: OPTIMIZED REGISTRATION
            ============================================================ */}
            {mode === 'register' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg font-bold text-white">Student Registration</h2>
                    <p className="text-xs text-slate-400">Fill in details to start your admission</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickDemoRegister}
                    className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30 hover:bg-blue-500/30"
                  >
                    ⚡ Auto-Fill Demo
                  </button>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name (As per 10th Certificate)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Aditya Mohanty"
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                          <PhoneCall className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Programme</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <select
                        value={regProgram}
                        onChange={(e) => setRegProgram(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {programsList.map((prog, i) => (
                          <option key={i} value={prog} className="bg-slate-900 text-white">
                            {prog}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">12th PCM / Aggregate %</label>
                      <input
                        type="number"
                        step="0.1"
                        min="40"
                        max="100"
                        value={regPcm}
                        onChange={(e) => setRegPcm(e.target.value)}
                        placeholder="e.g. 89.5"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Domicile State</label>
                      <input
                        type="text"
                        value={regState}
                        onChange={(e) => setRegState(e.target.value)}
                        placeholder="e.g. Odisha"
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Set Account Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-400 leading-snug">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-3.5 h-3.5 mt-0.5 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500"
                      />
                      <span>I agree to the GIET University admission guidelines and verify my information is accurate.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Application ID...
                      </span>
                    ) : (
                      <>
                        <span>Submit Registration & Enter Portal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Bottom Switch Link */}
            <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
              {mode === 'login' ? (
                <p>
                  New candidate?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="font-bold text-blue-400 hover:text-blue-300"
                  >
                    Register Online →
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-bold text-blue-400 hover:text-blue-300"
                  >
                    Sign In to Portal →
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>

      </main>

      {/* Footer Bar */}
      <footer className="relative z-10 w-full px-6 py-3 border-t border-white/10 text-center text-xs text-slate-400 bg-slate-950/80">
        <p>© 2026 GIET University, Gunupur. All Rights Reserved. • Approved by UGC & AICTE, New Delhi.</p>
      </footer>

      {/* Password Recovery Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base text-white">Credentials Recovery</h3>
              </div>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              If you forgot your password or Application ID, please contact the Central Admissions Office:
            </p>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1 font-mono">
              <p className="text-blue-300">📞 Phone: +91 (06857) 250172</p>
              <p className="text-blue-300">✉️ Email: admissions@giet.edu</p>
              <p className="text-slate-400 text-[11px] font-sans pt-1">Default demo access password is <strong className="text-white font-mono">admitai@2026</strong></p>
            </div>

            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
