# Implementation Phases & Acceptance Criteria

## Phase 1: Setup + Design System + Layout / Nav / Footer
- **Tasks:**
  - Initialize Next.js project with TypeScript, Tailwind CSS, shadcn/ui, and lucide-react.
  - Setup color tokens, typography (calm/trustworthy palette), and global CSS.
  - Build responsive Navbar, Footer (with emergency helplines), and layout wrapper.
- **Acceptance Checks:**
  - `npm run dev` builds with zero errors or lint warnings.
  - Design tokens match `Design.md`; mobile and desktop nav functional.
  - Emergency helpline banner visible and readable across screen sizes.

---

## Phase 2: Public Pages
- **Tasks:**
  - Build Home, About, Services catalog & dynamic Service detail (`/services/[slug]`), Blog, Contact, FAQ, and custom 404 page.
  - Populate structured, empathetic copy and placeholders matching counsellor domain.
- **Acceptance Checks:**
  - All public routes render cleanly with semantic HTML and responsive layouts.
  - Direct CTAs link smoothly to the `/book` page.
  - 404 page renders for unmatched routes with a clean fallback CTA.

---

## Phase 3: Auth + Roles (Client / Admin)
- **Tasks:**
  - Configure Supabase Auth (Email + Password / Magic Link / OAuth).
  - Setup database migrations with RLS policies and `profiles` table (`client` vs `admin` roles).
  - Implement Login, Signup (with DPDP consent checkbox), and auth middleware for route protection.
- **Acceptance Checks:**
  - Users can sign up and log in securely.
  - Role-based redirect works (Admin -> `/admin`, Client -> `/dashboard`).
  - Unauthenticated users are redirected from protected routes.

---

## Phase 4: Availability + Booking Engine
- **Tasks:**
  - Build database tables for counsellor availability slots and bookings with RLS.
  - Develop interactive booking flow (`/book`): Service selection -> Date & Slot picker (IST timezone) -> Intake questions.
  - Implement 10-minute temporary slot reservation lock logic.
- **Acceptance Checks:**
  - Slots display accurately in IST without time zone drift.
  - Slot locking prevents concurrent double-booking of the same slot.
  - Intake form validates inputs with Zod.

---

## Phase 5: Razorpay Payments + Webhooks + Emails + Meet Links
- **Tasks:**
  - Integrate Razorpay server SDK: server-side order calculation & signature verification.
  - Build webhook endpoint (`/api/webhooks/razorpay`) with idempotency and signature checks.
  - Integrate Google Calendar API to generate Google Meet link on payment success.
  - Integrate Resend to dispatch transactional emails (client receipt & meeting link, counsellor alert).
  - Implement background slot expiration (release locked slots after 10 mins).
- **Acceptance Checks:**
  - Payment completes successfully in Razorpay Test Mode.
  - Webhook captures event, updates booking status to `confirmed`, creates Meet link, and triggers Resend emails.
  - Unpaid or abandoned bookings release slots back to the pool after 10 minutes.

---

## Phase 6: Client + Admin Dashboards
- **Tasks:**
  - **Client Dashboard:** Upcoming session links, session history, reschedule/cancel request trigger, download receipts.
  - **Admin Dashboard:** Manage availability slots (add/block dates), view client bookings & intake notes, update service pricing, process refunds/reschedules.
- **Acceptance Checks:**
  - Client can view confirmed sessions, joining link, and trigger reschedule requests.
  - Admin can add/remove availability and review intake notes under RLS protection.
  - Refund and reschedule workflows update status and trigger notifications.

---

## Phase 7: Legal Pages, Cookie Consent & Accessibility
- **Tasks:**
  - Implement Privacy Policy, Terms & Conditions, and Refund Policy pages.
  - Build DPDP-compliant Cookie Consent Banner (analytics loaded conditionally).
  - Conduct WCAG AA audit (keyboard nav, color contrast, aria labels, screen reader friendliness).
- **Acceptance Checks:**
  - All legal pages accessible and clearly structured.
  - Cookie banner persists preferences; no tracking fired prior to consent.
  - WCAG AA accessibility tests pass with zero critical violations.

---

## Phase 8: SEO, Analytics, Performance, QA & Deploy
- **Tasks:**
  - Setup unique meta titles, descriptions, Open Graph / Twitter cards per page.
  - Generate `robots.txt`, `sitemap.xml`, and JSON-LD structured data (`Person`, `LocalBusiness`).
  - Configure GA4 (conditional on consent).
  - End-to-end QA: broken link checks, form testing, payment flow dry-run in test mode.
  - Vercel production deployment readiness check.
- **Acceptance Checks:**
  - Lighthouse scores 90+ across Performance, Accessibility, and SEO.
  - Production build (`npm run build`) completes without errors.
  - Deployment configuration and `.env.example` finalized.
