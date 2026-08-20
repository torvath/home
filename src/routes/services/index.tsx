import { createFileRoute, Link } from '@tanstack/react-router'
import { JsonLd } from '~/components/JsonLd'
import { CtaBand } from '~/components/sections/cta-band'
import { PageHeader } from '~/components/layout/page-header'
import { TechnologyBand } from '~/components/sections/technology-band'
import { services } from '~/content/services'
import { seo } from '~/lib/seo'
import { serviceListSchema } from '~/lib/structured-data'

const DESCRIPTION =
  'Software development, consulting, in-house products and managed services from Torvath — a small engineering team you work with directly.'

export const Route = createFileRoute('/services/')({
  head: () =>
    seo({
      title: 'Services',
      description: DESCRIPTION,
      path: '/services',
    }),
  component: ServicesIndex,
})

function ServicesIndex() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Four ways we work with you."
        lede={DESCRIPTION}
        accent="brand"
        crumbs={[{ label: 'Services', to: '/services' }]}
      />

      <section className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-px bg-hairline sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group relative bg-background p-8 transition-colors hover:bg-surface sm:p-10"
              >
                <span
                  aria-hidden
                  className={`block h-[2px] w-10 transition-all duration-300 group-hover:w-16 ${
                    service.accent === 'teal' ? 'bg-teal' : 'bg-amber'
                  }`}
                  style={{
                    clipPath:
                      'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)',
                  }}
                />
                <h2 className="mt-7 font-display text-xl font-medium tracking-[-0.01em] text-foreground sm:text-2xl">
                  {service.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.points.slice(0, 3).map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${
                          service.accent === 'teal' ? 'bg-teal' : 'bg-amber'
                        }`}
                        style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-7 inline-flex items-center gap-1 text-sm font-medium ${
                    service.accent === 'teal' ? 'text-teal' : 'text-amber'
                  }`}
                >
                  {service.title}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TechnologyBand note />
      <CtaBand />
      <JsonLd data={serviceListSchema(services)} />
    </>
  )
}
