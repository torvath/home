import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/layout/page-header'
import { LegalBody } from '~/components/sections/legal-body'
import { termsSections } from '~/content/legal'
import { seo } from '~/lib/seo'

const DESCRIPTION =
  'The terms that apply to the Torvath website. Engagement terms are agreed separately, in writing, for each project.'

export const Route = createFileRoute('/legal/terms')({
  head: () =>
    seo({
      title: 'Terms of use',
      description: DESCRIPTION,
      path: '/legal/terms',
    }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of use"
        lede="What applies when you use this site. Project work runs on a separate written agreement."
        accent="amber"
        crumbs={[{ label: 'Terms', to: '/legal/terms' }]}
      />
      <LegalBody sections={termsSections} />
    </>
  )
}
