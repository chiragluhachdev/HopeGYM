# Hope Gym & Spa — Mobile App + Backend (and Website Migration)

## Context
The website (`web/`) is complete and currently serves **static** content from `web/src/data/*`. Brand is **black + golden-yellow** (`brand #FFD400`, `ink #0B0B0B`, cards `#1A1A1A`).

We are adding a **premium React Native member app** (`mobile/`) backed by a **Node/Express/MongoDB API** (`backend/`), an **admin panel** at `/admin` in the website, and a **membership registration + payment** flow. The website is migrated off static data onto the same API so admin changes reflect everywhere.

Sequenced: **Backend → Website migration → Admin panel → Mobile app.** Each phase verified before the next.

### Decisions
- **Mobile**: Expo (managed) + TypeScript.
- **Website**: migrated to the API, with `web/src/data/*` kept as a resilient fallback.
- **DB**: backend reads `MONGODB_URI` from `.env` (user pastes Atlas URI). Seed runs against whatever URI is set.
- **Auth**: members use dummy OTP (any code works → JWT). Admins log in with username/password → admin JWT.
- **Admin panel**: `/admin` in `web/` — view/add/edit members **by branch** + manage every entity.
- **Payments**: **Cash on First Visit** works now; **Razorpay = placeholder only** (no real keys/charges).
- **Membership signup**: plan **Join Now** → registration page (details + Razorpay placeholder / Cash on First Visit) → creates real Member + Membership + Payment. **WhatsApp no longer used for signup**, but the floating WhatsApp/Call UI stays for general contact.
- **Storage**: Cloudinary scaffolded but optional (images as URL strings for now).
- **Push notifications**: out of scope (in-app list only).

## Repo structure
```
HopeGym/
├── web/        Next.js site (public, migrated to API) + /admin panel
├── backend/    Node + Express + TS + Mongoose (public + member + admin APIs)
├── mobile/     Expo + TS + React Navigation
└── plan.md
```

---

## Phase 1 — Backend (`backend/`)
Node + Express + TypeScript, Mongoose, jsonwebtoken, zod, cors, dotenv, ts-node-dev. Razorpay/Cloudinary SDK placeholders.

**Models:** Member, MembershipPlan, Membership, Branch, Facility, Trainer, Testimonial, GalleryItem, Stat, WorkoutPlan, DietPlan, Attendance, Announcement, Notification, Payment, Quote, Admin.

**Endpoints (`/api`):**
- Public content: `GET /branches /facilities /trainers /plans /gallery /stats /testimonials /announcements`.
- Auth: `POST /auth/request-otp`, `POST /auth/verify-otp` → `{ token, member }`.
- Public enrollment: `POST /enroll` → creates Member + active Membership + Payment.
- Razorpay placeholder: `POST /payments/razorpay/order|verify` (stubs).
- Member (JWT): `GET/PUT /me`, `GET /me/membership`, `POST /me/membership/renew`, `GET /me/payments`, `GET /me/attendance` + `POST /me/attendance/checkin`, `GET /workouts?category=`, `GET /diet`, `GET /me/notifications`, `GET /motivation`.
- Admin: `POST /admin/login`; `requireAdmin` guards `GET /admin/overview`, `GET /admin/members?branch=`, member + all-entity CRUD.

**Seed:** content from `web/src/data/*` + admin (`admin`/`admin123`), demo member (phone `8796797503`) with Gold membership (expiry 15 Jan 2027), members across branches, workouts (4 categories), diet, ~30 days attendance, announcements, notifications, quotes.

---

## Phase 2 — Website migration (`web/`)
- `web/src/lib/api.ts` — typed fetchers (ISR `revalidate: 60`) with **fallback to `web/src/data/*`** on error.
- Pages become async server components passing data as props; refactor `'use client'` section components to take props.
- **Registration**: `web/src/app/membership/join/page.tsx` (`?plan=`) — details form + branch + payment choice (Razorpay placeholder / Cash on First Visit) → `POST /api/enroll` → confirmation.
- Repoint `PlanCard` Join Now + `ContactCTA` to `/membership/join`. Keep floating WhatsApp/Call.
- `web/.env`: `API_URL`, `NEXT_PUBLIC_API_URL`.

---

## Phase 3 — Admin panel (`web/src/app/admin/...`)
Black+yellow, client-rendered, auth-guarded. Login → dashboard (members per branch, active/expired memberships) → **Members** (filter by branch, view/add/edit, assign/renew) → CRUD for plans/branches/facilities/trainers/gallery/announcements/notifications/workouts/diets/testimonials. `adminApi.ts` (Bearer token in localStorage). noindex, excluded from public nav/footer/sitemap.

---

## Phase 4 — Mobile app (`mobile/`, Expo + TS)
React Navigation: Splash → Onboarding(3) → OTP Login → bottom tabs (Home/Workout/Attendance/Notifications/Profile) + stack (Diet/Membership/Branches/Facilities/Gallery/Contact/Settings). Theme `#0B0B0B`/`#1A1A1A`/`#FFD400`, radius 18, glow. axios client + persisted AuthContext. Membership renew: Cash on Visit works + Razorpay "Coming soon" placeholder. Contact deep-links to `8796797503`.

---

## End-to-end (the connected loop)
1. `cd backend && npm i && cp .env.example .env` → paste Atlas URI → `npm run seed` → `npm run dev` (:4000).
2. `cd web && npm run dev` → public site shows API data; survives backend downtime via fallback.
3. Sign up on site (Join Now → form → Cash on First Visit) → real member created.
4. `/admin` (`admin`/`admin123`) → new member shows under their branch; manage all content.
5. `cd mobile && npx expo start` → log in with that phone (+ any OTP) → member sees their membership + all content.
6. Admin edits reflect on site (within revalidate) and app. One backend, three surfaces.

## Out of scope (now)
Push notifications, real Razorpay charges, Cloudinary uploads, real SMS OTP, Google/email member login (UI stub).
