import { Link, createFileRoute } from '@tanstack/react-router'
import { JsonLd } from '~/components/JsonLd'
import { PageHeader } from '~/components/layout/page-header'
import { CtaBand } from '~/components/sections/cta-band'
import { TechnologyBand } from '~/components/sections/technology-band'
import { about } from '~/content/company'
import { products } from '~/content/products'
import { site } from '~/content/site'
import { seo } from '~/lib/seo'
import { aboutPageSchema } from '~/lib/structured-data'

const DESCRIPTION = `${site.name} is a small engineering team that designs, builds and maintains software for other businesses — and builds products of its own.`

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'About',
      description: DESCRIPTION,
      path: '/about',
    }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Engineers, not an agency layer."
        lede={about.intro}
        accent="brand"
        crumbs={[{ label: 'About', to: '/about' }]}
      />

      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-24">
          <div className="space-y-6">
            {about.body.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-2xl text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="border border-hairline bg-surface p-6">
            <h2 className="label-caps">At a glance</h2>
            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="text-muted-foreground">Based</dt>
                <dd className="mt-1 text-foreground">{site.location}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Works with</dt>
                <dd className="mt-1 text-foreground">
                  Clients worldwide, in English
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Own products</dt>
                <dd className="mt-1 flex flex-col gap-1">
                  {products.map((product) => (
                    <Link
                      key={product.slug}
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="text-foreground underline decoration-amber decoration-1 underline-offset-4 hover:text-amber"
                    >
                      {product.name}
                    </Link>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Contact</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-foreground underline decoration-teal decoration-1 underline-offset-4 hover:text-teal"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <p className="label-caps">How we think about the work</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
            Three things we hold to.
          </h2>
          <ul className="mt-12 grid gap-10 lg:grid-cols-3">
            {about.principles.map((principle) => (
              <li key={principle.title}>
                <div aria-hidden className="h-px w-10 gradient-brand" />
                <h3 className="mt-6 font-display text-lg font-medium text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TechnologyBand note />
      <CtaBand />
      <JsonLd data={aboutPageSchema()} />
    </>
  )
}
