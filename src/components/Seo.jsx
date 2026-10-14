import { useEffect } from 'react'
import { site, company, contact } from '../data/company.js'

/**
 * Keeps document metadata in sync with the single source of truth
 * (src/data/company.js) and injects LocalBusiness structured data.
 *
 * Structured data contains ONLY verified facts: fields still "pending"
 * are omitted entirely. No address, phone, hours, ratings, or reviews
 * are ever fabricated.
 */

function buildStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
  }

  if (company.about.status === 'confirmed') {
    data.description = company.about.body.replace(/\s*\[DRAFT[^\]]*\]\s*/, '').trim()
  }

  if (contact.phone.status === 'confirmed' && contact.phone.e164) {
    data.telephone = `+${String(contact.phone.e164).replace(/\D/g, '')}`
  }

  if (contact.email.status === 'confirmed' && contact.email.address) {
    data.email = contact.email.address
  }

  if (contact.address.status === 'confirmed') {
    const address = contact.address
    data.address = {
      '@type': 'PostalAddress',
      ...(address.line1 && { streetAddress: [address.line1, address.line2].filter(Boolean).join(', ') }),
      ...(address.locality && { addressLocality: address.locality }),
      ...(address.city && { addressRegion: address.city }),
      ...(address.pin && { postalCode: address.pin }),
      addressCountry: 'IN',
    }
  }

  if (contact.hours.status === 'confirmed' && contact.hours.spec) {
    data.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: contact.hours.spec.dayOfWeek,
      opens: contact.hours.spec.opens,
      closes: contact.hours.spec.closes,
    }
  }

  if (site.canonicalUrl) {
    data.url = site.canonicalUrl
  }

  return data
}

const setMeta = (selector, attr, key, content) => {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function Seo() {
  useEffect(() => {
    document.title = site.title

    setMeta('meta[name="description"]', 'name', 'description', site.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', site.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', site.description)
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', site.title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', site.description)

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(buildStructuredData())
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return null
}
