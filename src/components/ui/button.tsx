import { cn } from '~/lib/cn'

/**
 * Button styling as a class function rather than a wrapper component, so
 * `<Link>` keeps its typed `to` prop and `<a href>` / `<button>` keep theirs.
 *
 *   <Link to="/contact" className={buttonClass()}>Start a project</Link>
 */
export type ButtonVariant = 'primary' | 'teal' | 'ghost' | 'quiet'
export type ButtonSize = 'sm' | 'md'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-amber text-primary-foreground hover:opacity-90 transition-opacity',
  teal: 'bg-teal text-primary-foreground hover:opacity-90 transition-opacity',
  ghost:
    'border border-hairline-strong text-foreground transition-colors hover:border-teal hover:text-teal',
  quiet:
    'border border-hairline-strong bg-background text-muted-foreground transition-colors hover:text-foreground',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
}

export function buttonClass({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}): string {
  return cn(
    'clip-facet-sm inline-flex items-center justify-center gap-2 font-medium',
    SIZES[size],
    VARIANTS[variant],
    className,
  )
}
