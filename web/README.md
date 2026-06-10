# Hope Gym & Spa 🏋️

A modern, premium, fully responsive and SEO-friendly website for **Hope Gym & Spa** — Faridabad's premium fitness chain (with a Gurugram branch). Built with a black / gold (golden-yellow) theme matching the brand logo, bold typography, glassmorphism and smooth Framer Motion animations.

## ✨ Features

- **8 pages** — Home, About, Branches, Membership, Facilities, Trainers, Gallery, Contact
- **Premium dark UI** with glassmorphism, gradients, rounded cards & hover effects
- **Smooth scroll animations** (Framer Motion) and animated stat counters
- **Sticky, scroll-aware navbar** with animated active state + mobile menu
- **Gallery** with category filtering and full lightbox (keyboard-free swipe via arrows)
- **Membership** pricing cards + feature comparison table + FAQ accordion
- **Facilities & Services** — services grid, Programs section and Amenities strip
- **Branches** with embedded Google Maps + WhatsApp enquiry per branch (real Faridabad + Gurugram locations)
- **Floating actions** — WhatsApp (pulsing), Call, Back-to-top
- **Newsletter**, **cookie consent**, **contact form** (demo handlers, ready to wire up)
- **SEO ready** — per-page metadata, OpenGraph/Twitter, JSON-LD (`HealthClub`), `sitemap.xml`, `robots.txt`
- **Accessibility** — semantic landmarks, focus rings, `prefers-reduced-motion` support
- **Fully responsive** mobile → tablet → desktop

## 🧱 Tech Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · React Icons

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## 📁 Project Structure

```
src/
├── app/                 # App Router pages, layout, sitemap, robots
│   ├── (home) page.tsx
│   ├── about/ branches/ membership/ facilities/
│   ├── trainers/ gallery/ contact/
│   ├── layout.tsx       # fonts, metadata, JSON-LD, global chrome
│   └── globals.css
├── components/
│   ├── layout/          # Navbar, Footer, FloatingActions, CookieConsent…
│   ├── home/            # Home page sections (Hero, Stats, Testimonials…)
│   ├── cards/           # Reusable PlanCard, BranchCard, TrainerCard, FacilityCard
│   ├── ui/              # Primitives: Button, Section, Reveal, CountUp…
│   ├── about/ membership/ gallery/ contact/
│   └── icons.tsx        # string-key → icon component map
├── data/                # ⭐ Static demo data (branches, plans, trainers…)
├── lib/                 # site config, animation variants, helpers
└── types/               # Shared domain types
```

## 🔌 Admin / CMS Ready (Future Phases)

The architecture is intentionally **data-driven** so it can scale into a full gym-management ecosystem:

- All content lives in **`src/data/*`** as typed arrays matching the interfaces in **`src/types`**. These mirror what a REST/GraphQL API or CMS would return.
- Components **never hardcode content** — they consume typed data via props. Swapping static data for a fetch from an admin dashboard means changing only the data layer.
- Forms (contact, newsletter) and enquiry/WhatsApp CTAs are isolated with clearly marked **demo handlers** ready to point at an API route or backend (`// wire to ... later`).

To go live with an admin panel later, replace the imports from `src/data/*` with async data fetching (e.g. server components calling your API or CMS) — the UI stays untouched.

Manageable entities already modelled: **Membership plans, Branches, Gallery, Trainers, Facilities, Testimonials, Stats** (extendable to Blog posts, Enquiries, Announcements).

## 🎨 Customisation

- **Brand / contact / socials** → `src/lib/site.ts`
- **Navigation** → `navLinks` in `src/lib/site.ts`
- **Colours & theme** → `tailwind.config.ts` (`brand` = golden yellow `#FFD400`, `ink` = matte black `#0B0B0B`)
- **Logo** → `public/logo.png` (used by `src/components/layout/Logo.tsx`)
- **Content** → `src/data/*`
- **Images** — currently Unsplash URLs (allowed hosts in `next.config.js`); swap for your own gym photos.

> ⚠️ Replace the **placeholder phone numbers / emails** (in `src/lib/site.ts` and `src/data/branches.ts`), confirm the **Google Maps queries**, fill in the **Gurugram branch address**, and set `siteConfig.url` before going to production. Stats (1000+ members, 8+ years, etc.) reflect the brand overview — update with the owner's exact figures.
