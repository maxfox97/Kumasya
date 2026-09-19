import type { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router'
import { paths } from '@/app/routes'
import { authClient } from './authClient'

export type ProtectedRouteProps = {
  /** Rendered while the session is pending. Defaults to no UI. */
  pendingFallback?: ReactNode
  /**
   * Rendered when Better Auth returns a session-fetch error. Defaults to no
   * UI — a session error is not the same as a confirmed unauthenticated
   * state, so it must not silently redirect to login. The real error
   * presentation belongs to a later UI task.
   */
  errorFallback?: ReactNode
}

/**
 * Reusable authentication boundary for nested routes. Reads Better Auth's
 * session directly (no duplicated session state). Renders the matched
 * child route via `<Outlet />` when authenticated, redirects to the login
 * route when the session is confirmed absent, and never treats a session
 * fetch error as proof of being unauthenticated.
 *
 * Not yet wired into `router.tsx`: the admin layout/route grouping this
 * boundary would nest under belongs to `08-create-admin-layout`.
 */
export function ProtectedRoute({
  pendingFallback = null,
  errorFallback = null,
}: ProtectedRouteProps) {
  const { data: session, isPending, error } = authClient.useSession()

  if (isPending) {
    return pendingFallback
  }

  if (error) {
    return errorFallback
  }

  if (!session) {
    return <Navigate to={paths.login} replace />
  }

  return <Outlet />
}
