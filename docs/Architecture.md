# System Architecture & Technical Specifications

## 1. Technology Stack
- **Frontend / Framework:** Next.js (App Router, React Server Components, TypeScript).
- **Styling & UI:** Tailwind CSS, shadcn/ui (radix primitives), lucide-react icons.
- **Database & Auth:** Supabase (PostgreSQL with Row Level Security, Supabase Auth).
- **Payments:** Razorpay (Standard Checkout, Server SDK, Webhooks).
- **Email Dispatch:** Resend (React Email templates).
- **Meeting Generation:** Google Calendar API (OAuth / Service Account with Google Meet integration).
- **Hosting & Edge:** Vercel.

---

## 2. End-to-End Booking & Payment Flow

```
[ Client ]
    │ (1) Selects Service + Date/Slot (IST)
    ▼
[ Next.js Server Action / API ]
    │ (2) Checks availability & locks slot for 10 mins (status: 'pending_payment')
    │ (3) Calculates server-side price & creates Razorpay Order via Razorpay SDK
    ▼
[ Client / Razorpay Checkout Modal ]
    │ (4) Completes UPI / Card / Netbanking payment
    ▼
[ Razorpay Server ]
    │ (5) Emits 'order.paid' / 'payment.captured' Webhook event
    ▼
[ Next.js Webhook Handler (/api/webhooks/razorpay) ]
    │ (6) Validates webhook signature (idempotent processing)
    │ (7) Updates booking status to 'confirmed'
    │ (8) Generates Google Calendar Event + Google Meet Link
    │ (9) Sends confirmation emails via Resend to Client and Counsellor
    ▼
[ Cron / Expiration Job ]
    │ (10) Releases slots with status 'pending_payment' older than 10 minutes
```

---

## 3. Project Directory Structure

```
mpower/
├── docs/
│   ├── PRD.md
│   ├── Architecture.md
│   ├── Rules.md
│   ├── Phases.md
│   ├── Design.md
│   └── Memory.md
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (public)/
│   │   │   ├── page.tsx (Home)
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   │   └── [slug]/
│   │   │   ├── book/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   └── refund-policy/
│   │   ├── dashboard/ (Client)
│   │   ├── admin/ (Counsellor)
│   │   ├── api/
│   │   │   ├── webhooks/razorpay/
│   │   │   └── cron/cleanup-slots/
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── layout/ (Navbar, Footer, EmergencyBanner, CookieConsent)
│   │   ├── booking/ (Calendar, SlotPicker, IntakeForm, Summary)
│   │   ├── dashboard/
│   │   └── admin/
│   ├── lib/
│   │   ├── supabase/ (client, server, middleware, rls)
│   │   ├── razorpay/ (client, signature validation, orders)
│   │   ├── resend/ (client, email senders)
│   │   ├── google/ (calendar & meet API helpers)
│   │   ├── validations/ (zod schemas for forms, payments, slots)
│   │   └── utils.ts
│   └── types/
│       └── database.types.ts
├── public/
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Data Models & Security (Supabase RLS)
- **Profiles:** User ID, role (`client` | `admin`), full name, phone, emergency contact.
- **Services:** ID, title, slug, description, duration_minutes, price_inr, is_active.
- **Availability Slots:** ID, counsellor_id, start_time (UTC with IST projection), end_time, is_booked, is_locked, locked_until.
- **Bookings:** ID, client_id, service_id, slot_id, status (`pending_payment`, `confirmed`, `cancelled`, `completed`, `rescheduled`), razorpay_order_id, razorpay_payment_id, meet_link, intake_notes, created_at.
- **Transactions / Receipts:** ID, booking_id, amount_inr, razorpay_payment_id, status, receipt_url.
- **Security:** Strict Supabase RLS policies ensuring clients only view their own bookings/profile and admin has full management access.
