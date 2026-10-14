import { ArrowUp } from 'lucide-react'
import Container from './Container.jsx'
import { company, contact } from '../data/company.js'
import { telHref, waHref, mailtoHref, mapHref, formatAddress } from '../lib/contact.js'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Our Work' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const tel = telHref()
  const wa = waHref()
  const mail = mailtoHref()
  const map = mapHref()
  const address = formatAddress()

  return (
    <footer className="relative bg-deep py-10 text-white/70">
      <div aria-hidden="true" className="hairline-engraved absolute inset-x-0 top-0 h-px" />
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="wordmark text-lg text-white">
              AtoZ <span className="text-gold">Engraving</span>
            </span>
            <p className="max-w-xs text-sm text-white/60">{company.shortName} — engraving services.</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Only confirmed contact details are ever rendered. */}
          {tel || wa || mail || map ? (
            <ul className="flex flex-col gap-1 text-sm">
              {tel ? (
                <li>
                  <a href={tel} className="transition-colors hover:text-gold">
                    {contact.phone.display}
                  </a>
                </li>
              ) : null}
              {wa ? (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-gold"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
              {mail ? (
                <li>
                  <a href={mail} className="transition-colors hover:text-gold">
                    {contact.email.address}
                  </a>
                </li>
              ) : null}
              {map ? (
                <li>
                  <a
                    href={map}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-gold"
                  >
                    {address}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-gold"
          >
            <ArrowUp aria-hidden="true" size={14} />
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  )
}
