import { useEffect, useRef, useState } from 'react'
import { Menu, X, Quote } from 'lucide-react'
import Container from './Container.jsx'
import ButtonLink from './ButtonLink.jsx'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Our Work' },
  { href: '#contact', label: 'Contact' },
]

function Wordmark() {
  return (
    <a href="#home" className="wordmark text-lg text-white" aria-label="AtoZ Engraving — home">
      AtoZ <span className="text-gold">Engraving</span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const headerRef = useRef(null)

  // Depth appears once the page moves — keeps the first paint clean.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const close = () => setOpen(false)

  // <header> is fixed (not sticky) — required alongside GSAP ScrollSmoother.
  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 bg-navy text-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_14px_34px_-16px_rgba(11,18,32,0.65)]' : ''
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Wordmark />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="#contact" size="sm" icon={Quote}>
            Get a Quote
          </ButtonLink>
        </div>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`border-t border-white/10 md:hidden ${open ? '' : 'hidden'}`}>
        <Container className="flex flex-col py-3">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="flex min-h-11 items-center rounded-md px-3 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-3 border-t border-white/10 pt-3">
            <ButtonLink href="#contact" onClick={close} className="w-full" icon={Quote}>
              Get a Quote
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  )
}
