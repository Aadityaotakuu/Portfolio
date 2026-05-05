# Aaditya Portfolio (Product-Grade UI)

Recruiter-focused frontend portfolio with case-study storytelling and product-style layout. Built with React 19, Vite, Tailwind CSS, Framer Motion, Three.js, and React Router.

## Quick Start

```bash
npm install
npm run dev
```

## What&apos;s Inside

- Smooth scrolling (Lenis)
- Command palette (Ctrl + K)
- Three.js particle background
- Glassmorphism UI with teal and amber palette
- Case study project cards with private-code handling
- Tech Stack and CTA sections
- Section reveal animations and page transitions
- Magnetic buttons and hover tilt project cards
- Dark theme with light mode toggle

## Customize Your Content

Replace the placeholder data here:

- Projects (case studies + link handling): [src/data/projects.ts](src/data/projects.ts)
- Skills: [src/data/skills.ts](src/data/skills.ts)
- Tech stack: [src/data/techStack.ts](src/data/techStack.ts)
- Achievements: [src/data/achievements.ts](src/data/achievements.ts)
- Social links + command palette targets: [src/data/commands.ts](src/data/commands.ts)

### Private Project Links

If a project has no GitHub or live demo, the UI automatically shows:
"Code Private (Available on request)".

### Resume Placeholder

The hero and CTA buttons point to `/Aaditya cv.pdf`. Add your real file to `public/Aaditya cv.pdf` or update the link in [src/sections/Hero.tsx](src/sections/Hero.tsx) and [src/sections/CTA.tsx](src/sections/CTA.tsx).

### Contact Email

Update the email in [src/sections/Contact.tsx](src/sections/Contact.tsx) and [src/sections/CTA.tsx](src/sections/CTA.tsx).

### Contact Form (Vercel)

The form posts to `/api/contact`, which maps to the serverless function in [api/contact.js](api/contact.js).

Set these Environment Variables in Vercel:

- `SMTP_USER` - Gmail address used to send mail
- `SMTP_PASS` - Gmail app password (not your normal password)
- `MAIL_TO` - optional recipient address (defaults to `SMTP_USER`)

If you set `VITE_CONTACT_ENDPOINT`, ensure it is `/api/contact` in production (do not point to localhost).

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - typecheck + production build
- `npm run preview` - preview the build output
