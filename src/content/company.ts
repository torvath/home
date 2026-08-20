/**
 * How we work, the stack, the FAQ, and the About copy.
 *
 * No fabricated proof anywhere on this site: no client logos, testimonials,
 * case studies, ratings or "50+ projects delivered". Where a fact is not
 * settled it is left out rather than guessed — every string here is published.
 */

/** `/how-we-work` — the section that differentiates a small firm. */
export const processPoints = [
  {
    n: '01',
    title: 'Direct access.',
    body: 'No account managers, no layers. You talk to the engineers building your system.',
    detail:
      'Every conversation — scoping, trade-offs, bad news — happens with the people writing the code. Nothing is relayed, so nothing is lost on the way.',
  },
  {
    n: '02',
    title: 'Fixed scope or embedded.',
    body: 'Take a defined project at a fixed price, or embed with your team on a retainer.',
    detail:
      'A defined project gets a written scope and a price before work starts. An embedded engagement buys a predictable block of engineering time each month, directed by you.',
  },
  {
    n: '03',
    title: 'We stay after launch.',
    body: 'Software is not done when it ships. We maintain what we build.',
    detail:
      'Monitoring, patching and iteration are part of the offer, not an upsell. If you would rather run it yourself, you get the handover and the documentation to do that.',
  },
] as const

/** The steps of a typical engagement, start to finish. */
export const engagementSteps = [
  {
    title: 'Conversation',
    body: 'A short call about what you are building and where it is now. Enough to tell whether we are the right team for it.',
  },
  {
    title: 'Written plan',
    body: 'Scope, approach, risks and price in writing. It is yours to keep, whether or not you build it with us.',
  },
  {
    title: 'Build',
    body: 'Short cycles with working software at the end of each one. You see progress in the app, not in a status report.',
  },
  {
    title: 'Launch and stay',
    body: 'Deployment, monitoring and handover — then maintenance and iteration if you want us to keep operating it.',
  },
] as const

/** `/about`. */
export const about = {
  intro:
    'Torvath is a small engineering team. We design, build and maintain software for other businesses, and we build and operate products of our own.',
  body: [
    'The team is small on purpose. It means the person you brief is the person who writes the code, and that a decision does not have to survive three rounds of relay before it reaches a keyboard. It also means we take on work we can actually finish — a project at a time, seen through rather than parked.',
    'We work remote-first from India, with clients wherever they are. Most engagements start the same way: a conversation, then a written plan with scope, approach and price, which is yours whether or not you build it with us.',
    'Between client projects we build our own software. Torvath Rentals is a rental management platform for property owners; OneBook is a journal-first organiser that turns a written or spoken day into tasks, notes and spending. Both are in development, and both are the reason we are honest about maintenance: we run what we ship.',
  ],
  principles: [
    {
      title: 'Own the outcome',
      body: 'We are responsible for software that works in production, not for a delivery that clears a checklist.',
    },
    {
      title: 'Say the hard thing early',
      body: 'Estimates slip and approaches turn out wrong. You hear it from us when it happens, not at the deadline.',
    },
    {
      title: 'Build what will still be maintainable',
      body: 'We choose boring, well-supported technology unless there is a real reason not to. Someone has to run this in two years.',
    },
  ],
} as const

/**
 * `/technology` band — wide-tracked small caps, not a logo wall.
 * Kept to what the team actually ships in; widen it as that changes.
 */
export const technology = {
  stack: [
    'TypeScript',
    'React',
    'React Native',
    'Node',
    'Cloudflare Workers',
    'SQL',
  ],
  note: 'We pick the stack to fit the problem and the people who will maintain it — not the other way round.',
} as const

/** Rendered on `/contact` and emitted as FAQPage structured data. */
export const faqs = [
  {
    q: 'How do projects usually start?',
    a: 'With a short conversation about what you are building and where it is now. If it looks like a fit, the next step is a written scope with an approach and a price before any code is written.',
  },
  {
    q: 'Do you work fixed-price or on a retainer?',
    a: 'Both. A defined project can be fixed-scope and fixed-price. Ongoing work — embedded engineering or maintenance — runs on a monthly retainer sized to the system rather than to a headcount.',
  },
  {
    q: 'Who will I actually be working with?',
    a: 'The engineers building your system. There are no account managers in between, which is the main practical advantage of working with a team this size.',
  },
  {
    q: 'Where are you based, and does it matter?',
    a: 'We work remote-first from India, with clients wherever they are. In practice the working day overlaps most of Europe and Asia, and we set a fixed window for calls with teams further west.',
  },
  {
    q: 'Can you take over a project someone else started?',
    a: 'Yes. That usually begins as a review of the existing code and infrastructure, so both sides know what is really there before committing to a plan.',
  },
  {
    q: 'What happens after launch?',
    a: 'We can keep operating the software — monitoring, patching, and a standing block of improvement time each month — or hand it over with the documentation your team needs to run it.',
  },
] as const
