import { createAuthClient } from 'better-auth/react'

/**
 * Single application-wide Better Auth client. Better Auth remains the
 * source of truth for session/user state — this file must never grow a
 * parallel session cache (Zustand, TanStack Query, or otherwise).
 *
 * No `baseURL`/base path is configured: no backend auth origin, base path,
 * or cross-origin cookie requirement is documented anywhere in this repo
 * (`.claude/docs/architecture/auth.md` is empty, no `VITE_*` env
 * convention exists, no `.env*` file exists). Omitting the option falls
 * back to Better Auth's own same-origin default rather than guessing a
 * value — see the final report for what still needs to come from the
 * backend/Tech Lead.
 */
export const authClient = createAuthClient()
