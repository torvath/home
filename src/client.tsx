/// <reference types="vite/client" />
import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start/client'

/**
 * Hydrates the *whole document*, not a mount node — the root route owns
 * <html>, <head>, and <body>, so there is no index.html in this app.
 *
 * The hydration is wrapped in startTransition so React can interrupt it for
 * user input while suspended, streamed subtrees are still arriving.
 */
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  )
})
