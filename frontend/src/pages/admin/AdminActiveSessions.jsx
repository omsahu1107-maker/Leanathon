import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Radio,
  Globe,
  Laptop,
  Smartphone,
  Clock,
  Send,
  Eye,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import adminService from '../../services/adminService';

export default function AdminActiveSessions() {
  const { isDark } = useTheme();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await adminService.getActiveSessions();
      setSessions(data || []);
      setLastRefreshed(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to load active sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMsg('');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* ============================================================
          PAGE TITLE & TELEMETRY BADGE
      ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Live Gateway Telemetry Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Live Logged-In Students Monitor
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Real-time tracking of applicants currently authenticated and browsing the student admission portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchSessions}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
            title="Refresh Live Session Pings"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Updated {lastRefreshed}</span>
          </button>
        </div>
      </div>

      {/* ============================================================
          TOP STATS SUMMARY
      ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Online Students</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{sessions.length}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Active authenticated sessions</span>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Most Active Area</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-lg font-bold text-white">AI Assistant & Docs</div>
          <span className="text-[11px] text-slate-400 mt-1 block">80% interactive traffic</span>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Average Session Length</span>
            <Clock className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-lg font-bold text-brand-400">18.4 mins</div>
          <span className="text-[11px] text-slate-400 mt-1 block">High portal engagement</span>
        </div>
      </div>

      {/* ============================================================
          LIVE SESSION CARDS (Rich Detailed Feed)
      ============================================================ */}
      <div className="space-y-4">
        <h2 className="text-base font-bold flex items-center gap-2">
          <span>Active Authenticated Terminals</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {sessions.length} Live Streams
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className={`p-5 rounded-2xl border relative overflow-hidden transition-all hover:border-indigo-500/40 ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              {/* Left Live Strip */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-emerald-500" />

              {/* Student info header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={sess.avatarUrl}
                      alt={sess.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/40"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                      {sess.name}
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {sess.applicationId}
                      </span>
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{sess.email}</p>
                  </div>
                </div>

                <Link
                  to={`/admin/students?id=${sess.studentId}`}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/20 text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Real-time Location, Device & Action */}
              <div className={`p-3.5 rounded-xl space-y-2 text-xs border ${
                isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                {/* Current Page */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Current Portal Page:</span>
                  <span className="font-mono font-semibold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
                    {sess.currentPage}
                  </span>
                </div>

                {/* Page Title & Action */}
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-400">Active Task / Telemetry:</span>
                  <p className="font-medium text-white text-xs bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono">
                    "{sess.action}"
                  </p>
                </div>

                {/* Network & Hardware specs */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{sess.ipAddress}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Laptop className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{sess.device}</span>
                  </div>
                </div>
              </div>

              {/* Bottom login timestamp */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/60 text-[11px] text-slate-400">
                <span>Login: {sess.loginTime}</span>
                <span className="font-mono text-emerald-400 font-semibold">Duration: {sess.sessionDuration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          COUNSELOR REAL-TIME BROADCAST NOTICE BOX
      ============================================================ */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <Send className="w-4 h-4 text-indigo-400" />
          <h3 className="text-base font-bold">Push Notification to Active Student Terminals</h3>
        </div>
        <p className={`text-xs mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Send a broadcast alert or admission deadline reminder that appears live on all online student screens.
        </p>

        <form onSubmit={handleSendBroadcast} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            placeholder="e.g. Special Counseling Session today at 4:00 PM for B.Tech CSE applicants."
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs outline-none border ${
              isDark ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
            }`}
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Broadcast Alert</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {broadcastSent && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Broadcast alert delivered to {sessions.length} active applicant terminals!</span>
          </div>
        )}
      </div>

    </div>
  );
}
