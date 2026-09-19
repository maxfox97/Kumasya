import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './queryClient'

/**
 * Owns TanStack Query only — no router, auth, or feature/business logic.
 */
export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
