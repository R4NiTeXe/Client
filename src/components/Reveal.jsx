import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, EASE_SETTLE } from '../lib/motion.js'

gsap.registerPlugin(ScrollTrigger)

const VARIANTS = {
  up: { y: 28 },
  left: { x: -32 },
  right: { x: 32 },
  scale: { scale: 0.94 },
}

/**
 * Scroll-triggered reveal wrapper — the site's single animation primitive.
 * Plays once per page load; gsap.from keeps content visible if JS fails;
 * skipped entirely under prefers-reduced-motion.
 *
 * - `stagger > 0` animates direct children in sequence (use on <ul>/<ol>).
 * - `variant`: up | left | right | scale.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  variant = 'up',
  delay = 0,
  duration = 0.85,
  stagger = 0,
  className = '',
  ...rest
}) {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      const fromVars = { autoAlpha: 0, ...VARIANTS[variant] }
      const common = {
        delay,
        duration,
        ease: EASE_SETTLE,
        clearProps: 'all',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 88%',
          once: true,
        },
      }
      if (stagger > 0) {
        gsap.from(rootRef.current.children, { ...fromVars, stagger, ...common })
      } else {
        gsap.from(rootRef.current, { ...fromVars, ...common })
      }
    }, rootRef)
    return () => ctx.revert()
  }, [variant, delay, duration, stagger])

  return (
    <Tag ref={rootRef} className={className} {...rest}>
      {children}
    </Tag>
  )
}
