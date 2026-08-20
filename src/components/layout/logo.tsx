import { cn } from '~/lib/cn'

/** The faceted "T" mark on its own — header, favicons, compact placements. */
export function TorvathMark({ className }: { className?: string }) {
  return (
    <img
      src="/torvath-mark.png"
      alt=""
      aria-hidden
      width={632}
      height={512}
      className={cn('h-8 w-auto object-contain', className)}
      decoding="async"
    />
  )
}

/** Full lockup: mark, wordmark and the tagline rule beneath it. */
export function TorvathLockup({ className }: { className?: string }) {
  return (
    <img
      src="/torvath-lockup.png"
      alt="Torvath — Building Intelligent Solutions"
      width={787}
      height={768}
      className={cn('h-40 w-auto object-contain', className)}
      loading="lazy"
      decoding="async"
    />
  )
}

/** Mark + typeset wordmark. Used in the header, where the image wordmark
 *  would be too heavy to load at small sizes. */
export function TorvathLogo({ className }: { className?: string }) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <TorvathMark className="h-8 w-auto shrink-0" />
      <span className="font-display text-[0.95rem] font-light tracking-[0.42em] text-foreground">
        TORVATH
      </span>
    </span>
  )
}
