import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { JsonLd } from '~/components/JsonLd'
import { NotFound } from '~/components/NotFound'
import { RouteError } from '~/components/RouteError'
import { SiteFooter } from '~/components/layout/site-footer'
import { SiteHeader } from '~/components/layout/site-header'
import { site } from '~/content/site'
import { analytics } from '~/lib/analytics'
import { organizationSchema, websiteSchema } from '~/lib/structured-data'
import { seo } from '~/lib/seo'
import appCss from '~/styles.css?url'

/**
 * The document shell and the site chrome.
 *
 * Per-page metadata is *not* set here — each route calls `seo()` in its own
 * `head()`. What lives here is only what is genuinely site-wide: the charset,
 * the viewport, the fonts, the icons, and the Organization / WebSite graph.
 */
export const Route = createRootRoute({
  head: () => {
    // Only the `meta` half is taken: head *links* are merged by `rel`, and the
    // first one wins, so a canonical declared here would win over — and
    // silently replace — every child route's canonical. Each page owns its own.
    const { meta } = seo({
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      path: '/',
      absoluteTitle: true,
    })

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'theme-color', content: '#050607' },
        { name: 'author', content: site.name },
        // Search Console / Bing verification, when verifying by meta tag
        // rather than DNS. Absent from the HTML unless the value is set.
        ...(analytics.googleVerification
          ? [
              {
                name: 'google-site-verification',
                content: analytics.googleVerification,
              },
            ]
          : []),
        ...(analytics.bingVerification
          ? [{ name: 'msvalidate.01', content: analytics.bingVerification }]
          : []),
        ...meta,
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', href: '/favicon.png', type: 'image/png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossOrigin: 'anonymous' as const,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap',
        },
      ],
    }
  },
  errorComponent: RouteError,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
  component: RootLayout,
})

/**
 * Full-document SSR: the shell owns <html>, <head> and <body>, which is why
 * this app has no index.html. `<HeadContent />` renders the merged `head()` of
 * every matched route — that merge is what lets a child route override the
 * title and canonical set here. `<Scripts />` must stay last in <body>.
 */
function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/*
          Cloudflare Web Analytics: ~1KB, deferred, cookieless, and it stores
          nothing on the visitor's device — which is what lets the privacy page
          keep promising no cookies and no consent banner. Rendered here in the
          shell rather than via `head.scripts` so the attributes survive
          verbatim. Emitted only in production builds with a token set.
        */}
        {analytics.cloudflareEnabled && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: analytics.cloudflareToken,
            })}
          />
        )}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <div className="min-h-svh bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-amber focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader />
      {/*
        `tabIndex={-1}` is what makes the skip link actually work: without it
        the fragment jump scrolls the page but leaves focus back on the link,
        so the next Tab returns to the nav the user just skipped.
      */}
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />

      {/* Site-wide identity graph, referenced by @id from every page's schema. */}
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
    </div>
  )
}
