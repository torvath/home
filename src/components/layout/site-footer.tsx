import { Link } from '@tanstack/react-router'
import { footerNav, site } from '~/content/site'
import { services } from '~/content/services'
import { TorvathLockup } from './logo'

/**
 * The footer is now a real internal-linking surface: every page of the site is
 * one click from every other page, which is how a crawler discovers depth.
 */
export function SiteFooter() {
  return (
    <footer className="relative">
      <div aria-hidden className="rule-brand" />
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <div className="min-w-0">
            <TorvathLockup className="h-36 w-auto sm:h-44" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.shortDescription}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm text-foreground underline decoration-teal decoration-1 underline-offset-4 transition-colors hover:text-teal"
            >
              {site.email}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Services">
              <h2 className="label-caps">Services</h2>
              <ul className="mt-4 space-y-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      activeProps={{ className: 'text-foreground' }}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {footerNav.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="label-caps">{column.heading}</h2>
                <ul className="mt-4 space-y-3">
                  {column.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        activeProps={{ className: 'text-foreground' }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs tracking-wide text-muted-foreground">
            &copy; {new Date().getFullYear()} {site.legalName}. All rights
            reserved.
          </p>
          <p className="label-caps">{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
