import { cp } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import type { Plugin, PluginOption } from 'vite'

/**
 * Deployment-runtime targeting.
 *
 * The application model is runtime-agnostic by construction: `src/server.ts`
 * exports a plain `{ fetch(request: Request): Promise<Response> }` built on Web
 * standards, and the build emits it as `dist/server/server.js` alongside the
 * static/prerendered output in `dist/client`.
 *
 * A "target" is therefore only a *host adapter* — a few dozen lines that own
 * the listening socket and static-file serving, then defer to that same fetch
 * handler. Nothing under `src/` changes, or even knows, which one is in play.
 *
 *   DEPLOY_TARGET=node  (default)   node dist/server/node.js
 *   DEPLOY_TARGET=bun               bun  dist/server/bun.js
 *   DEPLOY_TARGET=deno              deno run --allow-net --allow-read --allow-env dist/server/deno.js
 *   DEPLOY_TARGET=none              dist/server/server.js only — bring your own host
 *
 * Managed hosts (Vercel, Netlify, Cloudflare) publish their own TanStack Start
 * Vite plugins. Adding one is the same shape of change as this file: append it
 * to `plugins` in vite.config.ts and leave `src/` alone.
 */
export const DEPLOY_TARGETS = ['node', 'bun', 'deno', 'none'] as const
export type DeployTarget = (typeof DEPLOY_TARGETS)[number]

const RUNTIME_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'runtime',
)

/** Entry file each target needs copied next to the built fetch handler. */
const ENTRIES: Record<Exclude<DeployTarget, 'none'>, Array<string>> = {
  node: ['static.js', 'node.js'],
  bun: ['static.js', 'bun.js'],
  deno: ['static.js', 'deno.js'],
}

export function resolveDeployTarget(
  raw = process.env.DEPLOY_TARGET,
): DeployTarget {
  if (!raw) return 'node'
  if ((DEPLOY_TARGETS as ReadonlyArray<string>).includes(raw)) {
    return raw as DeployTarget
  }
  throw new Error(
    `Unknown DEPLOY_TARGET "${raw}". Expected one of: ${DEPLOY_TARGETS.join(', ')}`,
  )
}

export function deploymentPlugins(
  target: DeployTarget = resolveDeployTarget(),
): Array<PluginOption> {
  if (target === 'none') return []

  const plugin: Plugin = {
    name: 'torvath:deploy-target',
    apply: 'build',
    // 'ssr' is TanStack Start's server environment — the one whose output
    // the adapter wraps.
    async closeBundle() {
      if (this.environment?.name !== 'ssr') return

      const outDir = path.resolve(
        this.environment.config.root,
        this.environment.config.build.outDir,
      )

      await Promise.all(
        ENTRIES[target].map((file) =>
          cp(path.join(RUNTIME_DIR, file), path.join(outDir, file)),
        ),
      )

      this.info(
        `deploy target "${target}" → ${path.relative(
          this.environment.config.root,
          path.join(outDir, `${target}.js`),
        )}`,
      )
    },
  }

  return [plugin]
}
