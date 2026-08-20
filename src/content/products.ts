/**
 * Products Torvath builds and operates itself.
 *
 * House rule, carried over from the brief: never invent launch dates, user
 * counts, ratings, store links or screenshots for something that is not
 * shipped. `status` is the honest signal — an unbuilt product with a real
 * status reads as momentum; a fake download button reads as a company that
 * cannot ship.
 *
 * Kept free of React and of `import.meta` so `vite.config.ts` can import it.
 */

export type ProductStatus = 'live' | 'dev' | 'planned'

export interface Product {
  slug: string
  name: string
  status: ProductStatus
  /** One line, used on the products list. */
  summary: string
  /** Detail-page opening paragraph. */
  intro: string
  /** What the product does today (or is being built to do). */
  capabilities: Array<string>
  /** Who it is for. */
  audience: string
  /** The thing it does that a spreadsheet or a group chat does not. */
  differentiator: string
  /** Show the "get notified at launch" capture on the detail page. */
  notify: boolean
  /** Live URL, once there is one. */
  href?: string
  /** Set false for rows that should not get their own page. */
  hasPage: boolean
  seo: {
    title: string
    description: string
  }
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: 'Live',
  dev: 'In development',
  planned: 'Planned',
}

export const products: Array<Product> = [
  {
    slug: 'torvath-rentals',
    name: 'Torvath Rentals',
    status: 'dev',
    summary:
      'A rental platform for property owners and short-stay hosts — listings, availability, and bookings in one place.',
    intro:
      'Torvath Rentals is a rental management platform we are building and will operate ourselves. It gives property owners and short-stay hosts one system for listings, availability and bookings, so a booking stops being reconciled across a calendar, a spreadsheet and a chat thread.',
    capabilities: [
      'Listings with photos, pricing and house rules, published from one place',
      'A single availability calendar per property — the source of truth for what is free',
      'Booking requests, confirmations, changes and cancellations on one timeline',
      'Owner and renter accounts, each seeing only what they should',
      'Pricing rules for weekends, longer stays and seasons',
      'A record of every booking, message and change, kept per property',
    ],
    audience:
      'Property owners and managers running short-stay or medium-term rentals — from a single unit to a handful of properties — who are currently holding it together with a calendar, a spreadsheet and WhatsApp.',
    differentiator:
      'The calendar and the bookings are the same data. A confirmed booking blocks the dates itself, so the double-booking that comes from updating one place and forgetting the other cannot happen.',
    notify: true,
    hasPage: true,
    seo: {
      title: 'Torvath Rentals — rental management for property owners',
      description:
        'Torvath Rentals is a rental management platform in development: listings, one availability calendar, and bookings in one place for property owners and short-stay hosts. Get notified when it launches.',
    },
  },
  {
    slug: 'onebook',
    name: 'OneBook',
    status: 'dev',
    summary:
      'A journal-first personal organiser: write or speak your day in, and it becomes tasks, notes and spending.',
    intro:
      'OneBook starts from the way people actually record a day — writing it down — and turns that into structure. You type or speak what happened and what is next; OneBook keeps the tasks, the notes and the money in one place instead of three apps that never agree.',
    capabilities: [
      'A day view that switches between list, timeline and month',
      'Tasks and notes captured in the same flow as the journal entry',
      'Spending capture, including recurring entries and receipts',
      'Shared expense groups for splitting costs, with multi-currency support',
      'Voice and chat capture for entries made on the move',
      'Offline-first on phone: entries are written locally and sync when there is a connection',
    ],
    audience:
      'People who already keep a journal, a task list and a spending tracker separately, and want one place that holds all three without turning the day into data entry.',
    differentiator:
      'Nothing has to be filed twice. One journal entry is the task, the note and the expense — the structure is derived from what you wrote, not typed into a second app afterwards.',
    notify: true,
    hasPage: true,
    seo: {
      title: 'OneBook — a journal-first organiser',
      description:
        'OneBook is a journal-first personal organiser in development by Torvath: write or speak your day in and it becomes tasks, notes and spending, offline-first on mobile. Get notified when it launches.',
    },
  },
]

export const productPageSlugs = products
  .filter((product) => product.hasPage)
  .map((product) => product.slug)

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
