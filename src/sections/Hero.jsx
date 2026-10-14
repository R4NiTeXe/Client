import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, Phone } from 'lucide-react'
import gsap from 'gsap'
import Container from '../components/Container.jsx'
import ButtonLink from '../components/ButtonLink.jsx'
import { company } from '../data/company.js'
import { telHref } from '../lib/contact.js'
import { prefersReducedMotion, hasFinePointer, EASE_SETTLE } from '../lib/motion.js'

const GRID_BACKGROUND = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
  backgroundSize: '56px 56px',
}

export default function Hero() {
  const hero = company.hero
  const rootRef = useRef(null)
  const gridRef = useRef(null)
  // Direct contact action. Falls back to the contact section while the
  // phone number is still pending — never a fake form.
  const callHref = telHref() ?? '#contact'

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      // "Engraver pass": a tool-head dot travels the top hairline once,
      // leaving the finished line behind it. One pass, then it retires.
      const tl = gsap.timeline({ defaults: { ease: EASE_SETTLE } })
      tl.fromTo(
        '[data-hero-line]',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.05, ease: 'power2.inOut' },
        0,
      )
        .fromTo(
          '[data-hero-dot]',
          { left: '0%', autoAlpha: 1 },
          { left: '100%', duration: 1.05, ease: 'power2.inOut' },
          0,
        )
        .to('[data-hero-dot]', { autoAlpha: 0, duration: 0.3 }, 0.95)
        .from('[data-hero-tick]', { scaleX: 0, duration: 0.55, transformOrigin: 'left center' }, 0.3)
        .from('[data-hero-heading]', { yPercent: 112, duration: 1.1, ease: EASE_SETTLE }, 0.35)
        .from(
          '[data-hero-item]',
          { y: 22, autoAlpha: 0, duration: 0.75, stagger: 0.09, clearProps: 'all' },
          0.65,
        )
    }, rootRef)

    // Subtle grid drift toward the cursor (desktop only). Max 14px —
    // felt, not seen. Skipped on touch and reduced-motion.
    const root = rootRef.current
    let quickX = null
    let quickY = null
    const onMove = (event) => {
      if (!quickX || !quickY || !gridRef.current) return
      const rect = root.getBoundingClientRect()
      quickX(((event.clientX - rect.left) / rect.width - 0.5) * 28)
      quickY(((event.clientY - rect.top) / rect.height - 0.5) * 20)
    }
    const onLeave = () => {
      quickX?.(0)
      quickY?.(0)
    }
    const fine = hasFinePointer()
    if (fine && gridRef.current) {
      quickX = gsap.quickTo(gridRef.current, 'x', { duration: 1.2, ease: 'power3.out' })
      quickY = gsap.quickTo(gridRef.current, 'y', { duration: 1.2, ease: 'power3.out' })
      root.addEventListener('pointermove', onMove)
      root.addEventListener('pointerleave', onLeave)
    }

    return () => {
      if (fine && root) {
        root.removeEventListener('pointermove', onMove)
        root.removeEventListener('pointerleave', onLeave)
      }
      ctx.revert()
    }
  }, [])

  return (
    <section ref={rootRef} id="home" className="relative overflow-hidden bg-navy text-white">
      <div
        ref={gridRef}
        aria-hidden="true"
        className="absolute inset-[-2rem]"
        style={GRID_BACKGROUND}
      />

      {/* Engraver pass — top hairline */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/10">
        <div data-hero-line className="hairline-engraved absolute inset-0 origin-left" />
        <div
          data-hero-dot
          className="absolute -top-[3px] size-[7px] -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_2px_rgba(244,179,35,0.45)]"
        />
      </div>

      <Container className="relative flex flex-col items-start gap-6 py-20 sm:py-24 lg:py-32">
        <span className="eyebrow flex items-center gap-3 text-gold" data-hero-item>
          <span data-hero-tick aria-hidden="true" className="inline-block h-px w-8 bg-gold" />
          {hero.eyebrow}
        </span>

        {/* Masked line reveal — descender-safe via vertical padding */}
        <div className="max-w-3xl overflow-hidden py-1.5">
          <h1 className="heading-display text-white" data-hero-heading>
            {hero.heading}
          </h1>
        </div>

        <p className="max-w-2xl text-lead text-white/75" data-hero-item>
          {hero.subheading}
        </p>

        <div className="mt-2 flex flex-wrap gap-3" data-hero-item>
          <ButtonLink href={callHref} icon={telHref() ? Phone : ArrowRight} magnetic>
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink href="#work" variant="outlineLight" magnetic>
            {hero.secondaryCta}
          </ButtonLink>
        </div>

        <p className="mt-2 text-sm text-white/60" data-hero-item>
          Call, WhatsApp, or email — you will reach us directly. Details are in the contact
          section.
        </p>
      </Container>

      {/* Soft depth into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/20"
      />
    </section>
  )
}
