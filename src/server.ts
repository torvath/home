import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'

/**
 * The server entry point: a Web `Request` in, a Web `Response` out.
 * `defaultStreamHandler` renders the document with `renderToReadableStream`
 * and flushes the shell before suspended subtrees resolve, which is what
 * makes route-level streaming work end to end.
 *
 * Deployed to Cloudflare Workers via `@cloudflare/vite-plugin` (see
 * vite.config.ts) and `@tanstack/react-start/server-entry`, referenced as
 * `main` in wrangler.jsonc.
 */
const fetch = createStartHandler(defaultStreamHandler)

export default { fetch }
