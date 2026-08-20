import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/layout/page-header'
import { LegalBody } from '~/components/sections/legal-body'
import { privacySections } from '~/content/legal'
import { seo } from '~/lib/seo'

const DESCRIPTION =
  'What this site collects, why, and how to have it removed. Torvath sets no cookies and runs no analytics or advertising trackers.'

export const Route = createFileRoute('/legal/privacy')({
  head: () =>
    seo({
      title: 'Privacy policy',
      description: DESCRIPTION,
      path: '/legal/privacy',
    }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lede="Two forms, no cookies, no trackers. This page says exactly what that means."
        crumbs={[{ label: 'Privacy', to: '/legal/privacy' }]}
      />
      <LegalBody sections={privacySections} />
    </>
  )
}
