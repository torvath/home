import { Link } from '@tanstack/react-router'
import { buttonClass } from '~/components/ui/button'
import { site } from '~/content/site'

/**
 * Closing call to action, repeated at the foot of every content page so no
 * page is a dead end — for a reader or for a crawler following internal links.
 */
export function CtaBand({
  heading = 'Tell us what you’re building.',
  body = 'A short first conversation is usually enough to tell whether we are the right team for the work. No pitch decks.',
}: {
  heading?: string
  body?: string
}) {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="clip-facet border border-hairline bg-surface p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="label-caps">Next step</p>
              <h2 className="mt-4 max-w-xl font-display text-2xl leading-tight font-medium tracking-[-0.02em] sm:text-3xl lg:text-4xl">
                {heading}
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                {body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/contact" className={buttonClass()}>
                Start a project
              </Link>
              <a
                href={`mailto:${site.email}`}
                className={buttonClass({ variant: 'ghost' })}
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
