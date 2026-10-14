import { Fragment, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Word-by-word masked text reveal, driven by motion.
 *
 * The IntersectionObserver watches the OUTER mask element — never the
 * translated inner span (it sits fully outside the clip box, so it would
 * never reach the visibility threshold). The inner spans then rise from
 * the mask once the heading scrolls into view, and hold.
 *
 * Accessibility: aria-label carries the full string; split fragments are
 * aria-hidden. Reduced motion renders plain text.
 */
export default function WordReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  amount = 0.35,
}) {
  const reduce = useReducedMotion()
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { once: true, amount })
  const words = String(text).split(/\s+/).filter(Boolean)

  if (reduce) return <Tag className={className}>{text}</Tag>

  return (
    <Tag ref={rootRef} className={className} aria-label={text}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? ' ' : null}
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
          >
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: '115%' }, shown: { y: '0%' } }}
              initial="hidden"
              animate={inView ? 'shown' : 'hidden'}
              transition={{ duration: 0.7, ease: EASE, delay: delay + index * stagger }}
            >
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
