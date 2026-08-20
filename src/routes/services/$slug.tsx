import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '~/components/JsonLd'
import { PageHeader } from '~/components/layout/page-header'
import { CtaBand } from '~/components/sections/cta-band'
import { buttonClass } from '~/components/ui/button'
import { getService, services } from '~/content/services'
import { seo } from '~/lib/seo'
import { serviceSchema } from '~/lib/structured-data'

/**
 * One indexable page per service.
 *
 * The slug is validated in the loader, so an unknown service is a real 404 —
 * not a page that renders empty and gets indexed anyway.
 */
export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = getService(params.slug)
    if (!service) throw notFound()
    return service
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    return seo({
      title: loaderData.seo.title,
      description: loaderData.seo.description,
      path: `/services/${loaderData.slug}`,
    })
  },
  component: ServicePage,
})

function ServicePage() {
  const service = Route.useLoaderData()
  const others = services.filter((item) => item.slug !== service.slug)
  const accentText = service.accent === 'teal' ? 'text-teal' : 'text-amber'
  const accentBg = service.accent === 'teal' ? 'bg-teal' : 'bg-amber'

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        lede={service.intro}
        accent={service.accent}
        crumbs={[
          { label: 'Services', to: '/services' },
          { label: service.title, to: '/services' },
        ]}
      />

      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:py-24">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              What this includes
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${accentBg}`}
                    style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                  />
                  {point}
                </li>
              ))}
            </ul>

            <h2 className="mt-16 font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              How the engagement runs
            </h2>
            <dl className="mt-8 border-t border-hairline">
              {service.engagement.map((row) => (
                <div
                  key={row.term}
                  className="grid gap-2 border-b border-hairline py-5 sm:grid-cols-[12rem_1fr] sm:gap-8"
                >
                  <dt className="label-caps">{row.term}</dt>
                  <dd className="text-sm leading-relaxed text-muted-foreground">
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              to="/contact"
              className={buttonClass({
                variant: service.accent === 'teal' ? 'teal' : 'primary',
                className: 'mt-10',
              })}
            >
              Discuss this with us
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <aside className="lg:pl-4">
            <div className="border border-hairline bg-surface p-6 lg:sticky lg:top-28">
              <h2 className="label-caps">Other services</h2>
              <div className="mt-4 flex flex-col gap-2">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    to="/services/$slug"
                    params={{ slug: other.slug }}
                    className="border border-hairline-strong px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className={`mr-3 inline-block h-1.5 w-1.5 ${
                        other.accent === 'teal' ? 'bg-teal' : 'bg-amber'
                      }`}
                      style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                    />
                    {other.title}
                  </Link>
                ))}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Not sure which of these you need?{' '}
                <Link
                  to="/contact"
                  className={`underline decoration-1 underline-offset-4 ${accentText}`}
                >
                  Describe the problem
                </Link>{' '}
                and we will tell you.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand heading={`Have a ${service.title.toLowerCase()} problem?`} />
      <JsonLd data={serviceSchema(service)} />
    </>
  )
}
