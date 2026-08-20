/**
 * Analytics and search-console configuration, read from build-time env.
 *
 * Deliberately cookieless. Cloudflare Web Analytics identifies nothing, stores
 * nothing on the visitor's device, and needs no consent banner — which is why
 * `src/content/legal.ts` can still promise no cookies and no tracking. Swapping
 * this for anything that sets a cookie means rewriting that page in the same
 * commit.
 *
 * Every value is optional: with no token set, nothing is emitted at all, so dev
 * and preview builds send no traffic anywhere.
 */

const token = import.meta.env.VITE_CF_BEACON_TOKEN as string | undefined

export const analytics = {
  /** Cloudflare Web Analytics site token (Dashboard → Web Analytics → site). */
  cloudflareToken: token,
  /** Production only — local page views would pollute the numbers. */
  cloudflareEnabled: Boolean(token) && import.meta.env.PROD,
  /** `google-site-verification` content value, if verifying by meta tag. */
  googleVerification: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as
    | string
    | undefined,
  /** Bing Webmaster Tools `msvalidate.01` value. */
  bingVerification: import.meta.env.VITE_BING_SITE_VERIFICATION as
    | string
    | undefined,
}
