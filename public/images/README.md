# ArcTravel — Real Photo Swap Guide

Drop your real photos into `public/images/` using the filenames below, then tell Claw
to wire them up (or edit the source files listed in the "Where" column yourself).

**File format:** JPG/WebP preferred. Keep the aspect ratio noted in "Crop".
**Tip:** If you don't have a photo for a slot yet, leave it — the site still shows
the current Unsplash image until the local file exists. (After wiring, we fall back
to Unsplash automatically.)

---

## Tier 1 — Homepage (most visible, do these first)

| File (put in `public/images/`) | Slot | Crop | Current source |
|---|---|---|---|
| `hero/victoria-falls.jpg` | Homepage hero tile | 3:4 | unsplash photo-1432405972618 |
| `hero/hwange.jpg` | Homepage hero tile | 3:4 | unsplash photo-1547471080 |
| `hero/zanzibar.jpg` | Homepage hero tile | 3:4 | unsplash photo-1507525428034 |
| `hero/cape-town.jpg` | Homepage hero tile | 3:4 | unsplash photo-1580060839134 |
| `hero/dubai.jpg` | Homepage hero tile | 3:4 | unsplash photo-1512453979798 |
| `hero/eastern-highlands.jpg` | Homepage hero tile | 3:4 | unsplash photo-1506905925346 |
| `cta-background.jpg` | CTA band bg (bottom of home) | 16:9 wide | unsplash photo-1502920917128 |
| `featured/vic-falls.jpg` | Featured Destinations bento | 4:3 / 3:4 | unsplash photo-1432405972618 |
| `featured/hwange.jpg` | Featured Destinations bento | 4:3 / 3:4 | unsplash photo-1547471080 |
| `featured/zanzibar.jpg` | Featured Destinations bento | 4:3 / 3:4 | unsplash photo-1507525428034 |
| `featured/cape-town.jpg` | Featured Destinations bento | 4:3 / 3:4 | unsplash photo-1580060839134 |
| `featured/dubai.jpg` | Featured Destinations bento | 4:3 / 3:4 | unsplash photo-1512453979798 |
| `why-us/safari.jpg` | Why Choose Us tall card | portrait | unsplash photo-1516426122078 |
| `why-us/beach.jpg` | Why Choose Us tall card | portrait | unsplash photo-1469854523086 |

**Where:** `src/components/home/HeroSection.tsx` (heroTiles), `CTASection.tsx` (ctaImage),
`FeaturedDestinations.tsx` (tileImages), `WhyChooseUs.tsx` (tallCards).

## Tier 2 — Identity & Blog

| File | Slot | Crop | Current source |
|---|---|---|---|
| `about/team.jpg` | About page story image | 4:3 | unsplash photo-1522202176988 |
| `blog/plane-window.jpg` | "Cheap flights from Harare" cover | 16:9 | unsplash photo-1436491865332 |
| `blog/victoria-falls.jpg` | "Victoria Falls first-timers" cover | 16:9 | unsplash photo-1432405972618 |
| `blog/visa.jpg` | "Visa guide Zimbabwe" cover | 16:9 | unsplash photo-1454165804606 |

**Where:** `src/app/about/page.tsx` (storyImage), `src/content/blog/*.md` (frontmatter `image:`).

## Tier 3 — Destinations & Packages (can stay Unsplash for now)

Destination heroes (12): `src/lib/destination-content.ts` (heroImage) →
`public/images/destinations/<slug>.jpg` (e.g. `victoria-falls.jpg`, `great-zimbabwe.jpg`,
`eastern-highlands.jpg`, `hwange-national-park.jpg`, `cape-town.jpg`, `okavango-delta.jpg`,
`zanzibar.jpg`, `johannesburg-kruger.jpg`, `dubai.jpg`, `london.jpg`, `bali.jpg`, `nairobi-maasai-mara.jpg`)

Package heroes (6): `src/lib/package-content.ts` (heroImage) →
`public/images/packages/<slug>.jpg` (`vic-falls-weekend`, `hwange-safari`,
`eastern-highlands-getaway`, `cape-town-explorer`, `zanzibar-beach`, `dubai-stopover`)

Each destination/package also has highlight cards + galleries (3–6 images each).
Only worth swapping for the destinations you actually market hardest.

## How the swap works

1. Drop files into `public/images/...` with the exact names above.
2. Say "wire up the photos" — Claw points the source files at `/images/...`
   (a 1-minute constant flip per slot).
3. `npm run build` + visual check, done.

> Note: `next/image` serves local files from `/public` automatically — no config
> change needed. Real photos also kill the Unsplash dependency for homepage LCP,
> which is the biggest speed win left on the site.
