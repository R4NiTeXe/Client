/**
 * Service list.
 *
 * STATUS: CONFIRMED — the client approved these four services in the
 * Phase 7 content sign-off (12 Oct 2026). Still do not add machine
 * types, tolerances, turnaround times, or industries served without
 * further client confirmation.
 *
 * `icon` maps to a Lucide icon name rendered by ServiceCard.
 */

export const servicesConfirmed = true

export const services = [
  {
    id: 'custom-engraving',
    status: 'confirmed',
    icon: 'PenTool',
    title: 'Custom Engraving',
    description:
      'Engraving tailored to your item and requirement. Tell us what you need, and we will confirm the details with you.',
    cta: null,
  },
  {
    id: 'personalised-gifts',
    status: 'confirmed',
    icon: 'Gift',
    title: 'Personalised Gifts & Items',
    description: 'Names, messages, and designs engraved on gifts and personal items.',
    cta: null,
  },
  {
    id: 'nameplates-signage',
    status: 'confirmed',
    icon: 'PanelTop',
    title: 'Nameplates & Signage',
    description: 'Engraved nameplates and signs for homes, offices, and businesses.',
    cta: null,
  },
  {
    id: 'business-orders',
    status: 'confirmed',
    icon: 'Building2',
    title: 'Business & Bulk Orders',
    description: 'Engraving for business requirements, discussed and quoted directly.',
    cta: null,
  },
]
