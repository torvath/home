/**
 * Services. Each entry becomes:
 *   - a card on `/` and `/services`
 *   - its own indexable page at `/services/<slug>`
 *   - a `Service` JSON-LD node and a prerendered, sitemapped URL
 *
 * Adding a service here is enough — routing, prerendering and the sitemap
 * follow from this array (see `vite.config.ts`).
 *
 * Kept free of React and of `import.meta` so `vite.config.ts` can import it.
 */

export type Accent = 'teal' | 'amber'

export interface Service {
  slug: string
  /** Card + page H1. */
  title: string
  /** One line, used on cards and in the services grid. */
  summary: string
  accent: Accent
  /** Opening paragraph of the detail page. */
  intro: string
  /** What the engagement actually includes. */
  points: Array<string>
  /** Rough shape of an engagement — kept honest and non-numeric. */
  engagement: Array<{ term: string; detail: string }>
  seo: {
    title: string
    description: string
  }
}

export const services: Array<Service> = [
  {
    slug: 'software-development',
    title: 'Software development',
    summary: 'Web and mobile applications built end to end.',
    accent: 'teal',
    intro:
      'We design and build software that becomes the operating system of your business — from customer-facing products to internal tools that move faster than spreadsheets.',
    points: [
      'Custom web applications tailored to your workflow',
      'API design and third-party integrations',
      'Frontend and backend engineering with modern stacks',
      'Cloud deployment, CI/CD, and infrastructure setup',
      'Mobile-ready experiences and responsive interfaces',
    ],
    engagement: [
      {
        term: 'Shape',
        detail: 'Fixed-scope build, or an embedded engineer on a retainer.',
      },
      {
        term: 'Starts with',
        detail:
          'A short scoping conversation, then a written plan you own — whether or not you build it with us.',
      },
      {
        term: 'Ends with',
        detail:
          'Running software, the repository, the infrastructure, and a handover. Optionally, we keep operating it.',
      },
    ],
    seo: {
      title: 'Custom software development',
      description:
        'Custom web and mobile application development by Torvath — API design, frontend and backend engineering, cloud deployment and CI/CD. Work directly with the engineers.',
    },
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    summary:
      'Architecture reviews, technology selection, and getting a stalled project moving again.',
    accent: 'teal',
    intro:
      'When a project is stuck, over-engineered, or unclear, we step in to find the shortest path forward — and leave your team with a plan they can execute.',
    points: [
      'Architecture and code-base reviews',
      'Technology selection and migration roadmaps',
      'Team augmentation and hiring support',
      'Project recovery and deadline rescue',
      'Proof-of-concept builds for uncertain bets',
    ],
    engagement: [
      {
        term: 'Shape',
        detail: 'A defined review, or ongoing advisory time each month.',
      },
      {
        term: 'Starts with',
        detail:
          'Read-only access to the code, the infrastructure, and the people who know the history.',
      },
      {
        term: 'Ends with',
        detail:
          'A written assessment with ranked, costed options — not a slide deck.',
      },
    ],
    seo: {
      title: 'Software consulting and architecture review',
      description:
        'Independent architecture reviews, technology selection, migration roadmaps and project recovery from Torvath. A written assessment with ranked options, not a slide deck.',
    },
  },
  {
    slug: 'products',
    title: 'Products',
    summary: 'Our own applications, built and operated in-house.',
    accent: 'amber',
    intro:
      'Beyond client work, we build and operate products we believe in — starting with our own platforms and exploring new tools that solve problems we see firsthand.',
    points: [
      'In-house SaaS products built and operated by Torvath',
      'Torvath Rentals — a rental management platform',
      'Continuous iteration based on real user feedback',
      'New product concepts in development',
      'Opportunities to partner or co-build with us',
    ],
    engagement: [
      {
        term: 'Shape',
        detail:
          'Products we own and run, plus selective co-building with partners.',
      },
      {
        term: 'Why it matters to clients',
        detail:
          'Running our own software keeps us honest about maintenance, cost, and the parts that break at 3am.',
      },
      {
        term: 'Where to look',
        detail: 'The products page lists what is live and what is in progress.',
      },
    ],
    seo: {
      title: 'Products we build in-house',
      description:
        'The applications Torvath builds and operates in-house, including Torvath Rentals. Honest status labels — live, in development, or planned.',
    },
  },
  {
    slug: 'managed-services',
    title: 'Managed services',
    summary: 'Ongoing maintenance, monitoring, and iteration after launch.',
    accent: 'amber',
    intro:
      'Shipping is the beginning, not the end. We stay with the software we build to keep it secure, fast, and evolving as your business changes.',
    points: [
      'Ongoing maintenance and reliability work',
      'Monitoring, alerting, and incident response',
      'Feature updates and incremental improvements',
      'Security patches and dependency management',
      'Quarterly planning and performance reviews',
    ],
    engagement: [
      {
        term: 'Shape',
        detail: 'A monthly retainer sized to the system, not to a headcount.',
      },
      {
        term: 'Starts with',
        detail:
          'An inventory of what runs where, what it costs, and what is unmonitored.',
      },
      {
        term: 'Ongoing',
        detail:
          'Patching, monitoring and a standing block of improvement time each month.',
      },
    ],
    seo: {
      title: 'Managed services and application maintenance',
      description:
        'Torvath maintains the software it builds — monitoring, incident response, security patching, dependency upgrades and a standing block of improvement time each month.',
    },
  },
]

export const serviceSlugs = services.map((service) => service.slug)

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
