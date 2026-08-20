import { site } from './site'

/**
 * Privacy and terms copy.
 *
 * Written to describe what this site *actually* does today: two forms, and
 * cookieless aggregate analytics (Cloudflare Web Analytics) that stores nothing
 * on the visitor's device. No cookies, no cross-site identifiers, no
 * advertising trackers.
 *
 * If any of that changes — a different analytics provider, a chat widget, an
 * embedded video, anything that sets a cookie — this file changes in the same
 * commit, or these pages become false.
 */

export const legalUpdated = '19 August 2026'

export interface LegalSection {
  heading: string
  /** Paragraphs. */
  body: Array<string>
  /** Optional bullet list rendered under the paragraphs. */
  points?: Array<string>
}

export const privacySections: Array<LegalSection> = [
  {
    heading: 'Who this policy is from',
    body: [
      `This policy covers ${site.url.replace(/^https?:\/\//, '')}, the website of ${site.name}, a software engineering team working remote-first from India. It explains what the site collects, why, and what you can ask us to do about it.`,
    ],
  },
  {
    heading: 'What we collect',
    body: [
      'Only what you type into one of the two forms on this site, plus the standard technical records any web server keeps.',
    ],
    points: [
      'Contact form: your name, email address, an optional company name, the project type you select, and your message.',
      'Launch notification form: your email address and which product you asked to hear about.',
      'Form context: the page you submitted the form from, the site you came from if you followed a link, and any campaign tag in that link. It tells us which page prompted an enquiry — nothing about you.',
      'Server records: our hosting provider logs the usual technical details of a request — IP address, browser user agent, the URL requested and the time — for security and reliability.',
    ],
  },
  {
    heading: 'Analytics',
    body: [
      'We use Cloudflare Web Analytics to see which pages are read and roughly where visitors arrive from. It is deliberately the least invasive option available: it sets no cookies, stores nothing on your device, assigns you no identifier, and cannot follow you to any other website. What we see are counts — page views, referring sites, countries, page speed — never individuals.',
      'There is no way for us, or for Cloudflare, to connect those counts back to you. If you would rather not be counted at all, any content blocker will stop the request, and nothing on this site breaks as a result.',
    ],
  },
  {
    heading: 'What we do not collect',
    body: [
      'This site sets no cookies and stores nothing in your browser. There is no advertising or tracking pixel, no session recording, no heatmap, no cross-site identifier, no profiling and no automated decision-making. Nothing you send is used to build a marketing profile, and nothing is sold or rented to anyone.',
      'Because nothing is stored on your device, this site needs no cookie banner. That is a design decision, not an oversight.',
    ],
  },
  {
    heading: 'Why we use it',
    body: [
      'To reply to your enquiry and to have the conversation that follows it. If you asked to be notified about a product, to email you when that product launches — nothing else.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiries are kept while the conversation is active and for up to 24 months afterwards, so we have the history if you come back. Launch notification addresses are kept until you unsubscribe, or until 12 months after the product they relate to has launched. You can ask us to delete either sooner.',
    ],
  },
  {
    heading: 'Who else processes it',
    body: [
      'We keep the list of third parties as short as we can. Today it is:',
    ],
    points: [
      'Cloudflare, which hosts and serves this site, keeps the server records described above, and provides the cookieless analytics described above.',
      'Our email provider, which delivers your enquiry to us and our reply to you.',
      'Google Fonts (fonts.googleapis.com and fonts.gstatic.com), which serves the two typefaces this site uses. Loading them means Google receives your IP address and browser user agent. No cookies are set by that request.',
    ],
  },
  {
    heading: 'Where it is processed',
    body: [
      'We work from India, and the providers above may process data on servers outside your country. Where that happens we rely on the providers’ own transfer safeguards and contractual terms.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'The site is served over HTTPS, so what you submit is encrypted in transit. Access to enquiries is limited to the people at Torvath who need to answer them. No system is perfect; if something goes wrong that affects you, we will tell you rather than hope you do not notice.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'Under the Digital Personal Data Protection Act, 2023 — and equivalent rights elsewhere — you can ask us to show you what we hold about you, correct it, delete it, or stop using it. You can withdraw consent for launch emails at any time, either through the unsubscribe link or by replying to us.',
      `Email ${site.email} and we will act on it, normally within a few working days and in any case within 30 days. If you are not satisfied with how we handled a request, you can raise it with the relevant data protection authority.`,
    ],
  },
  {
    heading: 'Children',
    body: [
      'This is a business site and is not directed at children. We do not knowingly collect information from anyone under 18.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'If what the site collects changes — a different analytics provider, an embedded widget, anything that would set a cookie — this page is updated in the same change, and the date below moves with it.',
    ],
  },
  {
    heading: 'Contact',
    body: [`Questions about this policy: ${site.email}.`],
  },
]

export const termsSections: Array<LegalSection> = [
  {
    heading: 'About this site',
    body: [
      `${site.url.replace(/^https?:\/\//, '')} describes the services and products of ${site.name}. By using it you accept these terms. If you do not, please do not use the site.`,
    ],
  },
  {
    heading: 'This site is not an offer',
    body: [
      'Nothing here — a service description, a price discussion, a product status — is a binding offer or a contract on its own. Work is carried out under a separate written agreement covering scope, price, timelines, intellectual property, confidentiality and liability for that specific project. Where that agreement and this page differ, that agreement wins.',
    ],
  },
  {
    heading: 'Product status labels',
    body: [
      'Products on this site are labelled Live, In development, or Planned. Those labels describe where something is at the time of writing and nothing more. A product in development may change substantially, may launch later than expected, or may not launch at all. We publish no launch dates for that reason.',
    ],
  },
  {
    heading: 'Launch notifications',
    body: [
      'If you give us your email to hear about a product launch, we use it for that and nothing else. You can unsubscribe at any time, and we will not add you to anything you did not ask for.',
    ],
  },
  {
    heading: 'Acceptable use',
    body: [
      'Please do not attempt to break, overload, probe or gain unauthorised access to this site or the systems behind it, submit anything unlawful or misleading through the forms, or use them to send bulk or automated messages.',
    ],
  },
  {
    heading: 'Intellectual property',
    body: [
      `The content of this site — text, layout, design, the Torvath name and logo — belongs to ${site.name}. You may read it, link to it and quote it with attribution. You may not reuse the branding, or present the content as your own or as someone else's work.`,
      'Ownership of anything we build for a client is set by that project’s written agreement, not by this page.',
    ],
  },
  {
    heading: 'Availability and accuracy',
    body: [
      'We keep this site accurate and available, but we do not guarantee either. It is provided as it is: content can go out of date, and the site can be unavailable for maintenance or reasons outside our control.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'To the extent permitted by law, Torvath is not liable for indirect or consequential loss arising from use of this website, or from reliance on information published here without a written agreement in place. Nothing in these terms limits liability that cannot lawfully be limited.',
    ],
  },
  {
    heading: 'Links to other sites',
    body: [
      'Where this site links somewhere else, that destination has its own terms and privacy practices, and we are not responsible for its content.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute arising from this website.',
    ],
  },
  {
    heading: 'Changes to these terms',
    body: [
      'We may update this page as the site changes. The date below shows when it last changed; continuing to use the site after that means you accept the current version.',
    ],
  },
  {
    heading: 'Contact',
    body: [`Questions about these terms: ${site.email}.`],
  },
]
