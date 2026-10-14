# AtoZ Engraving Company — Marketing Website

Public, single-page marketing website. React + Vite + JavaScript, Tailwind CSS v4,
selective DaisyUI, GSAP (ScrollSmoother + ScrollTrigger), motion (text reveals),
Lucide icons. Static deployment target: Vercel.
Images: Cloudinary public delivery. **No backend, no database, no forms storing data.**

## Quick start

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

Copy `.env.example` to `.env` only when Cloudinary images exist. **Never** put a
Cloudinary API secret in any `VITE_` variable — `VITE_` values ship to the browser.

## Project layout

```
index.html              Meta tags, font, favicon link (static SEO defaults)
public/
  favicon.svg           Placeholder mark (replace with client logo when supplied)
  robots.txt            Allow-all; sitemap added after a domain exists
src/
  components/           Navbar, Footer, ButtonLink (magnetic CTAs), SectionHeading,
                        WordReveal (motion text reveals), SmoothScroll (GSAP),
                        Reveal (scroll reveals), ScrollProgress, Marquee,
                        ServiceCard, ProjectCard, Container, Seo (meta + JSON-LD)
  sections/             Hero, About, Services, Portfolio, WhyChooseUs, Contact
  data/                 ← ALL EDITABLE CONTENT LIVES HERE
    company.js          Identity, hero/about/process copy, contact details
    services.js         Confirmed service list
    projects.js         Gallery manifest (empty until real images)
  lib/
    contact.js          Builds tel:/wa.me/mailto:/map links — returns null
                        while a field is "pending"
    cloudinary.js       Safe delivery-URL builders (no secrets, no cropping)
    motion.js           prefers-reduced-motion + fine-pointer helpers
  App.jsx               Page composition (single page, anchor navigation)
  index.css             Design tokens: palette, typography, focus, motion rules
CONTENT-SIGNOFF.md      Approved/pending business facts (Phase 7 record)
```

## Editing content (the only files you need)

### Contact details — `src/data/company.js` → `contact`

Each field has `status: 'pending' | 'confirmed'`. A pending field never renders
a link — fill the value **and** set `status: 'confirmed'`:

```js
phone:    { status: 'confirmed', display: '+91 98300 00000', e164: '919830000000' },
whatsapp: { status: 'confirmed', display: '+91 98300 00000', e164: '919830000000' },
email:    { status: 'confirmed', address: 'info@example.com' },
hours:    { status: 'confirmed', days: 'Mon–Sat', time: '10:00–20:00', closedDays: 'Sunday' },
```

Then run `npm run lint && npm run build`. Phone/WhatsApp/email/hours — plus the
manager's separate call & WhatsApp cards (Sayan) — are **confirmed** (14 Oct 2026):
cards open the dialer, WhatsApp chat, and mail app directly, and a live mini map
in the contact section opens the location in Google Maps.

### Services — `src/data/services.js`

Client-approved list (4 services). Edit titles/descriptions; keep `status: 'confirmed'`.
Do not add machine types, tolerances, or turnaround times without client confirmation.

### Marketing copy — `src/data/company.js` → `hero`, `about`, `process`

Client-approved neutral copy. Edit text directly; keep `status: 'confirmed'`.

### Address — already confirmed

19H/H2 Harish Neogi Road, Muchi Bazar Clock Tower, Ultodanga, Kolkata 700067
(Variant B, confirmed 12 Oct 2026). Both the map link and JSON-LD read from this.

## Updating the project gallery

Images are **never** discovered live from the browser. The gallery reads a local
manifest in `src/data/projects.js`:

1. Upload photos to the Cloudinary folder `atoz-engraving/`
   (subfolders: `hero/`, `about/`, `services/`, `projects/`, `gallery/`, `branding/`).
2. Provide an asset list/export (delivery URLs or public IDs). The browser never
   lists Cloudinary folders and never holds an API secret.
3. Review every image (content, duplicates, quality). Add an entry to `projects`:

```js
{
  id: 'work-001',
  publicId: 'atoz-engraving/projects/work-001',   // or src: 'https://res.cloudinary.com/...'
  title: 'Reviewed title',                        // "Engraving Project" if unsure
  titleStatus: 'confirmed',                       // 'draft' while uncertain
  category: 'Projects',
  description: '',                                // optional, verified only
  alt: 'Meaningful description of what is visible',
  width: 1600,
  height: 1200,
}
```

4. For `publicId` entries: set `VITE_CLOUDINARY_CLOUD_NAME` in `.env` (public
   value) and set `projectsStatus: 'ready'`.
5. Run `npm run build`, open the gallery, check each card: crop, alt text, lazy
   loading, broken-image fallback. Remove `[DRAFT]`-style caution only after review.

Never publish stock photos as company work; never invent project or client names.

## Deployment — NOT YET DEPLOYED (paused by client decision)

No Vercel/GitHub account was connected and **zero credentials were saved**.
When you want to go live, use either path below. Nothing here requires a
password in chat — all authentication happens in your browser.

**Path A — Vercel dashboard (simplest):**
1. Push this folder to a GitHub repo (or use Vercel's CLI upload below).
2. At vercel.com → *Add New… → Project* → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist`. No environment variables needed for the current
   (image-less) site.
4. Deploy → you get a `*.vercel.app` URL. Add a custom domain under
   *Project → Settings → Domains* when ready (DNS changes are yours to approve).

**Path B — Vercel CLI from this machine:**
```bash
npx vercel login          # opens your browser to authenticate
npx vercel deploy --prod  # uploads and deploys; prints the live URL
```

Before going live, finish the pending items in `CONTENT-SIGNOFF.md`
(logo, real photos, domain, socials).

**SEO launch checklist** (after the domain is bought):
1. Set `site.canonicalUrl` in `src/data/company.js` → canonical, `og:url`,
   and absolute `og:image` (`/og-cover.png`) start emitting automatically.
2. Add `sitemap.xml` to `public/` (one-URL site: just the homepage) and
   uncomment the sitemap line in `public/robots.txt`.
3. Verify the domain in **Google Search Console** and submit the homepage URL.
4. Replace the placeholder `og-cover.png` / favicons with brand assets when
   the logo arrives (regenerate via the asset script or any 1200×630 design).
Brand searches ("atoz engraving kolkata" etc.) should index within days of
step 3; competitive non-brand keywords additionally need time + backlinks.

## Motion & smooth scroll

- **GSAP ScrollSmoother** gives the page momentum scrolling. The navbar,
  scroll-progress bar, and skip link live OUTSIDE `#smooth-wrapper`
  (ScrollSmoother requirement) — keep fixed/sticky UI out of `SmoothScroll`.
- Parallax uses `data-speed` attributes on layers (hero grid, nameplate).
  Never put `data-speed` on an element that already has its own transform
  animation — use a wrapper layer instead.
- **motion** (`WordReveal`) reveals section titles word-by-word from masks
  via IntersectionObserver — observe the mask, never the translated inner span.
- No CSS `scroll-behavior: smooth` — it fights ScrollSmoother (anchor jumps
  are eased by the smoother itself).
- Everything degrades under `prefers-reduced-motion`: smoother never created,
  text renders plain, marquee frozen, progress bar hidden.

## Security notes

- No backend, no customer data collection, no analytics/cookies.
- Secrets never belong in this repo: `.env` is git-ignored; only
  `.env.example` (placeholders) is committed. Cloudinary needs **no secret**
  for public delivery.
- Contact links are built from confirmed values only; unconfirmed data cannot
  render by design.

## Maintenance checklist

- [ ] After editing any `src/data/*` file: `npm run lint && npm run build`
- [ ] After adding images: verify every gallery card + alt text
- [ ] When a domain is confirmed: set canonical URL in `company.js` →
      `site.canonicalUrl`, add sitemap.xml, update `robots.txt`
- [ ] When a logo arrives: replace `public/favicon.svg` and fill `company.logo`
- [ ] Keep `CONTENT-SIGNOFF.md` updated when any fact changes
- [ ] Re-check contact links on a real phone after adding numbers

## Status

- Phases 1–7 complete: audit, design system, all sections, gallery pipeline,
  accessibility/SEO/interaction polish, QA (320–1440 px, zero overflow, zero
  console errors), client content sign-off (address/services/copy/language
  confirmed).
- Phase 8 (deployment): **halted by client — nothing deployed, no credentials saved.**
- Phase 9 (handover): this README + `CONTENT-SIGNOFF.md` are the handover.
