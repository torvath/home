import { site } from '~/content/site'
import type { Service } from '~/content/services'
import type { Product } from '~/content/products'
import { absoluteUrl } from './seo'

/**
 * schema.org graphs, rendered by `<JsonLd />`.
 *
 * Structured data is the second half of the multi-page split: routes tell a
 * crawler *where* things are, this tells it *what* they are — an organization,
 * a service, a breadcrumb trail, an FAQ.
 */

type Json = Record<string, unknown>

const ORG_ID = `${site.url}/#organization`
const SITE_ID = `${site.url}/#website`

export function organizationSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl('/torvath-lockup.png'),
    image: absoluteUrl(site.ogImage),
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    // Country only: there is no published street address, and inventing one
    // would put a false location in front of every crawler that reads this.
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    areaServed: 'Worldwide',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        url: absoluteUrl('/contact'),
        availableLanguage: ['en'],
      },
    ],
    ...(site.social.length > 0
      ? { sameAs: site.social.map((profile) => profile.href) }
      : {}),
  }
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}

export function serviceSchema(service: Service): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} — what it includes`,
      itemListElement: service.points.map((point) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: point },
      })),
    },
  }
}

export function serviceListSchema(services: Array<Service>): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Torvath services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: absoluteUrl(`/services/${service.slug}`),
    })),
  }
}

/**
 * Products in development get no `offers`, no rating and no release date —
 * marking an unshipped product as purchasable is exactly the kind of fabricated
 * proof this site refuses to publish.
 */
export function productSchema(product: Product): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${absoluteUrl(`/products/${product.slug}`)}#software`,
    name: product.name,
    description: product.summary,
    url: absoluteUrl(`/products/${product.slug}`),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    publisher: { '@id': ORG_ID },
    ...(product.status === 'live' && product.href
      ? { installUrl: product.href }
      : {}),
  }
}

export function breadcrumbSchema(
  crumbs: Array<{ label: string; to: string }>,
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.to),
    })),
  }
}

export function faqSchema(
  faqs: ReadonlyArray<{ q: string; a: string }>,
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

export function contactPageSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: absoluteUrl('/contact'),
    name: `Contact ${site.name}`,
    description: `Start a project with ${site.name}.`,
    about: { '@id': ORG_ID },
  }
}

export function aboutPageSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: absoluteUrl('/about'),
    name: `About ${site.name}`,
    mainEntity: { '@id': ORG_ID },
  }
}
