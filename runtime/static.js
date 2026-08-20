// Shared by every runtime adapter: resolve a request path to a file in the
// client output, honouring prerendered `index.html` directories.
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
}

export function contentType(pathname) {
  const dot = pathname.lastIndexOf('.')
  return (dot === -1 ? undefined : MIME[pathname.slice(dot)]) ?? 'application/octet-stream'
}

/**
 * Immutable for fingerprinted build assets, revalidate for everything else.
 * Prerendered HTML must never be cached hard, or a redeploy is invisible.
 */
export function cacheControl(pathname) {
  return pathname.startsWith('/assets/')
    ? 'public, max-age=31536000, immutable'
    : 'public, max-age=0, must-revalidate'
}

/** Candidate file paths for a request, most specific first. */
export function candidates(pathname) {
  // Reject traversal and encoded traversal outright.
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return []
  }
  if (decoded.includes('\0') || decoded.split('/').includes('..')) return []

  const clean = decoded.replace(/\/+$/, '')
  if (clean === '') return ['/index.html']
  if (/\.[^/]+$/.test(clean)) return [clean]
  return [`${clean}.html`, `${clean}/index.html`]
}
