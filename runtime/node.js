import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { Readable } from 'node:stream'
import { candidates, cacheControl, contentType } from './static.js'
import handler from './server.js'

const CLIENT_DIR = resolve(new URL('../client', import.meta.url).pathname)
const PORT = Number(process.env.PORT ?? 3000)
const HOST = process.env.HOST ?? '0.0.0.0'

async function resolveStatic(pathname) {
  for (const candidate of candidates(pathname)) {
    const file = join(CLIENT_DIR, candidate)
    if (!file.startsWith(CLIENT_DIR)) continue
    try {
      const stats = await stat(file)
      if (stats.isFile()) return { file, candidate, size: stats.size }
    } catch {
      // fall through to the next candidate
    }
  }
  return undefined
}

function toWebRequest(req) {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
  return new Request(url, {
    method: req.method,
    headers: req.headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? 'half' : undefined,
  })
}

async function writeWebResponse(res, response) {
  res.writeHead(response.status, Object.fromEntries(response.headers))
  if (!response.body) return res.end()
  // Piping the web stream keeps SSR streaming intact end to end.
  Readable.fromWeb(response.body).pipe(res)
}

const server = createServer((req, res) => {
  void (async () => {
    try {
      const asset = await resolveStatic(new URL(req.url ?? '/', 'http://x').pathname)
      if (asset) {
        res.writeHead(200, {
          'content-type': contentType(asset.candidate),
          'content-length': asset.size,
          'cache-control': cacheControl(asset.candidate),
        })
        return createReadStream(asset.file).pipe(res)
      }
      await writeWebResponse(res, await handler.fetch(toWebRequest(req)))
    } catch (error) {
      console.error(error)
      if (!res.headersSent) res.writeHead(500, { 'content-type': 'text/plain' })
      res.end('Internal Server Error')
    }
  })()
})

server.listen(PORT, HOST, () => {
  console.log(`torvath listening on http://${HOST}:${PORT}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}
