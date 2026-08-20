import { candidates, cacheControl, contentType } from './static.js'
import handler from './server.js'

const CLIENT_DIR = new URL('../client/', import.meta.url)
const PORT = Number(Bun.env.PORT ?? 3000)

export default {
  port: PORT,
  idleTimeout: 60,
  async fetch(request) {
    const { pathname } = new URL(request.url)
    for (const candidate of candidates(pathname)) {
      const file = Bun.file(new URL(`.${candidate}`, CLIENT_DIR))
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            'content-type': contentType(candidate),
            'cache-control': cacheControl(candidate),
          },
        })
      }
    }
    return handler.fetch(request)
  },
}
