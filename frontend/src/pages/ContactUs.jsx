import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Loader2,
  HeadphonesIcon,
  FileQuestion,
  Bot
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FAQ_ITEMS = [
  {
    q: 'What is the admission procedure for GIET University programs?',
    a: 'Admissions are conducted through national/state level entrance scores (JEE Main, OJEE, CAT/MAT, ICAR) or through the GIETEE (GIET University Entrance Exam). You can apply directly through this portal.'
  },
  {
    q: 'How do I check my GIETU application status?',
    a: 'Navigate to "App Status" from the sidebar to view your real-time 8-stage application progress and verification telemetry.'
  },
  {
    q: 'What is the accreditation status of GIET University?',
    a: 'GIET University is accredited with NAAC Grade "A+", approved by AICTE & UGC (under Section 2f & 12B), and has NBA-accredited engineering departments.'
  },
  {
    q: 'What documents are required for B.Tech & B.Sc Agriculture admission?',
    a: '10th Marksheet, 12th Marksheet (PCM/PCB), JEE/GIETEE Scorecard, Aadhaar Card, Passport Photos, Transfer/Migration Certificate, and Income/Caste Certificate (if applicable).'
  },
  {
    q: 'Are hostel and transport facilities available for students?',
    a: 'Yes, GIET University provides dedicated modern AC and non-AC residential hostels for 3500+ boys and girls with high-speed Wi-Fi, 24/7 security, and multi-cuisine dining on campus.'
  },
  {
    q: 'What scholarships are available for meritorious and needy students?',
    a: 'Merit Excellence Scholarships (up to 50% tuition waiver for 90%+ marks or top JEE rankers), Women in STEM Grants, and Need-Based Financial Assistance for rural/tribal students.'
  },
];

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    label: 'Admissions Helpline',
    value: '+91 77357 45535',
    sub: 'Alt: 06857-250172 • Mon–Sat 9AM–6PM',
    color: 'emerald',
    href: 'tel:+917735745535'
  },
  {
    icon: Mail,
    label: 'Official Email Support',
    value: 'admission@giet.edu',
    sub: 'Alt: enquiry@giet.edu',
    color: 'blue',
    href: 'mailto:admission@giet.edu'
  },
  {
    icon: MapPin,
    label: 'University Campus',
    value: 'Gunupur, Rayagada, Odisha – 765022',
    sub: 'Gobriguda, Po- Kharling (Near Bansadhara River)',
    color: 'purple',
    href: 'https://maps.google.com/?q=GIET+University+Gunupur'
  },
];

export default function ContactUs() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', phone: '', category: 'general', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', category: 'general', message: '' });
    }, 1800);
  };

  const cardClass = `rounded-2xl border p-6 shadow-card transition-colors ${
    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
  }`;

  const labelClass = `block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`;

  const inputClass = `w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${
    isDark
      ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500'
      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
  }`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-brand-400' : 'text-brand-600'}`}>
          <HeadphonesIcon className="w-4 h-4" />
          <span>Support & Contact</span>
        </div>
        <h1 className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          We're here to help
        </h1>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Reach out to our admissions team or use the AI Assistant for instant answers.
        </p>
      </div>

      {/* Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CONTACT_CHANNELS.map((ch) => {
          const Icon = ch.icon;
          const colors = {
            emerald: isDark ? 'bg-emerald-900/40 text-emerald-300' : 'bg-emerald-50 text-emerald-700',
            blue: isDark ? 'bg-brand-900/40 text-brand-300' : 'bg-brand-50 text-brand-700',
            purple: isDark ? 'bg-violet-900/40 text-violet-300' : 'bg-violet-50 text-violet-700',
          };
          return (
            <a
              key={ch.label}
              href={ch.href}
              className={`${cardClass} flex flex-col items-start gap-3 hover:shadow-md transition-shadow no-underline group`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[ch.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{ch.label}</p>
                <p className={`font-semibold text-sm mt-0.5 group-hover:underline ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{ch.value}</p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{ch.sub}</p>
              </div>
            </a>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <div className={cardClass}>
          <div className="flex items-center gap-2.5 mb-5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-brand-900/50 text-brand-300' : 'bg-brand-100 text-brand-700'}`}>
              <MessageCircle className="w-4 h-4" />
            </div>
            <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Send Us a Message</h2>
          </div>

          {status === 'sent' ? (
            <div className={`flex flex-col items-center justify-center text-center py-10 gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg">Message Sent!</h3>
              <p className="text-sm max-w-xs text-slate-400">Our admissions team will get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-2 text-xs font-semibold text-brand-500 hover:underline"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Rahul Sharma" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="rahul@email.com" className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Phone (Optional)</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Category *</label>
                  <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                    <option value="general">General Inquiry</option>
                    <option value="application">Application Help</option>
                    <option value="documents">Document Verification</option>
                    <option value="fees">Fees & Scholarship</option>
                    <option value="technical">Technical Issue</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe your query or issue in detail..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                {status === 'sending' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <div className={cardClass}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-violet-900/50 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
                <FileQuestion className="w-4 h-4" />
              </div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className={`rounded-xl border overflow-hidden transition-colors ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{item.q}</span>
                    <span className={`ml-3 shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''} ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>›</span>
                  </button>
                  {openFaq === i && (
                    <div className={`px-4 pb-4 pt-1 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant CTA */}
          <div className={`rounded-2xl border p-5 flex items-center gap-4 ${
            isDark ? 'bg-indigo-950/60 border-indigo-800/50' : 'bg-indigo-50 border-indigo-100'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isDark ? 'bg-indigo-900/70 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
            }`}>
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-indigo-900'}`}>Need an instant answer?</h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
                The AdmitAI Assistant is available 24/7 for admissions guidance, eligibility checks, and more.
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div className={`rounded-2xl border p-5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Clock className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Office Hours</h3>
            </div>
            <div className={`space-y-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {[
                ['Monday – Friday', '9:00 AM – 6:00 PM'],
                ['Saturday', '10:00 AM – 2:00 PM'],
                ['Sunday', 'Closed'],
              ].map(([day, time]) => (
                <div key={day} className="flex items-center justify-between">
                  <span>{day}</span>
                  <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
