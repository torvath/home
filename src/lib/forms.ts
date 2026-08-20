import { z } from 'zod'

/**
 * Form contracts, isomorphic on purpose: the browser validates against exactly
 * the schema the server function re-validates against, so the two can never
 * drift apart.
 */

/**
 * Where the submission came from. Optional, non-identifying, and re-validated
 * server-side like everything else.
 */
export const sourceSchema = z.object({
  /** Path of the page the form was on. */
  path: z.string().trim().max(200).optional(),
  /** Origin of the referring site, never the full external URL. */
  referrer: z.string().trim().max(200).optional(),
  /** utm_source / utm_medium / utm_campaign, joined. */
  campaign: z.string().trim().max(200).optional(),
})

export type FormSource = z.infer<typeof sourceSchema>

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please tell us your name.')
    .max(100, 'Name must be under 100 characters.'),
  email: z
    .email('Enter a valid email address.')
    .max(255, 'Email must be under 255 characters.'),
  company: z
    .string()
    .trim()
    .max(120, 'Company must be under 120 characters.')
    .optional(),
  projectType: z.enum(['software', 'consulting', 'product', 'managed', 'unsure'], {
    message: 'Select a project type.',
  }),
  message: z
    .string()
    .trim()
    .min(10, 'A few more words, please — at least 10 characters.')
    .max(2000, 'Message must be under 2000 characters.'),
  /** Honeypot: real people leave this empty. */
  website: z.string().max(0).optional(),
  source: sourceSchema.optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export const notifySchema = z.object({
  email: z
    .email('That does not look like a valid email.')
    .max(255, 'Email must be under 255 characters.'),
  /** Which product the person asked to hear about. */
  product: z.string().trim().min(1).max(80),
  website: z.string().max(0).optional(),
  source: sourceSchema.optional(),
})

export type NotifyInput = z.infer<typeof notifySchema>

export const PROJECT_TYPES: Array<{ value: ContactInput['projectType']; label: string }> = [
  { value: 'software', label: 'Software development' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'product', label: 'Product' },
  { value: 'managed', label: 'Managed services' },
  { value: 'unsure', label: 'Not sure yet' },
]

/** Flattens a ZodError into { field: firstMessage }. */
export function fieldErrors<T extends Record<string, unknown>>(
  error: z.ZodError,
): Partial<Record<keyof T, string>> {
  const out: Partial<Record<keyof T, string>> = {}
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof T | undefined
    if (key && !out[key]) out[key] = issue.message
  }
  return out
}
