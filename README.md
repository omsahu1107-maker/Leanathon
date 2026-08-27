# 🎓 AdmitAI — Autonomous Student Admission & Conversion Agent
**Smart India Hackathon (SIH) Project • Student Portal & Express REST API**

AdmitAI is an intelligent, autonomous student admission platform engineered to guide students seamlessly from their initial admission inquiry and course discovery through multi-step application, automated document verification, drop-off risk mitigation, and eventual enrollment.

---

## 🏗 System Architecture & Design

AdmitAI is architected with clear boundaries between **Client UI**, **Service Layers**, **REST APIs**, and **Data Adapters**:

```
admitai-platform/
├── backend/
│   ├── config/              # Environment & Firebase SDK initialization
│   ├── controllers/         # Request handling & input validation
│   ├── data/                # Seed/Mock store matching Firestore schema
│   ├── middleware/          # Authentication & Error Handling
│   ├── routes/              # Express REST endpoints
│   ├── services/            # Domain business logic & AI reasoning
│   └── server.js            # Express application bootstrap
├── frontend/
│   ├── src/
│   │   ├── components/      # Common, AI, Application, Courses, Documents, Status
│   │   ├── context/         # AuthContext & ApplicationContext
│   │   ├── layouts/         # StudentLayout with responsive sidebar & drawer
│   │   ├── pages/           # All 9 Student Routes
│   │   ├── services/        # Frontend API client & service functions
│   │   └── utils/           # Formatters, constants, helpers
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
└── package.json             # Orchestrates concurrent running
```

---

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router v6, Axios, Canvas Confetti.
- **Backend**: Node.js, Express.js, Multer (file uploads), CORS, Morgan.
- **Database / Auth**: Firebase Firestore & Firebase Authentication (with robust mock/in-memory adapter fallback).
- **AI Service Layer**: Context-aware admission guidance engine with plug-and-play RAG / LLM integration hooks (`POST /api/ai/chat`).

---

## 🗺 Student Portal Routes

| Route | Page | Key Features |
|---|---|---|
| `/` | **Home / Dashboard** | Hero banner, Quick action cards, 68% progress checklist, AI Proactive recommendation card, Recent activity feed |
| `/courses` | **Course Directory** | Search bar, Category filters, Duration/Fees/Eligibility cards, [View Details], [Apply Now], [Ask AI] |
| `/courses/:id` | **Course Details** | Detailed curriculum, Fees breakdown, Scholarships & grants, Key dates, Career roles |
| `/ai-assistant` | **AI Admission Guide** | Conversational chat interface, Markdown replies, Quick prompt chips, Live `StudentContextCard` |
| `/application` | **Multi-Step Form** | 5-step stepper (Personal, Academic, Course, Documents, Review), save draft, validation |
| `/documents` | **Document Center** | Upload states (Idle, Uploading, Processing, Verified, Needs Review), AI OCR simulation |
| `/application-status`| **Application Tracker**| 8-stage visual milestone timeline, Telemetry gauges, AI recommendations |
| `/notifications` | **Alerts Hub** | Filter by Action Required, Upcoming, Completed; Mark as read |
| `/profile` | **Student Profile** | Personal, academic, guardian details; In-line editing and state persistence |

---

## 🛠 Setup & Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 1. Install Dependencies
```bash
# In the root project directory:
npm run install:all
```
*Or install individually:*
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment Variables
- Create `backend/.env` (see `backend/.env.example`):
  ```env
  PORT=5000
  NODE_ENV=development
  CLIENT_URL=http://localhost:5173
  ```
- Create `frontend/.env` (see `frontend/.env.example`):
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```

### 3. Start Development Servers
To run both backend and frontend concurrently:
```bash
npm run dev
```

- **Frontend Portal:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 REST API Documentation

### 1. AI Admission Assistant
- `POST /api/ai/chat`
  - **Body:** `{ message: string, studentContext: object, courseContext: object }`
  - **Response:** `{ success: true, data: { text: string, suggestions: string[], action: { label, route } } }`

### 2. Courses
- `GET /api/courses?category=Engineering&search=CSE`
- `GET /api/courses/:id`

### 3. Applications
- `GET /api/applications/:id`
- `PUT /api/applications/:id`
- `POST /api/applications/:id/submit`

### 4. Documents
- `GET /api/documents/:studentId`
- `POST /api/documents/upload` (Multipart Form: `file`, `docId`, `docName`, `category`)
- `PATCH /api/documents/:id/status`

### 5. Notifications
- `GET /api/notifications/:studentId`
- `PATCH /api/notifications/:id/read`
- `POST /api/notifications/mark-all-read`

### 6. Student Profile
- `GET /api/students/profile/:id`
- `PUT /api/students/profile/:id`
- `GET /api/students/activity/:id`

---

## 🧠 Future AI / RAG & Admin Integration Points

The codebase has explicit integration hooks for Phase 2:
1. **RAG Knowledge System**: In `backend/services/aiService.js`, replace the rule processor with Vector DB search (Pinecone/Milvus) + LangChain / Gemini API.
2. **Document AI / OCR**: In `backend/services/documentService.js`, connect Google Cloud Document AI / AWS Textract to automatically verify extracted text against candidate records.
3. **Admin & Counselor Portals**: Can be added as sibling routes (e.g., `/admin`, `/counselor`) reusing the backend controllers and shared Firestore collections.

---

## 🏆 Smart India Hackathon Principles Adhered To

Every screen answers:
1. **Where am I?** — Breadcrumbs, page headers, active navigation highlights.
2. **What is my current status?** — Application progress %, document state badges, drop-off risk flags.
3. **What should I do next?** — AI recommendation banners, prominent action buttons.
4. **Can AI help me?** — Persistent AI assistant shortcuts, context-aware prompts on every card.
