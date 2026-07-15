# ArcTravel — Full Project Plan

## Overview

**Business:** ArcTravel — full-service travel agency (Zimbabwe-based)
**Website stack:** Next.js + Tailwind CSS + shadcn/ui (custom build, no theme)
**Goal:** A clean, trustworthy, high-converting online presence that positions ArcTravel as a professional agency handling all travel needs

---

## Phase 0: Foundation (Week 1)

### Project Setup
- [ ] Init Next.js project with App Router, TypeScript, Tailwind
- [ ] Add shadcn/ui, Lucide icons
- [ ] Set up project structure (components, lib, app routes)
- [ ] Configure SEO basics (metadata, sitemap, robots.txt)
- [ ] Set up responsive design system (colors, fonts, spacing)

### Brand Assets
- [ ] Define colour palette + typography
- [ ] Create or decide on logo treatment
- [ ] Tone of voice guide (professional, warm, trustworthy)
- [ ] Favicon + social share images

### Domain & Hosting
- [ ] Register domain (arc-travel.co.zw or similar)
- [ ] Set up hosting (Vercel recommended for Next.js)
- [ ] Configure custom domain + SSL

---

## Phase 1: Website — Core Pages (Weeks 2-3)

### Page: Home
- Hero section with compelling tagline + background imagery
- Quick-service overview grid (top 6 services)
- Featured destinations or packages
- Trust badges (accreditations, partners, insurance)
- Testimonial carousel
- CTA: "Plan Your Trip" or "Get a Quote"

### Page: Services (Overview)
- All 13 services listed with icons and brief descriptions
- Each service links to its dedicated sub-page
- Category grouping (Transport, Accommodation, Tours, Support)

### Pages: Individual Service Pages (×13)
Flight Booking / Itinerary Curation
Hotel / Lodge / Resort Accommodations
Ground Transportation
Private Charter Flights
Airport Transfers
Guided Tours
Travel Insurance
Visa Assistance
Day Trip Packages
Group Tour Packages
Corporate Events
Cruise Bookings
Car Rentals

Each gets:
- Description of what ArcTravel offers in this area
- Why clients should trust ArcTravel for this service
- Related services cross-linking
- CTA to inquire/book

### Page: Destinations
- Destinations grid/cards (Zimbabwe, regional SADC, international)
- Each destination links to a page with highlights, packages available, gallery

### Page: About
- Story/mission
- Team (even if solo founder — positioning)
- Why choose ArcTravel
- Accreditations, partnerships

### Page: Contact
- Contact form
- Phone, email, physical address
- WhatsApp button (floating + page)
- Google Maps embed

---

## Phase 2: Website — Booking & Conversion (Week 4)

### Trip Inquiry / Booking Flow
- Multi-step inquiry form:
  1. Service selection (which service(s) needed?)
  2. Trip details (destination, dates, travellers)
  3. Preferences (budget range, accommodation type, extras)
  4. Contact info
  5. Confirm & submit
- Email notification to ArcTravel on submission
- Confirmation page + auto-reply to client
- Simple admin view (for now, email-based is fine)

### Booking Status Page
- Client can check status of their inquiry via reference number
- Simple: Submitted → In Review → Quote Sent → Confirmed

### Quote System (Phase 2 add-on)
- Admin tool to create & send quotes
- Client can accept/reject online
- Payment deposit link integration (later)

---

## Phase 3: Social Media & Digital Presence (Week 2 ongoing)

### Immediate (Week 1-2)
- [ ] **Google Business Profile** — claim + optimise (photos, services, hours, posts)
- [ ] **Instagram Business** — create profile, bio with link, starter 9-grid content
- [ ] **Facebook Page** — create + connect to Instagram
- [ ] **WhatsApp Business** — set up profile, quick replies, labels, catalogue
- [ ] **LinkedIn Page** — for corporate travel / b2b credibility

### Content Strategy

**Platforms (priority order):**
1. Instagram — visual-first, destination content, behind-the-scenes, client moments
2. Facebook — information-heavy, group packages, local community, reviews
3. LinkedIn — corporate travel, events, B2B credibility
4. TikTok (later) — short travel content, trending audio, destination reels

**Content pillars:**
| Pillar | Example content | Frequency |
|---|---|---|
| Destinations | Stunning photos/videos, "why visit X" | 2x/week |
| Services | Explain a service, how it works, pricing hints | 1x/week |
| Trust & Reviews | Client testimonials, success stories | 1x/week |
| Tips & Guides | Travel tips, visa info, packing guides | 1x/week |
| Behind the Scenes | Office, team, planning process | 1x/2 weeks |

**Posting cadence:** 4-5 posts/week on IG, 3/week on FB

**Starter content (first 9 posts to launch):**
1. Welcome post — "Introducing ArcTravel"
2. Destination highlight #1 (local — Vic Falls?)
3. Service highlight — Flight booking
4. Destination highlight #2 (regional)
5. Service highlight — Visa assistance
6. Client testimonial or "we helped someone"
7. Travel tip — "5 things to know before flying"
8. Service highlight — Corporate events
9. Call to action — "Plan your next trip with us"

### Google Business Profile
- Complete every field (services, attributes, description)
- Add high-quality photos (office, destinations, team)
- Collect reviews from first clients
- Post weekly (offers, tips, new destinations)

---

## Phase 4: Operations & Tools (Week 3-4)

### CRM / Lead Tracking
- **Immediate:** Google Sheets or Airtable for tracking inquiries
- **Better:** HubSpot CRM (free tier) or a lightweight alternative
- Track: lead source, service requested, status, quote sent, booked

### Booking Workflow
1. Inquiry comes in (website form / WhatsApp / phone)
2. Log in CRM
3. Send quote / proposal within 24hr
4. Follow up at day 3, day 7
5. On confirmation → send booking confirmation + payment instructions
6. Pre-trip checklist (visa, insurance, documents)
7. Post-trip follow-up (reviews, repeat business)

### Payment Setup
- EcoCash for local payments (leverage Shoopy integration)
- Bank transfer / USD cash
- Later: card payments, international transfers

### Client Communication Templates
- Welcome email after inquiry
- Quote delivery email
- Booking confirmation
- Pre-trip reminder (7 days before)
- Post-trip thank-you + review request
- WhatsApp quick replies for common questions

---

## Phase 5: Growth & SEO (Ongoing after launch)

### Blog/Content
- Destination guides (build SEO over time)
- Travel tips articles
- "How to get a visa for X" practical guides
- Corporate travel tips

### SEO Foundation
- Proper meta titles/descriptions for every page
- Schema markup (LocalBusiness + TravelAgency)
- Image alt tags + optimisation
- Sitemap submission to Google Search Console
- Page speed (Next.js handles this well)

### Paid Ads (Later)
- Facebook/Instagram ads for local audience
- Google Search Ads for "travel agency Harare" keywords
- Retargeting for people who visited the site

---

## Timeline Summary

| Phase | What | Duration | Dependencies |
|---|---|---|---|
| 0 | Foundation (setup, brand, hosting) | Week 1 | None |
| 1 | Core website pages | Weeks 2-3 | Phase 0 |
| 3 | Social profiles + content | Week 2 (ongoing) | Brand assets |
| 2 | Booking/inquiry flow | Week 4 | Phase 1 |
| 4 | Operations setup | Weeks 3-4 | None |
| 5 | SEO + growth | After launch | Phases 1-2 |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Icons | Lucide |
| Forms | React Hook Form + Zod |
| Email | Resend or Nodemailer |
| Analytics | Umami or Plausible (privacy-first) |
| Hosting | Vercel |
| Domain | .co.zw or .com |

---

## Future Considerations (Post-MVP)

- Real-time flight API integration (Amadeus, etc.)
- Online payment gateway (card + EcoCash)
- Multi-language support
- Admin dashboard with booking management
- Client portal (view bookings, documents)
- Travel itinerary PDF generation
- Package builder tool (dynamic pricing)
- Tour calendar with booking availability
