import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Award,
  BookOpen,
  Users,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Globe2,
  Target,
  Eye,
  CheckCircle2,
  Compass,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  HeartHandshake,
  Cpu,
  Sprout,
  BarChart3,
  Microscope,
  Landmark,
  ExternalLink
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useTheme } from '../context/ThemeContext';

export default function AboutGIET() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Year Established', value: '1997', sub: '28+ Years of Academic Legacy', icon: Landmark, color: 'text-amber-500' },
    { label: 'Campus Area', value: '100+ Acres', sub: 'Lush Green Eco-Campus in Gunupur', icon: MapPin, color: 'text-emerald-500' },
    { label: 'Placement Record', value: '95%+', sub: 'Over 100+ Top MNC Recruiters', icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Academic Programs', value: '50+', sub: 'UG, PG & Ph.D. Disciplines', icon: BookOpen, color: 'text-purple-500' },
    { label: 'Active Students', value: '7,500+', sub: 'From 24+ States & International', icon: Users, color: 'text-cyan-500' },
    { label: 'NAAC Accreditation', value: 'Grade A+', sub: 'UGC & AICTE Recognized', icon: ShieldCheck, color: 'text-rose-500' },
  ];

  const leadership = [
    {
      name: 'Prof. (Dr.) Satya Prakash Panda',
      role: 'President & Founder',
      desc: 'Visionary educator whose pioneering leadership laid the foundation of Vidya Bharati Educational Trust and transformed GIET into Eastern India’s premier technical university.',
      tag: 'Leadership & Vision'
    },
    {
      name: 'Prof. (Dr.) Chandra Dhwaj Panda',
      role: 'Vice President',
      desc: 'Driving strategic development, state-of-the-art infrastructure, international collaborations, and cutting-edge pedagogical excellence across all academic schools.',
      tag: 'Strategic Direction'
    },
    {
      name: 'Prof. (Dr.) Goutam Ghosh',
      role: 'Vice-Chancellor',
      desc: 'Fostering research innovations, multidisciplinary learning frameworks, academic governance, and alignment with national and global quality benchmarks.',
      tag: 'Academic Governance'
    },
    {
      name: 'Dr. N. V. Jagannadha Rao',
      role: 'Registrar',
      desc: 'Overseeing university administrative operations, compliance, institutional accreditation bodies, and student welfare ecosystems.',
      tag: 'Administration'
    }
  ];

  const schools = [
    {
      icon: Cpu,
      name: 'School of Engineering & Technology (SOET)',
      desc: 'Programs in Computer Science, AI & ML, Data Science, IoT, Cybersecurity, ECE, Mechanical, Civil, Electrical, and Chemical Engineering.',
      degrees: ['B.Tech', 'M.Tech', 'Ph.D.'],
      badge: 'NBA Accredited'
    },
    {
      icon: BarChart3,
      name: 'School of Management Studies (SMS)',
      desc: 'Industry-ready business education specializing in Marketing, Finance, HR, Operations, Business Analytics, and Logistics Management.',
      degrees: ['BBA', 'MBA', 'Ph.D.'],
      badge: 'Dual Specializations'
    },
    {
      icon: Layers,
      name: 'School of Computer Applications (SCA)',
      desc: 'Cutting-edge computing curriculum focused on Cloud Engineering, Full-Stack Software Development, DevOps, and Enterprise Systems.',
      degrees: ['BCA', 'MCA'],
      badge: 'Industry 4.0 Labs'
    },
    {
      icon: Sprout,
      name: 'School of Agricultural Sciences (SOAS)',
      desc: 'Modern agronomy, horticulture, soil chemistry, farm machinery, crop pathology, and sustainable organic farming techniques.',
      degrees: ['B.Sc. (Hons) Agri', 'M.Sc. Agri'],
      badge: 'ICAR Recognized'
    },
    {
      icon: Microscope,
      name: 'School of Sciences (SOS)',
      desc: 'Advanced research and post-graduate studies in Applied Physics, Industrial Chemistry, Mathematics, Life Sciences, and Biotechnology.',
      degrees: ['B.Sc.', 'M.Sc.', 'Ph.D.'],
      badge: 'Research Labs'
    },
    {
      icon: BookOpen,
      name: 'School of Humanities & Social Sciences',
      desc: 'Holistic foundational courses in English, Communication Skills, Applied Psychology, Economics, and Professional Ethics.',
      degrees: ['MA', 'Ph.D.', 'Skill Certs'],
      badge: 'Interdisciplinary'
    }
  ];

  const facilities = [
    {
      title: 'Central Library & Digital Repository',
      desc: 'Housing over 100,000+ volumes, 15,000+ online international journals, IEEE Xplore, ScienceDirect, Springer, and 24/7 digital reading bays.'
    },
    {
      title: 'Advanced Centers of Excellence',
      desc: 'Dedicated state-of-the-art laboratories for Artificial Intelligence, IoT, Cloud Computing, Robotics, and Advanced Material Testing.'
    },
    {
      title: 'Modern Residential Hostels',
      desc: 'Comfortable, secure AC and non-AC hostel rooms for over 3,500+ students with high-speed Wi-Fi, laundry, gym, and 24/7 surveillance.'
    },
    {
      title: 'Mega Dining & Cafeterias',
      desc: 'Hygienic, multi-cuisine dining serving nutritious North Indian, South Indian, and Continental meals prepared under strict FSSAI quality norms.'
    },
    {
      title: 'Sports Arena & Fitness Hub',
      desc: 'Cricket ground, standard football stadium, basketball courts, synthetic badminton courts, indoor games pavilion, and gymnasium.'
    },
    {
      title: '24/7 Healthcare & Medical Centre',
      desc: 'Fully equipped dispensary with resident medical officers, emergency nursing staff, pharmacy, and ambulance service available around the clock.'
    }
  ];

  const recruiters = [
    'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Tech Mahindra', 'IBM', 'Capgemini',
    'Amazon', 'Deloitte', 'HighRadius', 'Hexaware', 'Mindtree', 'HCLTech', 'Jindal Steel', 'JK Paper'
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* ========================================================
          1. HERO BANNER
      ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-indigo-950 text-white p-6 sm:p-12 shadow-2xl border border-slate-800">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>NAAC 'A+' Accredited University • Established in 1997</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            GIET University <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-indigo-200 to-sky-200">
              Gunupur, Odisha
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
            Pioneering excellence in technical, agricultural, and managerial education in Eastern India. Situated on the serene banks of river Bansadhara, GIET University empowers over 7,500 students with world-class faculty, state-of-the-art research infrastructure, and top-tier global placements.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/application')}
              className="bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/25 border-0 font-semibold"
            >
              Apply for 2026 Admissions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/ai-assistant')}
              className="bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 mr-2 text-brand-300" />
              Ask Admission AI
            </Button>
            <a
              href="https://www.giet.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-sm font-medium transition-all"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. KEY STATISTICS METRICS
      ======================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              } shadow-sm hover:shadow-md`}
            >
              <div className={`p-2 rounded-xl w-fit mb-2.5 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {item.value}
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {item.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          3. NAVIGATION TABS (Overview, Vision & Mission, Leadership, Schools, Campus Life, Placements)
      ======================================================== */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'overview', label: 'About University' },
          { id: 'vision', label: 'Vision & Mission' },
          { id: 'leadership', label: 'University Leadership' },
          { id: 'schools', label: 'Academic Schools' },
          { id: 'facilities', label: 'Campus & Facilities' },
          { id: 'placements', label: 'Placements & Recruiters' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-150 ${
              activeTab === tab.id
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================
          TAB 1: ABOUT UNIVERSITY OVERVIEW
      ======================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2.5 text-brand-600 dark:text-brand-400">
                  <Landmark className="w-5 h-5" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Heritage & Evolution</h2>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>GIET University (Gandhi Institute of Engineering and Technology)</strong> was founded in <strong>December 1997</strong> under the visionary aegis of the <strong>Vidya Bharati Educational Trust</strong> with the core objective of delivering world-class technical education to students across Eastern India.
                </p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Located in the scenic, picturesque foothills of the Eastern Ghats on the banks of the sacred river <strong>Bansadhara</strong> at Gunupur, Rayagada, Odisha, the institution has blossomed into a sprawling <strong>100+ acre state-of-the-art university campus</strong>. Over 28 years, it has transformed into a prestigious multidisciplinary hub recognized by the <strong>UGC</strong>, <strong>AICTE</strong>, and accredited with <strong>NAAC 'A+' Grade</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Statutory Recognition
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Established under the Odisha Act 23 of 2018, recognized under Section 2(f) & 12(B) of UGC Act 1956.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-1">
                      <Award className="w-4 h-4 text-brand-500" />
                      Research & SIRO Status
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Recognized as a Scientific and Industrial Research Organization (SIRO) by DSIR, Ministry of Science & Tech.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Accreditations Banner */}
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  National Accreditations & Recognitions
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'NAAC A+ Grade', desc: 'Highest Quality Tier' },
                    { label: 'UGC Recognized', desc: 'Section 2(f) & 12(B)' },
                    { label: 'AICTE Approved', desc: 'Technical Council' },
                    { label: 'NBA Accredited', desc: 'Key Engg Disciplines' },
                    { label: 'ICAR Approved', desc: 'Agricultural Sciences' },
                    { label: 'DSIR SIRO', desc: 'Govt Research Center' },
                    { label: 'NIRF Ranked', desc: 'Eastern India Top Tier' },
                    { label: 'ISO 9001:2015', desc: 'Quality Management' },
                  ].map((acc, i) => (
                    <div key={i} className={`p-3 rounded-xl text-center border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{acc.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{acc.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact & Admission Box */}
            <div className="space-y-6">
              <Card className="p-6 space-y-5">
                <div className="flex items-center gap-2.5 text-brand-600 dark:text-brand-400 font-bold text-base">
                  <Building2 className="w-5 h-5" />
                  <h3>Campus Location</h3>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">GIET University, Gunupur</p>
                      <p className="text-slate-500 dark:text-slate-400">Gobriguda, Po- Kharling, Gunupur</p>
                      <p className="text-slate-500 dark:text-slate-400">Dist: Rayagada, Odisha, India – 765022</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">+91-7735745535 / 06857-250172</p>
                      <p className="text-slate-500 dark:text-slate-400">Admissions Helpline (9 AM - 6 PM)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">admission@giet.edu</p>
                      <p className="text-slate-500 dark:text-slate-400">enquiry@giet.edu</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center bg-brand-500 hover:bg-brand-600 text-white font-semibold"
                    onClick={() => navigate('/courses')}
                  >
                    View All 50+ Courses
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => navigate('/contact')}
                  >
                    Contact Admission Desk
                  </Button>
                </div>
              </Card>

              {/* Fast Facts Badge Card */}
              <Card className="p-5 bg-gradient-to-br from-brand-900/30 to-indigo-900/30 border-brand-500/20">
                <div className="flex items-center gap-2 text-brand-300 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why GIET University?</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>28+ Years of Academic Heritage & Trust</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>100+ Acre Riverfront Eco-Friendly Campus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Over 95% Consistent Placement Track Record</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>100+ Ph.D. Expert Teaching Faculty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Active MSME / Startup Incubation Cell</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: VISION & MISSION
      ======================================================== */}
      {activeTab === 'vision' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm relative overflow-hidden`}>
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                "To be a globally acclaimed university recognized for innovation, high-standard research-driven education, and transformative impact on societal, environmental, and sustainable economic growth."
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <Target className="w-4 h-4" />
                <span>Global Acclaim • Research Excellence • Sustainable Impact</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm relative overflow-hidden`}>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission Pillars</h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                  <p><strong>Workforce Development:</strong> Create an innovative and committed workforce to cater to the societal, environmental, and economic needs of the nation.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                  <p><strong>Global Benchmarks:</strong> Promote education and research globally at par with international pedagogical standards.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                  <p><strong>Future Leadership:</strong> Prepare future leaders with cutting-edge skills, enabling them to become innovators, entrepreneurs, or highly employable professionals.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
                  <p><strong>Social Responsibility & Upliftment:</strong> Support and uplift meritorious students from rural and tribal communities, empowering them as global ambassadors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Core Institutional Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Academic Rigor', desc: 'Fostering intellectual curiosity, critical inquiry, and analytical competence.' },
                { title: 'Ethical Integrity', desc: 'Upholding transparency, honesty, and professional ethics in all endeavors.' },
                { title: 'Innovation & Research', desc: 'Promoting lab-to-land research, patents, and entrepreneurial solutions.' },
                { title: 'Community Inclusion', desc: 'Empowering diverse talents and prioritizing socio-economic regional development.' },
              ].map((val, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="w-2 h-2 rounded-full bg-brand-500 mb-2" />
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{val.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{val.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: LEADERSHIP
      ======================================================== */}
      {activeTab === 'leadership' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">University Leadership & Governance</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Guiding GIET University with visionary stewardship, academic excellence, and administrative transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((leader, idx) => (
              <Card key={idx} className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                      {leader.tag}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-2">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                      {leader.role}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {leader.name.split(' ')[1]?.[0] || 'G'}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {leader.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: ACADEMIC SCHOOLS
      ======================================================== */}
      {activeTab === 'schools' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Academic Schools & Faculties</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Offering 50+ industry-aligned degree programs across engineering, computing, management, and agriculture.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/courses')}
              className="bg-brand-500 hover:bg-brand-600 text-white font-semibold self-start sm:self-auto"
            >
              Browse Course Catalog
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((sch, idx) => {
              const Icon = sch.icon;
              return (
                <Card key={idx} className="p-6 flex flex-col justify-between space-y-4 hover:border-brand-500/50 transition-all">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-500">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {sch.badge}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {sch.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {sch.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {sch.degrees.map((d, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {d}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate('/courses')}
                      className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: CAMPUS & FACILITIES
      ======================================================== */}
      {activeTab === 'facilities' && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">World-Class Campus Infrastructure</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Sprawled across 100+ acres along the river Bansadhara, providing an enriching learning and residential ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                } shadow-sm space-y-2.5`}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Student Life Highlight */}
          <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-r ${isDark ? 'from-brand-950 to-slate-900 border-brand-900' : 'from-brand-50 to-indigo-50 border-brand-100'} border space-y-3`}>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-brand-500" />
              Student Clubs, Fests & Technical Societies
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Campus life at GIET University is buzzing with over 20+ student-led technical clubs (Robotics Club, Coding Society, IEEE Student Branch, AI Consortium), annual national cultural festival <strong>"Tarang"</strong>, technical hackathons, entrepreneurship summits, and community outreach drives.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 6: PLACEMENTS & RECRUITERS
      ======================================================== */}
      {activeTab === 'placements' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
              <div className="text-3xl font-black text-emerald-500">95%+</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Average Placement Rate</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Across B.Tech, MCA & MBA streams</div>
            </div>
            <div className={`p-6 rounded-2xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
              <div className="text-3xl font-black text-brand-500">₹19.5 - 26 LPA</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Highest Package Offered</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Top tech & cloud product companies</div>
            </div>
            <div className={`p-6 rounded-2xl border text-center ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
              <div className="text-3xl font-black text-indigo-500">100+</div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">Annual Recruiting Companies</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Tier-1 MNCs, IT Giants & Core sectors</div>
            </div>
          </div>

          {/* Recruiters Carousel / Grid */}
          <div className={`p-6 sm:p-8 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} space-y-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Our Premier Recruiting Partners</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Top global technology, consulting, and manufacturing firms hiring GIET graduates</p>
              </div>
              <Badge variant="outline" className="hidden sm:inline-flex">
                100+ Partners
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
              {recruiters.map((rec, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl text-center font-bold text-sm tracking-wide border transition-all ${
                    isDark
                      ? 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {rec}
                </div>
              ))}
            </div>
          </div>

          {/* Training & Placement Support */}
          <Card className="p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-500" />
              Dedicated Training & Placement (T&P) Cell
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              The GIET University Training and Placement Department orchestrates comprehensive four-year career grooming: soft skills training, mock coding tests, Python & full-stack development bootcamps, resume building, and industry internships.
            </p>
          </Card>
        </div>
      )}

      {/* ========================================================
          6.5 CAMPUS LIFE, INFRASTRUCTURE & HERITAGE GALLERY
      ======================================================== */}
      <div className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Showcase & Milestone Gallery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Life at GIET University & Campus Infrastructure
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Experience our 100+ acre lush riverfront campus, advanced computing laboratories, national awards, modern central dining, and grand convention auditoriums.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Lush Campus Lawn */}
          <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/gallery/campus_life_lawn.jpg"
                alt="Students on GIET Campus Lawn"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-500/40 backdrop-blur-md">
                  Campus Life
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Lush Green Campus & Collaborative Learning
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Students collaborating on engineering projects across our 100+ acre green riverfront campus at the foothills of the Eastern Ghats.
              </p>
            </div>
          </div>

          {/* Card 2: Asia Education Summit Award */}
          <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/gallery/asia_education_award.jpg"
                alt="Asia Education Summit & Awards 2020"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-amber-900/80 text-amber-200 border border-amber-500/40 backdrop-blur-md">
                  National Accolades
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Asia Education Summit & Awards (Vigyan Bhawan)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                GIET University leadership receiving national honors at the Asia Education Summit in Vigyan Bhawan, New Delhi.
              </p>
            </div>
          </div>

          {/* Card 3: Advanced Computing Lab */}
          <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/gallery/computer_coding_lab.jpg"
                alt="Advanced Coding & Hackathon Lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-blue-900/80 text-blue-200 border border-blue-500/40 backdrop-blur-md">
                  Tech & Innovation
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Coding & Hackathon Innovation Hub
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Scholars engaged in software engineering, AI/ML model training, competitive coding, and national hackathon hackathons.
              </p>
            </div>
          </div>

          {/* Card 4: Mega Central Dining Hall (Spans 1 col or 1.5) */}
          <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:col-span-1 lg:col-span-1">
            <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/gallery/central_dining_mess.png"
                alt="Central Dining & Student Mess Hall"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-purple-900/80 text-purple-200 border border-purple-500/40 backdrop-blur-md">
                  Campus Facilities
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Mega Central Dining & Mess Facility
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Multi-tier hygienic cafeteria serving balanced North Indian, South Indian, and Odia multi-cuisine meals daily.
              </p>
            </div>
          </div>

          {/* Card 5: Modern University Auditorium (Spans 2 col on md/lg for cinematic feel) */}
          <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:col-span-2 lg:col-span-2">
            <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/gallery/university_auditorium.png"
                alt="Grand University Auditorium during Learnathon"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-rose-900/80 text-rose-200 border border-rose-500/40 backdrop-blur-md">
                  Events & Conventions
                </span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-1.5">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Grand Central Convention Auditorium (Learnathon 5.0)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                State-of-the-art air-conditioned acoustic auditorium hosting international symposiums, technical learnathons, and cultural galas.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================
          7. BOTTOM CALL TO ACTION
      ======================================================== */}
      <div className={`p-8 rounded-3xl border text-center space-y-4 ${
        isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200'
      } shadow-lg`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-500/20">
          <GraduationCap className="w-4 h-4" />
          <span>Admissions Open for Academic Year 2026-27</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Begin Your Journey at GIET University Today
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore our range of accredited engineering, agricultural, management, and computing programs. Apply online in minutes through our AI-assisted student portal.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/application')}
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-md shadow-brand-500/20"
          >
            Start Your Application
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/ai-assistant')}
          >
            <Sparkles className="w-4 h-4 mr-2 text-brand-500" />
            Chat with Admission Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
