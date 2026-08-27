const { mockCourses, mockApplication, mockStudentProfile, mockDocuments } = require('../data/mockData');
const config = require('../config');

// Live Gemini API Models list in order of priority
const GEMINI_MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-2.5-flash-lite', 'gemini-3.7-flash'];

/**
 * Call Live Google Gemini LLM with institutional system context
 */
async function callGeminiLLM(message, studentContext = {}, courseContext = null) {
  if (!config.ai.geminiApiKey) return null;

  const candidateName = studentContext.name || 'Candidate';
  const candidateAppId = studentContext.applicationId || 'ADM-2026-8941';
  const targetProgram = courseContext?.name || studentContext.program || 'B.Tech in Computer Science & Engineering';

  const fullPrompt = `You are AdmitAI, the official Autonomous Admissions & Academic Counselor for GIET University, Gunupur (Odisha).

🏛️ INSTITUTIONAL KNOWLEDGE & CREDENTIALS:
- University: GIET University (Gandhi Institute of Engineering and Technology), Gunupur, Dist-Rayagada, Odisha - 765022.
- Leadership: Founded in 1997 by Vidya Bharati Educational Trust (VBET). President: Prof. (Dr.) Satya Prakash Panda.
- Accreditations: NAAC 'A+' Grade, UGC (Sections 2f & 12B), AICTE & ICAR Approved, NBA Accredited.
- Programs: B.Tech (CSE, AI & ML, Data Science, ECE, EE, Mechanical, Civil, Biotech), M.Tech, MBA, MCA, B.Sc (Hons) Agriculture, B.Sc, BCA, BBA, Ph.D.
- Placements: 93.8%+ placement rate, 500+ top MNC recruiters (TCS, Infosys, Amazon, Wipro, Cognizant, IBM, Deloitte, Tech Mahindra, Mindtree), Highest CTC ₹26 LPA, Average CTC ₹5.5–6.5 LPA.
- Scholarships: Merit scholarships up to ₹1,00,000 for top rankers in 12th PCM / JEE Main / GIETEE, plus state/central government scholarship support (PRERANA, Post-Matric, NSP, Medhabruti).
- Campus & Life: Sprawling 100+ acre lush riverfront campus, 24/7 Wi-Fi, modern digital library, separate AC/Non-AC Boys & Girls hostels, hygienic multi-cuisine cafeteria, 24/7 healthcare hospital.
- Extracurriculars: Active NCC Army Wing unit ('B' & 'C' certificates), NSS, Sports complex (cricket stadium, football turf, indoor badminton, modern gymnasium), robotics & coding clubs, 100% zero-tolerance anti-ragging security.

CANDIDATE CONTEXT:
- Candidate Name: ${candidateName}
- Application ID: ${candidateAppId}
- Target Program: ${targetProgram}

CANDIDATE QUESTION: "${message}"

INSTRUCTIONS:
1. Provide a comprehensive, polite, well-structured, and persuasive response.
2. Address the student warmly by their name (${candidateName}).
3. Use bold headings, bullet points, and key achievements to make the answer easy to read.
4. Provide complete and un-truncated answers.`;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.ai.geminiApiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(8000),
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: fullPrompt }]
            }
          ],
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.7
          }
        })
      });

      if (res.ok) {
        const json = await res.json();
        const generatedText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText && generatedText.trim().length > 20) {
          return {
            text: generatedText,
            suggestions: [
              'Check Placement Records & Companies',
              'Fee Structure & Merit Scholarships',
              'Hostel, Sports & Campus Facilities',
              'Upload Marksheets for Document Audit'
            ],
            action: {
              type: 'navigate',
              label: 'Explore Academic Programs',
              route: '/courses'
            }
          };
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.warn(`[Gemini AI] Model ${model} returned HTTP ${res.status}:`, errorData?.error?.message || res.statusText);
      }
    } catch (err) {
      console.warn(`[Gemini AI] Connection error on ${model}:`, err.message);
    }
  }

  return null;
}

/**
 * Process incoming admission chat message
 * @param {string} message - User query
 * @param {object} studentContext - Current student context (id, name, stage, risk)
 * @param {object} courseContext - Optional course currently being viewed
 */
async function processChatMessage(message, studentContext = {}, courseContext = null) {
  const query = (message || '').toLowerCase().trim();
  const studentName = studentContext.name || 'Candidate';

  // 1. Live Google Gemini AI Call (Answers ANY question with full depth)
  if (config.ai.geminiApiKey) {
    const liveAiResponse = await callGeminiLLM(message, studentContext, courseContext);
    if (liveAiResponse) {
      return liveAiResponse;
    }
  }

  // 2. Comprehensive Contextual Rule Engine (Fallback)
  // NCC / NSS / Extracurriculars
  if (query.includes('ncc') || query.includes('nss') || query.includes('cadet') || query.includes('army') || query.includes('naval')) {
    return {
      text: `🎖️ **NCC (National Cadet Corps) at GIET University**:\n\n` +
        `• **Yes, NCC is active on campus!** GIET University has an authorized **NCC Army Wing** under 1 (O) CTC NCC.\n` +
        `• **Certification:** Enrolled cadets undergo regular drills, firing practice, adventure camps, and earn official **NCC 'B' and 'C' Certificates**.\n` +
        `• **Opportunities:** Cadets represent GIET University at Republic Day Parade (RDC), Combined Annual Training Camps (CATC), and Thal Sainik Camps (TSC).\n` +
        `• **NSS & Youth Red Cross:** Active community social service units organizing blood donation drives, tree plantation, and rural development camps.\n\n` +
        `Would you like to know more about sports, clubs, or campus life?`,
      suggestions: ['Sports & Gymnasium Facilities', 'Cultural & Technical Clubs', 'Hostels & Mess Facilities', 'Admission Procedure 2026'],
      action: { type: 'navigate', label: 'View Campus Life', route: '/about-giet' }
    };
  }

  // Why this university / Why choose GIET / Comparison
  if (query.includes('why') || query.includes('better') || query.includes('advantage') || query.includes('choose') || query.includes('benefit') || query.includes('special')) {
    return {
      text: `🏛️ **Why GIET University, Gunupur is the Best Choice for You, ${studentName}**:\n\n` +
        `1. **NAAC 'A+' Grade & NBA Accreditation:** Recognized globally for academic excellence, UGC (2f & 12B), AICTE, and ICAR approved.\n` +
        `2. **93.8%+ Consistent Placements:** 500+ top multinational recruiters (Amazon, IBM, Deloitte, TCS, Infosys, Cognizant, Wipro, Tech Mahindra) with highest packages up to **₹26 LPA**.\n` +
        `3. **Generous Merit Scholarships:** Up to **₹1,00,000** financial scholarship for top rankers in 12th PCM and JEE Main.\n` +
        `4. **100+ Acre Riverfront Campus:** Modern digital library, high-tech labs, sports complex, gymnasium, and 100% anti-ragging security.\n` +
        `5. **Holistic Growth:** Active NCC Army Wing, NSS, coding hackathons, robotics labs, and international symposiums.\n\n` +
        `Would you like to explore our 50+ degree programs or review the fee structure?`,
      suggestions: ['Explore 50+ Degree Courses', 'Check Placement Records', 'Fees & Scholarships', 'Start Online Application'],
      action: { type: 'navigate', label: 'Explore Academic Programs', route: '/courses' }
    };
  }

  // Sports & Gym
  if (query.includes('sport') || query.includes('gym') || query.includes('ground') || query.includes('cricket') || query.includes('football') || query.includes('badminton')) {
    return {
      text: `⚽ **Sports & Recreation Facilities at GIET University**:\n\n` +
        `• **Outdoor Sports:** Full-sized Cricket stadium, Football ground, Volleyball courts, and standard Basketball turf.\n` +
        `• **Indoor Sports Complex:** Multi-court Badminton hall, Table Tennis arena, Carrom, and Chess zones.\n` +
        `• **Modern Gymnasium:** Fully equipped separate gymnasiums for boys and girls with certified fitness instructors.\n` +
        `• **Annual Sports Meet (SPARDHA):** Inter-college and inter-department sports tournaments with medals and awards.\n\n` +
        `All sports facilities are open daily for residential and day scholars.`,
      suggestions: ['Hostel & Mess Details', 'Explore 50+ Courses', 'Tuition Fees & Scholarships', 'Contact Admissions'],
      action: { type: 'navigate', label: 'About GIETU', route: '/about-giet' }
    };
  }

  // Hostels & Mess
  if (query.includes('hostel') || query.includes('mess') || query.includes('food') || query.includes('room') || query.includes('ac') || query.includes('accommodation')) {
    return {
      text: `🏢 **Hostel & Residential Accommodation**:\n\n` +
        `• **Rooms:** Separate AC and Non-AC hostels for Boys & Girls with 2-sharing, 3-sharing, and 4-sharing options.\n` +
        `• **Dining & Mess:** Multi-cuisine hygienic dining halls serving balanced North Indian, South Indian, and Odia vegetarian & non-vegetarian meals.\n` +
        `• **Amenities:** 24/7 High-speed Wi-Fi, power backup, study rooms, RO drinking water, and laundry service.\n` +
        `• **Safety:** 24/7 CCTV surveillance, biometric access control, security guards, and resident wardens.`,
      suggestions: ['Hostel Fee Breakdown', 'Campus Life & Sports', 'Check Eligibility', 'Fee Structure'],
      action: { type: 'navigate', label: 'Contact Helpdesk', route: '/contact' }
    };
  }

  // GIET University Institutional & College Information
  if (query.includes('about giet') || query.includes('about college') || query.includes('about university') || query.includes('giet') || query.includes('gunupur') || query.includes('president') || query.includes('vice chancellor') || query.includes('location') || query.includes('naac') || query.includes('history')) {
    return {
      text: `🏛️ **About GIET University, Gunupur, Odisha**:\n\n` +
        `• **Established:** Founded in December 1997 by the *Vidya Bharati Educational Trust (VBET)* under the visionary leadership of President **Prof. (Dr.) Satya Prakash Panda**.\n` +
        `• **Accreditations:** Accredited with **NAAC Grade 'A+'**, recognized by **UGC (Sections 2f & 12B)**, approved by **AICTE & ICAR**, and **NBA accredited**.\n` +
        `• **Campus:** Sprawling **100+ Acre** eco-friendly green riverfront campus on the banks of river Bansadhara at the foothills of the Eastern Ghats in Gunupur (Rayagada, Odisha).\n` +
        `• **Academic Schools:** School of Engineering & Technology, School of Computer Applications, School of Management Studies, School of Agricultural Sciences, and School of Sciences.\n` +
        `• **Placement Record:** 93.8%+ placement rate with highest packages reaching ₹26 LPA across 500+ MNC recruiters (TCS, Infosys, Wipro, Amazon, IBM, Cognizant, etc.).`,
      suggestions: ['Explore 50+ Courses', 'Check Placement Records', 'Campus and Hostel Facilities', 'How to apply for 2026'],
      action: { type: 'navigate', label: 'Open About GIETU Page', route: '/about-giet' }
    };
  }

  // Placement & Recruiters
  if (query.includes('placement') || query.includes('package') || query.includes('recruiter') || query.includes('companies') || query.includes('salary') || query.includes('highest')) {
    return {
      text: `💼 **GIET University Placement Highlights (2025–26)**:\n\n` +
        `• **Placement Rate:** 93.8% eligible students placed.\n` +
        `• **Highest Package:** **₹26.0 LPA** (International & Tier-1 Tech).\n` +
        `• **Average Package:** **₹5.5 - 6.5 LPA** across engineering & management branches.\n` +
        `• **Top Recruiters (500+):** TCS, Infosys, Wipro, Cognizant, Amazon, Tech Mahindra, IBM, Capgemini, Deloitte, HighRadius, Hexaware, Mindtree.\n` +
        `• **Pre-Placement Training:** Dedicated Training & Placement Cell (T&P) providing DSA, aptitude, soft skills, and mock interviews from 2nd year.`,
      suggestions: ['View B.Tech CSE Syllabus', 'Eligibility for B.Tech', 'Scholarships Available', 'How to Apply'],
      action: { type: 'navigate', label: 'Explore Engineering Courses', route: '/courses' }
    };
  }

  // Fees & Scholarships
  if (query.includes('fee') || query.includes('cost') || query.includes('scholarship') || query.includes('concession') || query.includes('financial aid') || query.includes('price')) {
    return {
      text: `💰 **Tuition Fees & Scholarships (Academic Session 2026–27)**:\n\n` +
        `• **B.Tech (CSE / AI & ML / Data Science):** Approx. ₹1,15,000 – ₹1,35,000 per year.\n` +
        `• **B.Sc. (Hons) Agriculture:** Approx. ₹1,20,000 per year.\n` +
        `• **MCA / MBA:** Approx. ₹95,000 – ₹1,10,000 per year.\n` +
        `• **Merit Scholarships:** Up to ₹1,00,000 tuition fee waiver for rankers in JEE Main (AIR < 50k), 12th PCM (>90%), and GIETEE entrance toppers.\n` +
        `• **Govt Scholarships:** Full assistance for PRERANA, Post-Matric, National Scholarship Portal (NSP), and Medhabruti schemes.`,
      suggestions: ['Check My Eligibility', 'Hostel Fee Details', 'Required Documents', 'Start Application'],
      action: { type: 'navigate', label: 'View Fee Breakdown', route: '/courses' }
    };
  }

  // Document Verification
  if (query.includes('document') || query.includes('upload') || query.includes('marksheet') || query.includes('aadhaar') || query.includes('certificate') || query.includes('verify')) {
    return {
      text: `📄 **Mandatory Documents Required for Admission**:\n\n` +
        `1. **10th Board Certificate / Marksheet** (Proof of Date of Birth)\n` +
        `2. **12th (PCM/PCB) Science Marksheet** (Eligibility Evaluation)\n` +
        `3. **Government ID Proof** (Aadhaar Card / Passport)\n` +
        `4. **Recent Passport-Size Color Photograph** (White background)\n` +
        `5. **Specimen Signature Scan** (On plain white paper)\n` +
        `6. **JEE Main / OJEE Rank Card** (For Merit Quota & Scholarships)\n\n` +
        `Upload all files in PDF/JPG format (max 5 MB) in the **Document Verification Center**.`,
      suggestions: ['Open Document Center', 'Check Application Status', 'Talk to Counselor', 'Course Details'],
      action: { type: 'navigate', label: 'Go to Documents Page', route: '/documents' }
    };
  }

  // Intelligent Generic Admission Response
  return {
    text: `Hello ${studentName}! I'm **AdmitAI**, your personal admission assistant for **GIET University, Gunupur**.\n\n` +
      `Here is how I can assist you with your query *"**${message}**"*:\n\n` +
      `• **Academic Programs:** Detailed syllabus, eligibility & intake for 50+ degree courses (B.Tech, M.Tech, MBA, MCA, Agriculture).\n` +
      `• **Campus Life:** Information on NCC, NSS, Sports, AC/Non-AC Hostels, Wi-Fi, Cafeteria, and Extracurricular Clubs.\n` +
      `• **Admissions & Cutoffs:** Eligibility evaluation based on your 12th PCM marks & JEE entrance percentile.\n` +
      `• **Fees & Scholarships:** Merit concessions up to ₹1 Lakh and state/central government scholarship support.\n` +
      `• **Document Audit:** Real-time upload and verification of marksheets, ID proof, and certificates.\n\n` +
      `Feel free to ask any specific question about GIET University!`,
    suggestions: [
      'Why Choose GIET University?',
      'Is NCC / NSS Available?',
      'Check B.Tech Eligibility',
      'Placements & Highest Package',
      'Hostels & Mess Facilities'
    ],
    action: {
      type: 'navigate',
      label: 'Explore Courses',
      route: '/courses'
    }
  };
}

async function evaluateEligibility(profile) {
  const pcm = profile?.academics?.twelfth?.pcmPercentage || profile?.academics?.twelfth?.percentage || 89.5;
  const rank = profile?.academics?.entranceExam?.rank || 18450;
  const courses = mockCourses;

  const eligibleCourses = courses.filter(c => {
    return pcm >= (c.cutoffPcm || 50);
  });

  return {
    eligible: eligibleCourses.length > 0,
    pcmPercentage: pcm,
    entranceRank: rank,
    eligibleCoursesCount: eligibleCourses.length,
    topRecommendedCourse: eligibleCourses[0]?.name || 'B.Tech in Computer Science & Engineering',
    scholarshipEligible: pcm >= 85 || rank < 25000,
    scholarshipAmount: pcm >= 90 ? '₹50,000 / year' : pcm >= 80 ? '₹25,000 / year' : 'Eligible for Standard Merit Aid'
  };
}

module.exports = {
  processChatMessage,
  evaluateEligibility
};
