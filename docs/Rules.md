# Engineering Guidelines & Project Rules

## 1. Secrets & Environment Variables
- Secrets and keys belong exclusively in `.env` (local) and Vercel project settings (production).
- Keep `.env.example` continuously up-to-date with dummy keys and variable descriptions.
- **Never hard-code credentials, API keys, or database URLs in source files.**

---

## 2. Validation & Error Handling
- Validate all client inputs, route parameters, and webhook payloads using **Zod**.
- Return friendly, actionable error messages to the client.
- **Never expose raw stack traces, database schema details, or third-party error bodies to the frontend.**

---

## 3. Data Privacy & Compliance (DPDP Act & Mental Health Ethics)
- Enable **Row Level Security (RLS)** on every Supabase table.
- Sensitive data (intake questionnaires, session notes) must follow minimal collection principles, stay encrypted at rest, and never be logged in server logs or console outputs.
- Include explicit consent checkboxes for Terms & Privacy on signup and checkout forms.
- Cookie consent banner: load tracking or analytics scripts **only after explicit user consent**.

---

## 4. Medical & Ethical Boundaries
- **No fake reviews or fabricated testimonials.**
- **No outcome guarantees or claims of "curing" mental illnesses.**
- Prominent **Emergency Notice** displayed across the footer and booking flow:
  - Tele-MANAS: `14416`
  - KIRAN Mental Health Helpline: `1800-599-0019`
  - Clearly state the platform is not suitable for active psychiatric emergencies.

---

## 5. UI, Accessibility & Performance
- **Accessibility (WCAG AA):**
  - Semantic HTML (`<main>`, `<nav>`, `<header>`, `<article>`, `<button>`, etc.).
  - Proper form labels, focus-visible states, sufficient color contrast ratios, keyboard navigability.
  - Meaningful `alt` text on all images.
- **Performance:**
  - Leverage `next/image` with proper dimensions, `next/font` for web fonts.
  - Prefer React Server Components by default; use `'use client'` only for interactive subtrees.
  - Maintain a target of **Lighthouse 90+** on performance, accessibility, and SEO.
- **Component Architecture:**
  - Build small, reusable, single-responsibility components.
  - Rely exclusively on **shadcn/ui** and **lucide-react** for UI components.
  - Do not install unauthorized libraries or add unrequested features.

---

## 6. AI Agent Operational Rules
- Read only `Memory.md` and files actively being modified.
- Stop and wait for user review after each phase.
- Update `Memory.md` after completing every phase before prompting for the next.
- Ask for clarification only when strictly blocked.
