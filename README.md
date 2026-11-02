# OUTCOME 360

> **AI-Powered Outcome-Based Education (OBE) Management & Academic Analytics System**
>
> *"Transforming Academic Outcomes into Intelligent Insights."*

OUTCOME 360 is a complete, production-style web application that automates Course Outcome (CO) & Program Outcome (PO) management, CO-PO mapping, marks & attendance tracking, real OBE attainment calculations, AI-powered academic insights, and PDF / Excel / CSV report generation.

Built as a major college project to be **demonstrated live to faculty, HODs, and project evaluators**.

---

## ✨ Features

| Module | What it does |
| --- | --- |
| **Authentication** | Role-based login (Admin / HOD / Faculty / Student), show/hide password, remember me, forgot password flow |
| **Dashboards** | Role-specific dashboards with live stat cards + Recharts visualizations |
| **Subject Management** | Full CRUD, faculty allocation, syllabus topics, Excel export |
| **Course Outcomes** | CRUD with Bloom's Taxonomy levels + **AI CO Generator** (Gemini) |
| **Program Outcomes** | NBA-aligned 12 POs + PSOs, configurable |
| **CO-PO Mapping** | Interactive matrix with 0-3 scale, heatmap, validation, stats, export |
| **Marks** | Manual entry + Excel upload with validation, duplicate detection, error reports |
| **Attendance** | Per-student/per-subject tracking, QR-code session, low-attendance alerts |
| **Attainment Engine** | **Real** direct + indirect + final CO attainment, weighted PO attainment, step-by-step methodology |
| **Analytics** | Bar, line, area, donut, radar charts; department & subject comparisons |
| **Reports** | PDF (jsPDF + AutoTable), Excel (ExcelJS), CSV — for CO/PO/mapping/student/department/NAAC/NBA |
| **Gemini AI** | CO generator, weak CO detector, student risk analysis, report summary, question paper generator, chatbot |
| **Notifications** | In-app notifications, role-targeted, mark-as-read |
| **Audit Logs** | All major actions logged with actor, role, timestamp |
| **Premium** | Global search, dark/light mode, QR attendance, AI assistant, audit logs, settings |
| **Multi-role** | Role-based protected routes, permission checks |

---

## 🛠 Tech Stack

**Frontend**
- React 18 + Vite + TypeScript
- Tailwind CSS (custom soft teal/green design system)
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (charts)
- React Hook Form + Zod (forms & validation)
- React Router v6

**Backend (configurable)**
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Cloud Functions (for Gemini proxy in production)

**AI**
- Google Gemini API (`@google/generative-ai`)

**Libraries**
- jsPDF + jspdf-autotable (PDF)
- ExcelJS (Excel)
- qrcode (QR attendance)

> ⚠️ The app ships in **MOCK mode** by default — it uses a localStorage-backed data store that mirrors the Firestore API surface. Every screen works out-of-the-box for demo/presentation. To enable live Firebase & Gemini, see [Setup](#-setup).

---

## 🚀 Setup

### Prerequisites
- Node.js 18+ (tested on Node 24)
- npm 9+ (or pnpm / yarn)

### Install
```bash
cd outcome360
npm install
```

### Run dev server
```bash
npm run dev
# Open http://localhost:5173
```

### Build for production
```bash
npm run build
# Output: dist/
```

### Preview production build
```bash
npm run preview
```

---

## 🔐 Demo Accounts

The app auto-seeds a fictional institution (**Northlake Institute of Technology**) with 3 departments, 5 faculty, 24 students, 6 subjects, COs, POs, mappings, assessments, marks, attendance, and feedback on first run.

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@northlake.edu` | `demo123` |
| HOD | `hod.cse@northlake.edu` | `demo123` |
| Faculty | `faculty@northlake.edu` | `demo123` |
| Student | `student@northlake.edu` | `demo123` |

Or use the **Quick Demo Login** buttons on the login screen.

> To reset demo data: **Settings → System → Reset to Demo Data**

---

## 🔌 Enabling Live Firebase + Gemini (Optional)

1. Create a Firebase project at <https://console.firebase.google.com>
2. Enable **Authentication** (Email/Password), **Cloud Firestore**, **Storage**
3. Copy `.env.example` → `.env` and fill in:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_GEMINI_API_KEY=...
   ```
4. Deploy Firestore rules: `firebase deploy --only firestore:rules` (uses `firestore.rules`)
5. Deploy Storage rules: `firebase deploy --only storage` (uses `storage.rules`)
6. (Optional, recommended for production) Deploy Cloud Functions for Gemini proxy:
   ```bash
   cd functions
   npm install
   firebase functions:secrets:set GEMINI_API_KEY
   firebase deploy --only functions
   ```
   Then update `src/services/gemini.ts` to call the Cloud Function instead of `@google/generative-ai` directly.

When `VITE_FIREBASE_API_KEY` is set, the app initializes Firebase Auth + Firestore + Storage. The data-service layer (`src/services/db.ts`) is the single abstraction — to go fully live, swap the bodies of `list / getOne / insert / update / remove` with Firestore equivalents (TODO comments mark each).

---

## 📁 Project Structure

```
outcome360/
├── public/
├── functions/                # Firebase Cloud Functions (Gemini proxy)
│   ├── gemini-proxy.js
│   └── package.json
├── firestore.rules           # Firestore security rules
├── storage.rules             # Firebase Storage rules
├── .env.example
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig*.json
└── src/
    ├── main.tsx               # Entry — seeds demo data on first run
    ├── App.tsx                # Routes
    ├── index.css              # Tailwind + design system
    ├── firebase/
    │   └── config.ts          # Firebase init (or mock fallback)
    ├── services/
    │   ├── localStore.ts      # localStorage-backed mock store
    │   ├── db.ts              # Data service (Firestore-compatible)
    │   ├── auth.ts            # Auth service
    │   ├── seed.ts            # Demo seed data
    │   ├── attainment.ts      # ⭐ OBE attainment calculation engine
    │   ├── gemini.ts          # Gemini AI service (with offline fallback)
    │   ├── reports.ts         # PDF / Excel / CSV generation
    │   ├── excelImport.ts     # Excel parse/import
    │   └── activity.ts        # Audit log helper
    ├── context/
    │   ├── AuthContext.tsx
    │   └── ThemeContext.tsx
    ├── hooks/
    │   └── useData.ts         # Reactive data hooks
    ├── components/
    │   ├── ui/                # Button, Card, Modal, Input, etc.
    │   ├── charts/            # Recharts wrappers
    │   ├── tables/            # DataTable
    │   ├── layout/            # Sidebar, Topbar, PageHeader
    │   └── ProtectedRoute.tsx
    ├── layouts/
    │   └── AppLayout.tsx
    ├── modules/
    │   ├── admin/             # Departments, Faculty, Students, Subjects, Analytics, Audit
    │   ├── hod/                # Faculty perf, Students, Subjects, Mapping review, Analytics
    │   ├── faculty/            # Subjects, CO (with AI), PO, Mapping, Marks, Attendance, Attainment, Reports
    │   ├── student/            # Attendance, Marks, Attainment, Performance
    │   └── ai/                 # Chatbot, Insights
    ├── pages/
    │   ├── LoginPage.tsx
    │   ├── DashboardPage.tsx
    │   ├── NotificationsPage.tsx
    │   ├── SettingsPage.tsx
    │   └── NotFoundPage.tsx
    ├── types/
    │   └── index.ts           # All TypeScript types (mirrors Firestore schema)
    └── utils/
        └── index.ts           # cn(), formatDate, timeAgo, etc.
```

---

## 🧮 Attainment Calculation Methodology

All numbers in the Attainment module are computed **in real time** from actual marks, question→CO mappings, CO-PO mappings, and student feedback. No random values.

### 1. Direct CO Attainment
For each Course Outcome, sum all marks obtained on questions mapped to that CO across all assessments:

```
Direct CO % = (Σ marks obtained for CO questions / Σ max marks for those questions) × 100
```

### 2. Indirect CO Attainment
From student feedback (Likert 1–5 per CO):

```
Indirect CO % = (avg feedback rating / 5) × 100
```

### 3. Final CO Attainment
Configurable weighted combination (default 80% direct / 20% indirect):

```
Final CO % = Direct% × 0.80 + Indirect% × 0.20
```

### 4. PO Attainment
For each Program Outcome, weighted average of mapped CO attainments:

```
PO % = Σ(CO final % × mapping weight) / Σ(mapping weights)
```
Mapping scale weights (configurable in Settings):
- **1 (Low)** → 0.33
- **2 (Medium)** → 0.67
- **3 (High)** → 1.00

These rules can be configured in **Settings → Attainment** without touching code.

---

## 🤖 AI Features

OUTCOME 360 ships 13 AI-powered features. When `VITE_GEMINI_API_KEY` is set, all use live Gemini. When absent, they fall back to a data-grounded offline analyzer (clearly labeled).

| # | Feature | Where |
| --- | --- | --- |
| 1 | AI CO Generator | Faculty → Course Outcomes → "AI Generate" |
| 2 | AI Question Paper Generator | AI → Insights → "Question Paper Generator" |
| 3 | AI Bloom Level Checker | (Used internally by CO Generator) |
| 4 | AI CO-PO Mapping Suggestions | (Roadmap — Gemini-based suggestions) |
| 5 | AI Weak CO Detection | Faculty → Attainment → AI tab |
| 6 | AI Weak Student Identification | AI → Insights → "Student Risk Analysis" |
| 7 | AI Attendance Risk Analysis | (Derived in dashboards) |
| 8 | AI Student Performance Prediction | (Available via chatbot) |
| 9 | AI Improvement Suggestions | AI → Insights → "Weak CO Detection" |
| 10 | AI Faculty Recommendations | (Available via chatbot) |
| 11 | AI Academic Report Summary | Faculty → Attainment → AI tab |
| 12 | AI Recommendation Engine | (Integrated across modules) |
| 13 | AI OBE Chatbot | Sidebar → "Ask AI" or /ai/chatbot |

> ⚠️ All AI outputs are clearly labeled as AI-generated. Always apply **human review** before important academic decisions.

---

## 📊 Reports

Generate professional, formatted reports from **actual data**:

| Report | Formats |
| --- | --- |
| CO Attainment Report | PDF · Excel · CSV |
| PO Attainment Report | PDF · Excel |
| CO-PO Mapping Matrix | PDF · Excel · CSV |
| Student Performance Report | PDF · Excel |
| Attendance Report | PDF · Excel |
| Department Report | PDF |
| NAAC Compliance (template) | PDF |
| NBA Compliance (template) | PDF |

All PDFs include:
- Institution name & address (header)
- Report date / generation timestamp
- Page numbers
- Calculation methodology footnote
- Branded teal color scheme

> ⚠️ The NAAC/NBA reports are templates. Official compliance requires verified institutional templates — OUTCOME 360 does not claim compliance without configuration.

---

## 🔒 Security

- **Auth**: Firebase Authentication (mock in demo mode)
- **Role-based access**: Protected routes + role checks in every service
- **Firestore rules**: See `firestore.rules` — strict per-collection rules
- **Storage rules**: See `storage.rules` — file size & type limits
- **API key protection**: Gemini key never ships to client in production (use Cloud Functions)
- **Audit logs**: All write operations recorded in `activities` collection
- **Input validation**: Zod schemas + form-level validation

> Never commit your `.env` file. The included `.gitignore` excludes it.

---

## 🧪 Testing the Demo

1. Run `npm run dev`
2. Login as **Admin** (use Quick Demo Login)
3. Visit each module:
   - **Departments / Faculty / Students / Subjects** — CRUD operations work
   - **Institution Analytics** — charts render with real demo data
   - **Audit Logs** — every action you take is logged
4. Switch to **Faculty** login
   - **Subjects** → pick a subject → see all CO/PO/Mapping/Marks tools
   - **Course Outcomes** → "AI Generate" → produces Bloom-aligned COs
   - **CO-PO Mapping** → interactive matrix with 0-3 scale
   - **Marks** → "Edit Marks" or "Upload Excel" (try uploading a sample .xlsx)
   - **Attainment** → real calculations + Methodology tab + AI Analysis tab
   - **Reports** → generate PDF / Excel / CSV
5. Switch to **HOD** login → see department-wide analytics, mapping review
6. Switch to **Student** login → see only your own marks/attendance/attainment
7. Visit **AI Assistant** (sidebar) → ask "Which COs need improvement?"

---

## 📦 Deployment

### Static hosting (recommended for demo)
```bash
npm run build
# Deploy dist/ to Vercel, Netlify, Firebase Hosting, or any static host
```

### Firebase Hosting
```bash
npm run build
firebase init hosting  # set public dir to "dist"
firebase deploy --only hosting
```

---

## 🎨 Design System

- **Primary**: Soft teal (`#2ba396` → `#1f8378`)
- **Accent**: Soft green (`#39a35a`)
- **Background**: Off-white sand (`#f7faf9`) light, deep teal (`#0a2724`) dark
- **Fonts**: Inter (body), Poppins (display)
- **Components**: rounded-2xl cards, soft shadows, subtle borders, framer-motion transitions

---

## 🗺 Roadmap / Future Modules

- Face Recognition Attendance (with explicit consent & privacy safeguards)
- Parent Portal
- Voice Assistant
- Email / SMS / WhatsApp notifications (modular provider config)
- Multi-college architecture
- Data backup & restore UI

---

## 📝 License

This project is a college major-project submission. Reuse permitted for educational purposes.

---

## 🙏 Acknowledgements

- NBA PO framework aligned with Washington Accord outcomes
- Demo institution "Northlake Institute of Technology" is fictional — all data is synthetic and for demonstration only.
- Reference UI inspiration: university ERP dashboards (sdms/ams.mitsgwalior.in)

---

**Built with care as a major college project — January 2025.**
