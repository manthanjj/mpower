# Design System & UI Specifications

## 1. Aesthetic Direction
- **Inspiration:** welisten.in — Calm, trustworthy, grounding, empathetic, and CTA-driven.
- **Vibe:** Warm, safe, approachable, professional healthcare/mental wellness aesthetic. Avoid harsh contrasts or aggressive colors.

---

## 2. Color Palette

| Role | Name | Hex / HSL | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | Deep Forest Sage | `#2D4A3E` (`hsl(154, 24%, 23%)`) | Primary CTAs, brand accents, strong headers |
| **Primary Foreground**| Off-White | `#FBFBF9` (`hsl(60, 14%, 98%)`) | Text on primary elements |
| **Secondary / Calm** | Soft Eucalyptus | `#E7EFE9` (`hsl(135, 20%, 92%)`) | Badges, card highlights, soft pill buttons |
| **Accent / Warmth** | Warm Terracotta | `#C86D51` (`hsl(14, 52%, 55%)`) | Urgent highlights, subtle warmth accents |
| **Background** | Cream Mist | `#F8F9F5` (`hsl(80, 14%, 97%)`) | Page background |
| **Card / Surface** | Pure Clean White | `#FFFFFF` (`hsl(0, 0%, 100%)`) | Surface cards, modals, dropdowns |
| **Text Primary** | Deep Slate Charcoal | `#1A2421` (`hsl(163, 16%, 12%)`) | Main body text & high-contrast headings |
| **Text Muted** | Neutral Olive Gray | `#5C6B64` (`hsl(153, 7%, 39%)`) | Subtitles, helper text, timestamps |
| **Border / Divider** | Subtle Olive Tint | `#E2E7E3` (`hsl(130, 10%, 89%)`) | Card borders, table dividers |
| **Emergency Notice** | Muted Amber Red | `#FDF2F2` / `#991B1B` | Crisis helpline callout banner |

---

## 3. Typography
- **Headings Font:** `Plus Jakarta Sans` or `Fraunces` / `Outfit` via `next/font/google` (Warm, approachable, polished).
- **Body & UI Font:** `Inter` or `Plus Jakarta Sans` via `next/font/google` (High legibility, clean numbers).
- **Scale:**
  - `h1`: `text-3xl md:text-5xl font-bold tracking-tight leading-tight`
  - `h2`: `text-2xl md:text-3xl font-semibold tracking-tight`
  - `h3`: `text-xl md:text-2xl font-semibold`
  - `body-lg`: `text-lg leading-relaxed`
  - `body`: `text-base leading-relaxed`
  - `caption`: `text-sm text-muted-foreground`

---

## 4. Spacing & Layout
- **Grid:** 8pt spatial system (`p-2`, `p-4`, `p-6`, `p-8`, `p-12`, `p-16`).
- **Container Max-Width:** `max-w-6xl` or `max-w-7xl` with generous horizontal padding (`px-4 sm:px-6 lg:px-8`).
- **Corner Radii:** Soft and organic — `rounded-xl` (12px) for cards, `rounded-full` for CTA buttons and badges.
- **Shadows:** Soft ambient diffusion (`shadow-sm`, `shadow-md` with low opacity color tints).

---

## 5. Reusable Component Patterns
- **Buttons:**
  - Primary: Deep Forest Sage with smooth scale/hover lift (`hover:bg-[#243c32] transition-all`).
  - Secondary: Soft Eucalyptus pill buttons.
  - Ghost / Outline: Subtle border with slate hover.
- **Cards:** Clean white surface, 1px subtle border, rounded-2xl, gentle hover elevation.
- **Emergency Helpline Strip:** Pinned or prominent banner with phone icons, crisis hotline numbers, and non-emergency disclaimer.
- **Slot Selector:** Interactive grid with selected state, locked/disabled state, and clear IST indicator.
- **Consent Checkboxes:** Explicit, accessible form controls with direct links to legal policies.
