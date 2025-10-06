# {{PROJECT_NAME}} - Project Charter

## Team Information
**Project Manager:** Ghiya El Daouk (@ghiyascode)

**Team Size:** 6 members

**Semester:** Fall 2025

## Project Vision
**Problem Statement:** Campus cats currently roam free with no way for students to realistically find them. Our Campus Cat Tracker Web Application will solve that - a private, university-only platform that displays the real-time locations of campus cats on a Google Map, alongside detailed cat profiles.

**Target Users:** UTA students, staff, etc.

**Success Metrics:**
1. UTA students can securely log in with @mavs.uta.edu credentials.

2. The web app displays accurate, real-time cat locations on a campus map.

3. Each cat’s profile is viewable and correctly linked to its location marker.

4. DND privacy logic and authentication reliably protect data access.

## Technical Architecture
**Tech Stack:**
- Frontend:
  
React + Vite, TypeScript, Tailwind CSS

Google Maps JavaScript API via @react-google-maps/api

Routing with React Router

- Backend:
  
Firebase Cloud Functions (HTTPS endpoint for tracker webhooks + server logic)

- Database:
  
Cloud Firestore (realtime reads for map & profiles)

Firebase Storage (cat photos)

- Deployment:
  
Vercel for the frontend (fast CI/CD)

Firebase for Cloud Functions/Firestore/Storage (managed backend)

**Key Features (MVP):**
1. Cat Profiles: Photo, name, bio, feeding prefs, dietary restrictions, where OK to give rubs/where not, DND schedule, (stretch: last seen time/location)
2. Map + Real-Time Locations: Google Map centered on campus; markers for each cat; click = cat profile popup 
3. Auth & Privacy: Email OTP restricted to @mavs.uta.edu. Enforce DND (hide location during set hours).

## Communication Plan
**Primary Channel:** Discord #rocktags

**Meeting Schedule:** Weekly, Wednesday at 4:00pm

**Progress Updates:** Weekly GitHub issues using update template

## Timeline & Milestones
**+ Week 1-2:** Project setup, initial planning

**+ Week 3-4:** Core architecture, basic setup: 

React + TS + Tailwind, React Router.

Firebase project, Auth (Email link/OTP), @mavs.uta.edu enforcement.

Firestore set up + seed cat profiles (mock photos).

**+ Week 5-8:** Feature development sprint 1: Map & Profiles (UI)

Integrate Google Maps JS API; campus map baseline.

Read /cats in real time, show markers.

Marker click → popup with mini card; route to /cats/:id with full profile.

**+ Week 9-12:** Feature development sprint 2: Tracker Ingestion (Backend)

Build Cloud Function webhook + schema validation + HMAC/shared secret.

Add /trackerBindings collection (link trackerId → catId).

Upsert lastKnownLocation and append to /locationEvents.

**+ Week 13-14:** Testing, polish, deployment: DND, Security, Polish

Implement DND: hide locations for a certain time.

Security rules hardened (read: mavs only; write: admins).

Admin mini-UI: assign tracker → cat, edit DND and profile fields.

**+ Week 15-16:** Demo preparation, documentation: 

Deploy frontend to Vercel, backend on Firebase.

Add loading/error states, empty states, basic unit/integration tests.

Final pass on performance, quotas, and docs (README + setup guide)

## Team Roles
- **Ghiya El Daouk:** Project Manager
- **{{MEMBER_2}}:** {{role}} (e.g., Frontend Lead, Backend Lead, UI/UX, DevOps)
- **{{Bryan Nguyen}}:** {{role}}
- **{{MEMBER_4}}:** {{role}}
- **{{MEMBER_5}}:** {{role}}

## Risk Assessment
**Technical Risks:** What could go wrong technically?
**Timeline Risks:** What might cause delays?
**Mitigation Plans:** How will you handle issues?
