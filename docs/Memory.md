# Project Memory & Progress Log

## Current Status
- **Current Phase:** Phases 1 to 8 Completed & Pushed to Git.
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
  - Database schema in `supabase/schema.sql` with full Row Level Security (RLS) on all tables.
  - Automatic profile creation trigger and client/admin role segmentation.
  - Login (`/login`) & Signup (`/signup`) with DPDP Act consent checkboxes, age verification, and magic link support.
  - Auth callback (`/auth/callback`), logout API (`/api/auth/logout`), and middleware route guarding.
- [x] **Phase 4: Availability + Booking Engine**
  - Slot model in IST with 10-minute hold reservation logic (`/api/slots/lock`, `/api/slots/release`, `/api/slots`).
  - Interactive multi-step booking engine (`/book`) with service selection, IST slot picker, and Zod-validated clinical intake.
- [x] **Phase 5: Razorpay Payments + Webhooks + Emails + Meet Links**
  - Server-side Razorpay order creation (`/api/checkout/create-order`) and signature verification (`/api/checkout/verify`).
  - Webhook endpoint (`/api/webhooks/razorpay`) with idempotency, signature validation, and refund processing.
  - Google Meet session link generation with Google Calendar API integration (`src/lib/meet.ts`).
  - Transactional email dispatch for client receipts & counsellor alerts via Resend (`src/lib/email.ts`).
- [x] **Phase 6: Client + Admin Dashboards**
  - Client Dashboard (`/dashboard`): Upcoming sessions with direct Meet join button, booking celebration alert, reschedule & cancel modal triggers, downloadable printable receipts.
  - Admin Dashboard (`/admin`): Clinical metrics, slot manager with date/time picker (`/api/admin/slots`), client bookings table with search/filter, confidential clinical intake record viewer, Razorpay refund processing trigger (`/api/admin/refund`).
- [x] **Phase 7: Legal Pages, Cookie Consent & Accessibility**
  - DPDP Act 2023 aligned Privacy Policy (`/privacy`), Terms of Service (`/terms`), Refund & Cancellation Policy (`/refund-policy`).
  - Cookie Consent Banner (`cookie-consent.tsx`) with conditional Google Analytics (GA4) execution upon explicit consent.
- [x] **Phase 8: SEO, Performance & Documentation**
  - Dynamic `sitemap.xml` (`src/app/sitemap.ts`) and `robots.txt` (`src/app/robots.ts`).
  - `.env.example` with full configuration descriptions and comprehensive `README.md`.
  - Zero lint warnings, zero TypeScript errors, and successful production build across all 39 routes.

---

## Key Decisions Made
- **Centralized Content Store:** All counsellor bio details, prices, qualifications, and testimonials are located in `src/content/site.ts` with explicit `TODO_` markers.
- **DPDP & Health Compliance:** Crisis helplines (Tele-MANAS `14416` and KIRAN `1800-599-0019`) are embedded across banners, footers, booking pages, and dashboards.
- **Fail-Safe Operation:** Both Client and Admin portals function in demo review mode when database or payment API keys are pending configuration.

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

# Google Analytics (GA4)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

## Known Bugs / Technical Debt
- *None.*
