# Torvath — HomePage

The Torvath marketing site: TanStack Start, Tailwind v4, dark-only brand system,
and — the point of this rewrite — **a real page per topic instead of one long
scrolling page**.

```bash
pnpm install
pnpm db:migrate:local   # apply migrations/*.sql to the local D1 — once, before the first `pnpm dev`
pnpm dev                # http://localhost:3000 (Cloudflare Workers runtime, via @cloudflare/vite-plugin)
pnpm build               # dist/client (15 prerendered pages) + Worker bundle
pnpm deploy               # build, then wrangler deploy
pnpm typecheck
pnpm db:migrate:remote  # apply migrations/*.sql to the deployed D1
```

---

## Why multiple pages

The Lovable design (`Torvath Launchpad.zip`) put every section on `/` and
navigated with `#anchors`. One URL can only carry one title, one description and
one canonical, so "consulting", "managed services" and "Torvath Rentals" were
all competing as fragments of a single document that ranked for none of them.

Each section is now its own route, with its own `<title>`, meta description,
canonical URL, breadcrumb trail and schema.org graph:

| URL | Page | Prerendered | In sitemap |
| --- | --- | --- | --- |
| `/` | Home — hero, summary of each section | ✅ | ✅ (1.0) |
| `/services` | All four services | ✅ | ✅ (0.9) |
| `/services/software-development` | Service detail | ✅ | ✅ (0.8) |
| `/services/consulting` | Service detail | ✅ | ✅ (0.8) |
| `/services/products` | Service detail | ✅ | ✅ (0.8) |
| `/services/managed-services` | Service detail | ✅ | ✅ (0.8) |
| `/how-we-work` | Process + engagement steps | ✅ | ✅ (0.7) |
| `/products` | Product list with status labels | ✅ | ✅ (0.7) |
| `/products/torvath-rentals` | Product detail + launch capture | ✅ | ✅ (0.6) |
| `/products/onebook` | Product detail + launch capture | ✅ | ✅ (0.6) |
| `/about` | Company, principles, stack | ✅ | ✅ (0.6) |
| `/careers` | Hiring status — honest "no open roles" until there's a real one | ✅ | ✅ (0.4) |
| `/contact` | Contact form + FAQ | ✅ | ✅ (0.8) |
| `/legal/privacy` | Privacy policy | ✅ | ✅ (0.3) |
| `/legal/terms` | Terms of use | ✅ | ✅ (0.3) |
| `/api/health` | JSON probe, no React | — | ❌ |

Everything is static content, so **every page is prerendered to flat HTML**: a
crawler gets the complete document with no JS execution and no round trip.

## The SEO plumbing

- **`src/lib/seo.ts`** — every route calls `seo()` from its `head()`. One place
  builds the title, description, canonical, Open Graph and Twitter tags, so a
  page cannot ship with the site-wide title or a missing canonical.
- **Canonicals** — declared per page. The root route deliberately does *not*
  declare one: head links merge by `rel` and the first wins, so a canonical in
  `__root.tsx` would silently overwrite every child's.
- **`src/lib/structured-data.ts`** — schema.org graphs rendered by
  `<JsonLd />`: `Organization` + `WebSite` site-wide, plus `Service`,
  `SoftwareApplication`, `BreadcrumbList`, `FAQPage`, `ContactPage`,
  `AboutPage` per route.
- **Breadcrumbs** — `src/components/layout/breadcrumbs.tsx` renders the visible
  trail *and* the matching `BreadcrumbList`.
- **Sitemap + robots** — `vite.config.ts` derives the page list from the same
  content modules the pages render from, so adding a service in
  `src/content/services.ts` prerenders its page and lists it in
  `dist/client/sitemap.xml` automatically. `public/robots.txt` points at it.
- **Internal linking** — the footer links every page from every page; each home
  section links through to its fuller page.
- **One `<h1>` per page**, supplied by `PageHeader`.
- **404s are real 404s** — unknown `/services/:slug` or `/products/:slug`
  throws `notFound()` in the loader rather than rendering an empty page.
- **No redirect hop to the canonical URL** — every canonical, sitemap `<loc>`
  and internal `<Link>` uses the no-trailing-slash form (`/services`, not
  `/services/`). Workers Assets' default `html_handling` (`auto-trailing-slash`)
  would 307 that exact URL to add a slash before serving it — every crawler hit
  a redirect on every page but the homepage. `wrangler.jsonc` sets
  `assets.html_handling: "drop-trailing-slash"` so the URL already in use
  serves directly with a 200.

Set the public origin before a production build — it is baked into canonicals,
OG URLs, JSON-LD and the sitemap:

```bash
SITE_URL=https://torvath.com VITE_SITE_URL=https://torvath.com pnpm build
```

## Editing content

Copy lives in `src/content/*` — no JSX edits needed for ordinary changes. There
are no placeholder strings left: where a fact is not settled (a founding year, a
street address) it is **left out** rather than guessed, because everything in
these files is published.

| File | Holds |
| --- | --- |
| `src/content/site.ts` | Name, tagline, email, location, nav, footer columns, OG image |
| `src/content/services.ts` | The four services: summary, intro, bullet points, engagement shape, per-page SEO title/description |
| `src/content/products.ts` | Torvath Rentals and OneBook: `status` (`live` / `dev` / `planned`), capabilities, audience, differentiator |
| `src/content/company.ts` | How-we-work points, engagement steps, About copy, stack, FAQ |
| `src/content/careers.ts` | Hiring status copy — replace with the listing itself when a role opens |
| `src/content/legal.ts` | Privacy and terms copy, and the "last updated" date |

Adding a service or a product to those arrays is enough: the card, the page, the
prerender entry, the sitemap row and the structured data all follow.

**House rule, carried over from the original brief:** no fabricated proof — no
client logos, testimonials, case studies, ratings, launch dates or user counts.
An unbuilt product with an honest `IN DEVELOPMENT` label reads as momentum; a
fake download button reads as a company that cannot ship.

## Design system

Dark only. Palette sampled from the logo, defined once in `src/styles.css` as
Tailwind v4 theme tokens: `#050607` canvas, `#0e1114` surface, `#1c2126`
hairline, `#00b6c4` teal, `#f49f08` amber, `#e7ecf3` text.

The teal→amber gradient is **punctuation, not paint** — thin rules, one
underlined word in the hero, the rule under the active nav item, the footer top rule. Custom
utilities carry the logo's geometry: `clip-facet`, `clip-facet-sm`,
`underline-brand`, `rule-brand`, `label-caps`, `hero-facets`, `grid-hairlines`,
`fade-up` (which respects `prefers-reduced-motion`).

Type: Space Grotesk for display, Inter for body, both from Google Fonts with
`preconnect`.

Brand assets in `public/` are generated from `public/logo.png`:
`torvath-mark.png` (the T), `torvath-lockup.png` (full lockup),
`torvath-wordmark.png`, `favicon.png`, `apple-touch-icon.png`, and
`og-image.png` (1200×630 social card).

## Forms

Both forms validate in the browser against the same Zod schema the server
re-validates against (`src/lib/forms.ts`), post through a server function, and
carry a honeypot field. They go to different places on purpose — a contact
enquiry needs a reply, launch interest needs a durable list — so the two
delivery paths in `src/server/inbox.ts` are not symmetric:

```
src/components/sections/contact-form.tsx  →  src/fn/contact.ts  →  src/server/inbox.ts  →  Resend (email)
src/components/sections/notify-form.tsx   →  src/fn/notify.ts   →  src/server/inbox.ts  →  D1 (launch_interest table)
```

**Contact enquiries → email.** `deliverContactRequest` posts to the Resend API
directly (`fetch`, no SDK) as `RESEND_FROM` → `CONTACT_TO`, with the sender's
address as `reply_to`. If `RESEND_API_KEY` is unset it logs a warning and skips
the send rather than failing — safe for local dev, but it means a submission
with no key configured *looks* successful in the UI while no email goes out.

**Launch interest → D1.** `recordLaunchInterest` inserts into the
`launch_interest` table (schema: `migrations/0001_launch_interest.sql`) via
the `DB` binding, accessed through `import { env } from 'cloudflare:workers'`
— the Cloudflare-documented way to reach bindings from a `createServerFn`
handler. A repeat signup for the same email + product is a silent no-op
(`ON CONFLICT DO NOTHING`), not an error.

Both paths log a structured `[enquiry]` / `[signup]` line first regardless of
whether delivery succeeds — see [Analytics](#analytics).

### Environment variables

| Var | Where it's set | Notes |
| --- | --- | --- |
| `CONTACT_TO` | `wrangler.jsonc` → `vars` | Not secret — committed, always deployed correctly |
| `RESEND_FROM` | `wrangler.jsonc` → `vars` | Must be on a Resend-verified domain, or delivery fails. Falls back to `onboarding@resend.dev`, which only delivers to the Resend account's own email |
| `RESEND_API_KEY` | `wrangler secret put RESEND_API_KEY` | **Never** put this in `wrangler.jsonc` or the dashboard's "Variables and secrets" UI — see the callout below |
| `DB` | `wrangler.jsonc` → `d1_databases` | Bound automatically, nothing to set |

Locally, all of the above are read from `.env` (see `.env.example`); `wrangler
types` (the `cf-typegen` script) regenerates `worker-configuration.d.ts` from
`wrangler.jsonc` whenever a binding or var changes.

> **Why secrets and vars live in different places.** Cloudflare Workers
> deploys treat `wrangler.jsonc` as the source of truth for non-secret `vars`
> — anything typed into the dashboard's "Variables and secrets" panel instead
> gets silently wiped on the next deploy, because the deploy step re-asserts
> the committed config rather than merging with it. Secrets (`wrangler secret
> put`) are the one channel meant to survive redeploys, which is why
> `RESEND_API_KEY` is set that way and the other two are committed as `vars`
> instead of relying on dashboard state at all. ([cloudflare/workers-sdk#8871](https://github.com/cloudflare/workers-sdk/issues/8871))

## Architecture

Full-document SSR — there is no `index.html`. `src/routes/__root.tsx` owns
`<html>`, `<head>` and `<body>`; `<HeadContent />` emits the merged `head()` of
every matched route; `<Scripts />` must stay last in `<body>`.

The server-only boundary is enforced by the build, not by convention: every
module under `src/server/` opens with
`import '@tanstack/react-start/server-only'`, and `vite.config.ts` fails the
build (dev *and* production) if one reaches a client module graph.

```
wrangler.jsonc           Cloudflare Workers config (entry, assets, compat flags)
src/
  client.tsx            hydrateRoot(document, …)
  server.ts             createStartHandler(defaultStreamHandler)
  router.tsx            getRouter() + Register declaration
  start.tsx             createStart(): defaultSsr, request + function middleware
  routes/               file-based routes — one file per URL
  content/              all site copy (edit here)
  components/
    layout/             header, footer, logo, breadcrumbs, page header
    sections/           hero, services grid, process, products, forms, FAQ, CTA
    ui/                 button classes, status badge
  fn/                   server functions — the RPC boundary
  server/               server-only: env, delivery
  lib/                  seo, structured data, form schemas, cn
  middleware/           request + function middleware
```

## Local development

`pnpm dev` runs the real Workers runtime locally (`workerd`, via
`@cloudflare/vite-plugin`), not a Node approximation — expect a slow cold
start (bindings + the whole SSR entry get bundled and booted before the
server can listen) and a slower reload on every save than plain Vite. That's
inherent to the plugin, not a misconfiguration
([cloudflare/workers-sdk#13425](https://github.com/cloudflare/workers-sdk/issues/13425)).

Two things in `vite.config.ts` exist specifically to keep local dev usable:

- **`server.watch.ignored: ['**/.wrangler/**']`** — Miniflare's local state
  (including the observability trace store, if enabled) writes to
  `.wrangler/state` continuously. Without this, Vite's file watcher treats
  every one of those writes as a source change and loops on HMR forever,
  so the dev server never finishes starting.
- **`cloudflare({ config: command === 'serve' ? { observability: { enabled: false } } : undefined })`**
  — the deployed Worker keeps `observability.enabled: true` from
  `wrangler.jsonc` (see there for the local-tracing feature this powers for
  AI coding agents), but it's turned off for `vite dev` to cut the
  continuous trace-capture overhead on top of the already-slow cold start.

## Deployment

Cloudflare Workers, via `@cloudflare/vite-plugin` (`vite.config.ts`) and
`wrangler.jsonc`. `src/server.ts`'s `{ fetch }` handler is bundled by
`@tanstack/react-start/server-entry`, wrangler.jsonc's `main`; static assets
(`dist/client`) are served by the platform's `assets` binding, and only
requests that miss a static file (server functions, `/api/health`, unknown
routes) reach the Worker.

```bash
pnpm build            # dist/client + Worker bundle
pnpm deploy            # build, then wrangler deploy
```

Connected to Cloudflare's Git integration (Workers Builds), pushes to the
production branch build and deploy automatically — build command
`pnpm build`, deploy command `npx wrangler deploy`.

## Analytics

Deliberately cookieless, in three parts:

| What | Where | Cost to the visitor |
| --- | --- | --- |
| Search performance — queries, impressions, CTR, indexing | Google Search Console + Bing Webmaster | Nothing. No script; verify by DNS, or set `VITE_GOOGLE_SITE_VERIFICATION` / `VITE_BING_SITE_VERIFICATION` for a meta tag |
| Page views, referrers, countries, page speed | Cloudflare Web Analytics — `src/lib/analytics.ts`, beacon rendered in `__root.tsx` | ~1KB deferred script, no cookies, no device storage, no identifier |
| Conversions — enquiries and launch signups, and which page produced them | `src/server/inbox.ts`, logged server-side | Nothing. No tracker involved |

Set `VITE_CF_BEACON_TOKEN` to switch the beacon on. Without it — and in every
dev build — nothing is emitted at all.

The conversion half needs no third party because the forms already post to our
own server function: `src/lib/source.ts` attaches the page, the referring site's
origin and any `utm_*` tag, and `inbox.ts` logs them as `[enquiry]` / `[signup]`
lines. Campaign tags are read from the current URL only — a visitor who lands on
a tagged link and then navigates to `/contact` arrives without them, because
persisting first-touch attribution would mean writing to their device.

No cookie banner is needed, and that is not an accident: nothing on this site
stores anything in the browser.

## The legal pages are load-bearing

`src/content/legal.ts` describes what this site actually does today: two forms,
cookieless aggregate analytics, **no cookies, no cross-site identifiers, no
advertising trackers**, and exactly three third parties (Cloudflare, email,
Google Fonts). That is currently true — the app sets no cookies at all.

If that ever changes — a different analytics provider, a chat widget, an
embedded video, anything that sets a cookie — `src/content/legal.ts` has to
change in the same commit, or the privacy policy becomes false. Adopting
PostHog on the marketing site, for instance, would mean a cookie, a consent
banner, and a rewrite of two sections on that page.

## Notes

- `docs/lovable-prompt.md` is the original design brief the Lovable page was
  generated from — still the reference for tone and the no-fabricated-proof
  rule.
- Still worth confirming before launch: the public domain and `hello@` address
  in `src/content/site.ts`, and the city to publish alongside "Remote-first ·
  India".
