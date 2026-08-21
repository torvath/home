import type { FileRouteTypes } from '~/routeTree.gen'

/**
 * Single source of truth for site-wide copy, contact details and navigation.
 *
 * Everything a non-developer is likely to want changed lives in `src/content/*`
 * — no JSX edits required. Nothing here is a placeholder: if a fact is not
 * settled (a founding year, a street address) it is left out rather than
 * guessed, because every value in this file is published.
 */

export const site = {
  name: 'Torvath',
  legalName: 'Torvath',
  tagline: 'Building Intelligent Solutions',
  /**
   * Public origin. Used for canonical URLs, Open Graph URLs, JSON-LD and the
   * generated sitemap. Set VITE_SITE_URL in the environment for real builds.
   */
  url: (import.meta.env.VITE_SITE_URL ?? 'https://torvath.com').replace(
    /\/$/,
    '',
  ),
  description:
    'Torvath is a small engineering team that designs, builds, and maintains software — and ships products of its own. You work directly with the people writing the code.',
  shortDescription:
    'A small engineering team that designs, builds, and maintains software.',
  email: 'hello@torvath.com',
  location: 'Remote-first · India',
  /** Where the team is, in prose, for the About page and structured data. */
  country: 'India',
  ogImage: '/og-image.png',
  /** Add real profiles here; they feed the Organization `sameAs` list. */
  social: [] as Array<{ label: string; href: string }>,
} as const

/** Every path the router knows about — a typo in a nav link is a type error. */
export type AppPath = FileRouteTypes['to']

export interface NavItem {
  label: string
  to: AppPath
}

/** Primary header navigation. */
export const primaryNav: Array<NavItem> = [
  { label: 'Services', to: '/services' },
  { label: 'How we work', to: '/how-we-work' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/**
 * Footer columns. The services column is rendered separately from
 * `src/content/services.ts`, so it can link to `/services/$slug` with typed
 * params instead of hand-written paths that could rot.
 */
export const footerNav: Array<{ heading: string; items: Array<NavItem> }> = [
  {
    heading: 'Company',
    items: [
      { label: 'How we work', to: '/how-we-work' },
      { label: 'About', to: '/about' },
      { label: 'Products', to: '/products' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { label: 'Privacy', to: '/legal/privacy' },
      { label: 'Terms', to: '/legal/terms' },
    ],
  },
]
