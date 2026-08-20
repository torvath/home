import { createServerFn } from '@tanstack/react-start'
import { contactSchema } from '~/lib/forms'
import { deliverContactRequest } from '~/server/inbox'

/**
 * The RPC boundary for the contact form.
 *
 * Route and component code never touches delivery directly: it calls this,
 * the schema is re-validated server-side, and `~/server/*` stays server-only.
 */
export const submitContactRequest = createServerFn({ method: 'POST' })
  .validator(contactSchema)
  .handler(async ({ data, context }) => {
    // Honeypot filled in — accept silently so a bot learns nothing.
    if (data.website) {
      return { ok: true as const, requestId: context.requestId }
    }

    await deliverContactRequest({
      name: data.name,
      email: data.email,
      company: data.company,
      projectType: data.projectType,
      message: data.message,
      source: data.source,
      requestId: context.requestId,
    })

    return { ok: true as const, requestId: context.requestId }
  })
