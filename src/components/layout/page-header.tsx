import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './breadcrumbs'

/**
 * The masthead every non-home page opens with: eyebrow, one H1, a standfirst,
 * and the breadcrumb trail. Keeping it in one component is what stops the
 * routed pages from drifting into a dozen slightly different headers — and
 * guarantees exactly one H1 per page.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  accent = 'teal',
  children,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  crumbs?: Array<Crumb>
  accent?: 'teal' | 'amber' | 'brand'
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-facets absolute inset-0" />
        <div className="grid-hairlines absolute inset-0 opacity-[0.12]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-16 sm:px-8 lg:pt-40 lg:pb-20">
        {crumbs && <Breadcrumbs items={crumbs} />}

        <p className="label-caps mt-8">{eyebrow}</p>
        <div
          aria-hidden
          className={`mt-5 h-px w-24 ${
            accent === 'brand'
              ? 'gradient-brand'
              : accent === 'teal'
                ? 'bg-teal'
                : 'bg-amber'
          }`}
        />

        <h1 className="mt-8 max-w-4xl font-display text-[2rem] leading-[1.08] font-medium tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {lede && (
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lede}
          </p>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}
