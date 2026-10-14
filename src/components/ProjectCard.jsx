import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { imageUrl, imageSrcSet } from '../lib/cloudinary.js'

/**
 * Uniform gallery card. Handles missing images, failed loads, and
 * missing alt text gracefully; lazy-loads and reserves space with an
 * aspect ratio to avoid layout shift.
 */
export default function ProjectCard({ project }) {
  const [failed, setFailed] = useState(false)
  const src = imageUrl(project, 1200)
  // Uncropped delivery URL for the simple "view full image" link.
  const fullUrl = imageUrl(project)
  const srcSet = imageSrcSet(project)
  const alt = project.alt ?? ''
  const showImage = src && !failed

  return (
    <article className="card-surface overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        {showImage ? (
          <a
            href={fullUrl ?? src}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`View full image: ${project.title}`}
            className="block h-full w-full"
          >
            <img
              src={src}
              srcSet={srcSet ?? undefined}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              alt={alt}
              width={project.width ?? 1200}
              height={project.height ?? 900}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setFailed(true)}
            />
          </a>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
            <ImageOff aria-hidden="true" size={26} />
            <span className="text-xs">Image unavailable</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        {project.category ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-gold-ink">
            {project.category}
          </span>
        ) : null}
        <h3 className="text-base text-navy">{project.title}</h3>
        {project.description ? (
          <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        ) : null}
      </div>
    </article>
  )
}
