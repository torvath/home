import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { services } from './src/content/services.ts'
import { productPageSlugs } from './src/content/products.ts'

const SITE_URL = process.env.SITE_URL ?? 'https://torvath.com'

/**
 * Every marketing URL, derived from the same content modules the pages render
 * from. Add a service or a product in `src/content/*` and its page is
 * prerendered and listed in the sitemap automatically — the two can't drift.
 */
const marketingPages = [
  { path: '/', priority: 1, changefreq: 'weekly' as const },
  { path: '/services', priority: 0.9, changefreq: 'monthly' as const },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
    changefreq: 'monthly' as const,
  })),
  { path: '/how-we-work', priority: 0.7, changefreq: 'monthly' as const },
  { path: '/products', priority: 0.7, changefreq: 'weekly' as const },
  ...productPageSlugs.map((slug) => ({
    path: `/products/${slug}`,
    priority: 0.6,
    changefreq: 'weekly' as const,
  })),
  { path: '/about', priority: 0.6, changefreq: 'monthly' as const },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' as const },
  { path: '/legal/privacy', priority: 0.3, changefreq: 'yearly' as const },
  { path: '/legal/terms', priority: 0.3, changefreq: 'yearly' as const },
]

export default defineConfig(({ command }) => ({
  resolve: {
    alias: { '~': new URL('./src', import.meta.url).pathname },
  },
  server: {
    // Miniflare's observability store writes to .wrangler/state continuously;
    // without this, every write is picked up as a file change and the dev
    // server never finishes starting.
    watch: { ignored: ['**/.wrangler/**'] },
  },
  plugins: [
    // Must precede tanstackStart() — targets the Cloudflare Workers runtime
    // for both `vite dev` and `vite build`.
    cloudflare({
      viteEnvironment: { name: 'ssr' },
      // Observability tracing runs continuously in local dev and adds real
      // overhead on top of workerd's already-slow cold start. Keep it on for
      // the deployed Worker (wrangler.jsonc), skip it for `vite dev`.
      config:
        command === 'serve' ? { observability: { enabled: false } } : undefined,
    }),
    tanstackStart({
      // Full-document SSR is the default; individual routes opt down via `ssr`.
      srcDirectory: 'src',
      router: {
        routesDirectory: 'routes',
        generatedRouteTree: 'routeTree.gen.ts',
      },
      // Hard boundary: anything marked server-only that leaks into a client
      // module graph fails the build instead of silently shipping to browsers.
      importProtection: {
        enabled: true,
        behavior: { dev: 'error', build: 'error' },
        client: {
          specifiers: ['node:fs', 'node:crypto', 'node:child_process'],
          files: [/src[\\/]server[\\/]/],
        },
      },
      // Every page of this site is static content, so every page is prerendered
      // to flat HTML: a crawler gets the full document with no JS execution and
      // no round trip. Crawling is off so only what is listed here is baked.
      prerender: {
        enabled: true,
        crawlLinks: false,
        failOnError: true,
        autoStaticPathsDiscovery: false,
      },
      pages: marketingPages.map((page) => ({
        path: page.path,
        sitemap: { priority: page.priority, changefreq: page.changefreq },
      })),
      sitemap: {
        enabled: true,
        host: SITE_URL,
      },
    }),
    viteReact(),
    tailwindcss(),
  ]
}))
