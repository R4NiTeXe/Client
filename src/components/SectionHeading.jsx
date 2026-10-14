import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, EASE_SETTLE } from '../lib/motion.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * Shared section header: eyebrow label + title + optional lead text.
 * `tone` switches colour for dark sections; alignment is opt-in.
 *
 * Animation: a single subtle fade-up per heading (once per page load),
 * skipped when the visitor prefers reduced motion. gsap.from keeps the
 * heading visible if animation never runs.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className = '',
}) {
  const isDark = tone === 'dark'
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current, {
        y: 24,
        autoAlpha: 0,
        duration: 0.85,
        ease: EASE_SETTLE,
        clearProps: 'all',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 90%',
          once: true,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <span className={`eyebrow ${isDark ? 'text-gold' : ''}`}>{eyebrow}</span>
      ) : null}
      <Tag className={isDark ? 'heading-section text-white' : 'heading-section'}>{title}</Tag>
      {description ? (
        <p className={`max-w-2xl text-lead ${isDark ? 'text-white/75' : ''}`}>{description}</p>
      ) : null}
    </div>
  )
}
