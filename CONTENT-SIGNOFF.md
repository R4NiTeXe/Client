# Content Sign-Off — AtoZ Engraving Company Website

Phase 7 deliverable. Every item below must be confirmed by the client before
production deployment (Phase 8). **Nothing is invented** — unconfirmed fields
stay marked `pending` in `src/data/company.js`, where their contact links
return `null` and cannot reach the page.

Reply with the values (or say "keep pending") for each item, or paste this
sheet back filled in.

---

## 1. LAUNCH BLOCKER — Official address ✅ RESOLVED

- [x] **Variant B (CONFIRMED by client, 12 Oct 2026):**
      19H/H2 Harish Neogi Road, Muchi Bazar Clock Tower, Ultodanga,
      Kolkata **700067**
- Variant A (Kath Gola 700150) rejected — not used anywhere.

Confirmed address is live in `src/data/company.js` (with map link).

## 2. Contact details (all currently `pending`)

| Item | Status | Value needed |
|---|---|---|
| Phone number | ⬜ pending (client chose to keep pending) | With country code, e.g. `+91 98300 00000` |
| WhatsApp number | ⬜ pending (client chose to keep pending) | With country code, digits only — may match phone |
| Business email | ⬜ pending (client chose to keep pending) | e.g. `info@example.com` |
| Opening hours | ⬜ pending | Days + hours, e.g. `Mon–Sat: 10:00–20:00` |

## 3. Identity

| Item | Status | Notes |
|---|---|---|
| Official company name | ⬜ to confirm | Site currently uses "AtoZ Engraving Company" |
| Logo | ⬜ pending | SVG or transparent PNG; a text wordmark is used until supplied |

## 4. Content approval ✅ RESOLVED (12 Oct 2026)

| Item | Location | Outcome |
|---|---|---|
| Hero headline/subtext | `company.js` → `hero` | ✅ approved — now `confirmed` |
| About paragraph | `company.js` → `about` | ✅ approved — `[DRAFT]` marker removed |
| "How we work" steps | `company.js` → `process` | ✅ approved — now `confirmed` |
| Service list (4 services) | `services.js` | ✅ approved — `servicesConfirmed = true`, markers removed |

## 5. Images and rights

- [ ] Photos uploaded to Cloudinary folder (expected `atoz-engraving/`)
- [ ] Asset list/export provided (URLs or public IDs) for the gallery manifest
- [ ] Written confirmation that AtoZ Engraving owns/has permission to publish
      every supplied photograph
- [ ] Cloudinary cloud name (public value) for `.env`

## 6. Launch configuration

| Item | Status | Notes |
|---|---|---|
| Language(s) | ✅ English only (confirmed 12 Oct 2026) | No language switcher — nothing incomplete is shown |
| Social media links | none supplied | Provide URLs or confirm "none" at any time |
| Domain name | pending | Needed for canonical URL, sitemap, OG URL |
| Deployment account | pending | Vercel (and GitHub) via official login — no passwords in chat |

---

## Sign-off

Deployment to production happens only after:

1. All ⬜ items above are confirmed or explicitly accepted as pending,
2. The address blocker is resolved,
3. The client explicitly approves going live.

Client approval (date / name): _______________
