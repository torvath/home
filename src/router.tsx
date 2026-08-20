import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { NotFound } from './components/NotFound'
import { RouteError } from './components/RouteError'

export function getRouter() {
  return createRouter({
    routeTree,
    // Loaders re-run in the background after this window; the stale result is
    // rendered immediately so navigation never blocks on the network.
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultStaleTime: 30_000,
    defaultPendingMs: 250,
    defaultPendingMinMs: 400,
    defaultErrorComponent: RouteError,
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
