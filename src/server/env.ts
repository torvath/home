// Server-only marker: importing this module (directly or transitively) from a
// client module is a build error, not a runtime surprise.
import '@tanstack/react-start/server-only'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  /** Public origin. Used for sitemap <loc> entries at build time. */
  SITE_URL: z.url().default('https://torvath.com'),
  /** Where contact-form submissions are delivered. */
  CONTACT_TO: z.email().default('hello@torvath.com'),
})

export type Env = z.infer<typeof envSchema>

let cached: Env | undefined

export function env(): Env {
  if (cached) return cached
  const parsed = envSchema.safeParse(process.env)
  if (!parsed.success) {
    throw new Error(
      `Invalid server environment:\n${z.prettifyError(parsed.error)}`,
    )
  }
  cached = parsed.data
  return cached
}
