import { QueryClient } from '@tanstack/react-query'

/**
 * Single application-wide QueryClient instance. Created once at module
 * scope (never inside a component) and reused by `QueryProvider`.
 *
 * No custom `staleTime`/`gcTime`/`retry`/etc — TanStack Query's stable
 * defaults are used until a real, documented caching requirement exists.
 * Inventing values now would be guessing at business needs no API contract
 * has defined yet.
 */
export const queryClient = new QueryClient()
