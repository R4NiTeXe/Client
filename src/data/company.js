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
  // Draft SEO copy — final wording confirmed in Phase 7.
  title: 'AtoZ Engraving Company — Engraving Services',
  description:
    'AtoZ Engraving Company — engraving services, selected work, and direct contact. Call, WhatsApp, or email us.',
  themeColor: '#101B2D',
  // Set once the final domain is confirmed (Phase 7/8). Leave empty
  // until then so no incorrect canonical URL is published.
  canonicalUrl: '',
}

export const company = {
  name: 'AtoZ Engraving Company',
  shortName: 'AtoZ Engraving',
  // Text wordmark until a client logo is supplied.
  logo: {
    status: 'pending', // confirmed | pending
    src: '',
    alt: '',
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
    status: 'pending', // confirmed | pending
    display: '', // e.g. "+91 98300 00000" (shown to visitors)
    e164: '', // digits only, with country code, for tel:
  },
  whatsapp: {
    status: 'pending', // confirmed | pending
    display: '',
    e164: '', // digits only for https://wa.me/<number>
    greeting: '', // optional prefilled message
  },
  email: {
    status: 'pending', // confirmed | pending
    address: '',
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
    status: 'pending', // confirmed | pending
    days: '',
    time: '',
  },
  socials: [
    // { platform: 'facebook', url: 'https://...' } — only when supplied.
  ],
}
