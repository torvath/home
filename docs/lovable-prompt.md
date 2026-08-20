Build a dark, high-craft marketing homepage for a technology company called
**Torvath**. Tagline: "Building Intelligent Solutions."

Single page, responsive, production quality. This design will later be ported
into a TanStack Start (React) app, so keep the markup semantic and the styling
in Tailwind — no heavy animation libraries, no canvas/WebGL, no external image
dependencies beyond the logo I upload.

---

## Brand

I am uploading `logo.png` — a faceted, angular 3D "T" that splits down the
middle: teal on the left plane, amber on the right, meeting in a gradient.
Below it, the wordmark TORVATH in wide-tracked thin caps.

Exact palette, sampled from the logo — use these values, do not substitute:

- Near-black canvas: `#050607`
- Raised surface: `#0e1114`
- Border / hairline: `#1c2126`
- Brand teal: `#00b6c4`
- Deep teal: `#02575d`
- Brand amber: `#f49f08`
- Body text: `#e7ecf3`
- Muted text: `#95a1b0`

**Use the teal→amber gradient sparingly and with intent** — thin rules, a single
underlined word in the headline, a border on the active nav item, the primary
button. Never large gradient fills or gradient text on body copy. Black must
stay dominant, the way it does in the logo. The gradient is punctuation, not
paint.

Visual language, taken from the logo's geometry: angular, faceted, precise.
Sharp diagonal cuts and clipped corners rather than soft rounded cards.
Generous negative space. Engineering-precise, not playful, not startup-bubbly.

Typography: a geometric sans (Space Grotesk, Sora, or similar) for headings —
tight tracking and large sizes for display, wide tracking on small caps labels
to echo the wordmark. Inter or system sans for body.

Dark theme only. No light-mode toggle.

---

## Page structure

**Sticky header** — logo mark + "TORVATH" wordmark on the left; nav on the
right: Services · How we work · Products · Contact; plus a "Start a project"
button. Header gets a subtle backdrop blur and a hairline bottom border once
scrolled.

**1. Hero**
Full-height. One strong sentence about the outcome, not a list of services.
Headline: "We build the software your business runs on."
Sub: "Torvath is a small engineering team that designs, builds, and maintains
software — and ships products of its own. You work directly with the people
writing the code."
Two buttons: "Start a project" (primary, gradient border or amber fill) and
"See what we do" (ghost).
Behind it, a very subtle geometric motif derived from the logo's faceted
planes — low contrast, must not compete with the text.

**2. What we do** — four cards in a grid:
- **Software development** — Web and mobile applications built end to end.
- **Consulting** — Architecture reviews, technology selection, and getting a
  stalled project moving again.
- **Products** — Our own applications, built and operated in-house.
- **Managed services** — Ongoing maintenance, monitoring, and iteration after
  launch.

Each card: a thin angular accent line (teal on the first two, amber on the
last two), a heading, two lines of copy. On hover, the border picks up the
brand colour. No icons from an icon set unless they are simple geometric
strokes that match the logo's language.

**3. How we work** — this is the section that differentiates a small firm, so
give it weight. Three points, laid out horizontally with big numerals:
- **01 — Direct access.** No account managers, no layers. You talk to the
  engineers building your system.
- **02 — Fixed scope or embedded.** Take a defined project at a fixed price,
  or embed with your team on a retainer.
- **03 — We stay after launch.** Software is not done when it ships. We
  maintain what we build.

**4. Products** — Torvath's own applications. Each product is a wide row, not a
small card, with a **status badge**:
- `LIVE` — teal
- `IN DEVELOPMENT` — amber
- `PLANNED` — muted grey outline

First entry:
- **[PRODUCT NAME — FILL IN]** — status: IN DEVELOPMENT.
  A rental platform. [ONE-LINE DESCRIPTION — FILL IN]
  Includes an email capture: "Get notified at launch" — email input plus
  button, with visible success and error states.

Include one further row styled as `PLANNED` with the name and description left
as obvious placeholders, so more products can be added later.

**CRITICAL:** do not invent launch dates, user counts, download badges, app
store links, ratings, or screenshots for anything marked in development. The
honest "in development" label is the point of this section. An unbuilt product
with a real status reads as momentum; a fake download button reads as a company
that cannot ship.

**5. Technology** — a restrained band of the stack we work in, as wide-tracked
small-caps text separated by thin dividers rather than a logo wall.
[FILL IN — e.g. TypeScript · React · Node · Python · PostgreSQL · AWS]

**6. Contact** — split layout. Left: heading "Tell us what you're building" and
a short line inviting a first conversation, plus email and location.
Right: a form — name, email, company (optional), project type (select:
software development / consulting / product / not sure), and message.
Show inline validation states and a clear success state.
[CONTACT EMAIL — FILL IN] · [LOCATION — FILL IN]

**Footer** — logo mark, tagline "Building Intelligent Solutions", nav repeat,
copyright. Thin teal→amber rule across the top, echoing the two coloured rules
that flank the tagline in the logo.

---

## Rules

- **No fabricated proof.** No client logos, testimonials, case studies, star
  ratings, or statistics like "50+ projects delivered." I have not supplied any,
  so there must be none on the page. Leave clearly-marked placeholder sections
  instead if the layout needs them.
- Accessible: real contrast ratios against the near-black background, visible
  focus rings in brand teal, semantic headings, labelled form fields.
- Responsive down to 360px. Nav collapses to a sheet or drawer on mobile.
- Respect `prefers-reduced-motion` — animations are subtle entrance fades at
  most, and disabled entirely when reduced motion is requested.
- No stock photography. The design carries itself with type, space, and
  geometry.
