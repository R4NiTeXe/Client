import { ArrowRight, Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { contact } from '../data/company.js'
import {
  telHref,
  waHref,
  mailtoHref,
  mapHref,
  managerTelHref,
  managerWaHref,
  formatAddress,
  formatHours,
} from '../lib/contact.js'

/**
 * Contact section — direct links only (tel:, wa.me, mailto:, map).
 * No form: nothing is submitted to or stored by this site.
 * Fields still "pending" render a clearly marked placeholder, so no
 * unverified number, email, address, or map pin can appear.
 */

// Soft break opportunity after "@" so long email addresses wrap cleanly
// instead of being cut mid-word by break-words.
function withSoftBreak(value) {
  const text = String(value)
  const at = text.indexOf('@')
  if (at === -1) return text
  return (
    <>
      {text.slice(0, at + 1)}
      <wbr />
      {text.slice(at + 1)}
    </>
  )
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  external,
  pendingLabel,
  note,
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
          {confirmed ? withSoftBreak(value) : pendingLabel}
        </span>
        {confirmed ? (
          note ? <span className="mt-1 text-xs text-muted/80">{note}</span> : null
        ) : (
          <span className="mt-1 text-xs text-muted/80">Pending client confirmation</span>
        )}
      </span>
      {interactive ? (
        <ArrowRight
          aria-hidden="true"
          size={18}
          className="absolute right-4 top-4 text-gold-ink opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  )

  const className =
    'card-surface card-lift group relative flex h-full items-start gap-4 p-5 min-h-11 w-full text-left'

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
  const managerTel = managerTelHref()
  const managerWa = managerWaHref()
  const address = formatAddress()
  const hours = formatHours()

  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-surface py-16 sm:scroll-mt-[4.5rem] sm:py-20 lg:py-24"
    >
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
            icon={Phone}
            label="Manager — call"
            value={contact.manager?.phone?.display}
            href={managerTel}
            pendingLabel="Manager number to be added"
            note={
              contact.manager?.name
                ? `${contact.manager.name} · ${contact.manager.role}`
                : contact.manager?.role
            }
          />
          <ContactCard
            icon={MessageCircle}
            label="Manager — WhatsApp"
            value={contact.manager?.whatsapp?.display}
            href={managerWa}
            external
            pendingLabel="Manager number to be added"
            note={
              contact.manager?.name
                ? `${contact.manager.name} · ${contact.manager.role}`
                : contact.manager?.role
            }
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

        {/* Live mini map — keyless Google Maps embed of the confirmed address.
            The iframe is click-through, so the whole map opens Google Maps. */}
        {map ? (
          <figure className="card-surface card-lift mt-8 overflow-hidden">
            <a
              href={map}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative block"
              aria-label="Open AtoZ Engraving Company in Google Maps"
            >
              <iframe
                title="Map showing AtoZ Engraving Company — Muchi Bazar Clock Tower, Ultodanga, Kolkata"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  contact.address.mapQuery,
                )}&z=15&output=embed`}
                className="pointer-events-none block h-64 w-full border-0 sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full bg-navy/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <MapPin aria-hidden="true" size={13} className="shrink-0 text-gold" />
                <span className="truncate">Muchi Bazar Clock Tower, Ultodanga</span>
              </span>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-bold text-ink shadow-[0_10px_24px_-10px_rgba(11,18,32,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
                Open in Google Maps
                <ExternalLink aria-hidden="true" size={14} />
              </span>
            </a>
          </figure>
        ) : null}
      </Container>
    </section>
  )
}
