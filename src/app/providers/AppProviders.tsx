import type { PropsWithChildren } from 'react'
import { QueryProvider } from './query'

/**
 * Single composition root for application-wide providers. Task 07 adds the
 * auth/session provider here, wrapping `children` alongside `QueryProvider`
 * rather than replacing this component.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>
}
