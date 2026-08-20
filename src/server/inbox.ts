// Server-only marker: importing this from a client module is a build error.
import '@tanstack/react-start/server-only'
import type { FormSource } from '~/lib/forms'
import { env } from './env'

/**
 * Delivery skeleton — and the conversion log.
 *
 * Both entry points log one structured line and return: no mail provider, no
 * database, nothing to leak. Swap the bodies for a real transport (Resend, SES,
 * Postmark, a CRM webhook) without touching the routes, the forms, or the
 * server functions that call them.
 *
 * The `[enquiry]` and `[signup]` lines are deliberately the analytics of record
 * for conversions. Page views come from Cloudflare Web Analytics, but the thing
 * that actually matters — someone got in touch, and which page prompted it —
 * is counted here, server-side, with no tracker in the browser.
 */

function describeSource(source?: FormSource) {
  return {
    page: source?.path ?? 'unknown',
    referrer: source?.referrer ?? 'direct',
    campaign: source?.campaign ?? 'none',
  }
}

export interface ContactRequest {
  name: string
  email: string
  company?: string | undefined
  projectType: string
  message: string
  source?: FormSource | undefined
  requestId: string
}

export async function deliverContactRequest(
  request: ContactRequest,
): Promise<void> {
  // TODO: send to env().CONTACT_TO through a real transport.
  console.info('[enquiry]', {
    to: env().CONTACT_TO,
    requestId: request.requestId,
    from: request.email,
    name: request.name,
    company: request.company || null,
    projectType: request.projectType,
    length: request.message.length,
    ...describeSource(request.source),
  })
}

export interface LaunchInterest {
  email: string
  product: string
  source?: FormSource | undefined
  requestId: string
}

export async function recordLaunchInterest(
  interest: LaunchInterest,
): Promise<void> {
  // TODO: persist to the mailing list of record.
  console.info('[signup]', {
    requestId: interest.requestId,
    product: interest.product,
    email: interest.email,
    ...describeSource(interest.source),
  })
}
