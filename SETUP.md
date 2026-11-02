# OUTCOME 360 — Quick Setup Guide

## 1. Install & Run (Demo Mode — no Firebase needed)

```bash
cd outcome360
npm install
npm run dev
```

Open <http://localhost:5173> and use any demo account (password `demo123`):

| Role | Email |
| --- | --- |
| Admin | `admin@northlake.edu` |
| HOD | `hod.cse@northlake.edu` |
| Faculty | `faculty@northlake.edu` |
| Student | `student@northlake.edu` |

The app auto-seeds a complete demo dataset on first run (institution, departments, faculty, students, subjects, COs, POs, mappings, marks, attendance, feedback). To reset: **Settings → System → Reset to Demo Data**.

## 2. Production Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve production build locally
```

Deploy `dist/` to any static host (Vercel, Netlify, Firebase Hosting, GitHub Pages, etc.).

## 3. Enabling Live Firebase (Optional)

1. Create a project at <https://console.firebase.google.com>
2. Enable: Authentication → Email/Password, Cloud Firestore, Storage
3. Copy `.env.example` to `.env` and fill in values from
   **Project Settings → General → Your apps → Web app**
4. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules,storage
   ```
5. Restart `npm run dev` — the app will detect Firebase credentials and switch from `mock` to `live` mode automatically.

## 4. Enabling Gemini AI (Optional)

1. Get a Gemini API key at <https://aistudio.google.com/app/apikey>
2. Add to `.env`: `VITE_GEMINI_API_KEY=AIza...`
3. Restart dev server — AI features will use live Gemini responses.

> ⚠️ For production, do NOT ship the Gemini key in client code. Deploy the included Cloud Function in `functions/` and call it via HTTPS Callable. See README "Securing Gemini" section.

## 5. Verify It Works

After starting the dev server:
- Login screen renders with branding & demo accounts ✓
- Login as Admin → Dashboard shows institution-wide stats + charts ✓
- Login as Faculty → CO-PO Mapping shows interactive matrix ✓
- Faculty → Attainment → real numbers + methodology tab ✓
- Faculty → Reports → generates downloadable PDF/Excel/CSV ✓
- AI → Chatbot → responds (offline fallback if no Gemini key) ✓

---

**Need help?** See `README.md` for the complete feature list, project structure, attainment methodology, and security notes.
