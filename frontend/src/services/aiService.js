import api from './api';

/**
 * AI Admission Assistant Service
 * Connects to backend Gemini 3.6 Flash endpoint with rich client fallback knowledge.
 */
export async function sendMessage(message, studentContext = {}, courseContext = null) {
  try {
    const response = await api.post('/ai/chat', {
      message,
      studentContext,
      courseContext
    });
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.warn('[AIService] Backend AI endpoint offline, using client-side intelligent fallback engine:', error.message);
  }

  const q = (message || '').toLowerCase();
  const studentName = studentContext?.name ? studentContext.name.split(' ')[0] : 'Candidate';

  if (q.includes('scholarship') || q.includes('fee waiver') || q.includes('concession')) {
    return {
      text: `Hello ${studentName}! At **GIET University**, we offer generous merit-based scholarships:\n\n1. **Merit Scholarship**: Up to **₹1,00,000 / 50% tuition waiver** for students scoring 90%+ in 12th Board or top rankers in JEE Main/GIETEE.\n2. **GIETEE Top Rankers**: 100% tuition waiver for the top 3 rankers in GIETEE entrance.\n3. **Sports & Cultural Excellence**: Concessions for national/state level players.\n4. **Sibling / Defense Concession**: 10–20% fee waiver for defense personnel wards and alumni siblings.\n\nWould you like me to evaluate your exact scholarship eligibility?`,
      suggestions: ['Check my scholarship eligibility', 'What are B.Tech CSE fees?', 'How to apply for scholarship?'],
      action: { type: 'NAVIGATE', route: '/application?step=academic', label: 'Update 12th Marks' }
    };
  }

  if (q.includes('placement') || q.includes('package') || q.includes('highest') || q.includes('recruiter')) {
    return {
      text: `GIET University holds an outstanding placement record:\n\n• **Placement Rate**: **93.8%+** across engineering and MCA.\n• **Highest CTC**: **₹26 LPA** (Amazon & Cisco).\n• **Average CTC**: **₹5.5 - 6.5 LPA**.\n• **Top Recruiters**: Amazon, Deloitte, IBM, TCS, Infosys, Wipro, Cognizant, Tech Mahindra, Mindtree, and 500+ MNCs.\n• **Training**: Dedicated 360-degree pre-placement coding bootcamps and soft-skills finishing school.`,
      suggestions: ['Explore B.Tech CSE', 'View Placement Records', 'Start Application'],
      action: { type: 'NAVIGATE', route: '/courses', label: 'View Degree Programs' }
    };
  }

  if (q.includes('hostel') || q.includes('room') || q.includes('mess') || q.includes('dining') || q.includes('campus')) {
    return {
      text: `GIET University Gunupur features a **100+ acre lush eco-friendly campus** with:\n\n• **Hostels**: Separate AC and non-AC modern hostels for boys and girls with 24/7 Wi-Fi, power backup, and round-the-clock biometric security.\n• **Mega Dining**: Hygienic central multi-cuisine mess serving nutritious North/South Indian and continental meals.\n• **Facilities**: Multi-specialty health clinic, 24/7 ATM, gymnasiums, indoor sports complex, cricket stadium, and NCC Army Wing.`,
      suggestions: ['Campus Life & Gallery', 'Hostel Fee Structure', 'Contact Admissions'],
      action: { type: 'NAVIGATE', route: '/about-giet', label: 'Explore Campus Gallery' }
    };
  }

  if (q.includes('course') || q.includes('program') || q.includes('b.tech') || q.includes('mca') || q.includes('mba')) {
    return {
      text: `GIET University offers **50+ undergraduate and postgraduate programs** across five premier academic schools:\n\n1. **School of Engineering & Technology**: B.Tech in CSE, AI & ML, Data Science, IoT, ECE, Mechanical, Civil, Biotech.\n2. **School of Computer Applications**: MCA (2 Years) & BCA.\n3. **School of Management Studies**: MBA & BBA (Business Analytics, Finance, Marketing, HR).\n4. **School of Agricultural Sciences**: B.Sc. (Hons) Agriculture (ICAR approved).\n\nWhich program interests you the most?`,
      suggestions: ['B.Tech in CSE (AI & ML)', 'Master of Computer Applications (MCA)', 'MBA Program Details'],
      action: { type: 'NAVIGATE', route: '/courses', label: 'Browse 50+ Programs' }
    };
  }

  return {
    text: `Hello ${studentName}! I am **AdmitAI**, your personal AI Admissions Guide for **GIET University, Gunupur (NAAC Grade 'A+')**.\n\nI can assist you with:\n• Program eligibility & merit cutoffs\n• Tuition fees and merit scholarships\n• Step-by-step application guidance\n• Campus hostels, placements, and facilities\n\nHow can I help you today?`,
    suggestions: ['What scholarships are available?', 'Tell me about placements', 'Explore B.Tech Courses', 'Check eligibility'],
    action: { type: 'NAVIGATE', route: '/courses', label: 'Explore Courses' }
  };
}

export default {
  sendMessage
};
