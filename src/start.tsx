import { createStart, createCsrfMiddleware } from '@tanstack/react-start'
import { requestContextMiddleware } from './middleware/request-context'
import { timingMiddleware } from './middleware/timing'

/**
 * Server functions are same-origin RPC endpoints; reject cross-site callers.
 */
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
})

export const startInstance = createStart(() => ({
  /**
   * Full-document SSR is the app-wide default. Routes that gain nothing from
   * server HTML opt down individually (`ssr: 'data-only'` or `ssr: false`).
   */
  defaultSsr: true,
  requestMiddleware: [requestContextMiddleware, csrfMiddleware],
  functionMiddleware: [timingMiddleware],
}))
