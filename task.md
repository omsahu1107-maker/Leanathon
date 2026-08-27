# AdmitAI - Combined Code Writing Tasks

## Environment Files
- [x] Fix `backend/.env` — ensure PORT, NODE_ENV, CLIENT_URL
- [x] Fix `frontend/.env` — ensure VITE_API_URL

## Backend Fixes
- [x] `backend/server.js` — add uploads dir, static serving, tighten CORS
- [x] `backend/middleware/errorHandler.js` — improve error response
- [x] `backend/routes/documentRoutes.js` — use memoryStorage properly
- [x] `backend/routes/authRoutes.js` — verify route mapping
- [x] `backend/routes/notificationRoutes.js` — check all endpoints
- [x] `backend/routes/applicationRoutes.js` — check all endpoints
- [x] `backend/routes/studentRoutes.js` — check all endpoints
- [x] `backend/routes/courseRoutes.js` — check all endpoints
- [x] `backend/routes/aiRoutes.js` — check all endpoints

## Frontend Service Fixes (double `.data` unwrap bug)
- [x] `frontend/src/services/api.js` — interceptor returns full response object (fix unwrap)
- [x] `frontend/src/services/aiService.js` — fix double unwrap
- [x] `frontend/src/services/courseService.js` — fix double unwrap
- [x] `frontend/src/services/applicationService.js` — fix double unwrap
- [x] `frontend/src/services/documentService.js` — fix double unwrap
- [x] `frontend/src/services/notificationService.js` — fix double unwrap
- [x] `frontend/src/services/profileService.js` — fix double unwrap

## Verify
- [ ] Run `npm run install:all` in root
- [ ] Run `npm run dev` — both start
- [ ] Test http://localhost:5173 — UI loads
- [ ] Test http://localhost:5000/api/health — API responds
