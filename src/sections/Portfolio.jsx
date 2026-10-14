import { Images } from 'lucide-react'
import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { projects } from '../data/projects.js'

/**
 * Our Work / gallery. Renders a graceful empty state while the
 * manifest is pending real, client-approved images (Phase 4).
 * Handles zero images by design — never fills gaps with stock art.
 */
export default function Portfolio() {
  const hasProjects = projects.length > 0

  return (
    <section id="work" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our work"
          title="Selected projects"
          description="A selection of engraving work. Every image is a genuine photograph of work carried out by the company."
        />

        {hasProjects ? (
          <Reveal as="ul" stagger={0.1} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard project={project} />
              </li>
            ))}
          </Reveal>
        ) : (
          <Reveal className="mt-10">
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-line bg-surface px-6 py-14 text-center">
              <Images aria-hidden="true" size={28} className="text-muted/70" />
              <p className="font-display text-lg font-bold text-navy">
                Project gallery is being prepared
              </p>
              <p className="max-w-md text-sm text-muted">
                Approved photographs of completed work will be published here. If you would like to
                see examples before then, get in touch and we will share them directly.
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
