/**
 * Cloudinary delivery helpers.
 *
 * Uses only the PUBLIC cloud name (VITE_CLOUDINARY_CLOUD_NAME) and
 * public IDs — delivery URLs require no secret. Never add a
 * VITE_-prefixed Cloudinary API secret; VITE_ values are shipped to
 * the browser.
 *
 * Transformations are intentionally non-destructive: width resize +
 * automatic format/quality only. No crop is applied, so important
 * parts of a product cannot be cut off.
 */

const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '').trim()

export const cloudinaryConfigured = cloudName.length > 0

const clampWidth = (width) => Math.max(1, Math.min(4000, Math.round(Number(width) || 0)))

/**
 * Build a responsive delivery URL for a Cloudinary public ID.
 * Returns null when the cloud name is not configured or input is empty,
 * so callers can render their own fallback.
 */
export function cldUrl(publicId, { width } = {}) {
  if (!cloudName || !publicId) return null
  const id = String(publicId).replace(/^\/+/, '')
  const transforms = ['f_auto', 'q_auto']
  const w = clampWidth(width)
  if (w) transforms.unshift(`w_${w}`)
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(',')}/${id}`
}

/**
 * srcSet string for a public ID across a list of widths, e.g.
 * srcSet={cldSrcSet(project.publicId, [480, 768, 1200])}
 */
export function cldSrcSet(publicId, widths = []) {
  const entries = widths
    .map((w) => cldUrl(publicId, { width: w }))
    .filter(Boolean)
    .map((url, i) => `${url} ${widths[i]}w`)
  return entries.length ? entries.join(', ') : null
}

/**
 * Normalise a manifest entry to a delivery URL.
 * Accepts either a full `src` URL or a Cloudinary `publicId`.
 */
export function imageUrl(entry, width) {
  if (!entry) return null
  if (entry.src) return entry.src
  if (entry.publicId) return cldUrl(entry.publicId, { width })
  return null
}

export function imageSrcSet(entry, widths = [480, 768, 1200, 1600]) {
  if (!entry) return null
  if (entry.src) return null
  if (entry.publicId) return cldSrcSet(entry.publicId, widths)
  return null
}
