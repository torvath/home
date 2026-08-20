import { Link } from '@tanstack/react-router'
import { services } from '~/content/services'

/**
 * The four services as cards. Each card is a link to its own page — the single
 * biggest SEO change from the one-page original, where these were anchors into
 * a shared, untitled section.
 */
export function ServicesGrid({ heading }: { heading?: string }) {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="label-caps">What we do</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
          {heading ?? 'Four ways we work with you.'}
        </h2>

        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="group relative bg-background p-7 text-left transition-colors hover:bg-surface sm:p-8"
            >
              <span
                aria-hidden
                className={`block h-[2px] w-10 transition-all duration-300 group-hover:w-16 ${
                  service.accent === 'teal' ? 'bg-teal' : 'bg-amber'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
                }}
              />
              <h3 className="mt-7 font-display text-lg font-medium tracking-[-0.01em] text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.summary}
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                  service.accent === 'teal'
                    ? 'text-teal'
                    : 'text-amber'
                }`}
              >
                Learn more
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
              <span
                aria-hidden
                className={`absolute inset-0 border transition-colors ${
                  service.accent === 'teal'
                    ? 'border-transparent group-hover:border-teal/60'
                    : 'border-transparent group-hover:border-amber/60'
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
