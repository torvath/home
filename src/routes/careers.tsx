import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/layout/page-header'
import { buttonClass } from '~/components/ui/button'
import { careers } from '~/content/careers'
import { site } from '~/content/site'
import { seo } from '~/lib/seo'

const DESCRIPTION =
  'Torvath is a small team and hires rarely. No open roles right now — when one opens, it is posted here with a real scope and a real range.'

export const Route = createFileRoute('/careers')({
  head: () =>
    seo({
      title: 'Careers',
      description: DESCRIPTION,
      path: '/careers',
    }),
  component: CareersPage,
})

function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="No open roles right now."
        lede={careers.intro}
        accent="teal"
        crumbs={[{ label: 'Careers', to: '/careers' }]}
      />

      <section className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="max-w-2xl space-y-6">
            {careers.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-16 grid gap-10 lg:grid-cols-3">
            {careers.principles.map((principle) => (
              <li key={principle.title}>
                <div aria-hidden className="h-px w-10 gradient-brand" />
                <h2 className="mt-6 font-display text-lg font-medium text-foreground">
                  {principle.title}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="clip-facet border border-hairline bg-background p-8 sm:p-12">
            <p className="label-caps">In the meantime</p>
            <h2 className="mt-4 max-w-xl font-display text-2xl leading-tight font-medium tracking-[-0.02em] sm:text-3xl">
              Think you'd be a fit? Write to us anyway.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              We don't run a standing pipeline, but a short note about what
              you build is easy to remember when something does open.
            </p>
            <div className="mt-8">
              <a href={`mailto:${site.email}`} className={buttonClass()}>
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
