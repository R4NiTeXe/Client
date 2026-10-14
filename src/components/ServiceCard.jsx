import { ArrowRight, PenTool, Gift, PanelTop, Building2, Sparkles } from 'lucide-react'
import WordReveal from './WordReveal.jsx'

const ICONS = {
  PenTool,
  Gift,
  PanelTop,
  Building2,
  Sparkles,
}

export default function ServiceCard({ service }) {
  const Icon = ICONS[service.icon] ?? Sparkles

  return (
    <article className="card-surface card-lift group flex h-full flex-col p-6">
      <span className="inline-flex size-11 items-center justify-center rounded-md bg-navy text-gold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
        <Icon aria-hidden="true" size={22} strokeWidth={2} />
      </span>
      <WordReveal
        as="h3"
        text={service.title}
        delay={0.08}
        className="mt-4 font-display text-lg font-bold text-navy"
      />
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
      {service.cta ? (
        <a
          href={service.cta}
          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-gold-ink"
        >
          {service.ctaLabel ?? 'Learn more'}
          <ArrowRight
            aria-hidden="true"
            size={16}
            className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          />
        </a>
      ) : null}
    </article>
  )
}
