import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import PublicNavbar from '../components/navigation/PublicNavbar';
import { useTheme } from '../context/ThemeContext';
import { MapPin, Phone, Mail, ShieldCheck, GraduationCap, ArrowRight, Heart } from 'lucide-react';

export default function PublicLayout() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Public Header / Navbar */}
      <PublicNavbar />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* Institutional Public Footer */}
      <footer className={`border-t transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: GIET Info */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-0.5 shadow flex items-center justify-center shrink-0">
                  <img src="/giet-logo.png" alt="GIET Crest" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-base text-slate-900 dark:text-white">
                  GIET <span className="text-blue-500">University</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                Gunupur, Dist-Rayagada, Odisha - 765022. Established in 1997 by Vidya Bharati Educational Trust (VBET). NAAC Grade 'A+' accredited.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold border border-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>UGC 2(f) & 12(B) • AICTE Approved</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Quick Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/" className="hover:text-blue-500 transition-colors">Home Page</Link></li>
                <li><Link to="/about-giet" className="hover:text-blue-500 transition-colors">About GIET University</Link></li>
                <li><Link to="/courses" className="hover:text-blue-500 transition-colors">50+ Degree Programs</Link></li>
                <li><Link to="/ai-assistant" className="hover:text-blue-500 transition-colors">AI Admission Guide</Link></li>
                <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Helpdesk</Link></li>
              </ul>
            </div>

            {/* Col 3: Admissions & Portals */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Admissions & Portals</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/login" className="hover:text-blue-500 transition-colors">Candidate Login</Link></li>
                <li><Link to="/register" className="hover:text-blue-500 transition-colors">New Registration 2026</Link></li>
                <li><Link to="/application" className="hover:text-blue-500 transition-colors">Online Application Form</Link></li>
                <li><Link to="/application-status" className="hover:text-blue-500 transition-colors">Track Admission Status</Link></li>
                <li><Link to="/admin" className="hover:text-blue-500 transition-colors">Counselor Admin Desk</Link></li>
              </ul>
            </div>

            {/* Col 4: Contact & Helpdesk */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Admissions Helpline</h4>
              <div className="space-y-2 text-xs">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>+91 (06857) 250172 / 250170</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>admissions@giet.edu</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Gunupur, Rayagada, Odisha 765022</span>
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p>© {new Date().getFullYear()} GIET University, Gunupur. All Rights Reserved.</p>
            <p className="flex items-center gap-1 text-slate-500">
              <span>Built with AdmitAI Autonomous Admissions Engine</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
