import { createFileRoute } from '@tanstack/react-router'
import { CtaBand } from '~/components/sections/cta-band'
import { Hero } from '~/components/sections/hero'
import { ProcessPoints } from '~/components/sections/process-points'
import { ProductsList } from '~/components/sections/products-list'
import { ServicesGrid } from '~/components/sections/services-grid'
import { TechnologyBand } from '~/components/sections/technology-band'
import { JsonLd } from '~/components/JsonLd'
import { services } from '~/content/services'
import { site } from '~/content/site'
import { seo } from '~/lib/seo'
import { serviceListSchema } from '~/lib/structured-data'

/**
 * The home page is a summary with links, not the whole site. Each section here
 * has a fuller page of its own — that is the split that lets `/services/…`,
 * `/how-we-work` and `/products` rank for their own queries instead of
 * competing as anchors on one URL.
 */
export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      path: '/',
      absoluteTitle: true,
    }),
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ProcessPoints withLink />
      <ProductsList />
      <TechnologyBand />
      <CtaBand />
      <JsonLd data={serviceListSchema(services)} />
    </>
  )
}
