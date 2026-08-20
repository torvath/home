import { Link } from '@tanstack/react-router'
import { buttonClass } from '~/components/ui/button'

/**
 * Home hero. Full-height, one sentence about the outcome, two routes onward:
 * the primary CTA to /contact, the secondary to /services.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      {/* Low-contrast faceted backdrop derived from the logo geometry */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-facets absolute inset-0" />
        <div className="grid-hairlines absolute inset-0 opacity-[0.14]" />
        <div
          className="absolute -right-24 top-16 hidden h-[520px] w-[520px] opacity-[0.07] md:block"
          style={{
            background: 'var(--gradient-brand-diag)',
            clipPath: 'polygon(50% 0, 100% 28%, 78% 100%, 22% 100%, 0 28%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-hairline" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-24 sm:px-8">
        <p className="label-caps fade-up">Building Intelligent Solutions</p>
        <div aria-hidden className="mt-5 h-px w-24 gradient-brand" />

        <h1 className="fade-up mt-8 max-w-4xl font-display text-[2.35rem] leading-[1.05] font-medium tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl">
          We build the <span className="underline-brand">software</span> your
          business runs on.
        </h1>

        <p className="fade-up mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Torvath is a small engineering team that designs, builds, and maintains
          software — and ships products of its own. You work directly with the
          people writing the code.
        </p>

        <div className="fade-up mt-10 flex flex-wrap gap-3">
          <Link to="/contact" className={buttonClass()}>
            Start a project
          </Link>
          <Link to="/services" className={buttonClass({ variant: 'ghost' })}>
            See what we do
          </Link>
        </div>
      </div>
    </section>
  )
}
