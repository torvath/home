import { Link } from '@tanstack/react-router'
import { JsonLd } from '~/components/JsonLd'
import type { AppPath } from '~/content/site'
import { breadcrumbSchema } from '~/lib/structured-data'

export interface Crumb {
  label: string
  to: AppPath
}

/**
 * Visible breadcrumb trail plus the matching `BreadcrumbList` graph.
 *
 * On a routed site this is what tells a crawler that `/services/consulting`
 * sits under `/services`, and it is what search results render underneath the
 * title. The last crumb is the current page and is not a link.
 */
export function Breadcrumbs({ items }: { items: Array<Crumb> }) {
  const trail: Array<Crumb> = [{ label: 'Home', to: '/' }, ...items]

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1
            return (
              <li key={crumb.to} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden className="text-hairline">
                    /
                  </span>
                )}
                {isLast ? (
                  <span aria-current="page" className="text-foreground">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  )
}
