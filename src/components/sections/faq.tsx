import { JsonLd } from '~/components/JsonLd'
import { faqs } from '~/content/company'
import { faqSchema } from '~/lib/structured-data'

/**
 * Plain `<details>` questions plus FAQPage structured data — the answers are
 * in the HTML whether or not the disclosure is open, so they are indexable.
 */
export function Faq({
  heading = 'Questions we get asked first.',
}: {
  heading?: string
}) {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <p className="label-caps">FAQ</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-12 max-w-3xl border-t border-hairline">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-hairline">
              <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 font-display text-base font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-teal transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  )
}
