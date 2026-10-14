import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { company } from '../data/company.js'

/**
 * Designed placeholder standing in for real workshop photography.
 * A brass-plate mock (pure CSS/SVG decoration) — honest, on-theme,
 * and explicitly captioned. Never presented as a real product photo.
 */
function NameplatePlaceholder() {
  return (
    <figure className="card-surface relative overflow-hidden p-8 sm:p-10" data-speed="1.05">
      {/* Corner screws */}
      <span aria-hidden="true" className="absolute left-3 top-3 size-1.5 rounded-full bg-line" />
      <span aria-hidden="true" className="absolute right-3 top-3 size-1.5 rounded-full bg-line" />
      <span aria-hidden="true" className="absolute bottom-3 left-3 size-1.5 rounded-full bg-line" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 size-1.5 rounded-full bg-line" />

      <div
        aria-hidden="true"
        className="relative mx-auto flex max-w-xs flex-col items-center gap-4 rounded-md border border-gold-deep/60 bg-gradient-to-b from-navy-soft to-navy px-8 py-10 shadow-[inset_0_1px_0_rgba(244,179,35,0.25)]"
      >
        <span className="font-display text-xl font-extrabold tracking-tight text-white">
          AtoZ <span className="text-gold">Engraving</span>
        </span>
        <span className="h-px w-14 bg-gold/50" />
        <span className="h-px w-20 bg-white/15" />
        <span className="h-px w-16 bg-white/15" />
      </div>

      <figcaption className="mt-6 text-center text-xs text-muted">
        Nameplate mock-up — workshop photography will replace this once approved images are
        available.
      </figcaption>
    </figure>
  )
}

export default function About() {
  const about = company.about

  // overflow-hidden clips the pre-reveal x-offset so it never widens the page
  return (
    <section
      id="about"
      className="scroll-mt-16 overflow-hidden bg-white py-16 sm:scroll-mt-[4.5rem] sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="About us" title={about.heading} />
            <Reveal delay={0.15} className="mt-6 max-w-2xl">
              <p className="text-lead">{about.body}</p>
            </Reveal>
          </div>

          <Reveal variant="right" className="lg:col-span-5">
            <NameplatePlaceholder />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
