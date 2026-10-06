# Project Memory & Progress Log

## Current Status
- **Current Phase:** Phase 4 (Availability + Booking Engine) - In Progress
- **Last Updated:** 2026-10-06.

---

## Completed Phases & Tasks
- [x] **Step 0:** Initial documentation created in `/docs` (PRD.md, Architecture.md, Rules.md, Phases.md, Design.md, Memory.md).
- [x] **Phase 1: Setup + Design System + Layout / Nav / Footer**
  - Next.js 15 App Router + TypeScript + Tailwind CSS configured.
  - Reusable UI primitives and design system tokens in `src/app/globals.css`.
  - Responsive Navbar, Trust Footer, and Emergency Helpline Banner (Tele-MANAS 14416).
  - Centralized content store in `src/content/site.ts`.
- [x] **Phase 2: Public Pages**
  - Home, About, Services catalog & dynamic detail (`/services/[slug]`), Blog & reader (`/blog/[slug]`), FAQ, Contact (with Zod validation), custom 404.
- [x] **Phase 3: Auth + Roles (Client / Admin)**
  - Database schema in `supabase/schema.sql` with full Row Level Security (RLS) on `profiles`, `availability_slots`, `bookings`, `payments`.
  - Trigger `on_auth_user_created` for automatic role assignment (`client` vs `admin`).
  - Supabase client configurations: `client.ts` (browser), `server.ts` (cookies), `admin.ts` (service role).
  - Login (`/login`) & Signup (`/signup`) with DPDP Act consent checkboxes, age verification, and magic link support.
  - Auth callback (`/auth/callback`), logout API (`/api/auth/logout`), and middleware route guarding (`/admin` and `/dashboard`).

---

## In Progress
- [ ] **Phase 4:** Availability + Booking Engine - Slot model in IST, 10-minute hold reservation logic, multi-step booking flow (`/book`), Zod intake validation.

---

## Key Decisions Made
- **Role Isolation:** Profiles default to `client` role; admin roles are explicitly assigned and guarded via Supabase RLS and Next.js middleware.
- **Graceful Auth Fallback:** When Supabase keys are pending initial setup, login and signup forms provide demo review pathways to allow testing both client and admin experiences.

---

## Required Environment Variables (.env.example)
```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Google Calendar / Meet
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=

# Admin Credentials / Roles
ADMIN_EMAIL=
```

---

## Known Bugs / Technical Debt
- *None.*
