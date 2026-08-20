import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { primaryNav, site } from '~/content/site'
import { buttonClass } from '~/components/ui/button'
import { TorvathLogo } from './logo'

/**
 * Sticky header. Now that the site is routed rather than one long page, the nav
 * links are real `<Link>`s to real URLs — crawlable, shareable, and each with
 * its own title — instead of `#anchor` jumps.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  // Escape closes the drawer and hands focus back to the toggle. Without the
  // hand-back, focus is left on an element that has just been removed from the
  // DOM and the browser drops it to <body> — restarting the tab order.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-hairline bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:flex lg:justify-between">
        <Link to="/" className="min-w-0" aria-label={`${site.name} home`}>
          <TorvathLogo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="clip-facet-sm relative px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              // Active state: a filled facet with a brand rule along the
              // bottom. A *border* here would be sliced open by clip-facet-sm
              // on the corner it cuts, which reads as a rendering fault.
              activeProps={{
                className:
                  "bg-surface text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-[image:var(--gradient-brand)] after:content-['']",
              }}
              activeOptions={{ exact: item.to === '/' }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={buttonClass({ size: 'sm', className: 'ml-3' })}
          >
            Start a project
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="shrink-0 border border-hairline-strong p-2 text-foreground lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden />
          ) : (
            <Menu className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {/*
        Rendered even while closed so `aria-controls` always resolves to a real
        element; `hidden` keeps its links out of the tab order in the meantime.
      */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-hairline bg-background/95 backdrop-blur-md lg:hidden"
      >
        <nav className="flex flex-col px-5 py-2 sm:px-8" aria-label="Mobile">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="border-b border-hairline py-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: 'text-foreground' }}
              activeOptions={{ exact: item.to === '/' }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={buttonClass({
              className: 'my-4 w-full justify-center py-3',
            })}
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  )
}
