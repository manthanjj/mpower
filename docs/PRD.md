# Product Requirements Document (PRD)

## 1. Project Overview & Goals
- Dedicated website and booking platform for **Bhagyashree**, a professional mental wellness and relationship counsellor in India.
- **Reference Style:** welisten.in (calm, trustworthy, empathetic, CTA-driven).
- **Core Goal:** Provide a frictionless, secure, and reassuring journey for clients to discover services, check availability in IST, book and pay for sessions online, and receive automated Google Meet links and email confirmations.
- **Admin Goal:** Streamline schedule management, slot allocation, client records, and session tracking for the counsellor.

---

## 2. Target Users & Roles
- **Clients (Seekers):**
  - Individuals and couples seeking mental wellness, individual counselling, or relationship therapy.
  - Can browse services, book available slots, pay via Razorpay, access receipts, view upcoming/past sessions, and request reschedules/cancellations.
- **Counsellor / Admin (Bhagyashree):**
  - Defines working hours, slot durations, buffer times, and blacked-out dates.
  - Manages booking statuses, issues refunds, processes reschedules, views client intake details, and tracks session notes securely.

---

## 3. Key Features

### Public Website & Discovery
- **Hero & Value Proposition:** Trust-building messaging, credentials, empathetic tone, prominent CTA.
- **About Page:** Bhagyashree's philosophy, qualifications, certifications, and approach to therapy.
- **Services Catalog:** Detailed pages for Individual Therapy, Relationship/Couples Counselling, Stress & Anxiety, etc., with transparent pricing and duration.
- **Blog / Resources:** Psychoeducational articles and wellness tips.
- **Contact & FAQ:** Common queries regarding therapy sessions, confidentiality, and platform usage.
- **Emergency Helpline Notice:** Prominent notice on footer and booking pages (Tele-MANAS `14416`, KIRAN `1800-599-0019`).

### Booking & Payment Engine
- **Slot Selection:** Dynamic calendar view displaying real-time available slots in Indian Standard Time (IST).
- **Slot Lock Mechanism:** 10-minute temporary reservation lock while payment is in progress to prevent double-booking.
- **Server-Side Pricing:** Pricing calculated and verified exclusively on the server (never client-supplied).
- **Razorpay Checkout:** Secure UPI, card, and net banking payments via Razorpay.
- **Webhook-Driven Confirmation:** Idempotent webhook verification to confirm bookings, generate Google Meet links, and trigger Resend email notifications.
- **Intake & Consent Form:** DPDP Act-compliant consent checkbox, emergency contact, and brief session expectation form.

### Client & Admin Dashboards
- **Client Dashboard:** Upcoming session links, session history, reschedule/cancel triggers, payment invoices/receipts.
- **Admin Dashboard:** Calendar overview, availability slot manager, client directory, intake review, pricing editor, refund and reschedule actions.

---

## 4. Out of Scope
- In-app custom video calling or proprietary chat rooms (Google Meet is used for all sessions).
- Multi-therapist marketplace or directory features.
- Emergency psychiatric triage or 24/7 crisis intervention services.
- Outcome guarantees, medical diagnoses, or "cure" claims.
