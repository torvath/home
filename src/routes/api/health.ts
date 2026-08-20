import { createFileRoute } from '@tanstack/react-router'
import { services } from '~/content/services'
import { productPageSlugs } from '~/content/products'

/**
 * A server route: no component, so the handler owns the response outright.
 * A load-balancer probe never pays for React.
 */
export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: ({ context }) =>
        Response.json(
          {
            status: 'ok',
            services: services.length,
            productPages: productPageSlugs.length,
            requestId: context.requestId,
          },
          { headers: { 'cache-control': 'no-store' } },
        ),
    },
  },
})
