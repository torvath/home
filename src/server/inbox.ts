// Server-only marker: importing this from a client module is a build error.
import '@tanstack/react-start/server-only'
import { env as cloudflareEnv } from 'cloudflare:workers'
import type { FormSource } from '~/lib/forms'
import { env } from './env'

/**
 * Contact enquiries go out over email (Resend) — someone is waiting on a
 * reply, so it needs to land somewhere a person actually checks. Launch
 * interest is list-building for a future send, so it's durable storage (D1)
 * instead: nobody needs paging the moment someone joins a waitlist.
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
  const { RESEND_API_KEY, RESEND_FROM, CONTACT_TO } = env()

  console.info('[enquiry]', {
    to: CONTACT_TO,
    requestId: request.requestId,
    from: request.email,
    name: request.name,
    company: request.company || null,
    projectType: request.projectType,
    length: request.message.length,
    ...describeSource(request.source),
  })

  if (!RESEND_API_KEY) {
    console.warn('[enquiry] RESEND_API_KEY not set — email not sent')
    return
  }

  const lines = [
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    `Company: ${request.company || '—'}`,
    `Project type: ${request.projectType}`,
    `Page: ${request.source?.path ?? 'unknown'}`,
    `Referrer: ${request.source?.referrer ?? 'direct'}`,
    `Campaign: ${request.source?.campaign ?? 'none'}`,
    '',
    request.message,
  ]

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [CONTACT_TO],
      reply_to: request.email,
      subject: `New enquiry from ${request.name}`,
      text: lines.join('\n'),
    }),
  })

  if (!res.ok) {
    console.error('[enquiry] Resend delivery failed', {
      requestId: request.requestId,
      status: res.status,
      body: await res.text(),
    })
    throw new Error('Failed to deliver contact request')
  }
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
  console.info('[signup]', {
    requestId: interest.requestId,
    product: interest.product,
    email: interest.email,
    ...describeSource(interest.source),
  })

  const source = describeSource(interest.source)

  await cloudflareEnv.DB.prepare(
    `INSERT INTO launch_interest
       (request_id, email, product, source_path, source_referrer, source_campaign)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT (email, product) DO NOTHING`,
  )
    .bind(
      interest.requestId,
      interest.email,
      interest.product,
      source.page,
      source.referrer,
      source.campaign,
    )
    .run()
}
