import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion, hasFinePointer, EASE_SETTLE } from '../lib/motion.js'

const VARIANTS = {
  // Primary CTA — gold on navy/dark sections and light sections alike.
  primary:
    'bg-gold text-ink font-semibold hover:bg-gold-deep active:bg-gold-deep border border-transparent',
  // Solid navy — for use on white/light surfaces.
  navy: 'bg-navy text-white font-semibold hover:bg-deep border border-transparent',
  // Outline for dark backgrounds (hero, footer).
  outlineLight:
    'bg-transparent text-white font-semibold border border-white/30 hover:border-white/60 hover:bg-white/10',
  // Outline for light backgrounds.
  outlineDark:
    'bg-transparent text-navy font-semibold border border-navy/30 hover:border-navy hover:bg-navy hover:text-white',
}

const SIZES = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-12 px-6 text-sm sm:text-base',
}

/**
 * Anchor styled as the site's standard CTA button.
 * Uses a real <a> because every CTA on this site is a direct action
 * (tel:, wa.me, mailto:, map, or in-page anchor) — no fake forms.
 *
 * `magnetic`: desktop-only nudge toward the cursor (fine pointer,
 * reduced-motion off). Purely decorative — the link works unchanged.
 */
export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external = false,
  icon: Icon = null,
  magnetic = false,
  className = '',
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !magnetic || prefersReducedMotion() || !hasFinePointer()) return undefined
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: EASE_SETTLE })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: EASE_SETTLE })
    const strength = 0.22
    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength)
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [magnetic])

  if (!href) return null

  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-md text-center',
    'transition-colors duration-200',
    SIZES[size] ?? SIZES.md,
    VARIANTS[variant] ?? VARIANTS.primary,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      ref={ref}
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...rest}
    >
      {Icon ? <Icon aria-hidden="true" size={18} strokeWidth={2.25} className="shrink-0" /> : null}
      <span>{children}</span>
    </a>
  )
}
