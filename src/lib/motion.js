/** True when the visitor asked the OS/browser to reduce motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** True on devices with a fine pointer (mouse) — skip hover/parallax effects on touch. */
export function hasFinePointer() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: fine)').matches
  )
}

/** Shared premium ease: fast start, long settled landing. */
export const EASE_SETTLE = 'power4.out'
