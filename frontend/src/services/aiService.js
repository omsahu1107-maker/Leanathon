import api from './api';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-3.6-flash', 'gemini-2.5-flash-lite'];

/**
 * Direct Live Google Gemini AI Call from Frontend
 */
async function callLiveGemini(message, studentContext = {}, courseContext = null) {
  if (!GEMINI_API_KEY) return null;

  const candidateName = studentContext.name || 'Candidate';
  const candidateAppId = studentContext.applicationId || 'ADM-2026-8941';
  const targetProgram = courseContext?.name || studentContext.program || 'B.Tech in Computer Science & Engineering';

  const institutionalPrompt = `You are AdmitAI, the official Autonomous Admissions & Academic Counselor for GIET University, Gunupur (Odisha).

🏛️ INSTITUTIONAL KNOWLEDGE BASE:
- University: GIET University (Gandhi Institute of Engineering and Technology), Gunupur, Dist-Rayagada, Odisha - 765022.
- Establishment: Founded in 1997 by Vidya Bharati Educational Trust (VBET). President: Prof. (Dr.) Satya Prakash Panda.
- Accreditations: NAAC 'A+' Grade (CGPA 3.28), UGC (Sections 2f & 12B), AICTE & ICAR Approved, NBA Accredited.
- Timings & Working Hours:
  * Academic Class Hours: 9:00 AM – 4:30 PM (Monday to Saturday).
  * Central Digital Library: 8:00 AM – 10:00 PM (Daily, 7 days a week).
  * Admissions Desk & Helpline: 9:00 AM – 6:00 PM (Mon–Sat, Phone: +91 06857 250172).
  * Administrative Offices: 9:00 AM – 5:30 PM.
  * Hostel Curfew/Gate Timings: 8:30 PM (biometric security access).
- Programs: B.Tech (CSE, AI & ML, Data Science, IoT, ECE, EE, Mechanical, Civil, Biotech), M.Tech, MBA, MCA, B.Sc (Hons) Agriculture (ICAR approved), BCA, BBA, Ph.D.
- Placements: 93.8%+ placement rate, 500+ top MNC recruiters (TCS, Infosys, Amazon, Wipro, Cognizant, IBM, Deloitte, Tech Mahindra), Highest CTC ₹26 LPA, Average CTC ₹5.5–6.5 LPA.
- Scholarships: Merit scholarships up to ₹1,00,000 for 90%+ in 12th Board / JEE Main / GIETEE, 100% waiver for top 3 GIETEE rankers, PRERANA & Medhabruti government schemes.
- Campus & Life: 100+ acre riverfront campus, separate AC/Non-AC Boys & Girls hostels, multi-cuisine dining mess, 24/7 healthcare hospital, ATM, active NCC Army Wing, NSS, sports stadium, gymnasiums.

CANDIDATE CONTEXT:
- Candidate Name: ${candidateName}
- Application ID: ${candidateAppId}
- Target Program: ${targetProgram}

CANDIDATE QUERY: "${message}"

INSTRUCTIONS:
1. Answer the candidate's question accurately, directly, and politely.
2. Address the candidate warmly by name (${candidateName}).
3. Use clean markdown formatting (bold headings, bullet points).
4. Never leave answers incomplete. Provide specific numbers and timings.`;

  for (const model of GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(6000),
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: institutionalPrompt }] }],
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7
          }
        })
      });

      if (res.ok) {
        const json = await res.json();
        const generated = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generated && generated.trim().length > 20) {
          return {
            text: generated,
            suggestions: [
              'Fee Structure & Scholarships',
              'Check Placement Records',
              'Campus & Hostel Facilities',
              'Start My Application'
            ],
            action: {
              type: 'NAVIGATE',
              label: 'Explore Degree Programs',
              route: '/courses'
            }
          };
        }
      }
    } catch (e) {
      console.warn(`[Client Gemini AI] ${model} try next:`, e.message);
    }
  }

  return null;
}

/**
 * Comprehensive Knowledge Base Rule Engine (Instant Zero-Lag Local Engine)
 */
function getKnowledgeResponse(message, studentContext = {}) {
  const q = (message || '').toLowerCase().trim();
  const name = studentContext.name ? studentContext.name.split(' ')[0] : 'Candidate';

  // 1. College Timings & Hours
  if (
    q.includes('time') ||
    q.includes('timing') ||
    q.includes('open') ||
    q.includes('close') ||
    q.includes('hour') ||
    q.includes('working') ||
    q.includes('schedule')
  ) {
    return {
      text: `🕒 **GIET University Campus & Academic Timings**:\n\n` +
        `• **Academic Class Hours**: **9:00 AM – 4:30 PM** (Monday to Saturday)\n` +
        `• **Central Digital Library**: **8:00 AM – 10:00 PM** (Open all 7 days a week)\n` +
        `• **Admissions Helpdesk**: **9:00 AM – 6:00 PM** (Monday to Saturday)\n` +
        `• **Administrative Offices**: **9:00 AM – 5:30 PM**\n` +
        `• **Hostel Gate Timing**: **8:30 PM** evening reporting time (24/7 biometric security)\n` +
        `• **Campus Health Clinic**: **24/7 Round-the-Clock Emergency Medical Services**\n\n` +
        `Would you like assistance with class schedules or visiting the campus?`,
      suggestions: ['Hostel & Campus Facilities', 'Admissions Contact Info', 'Course Fee Structure'],
      action: { type: 'NAVIGATE', label: 'Contact Helpdesk', route: '/contact' }
    };
  }

  // 2. Scholarships & Fee Waivers
  if (q.includes('scholarship') || q.includes('fee waiver') || q.includes('concession') || q.includes('financial aid')) {
    return {
      text: `💰 **Scholarship Schemes at GIET University (2026–27)**:\n\n` +
        `1. **Merit Excellence Scholarship**: Up to **₹1,00,000 (50% tuition waiver)** for candidates scoring 90%+ in 12th Board / JEE Main.\n` +
        `2. **GIETEE Top Rankers**: **100% Tuition Fee Waiver** for top 3 rankers in GIET University Entrance Exam.\n` +
        `3. **Defense & Paramilitary Wards**: 15% special tuition fee concession.\n` +
        `4. **State & Central Government Scholarships**: Direct institutional facilitation for **PRERANA**, Post-Matric, **NSP**, and **Medhabruti**.\n` +
        `5. **Sports & Cultural Achievers**: Special fee concessions for state and national level champions.\n\n` +
        `Would you like me to calculate your eligibility based on your 12th PCM / JEE score?`,
      suggestions: ['Check my eligibility', 'B.Tech CSE Fee Structure', 'How to apply for scholarship?'],
      action: { type: 'NAVIGATE', label: 'Update Academic Score', route: '/application?step=academic' }
    };
  }

  // 3. Placements & Recruiters
  if (q.includes('placement') || q.includes('package') || q.includes('highest') || q.includes('recruiter') || q.includes('salary') || q.includes('company') || q.includes('job')) {
    return {
      text: `💼 **GIET University Placement Highlights**:\n\n` +
        `• **Placement Rate**: **93.8%+** overall record.\n` +
        `• **Highest Package**: **₹26 LPA** (Amazon, Cisco, Microsoft).\n` +
        `• **Average Package**: **₹5.5 – ₹6.5 LPA** across B.Tech & MCA.\n` +
        `• **500+ Top Recruiters**: TCS, Infosys, Amazon, Wipro, Cognizant, IBM, Deloitte, Tech Mahindra, Mindtree, HCL, Capgemini.\n` +
        `• **Pre-Placement Training**: 360° training program with coding bootcamps, competitive programming, and soft skills from 2nd year onwards.\n\n` +
        `Would you like to see branch-wise placement statistics?`,
      suggestions: ['Explore B.Tech CSE', 'View Top Recruiters', 'Start Online Application'],
      action: { type: 'NAVIGATE', label: 'Explore Programs', route: '/courses' }
    };
  }

  // 4. Hostels, Food & Campus Living
  if (q.includes('hostel') || q.includes('room') || q.includes('mess') || q.includes('food') || q.includes('dining') || q.includes('wifi') || q.includes('stay')) {
    return {
      text: `🏡 **Hostel & Campus Facilities at GIET University**:\n\n` +
        `• **Accommodation**: Separate state-of-the-art AC and Non-AC hostels for boys and girls.\n` +
        `• **Connectivity**: High-speed Wi-Fi across the 100+ acre campus and hostel rooms.\n` +
        `• **Dining & Mess**: Central mega dining hall providing hygienic North Indian, South Indian, and Continental meals (4 meals daily).\n` +
        `• **Safety & Healthcare**: 24/7 CCTV surveillance, biometric security, and full-fledged campus hospital with ambulance.\n` +
        `• **Recreation**: Indoor sports complex, modern gymnasium, cricket stadium, badminton courts, and cultural amphitheater.\n\n` +
        `Hostel fees range from **₹65,000 to ₹95,000 per year** including food and lodging.`,
      suggestions: ['Campus Life Photos', 'Hostel Fee Details', 'Apply for Admission'],
      action: { type: 'NAVIGATE', label: 'View Campus Gallery', route: '/about-giet' }
    };
  }

  // 5. NCC, NSS & Extracurriculars
  if (q.includes('ncc') || q.includes('nss') || q.includes('cadet') || q.includes('army') || q.includes('sports') || q.includes('cricket') || q.includes('gym')) {
    return {
      text: `🎖️ **NCC & Sports at GIET University**:\n\n` +
        `• **Authorized NCC Army Wing**: Active unit under 1 (O) CTC NCC. Students undergo drills, firing training, and earn prestigious **NCC 'B' and 'C' Certificates** for defense careers.\n` +
        `• **National Parades**: Cadets regularly represent Odisha at Republic Day Parade (RDC) and Thal Sainik Camps (TSC).\n` +
        `• **Sports Stadium**: Full-sized cricket stadium, football turf, basketball courts, and indoor badminton arena.\n` +
        `• **NSS & Youth Red Cross**: Social service initiatives, environmental campaigns, and health camps.\n\n` +
        `Would you like to enroll in NCC during your first semester?`,
      suggestions: ['Sports Facilities', 'Campus Life Gallery', 'Apply for Admission'],
      action: { type: 'NAVIGATE', label: 'About GIET University', route: '/about-giet' }
    };
  }

  // 6. Courses & Degrees
  if (q.includes('course') || q.includes('program') || q.includes('branch') || q.includes('b.tech') || q.includes('mca') || q.includes('mba') || q.includes('agriculture')) {
    return {
      text: `🎓 **Academic Programs at GIET University (50+ Degrees)**:\n\n` +
        `1. **B.Tech (4 Years)**: CSE, CSE (AI & ML), CSE (Data Science), CSE (IoT), ECE, Mechanical, Civil, Biotechnology, EE.\n` +
        `2. **Computer Applications**: MCA (2 Years), BCA (3 Years), M.Sc Data Science.\n` +
        `3. **Management**: MBA (Dual Specialization in Business Analytics, Finance, Marketing, HR), BBA.\n` +
        `4. **Agricultural Sciences**: B.Sc. (Hons) Agriculture (ICAR Approved with 100+ acre experimental farms).\n` +
        `5. **Doctoral**: Ph.D. in Engineering, Computer Applications, Management, Sciences.\n\n` +
        `Which specific field would you like to explore?`,
      suggestions: ['B.Tech in CSE (AI & ML)', 'MCA Program Details', 'MBA Course & Cutoffs', 'B.Sc Agriculture'],
      action: { type: 'NAVIGATE', label: 'Browse 50+ Degrees', route: '/courses' }
    };
  }

  // 7. Eligibility & Cutoffs
  if (q.includes('eligibility') || q.includes('cutoff') || q.includes('mark') || q.includes('percentage') || q.includes('jee') || q.includes('ojee')) {
    return {
      text: `📋 **Eligibility & Admission Criteria (2026–27)**:\n\n` +
        `• **B.Tech Programs**: 10+2 with Physics, Mathematics, and Chemistry/CS with minimum **45% marks** (40% for reserved categories). Valid score in **JEE Main / OJEE / GIETEE**.\n` +
        `• **B.Tech (Lateral Entry)**: 3-Year Diploma in Engineering or B.Sc with minimum 45% marks.\n` +
        `• **MCA Program**: BCA or Graduation with Mathematics at 10+2 or Degree level with 50% marks.\n` +
        `• **MBA Program**: Bachelor's Degree in any discipline with minimum 50% marks (45% for SC/ST) + CAT / MAT / XAT / OJEE / GIETEE score.\n` +
        `• **B.Sc. (Hons) Agriculture**: 10+2 with Science (PCB/PCM) with minimum 50% aggregate.\n\n` +
        `Upload your marksheet for instant automated eligibility verification!`,
      suggestions: ['Check My Eligibility', 'Upload 12th Marksheet', 'Contact Counselor'],
      action: { type: 'NAVIGATE', label: 'Start Eligibility Check', route: '/application' }
    };
  }

  // 8. Default Engaging Response
  return {
    text: `Hello ${name}! I am **AdmitAI**, your personal AI Admissions Guide for **GIET University, Gunupur (NAAC Grade 'A+')**.\n\nI can provide exact answers on:\n• 🕒 **College timings & campus schedule**\n• 🎓 **50+ Degree Programs & eligibility cutoffs**\n• 💰 **Merit scholarships up to ₹1,00,000**\n• 💼 **93.8% placements & ₹26 LPA top packages**\n• 🏡 **Hostels, sports complex & NCC Army Wing**\n\nWhat would you like to know about GIET University?`,
    suggestions: ['What are the college timings?', 'Tell me about scholarships', 'What are B.Tech CSE cutoffs?', 'Campus hostels & mess'],
    action: { type: 'NAVIGATE', label: 'Explore All Courses', route: '/courses' }
  };
}

/**
 * Main send message handler
 */
export async function sendMessage(message, studentContext = {}, courseContext = null) {
  // 1. Try Backend API first
  try {
    const response = await api.post('/ai/chat', {
      message,
      studentContext,
      courseContext
    });
    if (response && response.data && response.data.text) {
      return response.data;
    }
  } catch (err) {
    // Backend offline / Vercel standalone
  }

  // 2. Try Live Client-Side Google Gemini API
  try {
    const liveResponse = await callLiveGemini(message, studentContext, courseContext);
    if (liveResponse) {
      return liveResponse;
    }
  } catch (err) {
    console.warn('[Gemini Client Error]', err.message);
  }

  // 3. Instant Zero-Lag Fallback Knowledge Engine
  return getKnowledgeResponse(message, studentContext);
}

export default {
  sendMessage
};
