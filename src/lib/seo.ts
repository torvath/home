import { site } from '~/content/site'

/**
 * One place that knows how a page describes itself to crawlers and social
 * cards. Every route calls `seo()` from its `head()`, so a page can never ship
 * with the site-wide title, a missing canonical, or a stale OG image.
 *
 * Splitting the old single-page site into real routes only helps search if each
 * route carries its *own* title, description and canonical — that is the whole
 * job of this module.
 */

export interface SeoInput {
  /** Page title without the brand suffix (added unless `absoluteTitle`). */
  title: string
  description: string
  /** Site-root-relative path, e.g. `/services/consulting`. */
  path: string
  /** Absolute or root-relative image for OG/Twitter cards. */
  image?: string
  type?: 'website' | 'article' | 'profile'
  /** Keep this page out of the index (thank-you pages, previews). */
  noindex?: boolean
  /** Use `title` verbatim instead of appending the brand. */
  absoluteTitle?: boolean
}

export interface HeadMeta {
  title?: string
  name?: string
  property?: string
  content?: string
}

export interface HeadLink {
  rel: string
  href: string
  type?: string
  sizes?: string
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
}

/** Absolute URL for a root-relative path. Idempotent for absolute input. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageTitle(title: string, absolute = false): string {
  if (absolute) return title
  return title === site.name ? title : `${title} — ${site.name}`
}

export function seo(input: SeoInput): {
  meta: Array<HeadMeta>
  links: Array<HeadLink>
} {
  const title = pageTitle(input.title, input.absoluteTitle)
  const url = absoluteUrl(input.path)
  const image = absoluteUrl(input.image ?? site.ogImage)

  const meta: Array<HeadMeta> = [
    { title },
    { name: 'description', content: input.description },

    { property: 'og:site_name', content: site.name },
    { property: 'og:type', content: input.type ?? 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: input.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:image:alt', content: `${site.name} — ${site.tagline}` },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: input.description },
    { name: 'twitter:image', content: image },
  ]

  if (input.noindex) {
    meta.push({ name: 'robots', content: 'noindex, nofollow' })
  }

  return {
    meta,
    // Canonical on every page: the same content must never be reachable as two
    // indexable URLs (trailing slash, query strings, campaign params).
    links: [{ rel: 'canonical', href: url }],
  }
}
