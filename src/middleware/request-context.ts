import { createMiddleware } from '@tanstack/react-start'
import { setResponseHeader } from '@tanstack/react-start/server'

/**
 * Request middleware runs once per HTTP request, ahead of both the router
 * handler and any server function. It is the right place for cross-cutting
 * concerns that need the raw Request/Response.
 */
export const requestContextMiddleware = createMiddleware({ type: 'request' })
  .server(async ({ next, request, handlerType }) => {
    const startedAt = performance.now()
    const requestId =
      request.headers.get('x-request-id') ?? crypto.randomUUID()

    const result = await next({ context: { requestId } })

    const ms = Math.round(performance.now() - startedAt)
    setResponseHeader('x-request-id', requestId)
    setResponseHeader('server-timing', `${handlerType};dur=${ms}`)

    return result
  })
