/**
 * Decorative service-word marquee (aria-hidden — purely visual rhythm).
 * Words must come from client-approved categories only.
 * The doubled track gives a seamless loop; reduced motion freezes it in CSS.
 */
export default function Marquee({ words, className = '' }) {
  if (!words.length) return null

  const track = (
    <span className="marquee-track" aria-hidden="true">
      {words.map((word) => (
        <span key={word} className="flex items-center">
          <span className="marquee-word px-6 text-[clamp(1.4rem,4vw,2.4rem)] leading-none sm:px-8">
            {word}
          </span>
          <span className="size-1.5 shrink-0 rounded-full bg-gold/60" aria-hidden="true" />
        </span>
      ))}
    </span>
  )

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y border-white/10 bg-navy py-5 select-none ${className}`}
    >
      <div className="flex w-max">
        {track}
        {track}
      </div>
    </div>
  )
}
