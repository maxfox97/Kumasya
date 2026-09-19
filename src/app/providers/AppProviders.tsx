import type { PropsWithChildren } from 'react'

/**
 * Single composition root for application-wide providers. Empty for now —
 * this task only sets up routing. Task 05 adds a `QueryClientProvider` here
 * and task 07 adds the auth/session provider; both wrap `children` (the
 * router) rather than replacing this component.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return children
}
