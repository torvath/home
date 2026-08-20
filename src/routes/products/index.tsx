import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/layout/page-header'
import { CtaBand } from '~/components/sections/cta-band'
import { ProductsList } from '~/components/sections/products-list'
import { seo } from '~/lib/seo'

const DESCRIPTION =
  'The applications Torvath builds and operates in-house, each with an honest status: live, in development, or planned. No launch dates we cannot keep.'

export const Route = createFileRoute('/products/')({
  head: () =>
    seo({
      title: 'Products',
      description: DESCRIPTION,
      path: '/products',
    }),
  component: ProductsIndex,
})

function ProductsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Applications we build and operate ourselves."
        lede={DESCRIPTION}
        accent="amber"
        crumbs={[{ label: 'Products', to: '/products' }]}
      />
      <ProductsList heading="What we are building." />
      <CtaBand
        heading="Building something similar?"
        body="Running our own products keeps us honest about maintenance and cost. If you are building one, that experience is the part worth borrowing."
      />
    </>
  )
}
