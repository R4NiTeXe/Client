import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { prefersReducedMotion } from '../lib/motion.js'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/**
 * GSAP ScrollSmoother — momentum-based smooth scrolling for the page.
 * The fixed/sticky UI (navbar, scroll progress, skip link) lives OUTSIDE
 * this wrapper, as required by ScrollSmoother. Under reduced motion the
 * wrapper stays plain and the page scrolls natively.
 */
export default function SmoothScroll({ children }) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.15,
      effects: true,
      smoothTouch: 0, // native touch scrolling on phones — no input lag
    })
    return () => smoother.kill(true)
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
