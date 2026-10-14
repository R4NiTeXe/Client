/**
 * Contact link builders.
 *
 * Every builder returns `null` while the underlying field is
 * "pending" so no unverified phone number, WhatsApp number, email,
 * or map pin can ever reach the page. Components should hide or
 * disable the corresponding action when the builder returns null.
 */

import { contact } from '../data/company.js'

const digitsOnly = (value) => String(value || '').replace(/\D/g, '')

export function telHref() {
  if (contact.phone.status !== 'confirmed') return null
  const number = digitsOnly(contact.phone.e164 || contact.phone.display)
  return number ? `tel:+${number}` : null
}

export function waHref() {
  if (contact.whatsapp.status !== 'confirmed') return null
  const number = digitsOnly(contact.whatsapp.e164 || contact.whatsapp.display)
  if (!number) return null
  const base = `https://wa.me/${number}`
  const greeting = contact.whatsapp.greeting?.trim()
  return greeting
    ? `${base}?text=${encodeURIComponent(greeting)}`
    : base
}

export function mailtoHref() {
  if (contact.email.status !== 'confirmed') return null
  const address = contact.email.address.trim()
  return address ? `mailto:${address}` : null
}

export function mapHref() {
  if (contact.address.status !== 'confirmed') return null
  const query =
    contact.address.mapQuery.trim() ||
    [
      contact.address.line1,
      contact.address.line2,
      contact.address.locality,
      contact.address.city,
      contact.address.state,
      contact.address.pin,
    ]
      .filter(Boolean)
      .join(', ')
  return query
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    : null
}

export function formatAddress() {
  if (contact.address.status !== 'confirmed') return null
  const parts = [
    contact.address.line1,
    contact.address.line2,
    contact.address.locality,
    contact.address.city,
    contact.address.state,
    contact.address.pin,
  ].filter(Boolean)
  return parts.length ? parts.join(', ') : null
}

export function formatHours() {
  if (contact.hours.status !== 'confirmed') return null
  const { days, time } = contact.hours
  if (!days && !time) return null
  return [days, time].filter(Boolean).join(': ')
}
