# WebKosice

A bilingual (Slovak + English) marketing website for a freelance custom-web-development business based in Košice. Built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, and **next-intl**.

- Dark, developer-focused design with neon cyan/emerald accents
- Fully static-generated (all 27 pages), deploy-ready for Vercel
- i18n with locale-prefixed routes (`/sk/*`, `/en/*`) and a language switcher that preserves the current path
- SEO: per-route metadata, `sitemap.xml`, `robots.txt`, `LocalBusiness` JSON-LD, dynamic OG image
- Contact form: server action + Zod validation + honeypot + time-trap anti-spam + Resend (with graceful `mailto:` fallback)
- Accessibility: semantic landmarks, skip link, keyboard-friendly, `prefers-reduced-motion` honored

## Quick start

```bash
npm install
cp .env.example .env.local      # optional — fill in real values when ready
npm run dev                     # → http://localhost:3000 (redirects to /sk)
```

Production build:

```bash
npm run build
npm run start
```

## Environment variables

All variables are optional for local development. Set them in production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL (used for SEO, OG, sitemap). Example: `https://webkosice.sk` |
| `CONTACT_EMAIL` | Where contact-form submissions are delivered |
| `RESEND_API_KEY` | If set, the contact form sends real emails via [Resend](https://resend.com). If not set, the form gracefully falls back to a `mailto:` flow — still fully functional. |

See [`.env.example`](./.env.example).

## Editing content

All copy lives in two JSON files — no CMS required:

- [`src/messages/sk.json`](src/messages/sk.json) — Slovak
- [`src/messages/en.json`](src/messages/en.json) — English

Other editable content:

| File | What to edit |
| --- | --- |
| [`src/content/projects.ts`](src/content/projects.ts) | 4 mock portfolio case studies. Swap each for a real project (title, summary, challenge/solution/results, stack, services). Detail pages regenerate automatically. |
| [`src/content/services.ts`](src/content/services.ts) | The 6 services offered (keys mirror the `services.items.*` JSON keys). |
| [`src/content/stack.ts`](src/content/stack.ts) | The tech-stack pills shown on the home and about pages. |
| [`src/content/faq.ts`](src/content/faq.ts), `testimonials.ts` | Lists of keys that map into the JSON files. |
| [`src/lib/site.ts`](src/lib/site.ts) | Brand name, email, phone, address, social links, founded year. **Update these before launch.** |

### Replacing the mock case studies

1. Open [`src/content/projects.ts`](src/content/projects.ts).
2. Replace each object's `slug`, `sk` and `en` fields with the real client work.
3. Set `sample: false` once the content is real (this also removes the "Sample case study" badge — you'll need to edit the JSX in [`src/components/sections/Projects.tsx`](src/components/sections/Projects.tsx) and [`src/app/[locale]/portfolio/page.tsx`](src/app/[locale]/portfolio/page.tsx) to conditionally show the badge).

### Replacing the testimonials

Open both [`src/messages/sk.json`](src/messages/sk.json) and [`src/messages/en.json`](src/messages/en.json) and edit the `testimonials.items.one|two|three` values. Add more by extending `testimonialKeys` in [`src/content/testimonials.ts`](src/content/testimonials.ts).

## Project structure

```
src/
  app/
    [locale]/                # all user-facing pages live here
      layout.tsx             # locale shell (Header, Footer, JSON-LD)
      page.tsx               # home
      services/              # /services
      portfolio/             # /portfolio and /portfolio/[slug]
      about/                 # /about
      contact/               # /contact
      privacy/, terms/       # legal stubs
      not-found.tsx
    actions/contact.ts       # server action for the contact form
    layout.tsx               # root (html, body, fonts)
    globals.css              # Tailwind + design tokens
    icon.tsx, opengraph-image.tsx
    sitemap.ts, robots.ts
  components/
    layout/                  # Header, Footer, Logo, LocaleSwitcher
    sections/                # Hero, Trust, Services, Projects, Process, Stack, Testimonials, FAQ, CTA, ContactForm
    ui/                      # Button, Card, Badge, SectionHeading, Reveal (animations)
  content/                   # TS data (projects, services, stack, testimonials, faq)
  i18n/                      # next-intl routing + request config
  lib/                       # cn(), site config, email, jsonld
  messages/                  # sk.json, en.json
  middleware.ts              # locale detection & routing
```

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Import the project on [vercel.com](https://vercel.com).
3. Add the environment variables from [`.env.example`](./.env.example) in Vercel → Settings → Environment Variables.
4. Deploy. `npm run build` and static output are detected automatically.

### Custom domain

- Buy your domain (e.g. at websupport.sk, namecheap.com, gandi.net).
- Point an `A` record to Vercel's IP or `CNAME` to `cname.vercel-dns.com` — follow Vercel's domain setup docs.
- Set `NEXT_PUBLIC_SITE_URL` to the production URL (`https://yourdomain.sk`).

### Email (optional, for live contact form)

- Create an account at [resend.com](https://resend.com).
- Add + verify your domain there (single SPF/DKIM record).
- Generate an API key, set `RESEND_API_KEY` + `CONTACT_EMAIL` in Vercel.
- Update the `from:` address in [`src/lib/email.ts`](src/lib/email.ts) from `onboarding@resend.dev` to something like `hello@yourdomain.sk` once your domain is verified.

## Checklist before launch

- [ ] Replace `site` values in [`src/lib/site.ts`](src/lib/site.ts) (email, phone, address, social links).
- [ ] Replace the 4 sample case studies in [`src/content/projects.ts`](src/content/projects.ts).
- [ ] Replace the 3 testimonials in the message JSON files.
- [ ] Fill in the full Privacy / Terms text in the `privacy/` and `terms/` pages.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your real domain.
- [ ] Hook up Resend (or your preferred email provider) for the contact form.
- [ ] Add Google Analytics / Plausible / Umami if desired (add the script tag in [`src/app/layout.tsx`](src/app/layout.tsx)).
- [ ] Submit `sitemap.xml` in Google Search Console.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts Turbopack dev server on port 3000 |
| `npm run build` | Full production build |
| `npm run start` | Runs the production server |
| `npm run lint` | Runs `next lint` |

## License

Private — © WebKosice. All rights reserved.
