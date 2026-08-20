import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'

/**
 * The only server entry point, and it is runtime-agnostic: a Web `Request` in,
 * a Web `Response` out. `defaultStreamHandler` renders the document with
 * `renderToReadableStream` and flushes the shell before suspended subtrees
 * resolve, which is what makes route-level streaming work end to end.
 *
 * Which runtime actually invokes this fetch handler is decided at build time
 * in `deploy.config.ts` — nothing below `src/` knows or cares.
 */
const fetch = createStartHandler(defaultStreamHandler)

export default { fetch }
