import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { contact } from '../data/company.js'
import {
  telHref,
  waHref,
  mailtoHref,
  mapHref,
  formatAddress,
  formatHours,
} from '../lib/contact.js'

/**
 * Contact section — direct links only (tel:, wa.me, mailto:, map).
 * No form: nothing is submitted to or stored by this site.
 * Fields still "pending" render a clearly marked placeholder, so no
 * unverified number, email, address, or map pin can appear.
 */

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  external,
  pendingLabel,
  confirmed = Boolean(href),
}) {
  const interactive = confirmed && Boolean(href)

  const body = (
    <>
      <span
        className={`inline-flex size-11 shrink-0 items-center justify-center rounded-md ${
          confirmed ? 'bg-navy text-gold' : 'bg-line text-muted'
        }`}
      >
        <Icon aria-hidden="true" size={22} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
        <span
          className={`mt-1 break-words text-base font-semibold ${confirmed ? 'text-navy' : 'text-muted'}`}
        >
          {confirmed ? value : pendingLabel}
        </span>
        {confirmed ? null : (
          <span className="mt-1 text-xs text-muted/80">Pending client confirmation</span>
        )}
      </span>
      {interactive ? (
        <ArrowRight
          aria-hidden="true"
          size={18}
          className="ml-auto mt-1 shrink-0 self-start text-gold-ink opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  )

  const className =
    'card-surface card-lift group flex items-start gap-4 p-5 min-h-11 w-full text-left'

  if (!confirmed) {
    return (
      <li aria-disabled="true" className="opacity-80">
        <div className={className}>{body}</div>
      </li>
    )
  }

  if (!interactive) {
    return (
      <li>
        <div className={className}>{body}</div>
      </li>
    )
  }

  return (
    <li>
      <a
        href={href}
        className={className}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {body}
      </a>
    </li>
  )
}

export default function Contact() {
  const tel = telHref()
  const wa = waHref()
  const mail = mailtoHref()
  const map = mapHref()
  const address = formatAddress()
  const hours = formatHours()

  return (
    <section id="contact" className="bg-surface py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          description="The quickest way to reach us is by phone or WhatsApp. There are no online forms — your message goes straight to us, and nothing is stored by this website."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={Phone}
            label="Phone"
            value={contact.phone.display}
            href={tel}
            pendingLabel="Phone number to be added"
          />
          <ContactCard
            icon={MessageCircle}
            label="WhatsApp"
            value={contact.whatsapp.display || 'Message us on WhatsApp'}
            href={wa}
            external
            pendingLabel="WhatsApp number to be added"
          />
          <ContactCard
            icon={Mail}
            label="Email"
            value={contact.email.address}
            href={mail}
            pendingLabel="Email address to be added"
          />
          <ContactCard
            icon={MapPin}
            label="Address & directions"
            value={address}
            href={map}
            external
            pendingLabel="Official address to be confirmed"
          />
          <ContactCard
            icon={Clock}
            label="Opening hours"
            value={hours}
            href={null}
            confirmed={Boolean(hours)}
            pendingLabel="Opening hours to be confirmed"
          />
        </ul>

        <p className="mt-6 text-sm text-muted">
          Call, WhatsApp, or email links open your phone’s or computer’s own app. Map directions
          open in Google Maps.
        </p>
      </Container>
    </section>
  )
}
