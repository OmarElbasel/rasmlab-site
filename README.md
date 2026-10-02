# Rasmlab website

Next.js 16 (App Router, TypeScript, Tailwind v4) site for Rasmlab, a web, app and AI creative studio.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
STATIC_EXPORT=1 npm run build   # plain static site in /out
```

## Motion stack

- **Lenis** smooth scroll (the engine locomotive-scroll v5 is built on), driven by the GSAP ticker so ScrollTrigger stays in sync. `src/components/SmoothScroll.tsx`
- **GSAP + ScrollTrigger + SplitText** for the preloader, line reveals, pinned horizontal services, stacking process cards, velocity marquee and footer wordmark.
- **React Three Fiber** WebGL hero: a domain-warped noise "ink" shader that swirls around the pointer and fades out on scroll. `src/components/HeroCanvas.tsx`
- Custom blend-mode cursor (`data-cursor="Label"` on any element morphs it), magnetic buttons, film grain.
- `prefers-reduced-motion` turns off smooth scroll, the preloader and the pinned sections.

## Adding the portfolio projects

Edit `src/data/projects.ts`. Each entry takes a title, client, year, services, summary, optional `url`,
and optional `image` (drop the file in `public/work/` and set `image: "/work/name.jpg"`).
Remove `placeholder: true` once a slot has real content.

## Still placeholder

- Contact email (`rasmlabs@gmail.com`) and social links in `src/components/Contact.tsx`
- Both portfolio entries
