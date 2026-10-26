# Sketchleaf Design Studio (React + Vite + Tailwind + GSAP)

## Run
```
npm install
npm run dev        # http://localhost:3000
npm run lint       # type-check
npm run build      # outputs dist/
npm run preview    # serve the production build
node --experimental-strip-types --test src/utils/projectData.test.ts
```
Requires Node 20.19+ (Vite 8).

## Replace images
Images live in `public/images/` (served as `/images/<name>.webp`). Replace a file with the same name, or change the path in `src/utils/projectData.ts`. Use WebP, ~1600px wide, under 150 KB.

## Deploy on Vercel
Import the repo with: Framework Preset **Vite**, Build Command `npm run build`, Output Directory `dist`. Review the Preview URL on a feature branch before merging to `main`.

See `CHANGES.md` for what was fixed.
