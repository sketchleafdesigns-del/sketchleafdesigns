# Fixes applied to the AI Studio export

## Build / compatibility
- `npm install` failed (ERESOLVE: unused `esbuild ^0.25` vs Vite 8 peer range). Removed unused deps: esbuild, tsx, express, @types/express, dotenv, @google/genai, motion, autoprefixer. Removed `bun.lock`; npm lockfile generated.
- Images were referenced as `/src/assets/...`, which only works in dev. They were missing from the production build (hero 404, others silently hidden by onError fallbacks). Moved to `public/images/`, converted to WebP (4.1 MB -> 0.5 MB).
- `vite.config.ts`: `__dirname` -> `import.meta.dirname` (removes Vite warning).
- Unit test import fixed (`./projectData.ts`); tests pass (5/5).
- `100vh` (`min-h-screen`) -> `100svh` on hero and pinned section (mobile browser address-bar jump).
- Twitter card set to `summary` (no share image exists); theme-color added.

## Scroll smoothness
- Removed CSS `scroll-smooth` (conflicts with ScrollTrigger pin/scrub). In-page anchors now use an explicit smooth-scroll handler (instant when reduced motion is on).
- Hero backdrop: removed CSS `transition-transform` that fought the GSAP scrub.
- Pinned storytelling: removed `scrub` from the pin-only trigger (added lag to stage changes); removed full-screen `blur-3xl` image filter.
- Cards: `transition-all` -> property-specific transitions so CSS does not fight GSAP transforms.
- Removed 20+ `backdrop-blur` layers and per-image CSS filters over scrolling content; same look using solid backgrounds.
- Reveal animations now run once (`once: true`) instead of play/reverse on every scroll direction change.
- Below-the-fold images: `loading="lazy"` + `decoding="async"`; hero image `fetchPriority="high"`.

## Content accuracy (please review)
- "EST. 2012" removed (unverified) -> "14+ YRS EXPERIENCE"; "WORLDWIDE CLIENTS" -> "WORKING WORLDWIDE".
- "10 PRODUCTION DEPLOYMENTS" -> "10 PROJECTS & CONCEPTS" (most are labelled concepts).
- Commercial Lab sample visuals no longer say "Client: ..." with invented company names or turnaround times; they are labelled as concept samples.
- "Award-quality / award-calibre" -> "Premium".
- Contact confirmation no longer says WhatsApp "has opened" (browsers can't confirm it); it says it was attempted, with a manual button.

## Not changed - needs your decision
- Pricing differs from the current live site (live: from Rs 2,999 landing page, from Rs 1,999 AI ad; this app: packages from Rs 15,000 / Rs 5,000). Left as exported.
- Fonts load from Google Fonts CDN (fallback fonts are defined).
- Tailwind v4 needs modern browsers (Chrome 111+, Safari 16.4+, Firefox 128+).
