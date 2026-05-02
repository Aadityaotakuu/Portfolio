# Aaditya Portfolio (Futuristic Dark UI)

Premium, motion-driven developer portfolio inspired by futuristic dark fantasy aesthetics. Built with React 19, Vite, Tailwind CSS, Framer Motion, Three.js, and React Router.

## Quick Start

```bash
npm install
npm run dev
```

## What&apos;s Inside

- Smooth scrolling (Lenis)
- Command palette (Ctrl + K)
- Three.js particle background
- Glassmorphism + neon glow UI
- Section reveal animations and page transitions
- Magnetic buttons and hover tilt project cards
- Dark theme with light mode toggle

## Customize Your Content

Replace the placeholder data here:

- Projects: [src/data/projects.ts](src/data/projects.ts)
- Skills: [src/data/skills.ts](src/data/skills.ts)
- Achievements: [src/data/achievements.ts](src/data/achievements.ts)
- Social links + command palette targets: [src/data/commands.ts](src/data/commands.ts)

### Resume Placeholder

The hero button points to `/resume.pdf`. Add your real file to `public/resume.pdf` or update the link in [src/sections/Hero.tsx](src/sections/Hero.tsx).

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - typecheck + production build
- `npm run preview` - preview the build output
