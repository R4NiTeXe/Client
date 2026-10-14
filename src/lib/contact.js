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

const telOf = (field) => {
  const number = digitsOnly(field?.e164 || field?.display)
  return number ? `tel:+${number}` : null
}

const waOf = (field) => {
  const number = digitsOnly(field?.e164 || field?.display)
  return number ? `https://wa.me/${number}` : null
}

export function telHref() {
  if (contact.phone.status !== 'confirmed') return null
  return telOf(contact.phone)
}

export function waHref() {
  if (contact.whatsapp.status !== 'confirmed') return null
  const base = waOf(contact.whatsapp)
  if (!base) return null
  const greeting = contact.whatsapp.greeting?.trim()
  return greeting
    ? `${base}?text=${encodeURIComponent(greeting)}`
    : base
}

export function managerTelHref() {
  const manager = contact.manager
  if (!manager || manager.status !== 'confirmed') return null
  return telOf(manager.phone)
}

export function managerWaHref() {
  const manager = contact.manager
  if (!manager || manager.status !== 'confirmed') return null
  const base = waOf(manager.whatsapp)
  if (!base) return null
  const greeting = manager.whatsapp?.greeting?.trim()
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
  const { days, time, closedDays } = contact.hours
  if (!days && !time && !closedDays) return null
  const open = [days, time].filter(Boolean).join(' · ')
  const closed = closedDays ? `${closedDays} closed` : ''
  return [open, closed].filter(Boolean).join(' · ')
}
