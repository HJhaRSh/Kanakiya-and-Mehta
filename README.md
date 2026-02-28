# Kanakiya & Mehta Associates — CA Firm Website

A professional, responsive website for **Kanakiya & Mehta Associates**, Chartered Accountants (Est. 1989), with offices in Mumbai, Ahmednagar, and Pune.

## Tech Stack

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** + CSS variables for theming
- **Framer Motion** for animations
- **Lucide React** for icons
- **Google Fonts**: Playfair Display (headings), DM Sans (body)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Form (Formspree)

1. Sign up at [formspree.io](https://formspree.io) and create a new form.
2. In `components/contact/ContactForm.tsx`, set `FORMSPREE_ENDPOINT` to your form’s endpoint (e.g. `https://formspree.io/f/xxxxxxxx`).
3. Submissions will appear in your Formspree dashboard and can be forwarded by email.

## Build & Deploy

```bash
npm run build
npm start
```

Deploy to **Vercel** by connecting the repo; no extra config needed.

## Project Structure

- `app/` — Pages (Home, About, Partners, Services, Experience, Contact)
- `components/` — UI (Navbar, Footer, PageHero, etc.), home sections, partners, services, experience, contact
- `data/` — Partners, services, audit experience, offices (all content)

## Features

- Sticky navbar with mobile menu
- Hero with stat counters and CTAs
- Trust bar (marquee) with credentials
- Services overview and detailed services page
- Partners grid with bios
- Experience / track record with filterable, sortable tables
- Contact form with success/error states
- Back-to-top button (after 300px scroll)
- Per-page metadata for SEO
