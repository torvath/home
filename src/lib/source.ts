import type { FormSource } from './forms'

/**
 * Where an enquiry came from, captured at submit time and logged server-side.
 *
 * This is the conversion half of the analytics story, and it needs no tracker:
 * the form already posts to our own server function, so the page, the referring
 * site and the campaign tag ride along with it. Nothing is stored in the
 * browser, and nothing is shared with a third party.
 *
 * Only the referrer's *origin* is kept — "which site sent them", not the exact
 * page someone was reading elsewhere.
 *
 * Note: campaign tags are read from the current URL only. A visitor who lands
 * on a UTM-tagged link and then navigates to /contact client-side arrives
 * without them; their referring site still comes through. Persisting
 * first-touch campaign data would mean writing to the visitor's device, which
 * is exactly what this site avoids.
 */
export function captureSource(): FormSource | undefined {
  if (typeof window === 'undefined') return undefined

  const params = new URLSearchParams(window.location.search)
  const campaign = [
    params.get('utm_source'),
    params.get('utm_medium'),
    params.get('utm_campaign'),
  ]
    .filter(Boolean)
    .join(' / ')

  let referrer: string | undefined
  try {
    referrer = document.referrer ? new URL(document.referrer).origin : undefined
  } catch {
    referrer = undefined
  }
  // Same-site navigation is not a referral worth recording.
  if (referrer === window.location.origin) referrer = undefined

  return {
    path: window.location.pathname.slice(0, 200),
    ...(referrer ? { referrer: referrer.slice(0, 200) } : {}),
    ...(campaign ? { campaign: campaign.slice(0, 200) } : {}),
  }
}
