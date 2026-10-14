/**
 * Single source of truth for business facts.
 *
 * RULES
 * - Only publish values confirmed by the client (see TRD §11).
 * - Every unconfirmed field keeps status: "pending". Components must
 *   treat pending fields as "no data" and never invent fallbacks.
 * - Do NOT paste guessed phone numbers, emails, hours, or addresses
 *   here. Fill them in during Phase 7 (client content sign-off).
 *
 * ADDRESS — RESOLVED (Phase 7 client sign-off):
 *   Client confirmed Variant B on 12 Oct 2026:
 *   19H/H2 Harish Neogi Road, Muchi Bazar Clock Tower, Ultodanga,
 *   Kolkata 700067. Variant A (Kath Gola 700150) is NOT used.
 */

export const site = {
  // SEO copy — keyword-rich, honest (only approved services + confirmed city).
  // Keep in sync with the static tags in index.html.
  title: 'AtoZ Engraving Company — Engraving Services in Kolkata',
  description:
    'Custom engraving, personalised gifts, nameplates & signage, and bulk orders in Kolkata. Call or WhatsApp AtoZ Engraving — every detail confirmed directly with you.',
  themeColor: '#101B2D',
  // Set once the final domain is confirmed (Phase 7/8). Leave empty
  // until then so no incorrect canonical URL is published. When set,
  // Seo.jsx injects canonical, og:url, and absolute og:image tags.
  canonicalUrl: '',
}

export const company = {
  name: 'AtoZ Engraving Company',
  shortName: 'AtoZ Engraving',
  // Brand mark — engraved groove + diamond stylus tip (navy #101B2D /
  // gold #F4B323, matches design tokens). Designed in-house, approved
  // 14 Oct 2026. Full lockup = logo-mark.svg + text wordmark.
  logo: {
    status: 'confirmed', // confirmed | pending
    src: '/logo-mark.svg',
    alt: 'AtoZ Engraving engraved-line mark',
  },
  // Draft hero copy — neutral, no unverified claims (machine types,
  // tolerances, turnaround times, and industries served are banned).
  hero: {
    status: 'confirmed', // approved in Phase 7 sign-off
    eyebrow: 'Engraving Services',
    heading: 'Engraving services for personal, business, and gift requirements',
    subheading:
      'Tell us what you need engraved. We confirm the details with you directly — by phone, WhatsApp, or email — and take it from there.',
    primaryCta: 'Request a Quote',
    secondaryCta: 'View Our Work',
  },
  // Neutral, editable draft — flagged for client approval, not an
  // approved company history. Replace in Phase 7.
  about: {
    status: 'confirmed', // approved in Phase 7 sign-off
    heading: 'Precision engraving, handled with care',
    body: 'AtoZ Engraving Company provides engraving services for personal, business, and gift requirements. Share what you need engraved, and we will confirm the details with you directly.',
  },
  // Approved differentiators only. Empty until the client supplies
  // them — the Why Choose Us section falls back to process-oriented
  // copy rather than unsupported claims.
  differentiators: [],

  // Process-oriented copy used by the "Why Choose Us" section.
  // No differentiators are shown as facts — only the way of working.
  // DRAFT: pending client approval (Phase 7).
  process: {
    status: 'confirmed', // approved in Phase 7 sign-off
    heading: 'A straightforward way to get engraving done',
    description:
      'No online forms and no accounts — you talk to us directly at every step.',
    steps: [
      {
        id: 'get-in-touch',
        title: 'Get in touch',
        body: 'Call, send a WhatsApp message, or email us to start the conversation.',
      },
      {
        id: 'share-requirement',
        title: 'Share your requirement',
        body: 'Tell us the item, the text or design you want engraved, and how many you need.',
      },
      {
        id: 'confirm-details',
        title: 'Confirm the details',
        body: 'We go through the details with you and agree on the work before it starts.',
      },
    ],
  },
  languages: ['en'],
}

export const contact = {
  phone: {
    status: 'confirmed', // confirmed by client 14 Oct 2026
    display: '+91 80172 66401', // shown to visitors
    e164: '918017266401', // digits with country code, for tel:
  },
  whatsapp: {
    status: 'confirmed', // confirmed by client 14 Oct 2026
    display: '+91 80172 66401',
    e164: '918017266401', // digits for https://wa.me/<number>
    greeting: '', // optional prefilled message
  },
  email: {
    status: 'confirmed', // confirmed by client 14 Oct 2026
    address: 'tarunmaityatoz@gmail.com',
  },
  manager: {
    status: 'confirmed', // confirmed by client 14 Oct 2026
    name: 'Sayan',
    role: 'Manager',
    phone: { display: '+91 87687 49369', e164: '918768749369' },
    whatsapp: { display: '+91 87687 49369', e164: '918768749369' },
  },
  address: {
    status: 'confirmed', // confirmed by client 12 Oct 2026 — Variant B
    line1: '19H/H2 Harish Neogi Road',
    line2: 'Muchi Bazar Clock Tower',
    locality: 'Ultodanga',
    city: 'Kolkata',
    state: 'West Bengal',
    pin: '700067',
    // Used for map links — confirmed address only.
    mapQuery:
      '19H/H2 Harish Neogi Road, Muchi Bazar Clock Tower, Ultodanga, Kolkata 700067',
  },
  hours: {
    status: 'confirmed', // confirmed by client 14 Oct 2026
    days: 'Monday – Saturday',
    time: '10:00 AM – 08:00 PM',
    closedDays: 'Sunday',
    // Machine-readable hours for schema.org — keep in sync with days/time.
    spec: {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
  },
  socials: [
    // { platform: 'facebook', url: 'https://...' } — only when supplied.
  ],
}
