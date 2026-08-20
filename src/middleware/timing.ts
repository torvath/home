import { createMiddleware } from '@tanstack/react-start'

/**
 * Function middleware wraps every server function call on both sides of the
 * boundary. The client half sees network time; the server half sees work time.
 */
export const timingMiddleware = createMiddleware({ type: 'function' })
  .client(async ({ next }) => {
    const startedAt = performance.now()
    const result = await next()
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug(`[rpc] ${Math.round(performance.now() - startedAt)}ms`)
    }
    return result
  })
  .server(async ({ next }) => {
    const startedAt = performance.now()
    const result = await next()
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug(`[fn] ${Math.round(performance.now() - startedAt)}ms`)
    }
    return result
  })
