import { company } from '../data/company.js'

/**
 * Brand mark shown beside the text wordmark (Navbar, Footer).
 * Renders nothing until the logo is confirmed in company.js —
 * pending fields are treated as "no data" per TRD §11.
 */
export default function Logo({ className = 'size-7' }) {
  if (company.logo.status !== 'confirmed' || !company.logo.src) return null
  return (
    <img
      src={company.logo.src}
      alt=""
      aria-hidden="true"
      width={28}
      height={28}
      className={`inline-block shrink-0 ${className}`}
    />
  )
}
