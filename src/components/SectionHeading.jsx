import { motion, useReducedMotion } from 'motion/react'
import WordReveal from './WordReveal.jsx'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Shared section header: eyebrow label + split-word title + optional lead.
 * `tone` switches colour for dark sections; alignment is opt-in.
 *
 * Motion: eyebrow and lead rise/fade in on first view; the title reveals
 * word-by-word from a mask. All triggers fire once; reduced motion shows
 * everything immediately.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  className = '',
}) {
  const isDark = tone === 'dark'
  const reduce = useReducedMotion()
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        reduce ? (
          <span className={`eyebrow ${isDark ? 'text-gold' : ''}`}>{eyebrow}</span>
        ) : (
          <motion.span
            className={`eyebrow ${isDark ? 'text-gold' : ''}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {eyebrow}
          </motion.span>
        )
      ) : null}

      <WordReveal
        as={Tag}
        text={title}
        className={isDark ? 'heading-section text-white' : 'heading-section'}
      />

      {description ? (
        reduce ? (
          <p className={`max-w-2xl text-lead ${isDark ? 'text-white/75' : ''}`}>{description}</p>
        ) : (
          <motion.p
            className={`max-w-2xl text-lead ${isDark ? 'text-white/75' : ''}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
          >
            {description}
          </motion.p>
        )
      ) : null}
    </div>
  )
}
