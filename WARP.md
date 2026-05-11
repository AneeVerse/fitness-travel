# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 (via PostCSS), ESLint (Next config).
- Entry points: src/app/page.tsx (home), src/app/layout.tsx (global layout/styles/metadata), dynamic route at src/app/itinerary/[slug]/page.tsx.
- Assets: Static assets in public/ (images, video, fonts). Remote images allowed from ik.imagekit.io per next.config.ts.

Commands
- Install dependencies
```bash path=null start=null
npm install
```

- Start development server (Turbopack)
```bash path=null start=null
npm run dev
```

- Build for production
```bash path=null start=null
npm run build
```

- Run production server (after build)
```bash path=null start=null
npm run start
```

- Lint (Next ESLint)
```bash path=null start=null
npm run lint
```

- Lint with autofix (ad hoc)
```bash path=null start=null
npx next lint --fix
```

- Type-check only (ad hoc)
```bash path=null start=null
npx tsc -p tsconfig.json --noEmit
```

Testing
- There is no test framework configured in this repo at present (no jest/vitest/cypress config or scripts). If tests are added later, ensure scripts are defined in package.json and document how to run a single test.

Environment configuration
These server routes require environment variables:
- src/app/api/contact/route.ts (Nodemailer): EMAIL_USER, EMAIL_PASS (App Password), EMAIL_RECEIVER
- src/app/api/instagram/route.ts (Instagram Basic Display proxy): IG_ACCESS_TOKEN

Define them using a local env file (loaded by Next at runtime):
```bash path=null start=null
# .env.local
EMAIL_USER=
EMAIL_PASS=
EMAIL_RECEIVER=
IG_ACCESS_TOKEN=
```
Notes
- Do not expose secrets in commands or logs. Set them via environment variables or .env.local. On Windows/PowerShell, prefer using the .env.local file for local dev.

High-level architecture
- App Router pages (server-first)
  - src/app/layout.tsx: Global layout, metadata, and analytics. Loads fonts (Inter, Unbounded, Teko via next/font/google), imports global styles (src/app/globals.css), and injects analytics scripts (Google Analytics gtag and Meta/Facebook Pixel) using next/script.
  - Routes in src/app/*: page.tsx (home) composes section components (Hero, FeaturesSection, UpcomingEvents, etc.). Additional routes include about, faq, contact, thank-you, and itinerary/[slug].
  - API routes (Edge/server functions) in src/app/api/*:
    - contact/route.ts: Validates form input, requires email env vars, sends three emails (user confirmation, company notification to EMAIL_RECEIVER, and owner notification to EMAIL_USER) via Nodemailer with Gmail service. Returns JSON responses with appropriate status codes.
    - instagram/route.ts: Server-side proxy to Instagram Graph API using IG_ACCESS_TOKEN. Caches with Next revalidate and returns JSON.

- UI composition
  - src/components/*: Presentation components for sections (Navbar, Hero, FeaturesSection, ReviewsSection, VideoSlider, etc.). The home page composes these into a single scrollable landing experience.
  - Many components are client components where needed (e.g., Navbar uses "use client" and local state for mobile navigation and CTA interactions).

- Domain data
  - src/lib/tripData.ts: Centralized static content for trips keyed by slug (phuket, bali, goa). Exposes getTripData(slug) and getAllTripData() for consumption by itinerary pages/components. Shapes include overview, highlights, days with media, and pricing tiers.

- Styling
  - Tailwind CSS v4 enabled via PostCSS plugin (@tailwindcss/postcss) with a configless setup typical of v4.
  - Global styles in src/app/globals.css define CSS variables, theme tokens, and extensive responsive/mobile tweaks (touch targets, typography scaling, carousel behavior, form input overrides, etc.).

- Images and optimization
  - next.config.ts restricts remote images to ik.imagekit.io, enables modern formats (webp) and sets caching. Local images/videos live in public/.

- TypeScript and path alias
  - tsconfig.json is strict with noEmit and sets a path alias @/* -> ./src/* for cleaner imports.

- Legacy note
  - src/pages/_document.tsx exists but the project uses the App Router under src/app. The pages router’s _document is typically unused in this setup and can usually be ignored unless migrating back to the pages router.

Important references pulled from repo docs
- README.md documents starting the dev server and that the app hot-reloads. The default dev URL is http://localhost:3000/.
