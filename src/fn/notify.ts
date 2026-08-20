import { createServerFn } from '@tanstack/react-start'
import { notifySchema } from '~/lib/forms'
import { recordLaunchInterest } from '~/server/inbox'

/** "Get notified at launch" capture on product pages. */
export const subscribeToLaunch = createServerFn({ method: 'POST' })
  .validator(notifySchema)
  .handler(async ({ data, context }) => {
    if (data.website) {
      return { ok: true as const, requestId: context.requestId }
    }

    await recordLaunchInterest({
      email: data.email,
      product: data.product,
      source: data.source,
      requestId: context.requestId,
    })

    return { ok: true as const, requestId: context.requestId }
  })
