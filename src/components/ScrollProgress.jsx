import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion.js'

/**
 * Thin gold reading-progress hairline pinned to the top of the viewport.
 * Pure scroll indicator — no hijacking, no lag. Hidden for reduced motion.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  if (prefersReducedMotion()) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gold"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
