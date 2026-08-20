import { STATUS_LABEL, type ProductStatus } from '~/content/products'

const STYLES: Record<ProductStatus, string> = {
  live: 'border-teal text-teal',
  dev: 'border-amber text-amber',
  planned: 'border-hairline text-muted-foreground',
}

/**
 * The honest status signal. An unbuilt product with a real label reads as
 * momentum; a fake download button reads as a company that cannot ship.
 */
export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={`clip-facet-sm inline-block shrink-0 border px-3 py-1 font-display text-[0.65rem] tracking-[0.22em] uppercase ${STYLES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
