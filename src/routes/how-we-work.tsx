import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/layout/page-header'
import { CtaBand } from '~/components/sections/cta-band'
import { ProcessPoints } from '~/components/sections/process-points'
import { engagementSteps } from '~/content/company'
import { seo } from '~/lib/seo'

const DESCRIPTION =
  'How Torvath runs an engagement: direct access to the engineers, fixed scope or embedded, and maintenance after launch. A written plan before any code is written.'

export const Route = createFileRoute('/how-we-work')({
  head: () =>
    seo({
      title: 'How we work',
      description: DESCRIPTION,
      path: '/how-we-work',
    }),
  component: HowWeWork,
})

function HowWeWork() {
  return (
    <>
      <PageHeader
        eyebrow="How we work"
        title="A small team, deliberately."
        lede={DESCRIPTION}
        accent="brand"
        crumbs={[{ label: 'How we work', to: '/how-we-work' }]}
      />

      <ProcessPoints detailed />

      <section className="border-b border-hairline">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <p className="label-caps">The engagement</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
            Start to finish, four steps.
          </h2>

          <ol className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {engagementSteps.map((step, index) => (
              <li key={step.title} className="bg-background p-7 sm:p-8">
                <span className="font-display text-sm tracking-[0.28em] text-teal">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-lg font-medium tracking-[-0.01em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand heading="Want to see what a plan for your project looks like?" />
    </>
  )
}
