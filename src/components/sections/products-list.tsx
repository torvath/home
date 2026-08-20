import { Link } from '@tanstack/react-router'
import { products } from '~/content/products'
import { StatusBadge } from '~/components/ui/status-badge'

/**
 * Products as wide rows, not cards. Rows with `hasPage` link to their own
 * route. A row without a page stays inert — the list never links nowhere.
 */
export function ProductsList({ heading }: { heading?: string }) {
  return (
    <section className="border-b border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <p className="label-caps">Products</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
          {heading ?? 'Applications we build and operate ourselves.'}
        </h2>

        <div className="mt-14 border-t border-hairline">
          {products.map((product) => (
            <article
              key={product.slug}
              className="border-b border-hairline py-10 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10"
            >
              <div className="min-w-0">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center">
                  <h3
                    className={`min-w-0 font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl ${
                      product.hasPage ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {product.hasPage ? (
                      <Link
                        to="/products/$slug"
                        params={{ slug: product.slug }}
                        className="transition-colors hover:text-amber"
                      >
                        {product.name}
                      </Link>
                    ) : (
                      product.name
                    )}
                  </h3>
                  <StatusBadge status={product.status} />
                </div>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {product.summary}
                </p>
                {product.hasPage && (
                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber transition-colors hover:text-foreground"
                  >
                    Read more about {product.name}
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>

              {product.hasPage && (
                <div
                  aria-hidden
                  className="mt-10 hidden h-40 w-40 shrink-0 opacity-25 lg:block"
                  style={{
                    background: 'var(--gradient-brand-diag)',
                    clipPath: 'polygon(50% 0, 100% 30%, 82% 100%, 18% 100%, 0 30%)',
                  }}
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
