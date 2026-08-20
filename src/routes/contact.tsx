import { createFileRoute } from '@tanstack/react-router'
import { JsonLd } from '~/components/JsonLd'
import { PageHeader } from '~/components/layout/page-header'
import { ContactForm } from '~/components/sections/contact-form'
import { Faq } from '~/components/sections/faq'
import { site } from '~/content/site'
import { seo } from '~/lib/seo'
import { contactPageSchema } from '~/lib/structured-data'

const DESCRIPTION =
  'Start a project with Torvath. A short first conversation is usually enough to tell whether we are the right team for the work — no pitch decks.'

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: 'Contact',
      description: DESCRIPTION,
      path: '/contact',
    }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what you’re building."
        lede={DESCRIPTION}
        accent="brand"
        crumbs={[{ label: 'Contact', to: '/contact' }]}
      />

      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-24">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              Reach us directly
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              The form reaches the same inbox as the address below. Either way,
              an engineer reads it — not a queue.
            </p>

            <div aria-hidden className="mt-10 h-px w-24 gradient-brand" />

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="label-caps">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-base text-foreground underline decoration-teal decoration-1 underline-offset-4 transition-colors hover:text-teal"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label-caps">Location</dt>
                <dd className="mt-2 text-base text-foreground">
                  {site.location}
                </dd>
              </div>
              <div>
                <dt className="label-caps">Response time</dt>
                <dd className="mt-2 text-base text-foreground">
                  Within one business day.
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>

      <Faq />
      <JsonLd data={contactPageSchema()} />
    </>
  )
}
