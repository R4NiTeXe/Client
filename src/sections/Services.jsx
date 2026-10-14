import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { services } from '../data/services.js'

export default function Services() {
  return (
    <section id="services" className="bg-surface py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Services"
          description="Engraving services tailored to your item and requirement. Confirm the current service list with us before ordering."
        />

        <Reveal as="ul" stagger={0.1} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
