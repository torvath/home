import { Link } from '@tanstack/react-router'
import { processPoints } from '~/content/company'

/**
 * The three differentiators, big numerals. `detail` is only rendered on the
 * dedicated /how-we-work page — the home page shows the short form and links
 * through, so the two pages never compete for the same query.
 */
export function ProcessPoints({
  detailed = false,
  withLink = false,
}: {
  detailed?: boolean
  withLink?: boolean
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-surface">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-hairlines absolute inset-0 opacity-[0.12]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="label-caps">How we work</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl lg:text-5xl">
          A small team, deliberately. That is the advantage.
        </h2>

        <ol className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {processPoints.map((point, i) => (
            <li key={point.n} className="relative lg:pr-8">
              <div className="flex items-start gap-5">
                {/*
                  The third numeral is painted through a gradient. `numeral-brand`
                  keeps a solid teal on `color` underneath it, so the digits stay
                  legible if the background-clip is dropped — which is exactly
                  what forced-colours mode does.
                */}
                <span
                  className={`font-display text-5xl leading-none font-light tracking-[-0.04em] sm:text-6xl ${
                    i === 2 ? 'numeral-brand' : ''
                  }`}
                  style={{
                    color:
                      i === 2
                        ? undefined
                        : i === 1
                          ? 'var(--amber)'
                          : 'var(--teal)',
                  }}
                >
                  {point.n}
                </span>
                <span aria-hidden className="mt-6 h-px w-8 bg-hairline" />
              </div>
              <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.01em] text-foreground">
                {point.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {point.body}
              </p>
              {detailed && (
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground/80">
                  {point.detail}
                </p>
              )}
            </li>
          ))}
        </ol>

        {withLink && (
          <Link
            to="/how-we-work"
            className="mt-14 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-foreground"
          >
            How an engagement runs, start to finish
            <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </section>
  )
}
