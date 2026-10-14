/**
 * Project / gallery manifest.
 *
 * STATUS: PENDING REAL ASSETS (Phase 4).
 * `projects` stays empty until real, client-approved images are
 * reviewed and added. The portfolio section must render a graceful
 * empty state — never fill this array with stock photos or invented
 * project/client names.
 *
 * Expected entry shape once populated:
 *   {
 *     id: 'stable-unique-id',
 *     src: 'https://res.cloudinary.com/<cloud>/image/upload/...' | '',
 *     publicId: 'atoz-engraving/projects/example', // alternative to src
 *     title: 'Reviewed draft title',
 *     titleStatus: 'confirmed' | 'draft',
 *     category: 'Projects' | 'Gallery' | ...,
 *     description: '',            // optional, verified only
 *     alt: 'Meaningful description of the image',
 *     width: 1600,                // intrinsic size, reduces layout shift
 *     height: 1200,
 *   }
 *
 * How to add images (full steps also in README):
 *  1. Client uploads photos to Cloudinary folder `atoz-engraving/`.
 *  2. Client shares an asset list/export (URLs or public IDs) — the
 *     browser never lists folders and never holds an API secret.
 *  3. Review each image; add an entry above with a reviewed title and
 *     meaningful alt text. Flag uncertain titles with titleStatus:
 *     'draft'; use the neutral title "Engraving Project" if unsure.
 *  4. Set VITE_CLOUDINARY_CLOUD_NAME in .env (public value) if using
 *     publicId entries, then run `npm run build` and verify every card.
 */

// Cloudinary folder confirmed in the brief; confirm again in Phase 4.
export const cloudinaryFolder = 'atoz-engraving'

export const projectsStatus = 'pending-assets' // pending-assets | ready

export const projects = []
