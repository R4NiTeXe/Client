import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ButtonLink from '../components/ButtonLink.jsx'
import Reveal from '../components/Reveal.jsx'
import { company } from '../data/company.js'

/**
 * "Why Choose Us" — process and communication only.
 * No differentiators are shown as facts (none are approved yet);
 * company.differentiators can override this when the client confirms.
 *
 * Desktop layout is a connected timeline (hairline rail through the
 * numbered nodes); stacks vertically on small screens.
 */
export default function WhyChooseUs() {
  const { process, differentiators } = company
  const items = differentiators.length
    ? differentiators
    : process.steps.map((step, index) => ({
        id: step.id,
        title: step.title,
        body: step.body,
        number: index + 1,
      }))

  return (
    <section id="why-us" className="bg-navy py-16 text-white sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Why choose us"
          title={process.heading}
          description={process.description}
          tone="dark"
        />

        <div className="relative">
          {/* Timeline rail — sits behind the numbered nodes on sm+ */}
          <span
            aria-hidden="true"
            className="absolute left-5 right-5 top-5 hidden h-px bg-gradient-to-r from-gold/50 via-gold/25 to-transparent sm:block"
          />

          <Reveal as="ol" stagger={0.12} className="relative mt-10 grid gap-8 sm:grid-cols-3">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col items-start">
                {item.number ? (
                  <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full bg-gold font-display text-sm font-extrabold text-ink ring-8 ring-navy">
                    {item.number}
                  </span>
                ) : null}
                <h3 className="mt-5 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>

        <div className="mt-10">
          <ButtonLink href="#contact">Talk to us directly</ButtonLink>
        </div>
      </Container>
    </section>
  )
}
