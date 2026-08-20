import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { JsonLd } from '~/components/JsonLd'
import { PageHeader } from '~/components/layout/page-header'
import { CtaBand } from '~/components/sections/cta-band'
import { NotifyForm } from '~/components/sections/notify-form'
import { StatusBadge } from '~/components/ui/status-badge'
import { getProduct } from '~/content/products'
import { seo } from '~/lib/seo'
import { productSchema } from '~/lib/structured-data'

/**
 * One page per shipped or in-progress product. A product with
 * `hasPage: false` 404s here rather than publishing a thin URL.
 */
export const Route = createFileRoute('/products/$slug')({
  loader: ({ params }) => {
    const product = getProduct(params.slug)
    if (!product || !product.hasPage) throw notFound()
    return product
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    return seo({
      title: loaderData.seo.title,
      description: loaderData.seo.description,
      path: `/products/${loaderData.slug}`,
      absoluteTitle: loaderData.seo.title.includes('Torvath'),
    })
  },
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()

  return (
    <>
      <PageHeader
        eyebrow="Product"
        title={product.name}
        lede={product.intro}
        accent="amber"
        crumbs={[
          { label: 'Products', to: '/products' },
          { label: product.name, to: '/products' },
        ]}
      >
        <StatusBadge status={product.status} />
      </PageHeader>

      <section className="border-b border-hairline">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-24">
          <div>
            {product.capabilities.length > 0 && (
              <>
                <h2 className="font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
                  What it does
                </h2>
                <ul className="mt-8 grid gap-4">
                  {product.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber"
                        style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-14 font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              Who it is for
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {product.audience}
            </p>

            <h2 className="mt-14 font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              Why not a spreadsheet
            </h2>
            <p className="mt-4 max-w-xl border-l-2 border-amber pl-5 text-sm leading-relaxed text-foreground sm:text-base">
              {product.differentiator}
            </p>

            {product.notify && <NotifyForm product={product.name} />}
          </div>

          <aside>
            <div className="border border-hairline bg-surface p-6">
              <h2 className="label-caps">Status</h2>
              <div className="mt-4">
                <StatusBadge status={product.status} />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                We publish a status, not a launch date. When it is ready to use,
                this page says so and the sign-up list hears first.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber transition-colors hover:text-foreground"
              >
                All products
                <span aria-hidden>→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={productSchema(product)} />
    </>
  )
}
