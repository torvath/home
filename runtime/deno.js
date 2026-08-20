import { candidates, cacheControl, contentType } from './static.js'
import handler from './server.js'

const CLIENT_DIR = new URL('../client/', import.meta.url)
const PORT = Number(Deno.env.get('PORT') ?? 3000)

Deno.serve({ port: PORT }, async (request) => {
  const { pathname } = new URL(request.url)
  for (const candidate of candidates(pathname)) {
    try {
      const file = await Deno.open(new URL(`.${candidate}`, CLIENT_DIR))
      return new Response(file.readable, {
        headers: {
          'content-type': contentType(candidate),
          'cache-control': cacheControl(candidate),
        },
      })
    } catch {
      // fall through to the next candidate
    }
  }
  return handler.fetch(request)
})
