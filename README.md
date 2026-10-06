# MPower / Bhagyashree Counselling & Mental Wellness Platform

A production-grade, highly empathetic web platform and booking engine for clinical psychologist and counsellor practice across India. Built with Next.js 15 App Router, TypeScript, Tailwind CSS, Supabase (Auth + Postgres + RLS), Razorpay, Resend, and Google Meet integration.

---

## 🌟 Key Features

- **Public Hub:** Home, About (credentials & therapeutic modalities), Services catalog & dynamic detail (`/services/[slug]`), Blog & Journal (`/blog/[slug]`), Contact (Zod-validated), and Categorized FAQ.
- **Booking Engine (`/book`):** Multi-step scheduling in Indian Standard Time (IST), double-booking prevention, 10-minute temporary slot reservation hold, and encrypted clinical intake form.
- **Razorpay Payments:** Server-side order creation, cryptographic HMAC-SHA256 signature verification, and idempotent webhook handler.
- **Automated Google Meet & Emails:** Automatic Google Meet appointment link generation and transactional HTML confirmation emails via Resend.
- **Client Dashboard (`/dashboard`):** Upcoming session countdown, 1-click Google Meet room joining, 24-hour advance rescheduling and cancellation, and printable PDF receipts.
- **Admin Panel (`/admin`):** Availability slot manager (add/remove dates & hours), live bookings table with search/filter, confidential clinical intake viewer, and 1-click Razorpay refund triggers.
- **Privacy & Legal (DPDP Act 2023):** Row-Level Security (RLS) on all database tables, explicit informed consent checkboxes, DPDP-compliant cookie consent banner, and prominent 24/7 crisis helpline notices (**Tele-MANAS 14416** & **KIRAN 1800-599-0019**).
- **SEO & Performance:** Dynamic XML sitemap (`/sitemap.xml`), `robots.txt`, Open Graph metadata, semantic HTML, and zero lint errors.

---

## 🚀 Quick Start (Local Setup)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/manthanjj/mpower.git
cd mpower
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration keys (or leave them default to use built-in mock/demo pathways):
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_yourKeyId
RAZORPAY_KEY_SECRET=yourKeySecret
RAZORPAY_WEBHOOK_SECRET=yourWebhookSecret

# Resend
RESEND_API_KEY=re_yourApiKey
RESEND_FROM_EMAIL=care@yourdomain.com

# Admin
ADMIN_EMAIL=bhagyashree.counsellor@gmail.com
```

### 3. Run Supabase Database Migration
Execute the SQL script located in [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase SQL Editor. This configures:
- `profiles` table with automatic role trigger (`client` vs `admin`)
- `availability_slots` with 10-minute hold lock timestamps
- `bookings` and `payments` tables
- Strict Row Level Security (RLS) policies on all tables

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & QA

- **Build Test:** `npm run build`
- **Lint Test:** `npm run lint`

---

## 📄 Centralized Content Store

All counsellor bios, credentials, session rates, testimonials, and FAQs are managed in a single structured file:
[`src/content/site.ts`](./src/content/site.ts)

---

## 🔒 Security & Medical Disclaimer

This platform facilitates outpatient psychological counselling. It is not equipped for psychiatric emergencies or acute self-harm crises. Free 24/7 crisis support in India is accessible via **Tele-MANAS (14416)** and **KIRAN (1800-599-0019)**.
