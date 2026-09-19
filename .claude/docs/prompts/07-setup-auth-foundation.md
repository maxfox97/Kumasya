# Task: Setup Authentication Foundation

## Mode

IMPLEMENTATION TASK.

Read and follow:

- `CLAUDE.md` if present
- `src/CLAUDE.md` if present
- `.claude/docs/pattern.md`
- `.claude/docs/architecture/project-structure.md`
- `.claude/docs/architecture/state-management.md`
- `.claude/docs/architecture/auth.md`

Also use the conclusions from the already completed:

- project architecture
- project audit
- FSD structure
- project tooling
- design system
- router/application-provider setup
- state-management foundation

Inspect the current repository before making changes.

Do not duplicate existing infrastructure.

Do not redesign the approved architecture.

---

# Goal

Prepare the frontend authentication foundation for Kumasya Admin.

The backend is developed and owned by the Tech Lead and uses Better Auth.

The frontend must integrate with the backend authentication contract without duplicating server-side authentication logic or inventing missing backend details.

The foundation must be ready to support later implementation of:

- A1 Login
- protected admin routes
- current authenticated user/admin
- logout
- session restoration after page refresh
- authentication loading state
- unauthenticated redirects
- future role/permission-aware UI when the backend contract defines it

This task establishes the authentication boundary and reusable primitives only.

It must not implement the Login page UI or application pages.

---

# Scope

This task is responsible only for frontend authentication infrastructure that can be implemented safely from the documented backend contract.

Potentially in scope:

- Better Auth client dependency verification/installation
- Better Auth React client creation
- authentication configuration boundary
- current-session access
- authentication loading/error state
- a reusable protected-route boundary
- logout integration boundary
- auth-related frontend types that can be derived from Better Auth or documented backend contracts
- optional auth provider/context only if the approved architecture actually requires one
- integration with the existing application-provider composition only when technically necessary

This task must NOT implement:

- Login page UI
- dashboard UI
- admin layout
- feature pages
- backend authentication
- backend endpoints
- password validation rules
- registration
- password reset
- email verification
- social login unless explicitly documented as required
- role/permission models that are not documented
- fake users
- mock sessions
- fake auth APIs
- token persistence
- custom refresh-token logic
- localStorage/sessionStorage authentication
- manual cookie management
- backend security configuration

Keep changes strictly within authentication-foundation scope.

---

# Important Architecture Boundary

## Frontend responsibility

The frontend may own:

- Better Auth client integration
- frontend session consumption
- authentication loading/error representation
- protected route rendering boundary
- unauthenticated navigation boundary
- logout invocation boundary
- current authenticated user/session access
- frontend-only auth types derived from the actual client/backend contract

## Backend responsibility

The backend owns:

- Better Auth server configuration
- database
- users table/schema
- sessions table/schema
- session persistence
- session cookies
- credential validation
- password hashing
- password policy
- refresh/session rotation
- roles and permissions enforcement
- authentication endpoints
- Better Auth server plugins
- CORS
- trusted origins
- CSRF/security settings
- cookie security flags
- production authentication security policy

Do NOT implement backend responsibilities in this repository.

The frontend must never become the security authority for authentication or authorization.

---

# Before Implementation

Before changing files:

1. Inspect the current repository structure.
2. Read the approved FSD/project architecture.
3. Read `.claude/docs/architecture/auth.md`.
4. Read `.claude/docs/architecture/state-management.md`.
5. Inspect `package.json` and installed dependencies.
6. Check whether `better-auth` is already installed.
7. Inspect the existing `src/app/providers/auth/` directory.
8. Inspect the existing `src/app/providers/AppProviders.tsx`.
9. Inspect the current React Router/data-router setup from task 04.
10. Inspect the current TanStack Query setup from task 05.
11. Inspect whether Zustand is installed and whether any stores already exist.
12. Inspect existing environment-variable conventions.
13. Search for any existing authentication client, hooks, context, route guards, session helpers, or auth types.
14. Search for any backend/API/auth contract already documented in the repository.
15. Search for references to Better Auth configuration, base URL, base path, user fields, role fields, login method, or logout behavior.

Use repository/code intelligence tools when useful.

Do not create duplicate auth infrastructure if an implementation already exists.

---

# Backend Contract Gate

Before implementing Better Auth integration, determine whether the repository already defines:

- backend base URL
- Better Auth base URL
- Better Auth base path
- whether frontend/backend use the same origin
- development frontend origin
- development backend origin
- production origin strategy
- session behavior
- user/session shape
- custom user fields
- role/admin field shape
- login method
- logout behavior
- whether cookies are cross-origin
- any required Better Auth client plugins

Do not invent missing backend details.

Do not hardcode guessed development URLs such as:

```text
http://localhost:3000
http://localhost:4000
http://localhost:8000
```

unless that exact value is already part of the documented project contract.

Do not guess a custom Better Auth base path.

If important backend details are missing:

- implement only the frontend boundary that is safe without those details
- use the project's existing environment/configuration convention when appropriate
- keep optional configuration optional rather than hardcoding a guess
- document unresolved backend contract items in the completion report
- do not fabricate API endpoints or response types

---

# Better Auth Dependency

Use the official `better-auth` package.

For React, use the official React client:

```ts
import { createAuthClient } from 'better-auth/react'
```

Before installing anything, inspect `package.json`.

If `better-auth` is already installed, do not reinstall it unnecessarily.

If it is missing and the task can safely proceed, install the current stable package using the repository's existing package manager.

Do not install unofficial wrappers.

---

# Authentication Source of Truth

Better Auth must remain the source of truth for authentication/session state.

Do NOT duplicate Better Auth session data into Zustand.

Do NOT copy the current user/session into TanStack Query merely to make it globally accessible.

Do NOT maintain a second client-side session cache.

Do NOT create:

```text
authStore
useAuthStore
sessionStore
currentUserStore
tokenStore
```

unless a documented requirement proves that a separate client-only state concern exists.

Even then, server-backed session/user data must not be mirrored into that store.

Better Auth already provides reactive session APIs. Prefer those APIs over duplicate global state.

---

# Relationship to State Management Architecture

The state-management rules from task 05 still apply, with this authentication-specific clarification:

```text
Better Auth client → authentication/session source of truth
TanStack Query     → ordinary backend/server application data
Zustand            → shared client-only application state
React Hook Form    → future login/form state
React Router       → route/URL/navigation state
local React state  → local UI interaction state
```

Do not force authentication session state into TanStack Query when Better Auth already owns session reactivity.

Do not force authentication session state into Zustand.

---

# Better Auth Client

Create one reusable application Better Auth client instance.

Preferred location based on the existing architecture:

```text
src/app/providers/auth/
```

A minimal conceptual implementation is:

```ts
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  // only documented configuration
})
```

Do not create the client inside React components.

Do not create multiple Better Auth client instances across features/pages.

---

# Better Auth Base URL / Environment Configuration

Inspect the existing environment-variable convention first.

If the backend auth origin is documented and an environment variable already exists, use that established variable.

If a configurable auth/server base URL is required but no value is documented:

- do not hardcode a guessed URL
- follow the repository's established Vite environment naming convention
- prefer a clearly named variable such as `VITE_AUTH_BASE_URL` only if no approved name already exists
- do not invent a value for it
- update an existing `.env.example` only if the repository already uses that convention

If the client is intentionally same-origin and that is documented, it is acceptable to omit `baseURL` and use Better Auth's default same-origin behavior.

If a custom Better Auth base path is documented, configure it using the official Better Auth client API.

If no custom base path is documented, do not invent one.

Do not create environment/config files unrelated to authentication.

---

# Better Auth Client Configuration

Keep Better Auth client configuration minimal.

Do not invent:

- custom fetch retry rules
- custom session refetch intervals
- custom cookie behavior
- custom auth headers
- custom credentials settings
- redirect behavior
- plugins
- base paths
- custom fetch hooks

unless they are required by the documented backend contract.

Prefer Better Auth's stable defaults where the backend contract does not require customization.

Any non-default client setting must have a concrete documented reason.

---

# Session Access

Use Better Auth's official session APIs.

The React client provides a reactive session hook conceptually like:

```ts
const {
  data: session,
  isPending,
  error,
  refetch,
} = authClient.useSession()
```

Use the library's actual installed-version API after inspecting types/documentation.

The session source must support:

- initial session bootstrap
- page refresh restoration through the server-backed Better Auth session
- authenticated state
- unauthenticated state
- pending/loading state
- error state

Do not implement custom session restoration using localStorage or manually persisted tokens.

---

# Session Types

Prefer types inferred from the Better Auth client.

Where useful, derive types from the client instead of duplicating backend interfaces.

Conceptually:

```ts
type Session = typeof authClient.$Infer.Session
```

Use the actual installed Better Auth version/type API.

Do not manually create speculative interfaces such as:

```text
AdminUser
AdminRole
Permission
AuthSession
```

with fields that are not documented.

If the backend contract defines custom user/session fields, model only those documented fields using the supported Better Auth typing/plugin mechanism.

Do not invent `role`, `permissions`, `restaurantId`, `organizationId`, or similar properties.

---

# Current User / Current Admin

Expose the authenticated user from the Better Auth session.

Do not create a second mutable `currentUser` state.

If the backend contract has not yet defined how an "admin" is represented, use the neutral Better Auth session user shape.

Do not rename the session user to `admin` merely because this is an admin application unless the backend contract explicitly guarantees an admin-only session/user type.

---

# Auth Provider / React Context Rule

Better Auth's React client does not automatically require a custom application React context.

Do NOT create an `AuthProvider` solely to satisfy a naming convention.

First inspect:

- `.claude/docs/architecture/auth.md`
- existing `src/app/providers/auth/`
- `AppProviders.tsx`

If the approved architecture explicitly requires an application auth provider/context, it may be created.

If an `AuthProvider` is created:

- it must derive directly from Better Auth's reactive session state
- it must not copy session/user data into Zustand
- it must not maintain duplicate local session state
- it must not perform backend authentication logic
- it must remain a thin application abstraction
- it must expose loading/authenticated/unauthenticated/error state without guessing backend data

If no provider is technically necessary and the architecture allows direct Better Auth client consumption, do not invent one.

If `AppProviders.tsx` does not need modification, leave it unchanged.

---

# Protected Route Boundary

Prepare a reusable authentication route boundary if the approved auth architecture assigns it to this task.

The protected boundary may:

- observe the Better Auth session
- wait while the session is pending
- allow rendering when authenticated
- redirect an unauthenticated user to the existing login path
- support nested route rendering through React Router when appropriate

The protected boundary must NOT:

- implement login UI
- enforce undocumented roles
- implement backend permissions
- fetch application data
- own dashboard/admin layout UI
- hardcode feature routes
- store session state
- treat a network/session error as proof that the user is unauthenticated

Do not redirect to login merely because session fetching produced an unexpected error.

Authentication errors and unauthenticated state are different states.

---

# Protected Route Loading State

Do not create product UI in this task.

For the initial protected-route boundary:

- use an intentionally minimal/no-UI loading fallback, or
- accept a loading fallback as a prop if that matches existing patterns

Do not implement a branded loader, skeleton, login page, or layout.

The real loading presentation can be attached by later UI tasks.

---

# Protected Route Error State

Do not silently reinterpret session/network errors as unauthenticated.

A session error must remain distinguishable from a confirmed `null`/missing session.

Use the existing application error-handling pattern if one exists.

If there is no established error UI yet, keep the boundary minimal and document the unresolved error presentation rather than inventing a product screen.

---

# Router Integration

Task 04 established the router foundation.

Do not redesign the router.

Do not rebuild the route table.

Do not implement the admin layout in this task.

Do not attach page components that belong to later tasks.

If the protected-route component can be created safely without wiring protected route groups yet, prefer that.

Only modify the route configuration if `.claude/docs/architecture/auth.md` explicitly requires task 07 to wire the guard now and doing so does not require inventing the admin layout/page hierarchy.

The login route must remain public.

Do not create redirect loops.

Do not invent `/` behavior beyond what is already documented.

---

# Login Boundary

Do not implement the Login page UI.

Do not implement a login form.

Do not create fake credentials.

Do not assume email/password login unless the backend contract explicitly says that is the approved Better Auth sign-in method.

If email/password is documented, the actual form belongs to the Login implementation task.

This task may expose the Better Auth client capability needed by that future task without calling it from product UI.

---

# Logout Boundary

Better Auth owns the actual sign-out request.

Use the official client `signOut` API when logout is implemented.

This task may expose a thin logout/auth-client boundary if needed by the architecture.

Do not:

- manually clear cookies
- manually clear tokens
- wipe unrelated browser storage
- create a fake logout timeout
- redirect from a low-level auth client helper unless the architecture explicitly owns navigation there

Logout navigation belongs to the appropriate UI/routing layer.

---

# Role and Permission Rules

Do not invent role-based authorization.

If the backend contract defines a role field:

- type it from the documented contract
- use it only for frontend UX decisions
- never treat frontend checks as security enforcement

Backend authorization remains authoritative.

If role/permission shape is missing, explicitly defer it.

Do not create:

```text
ADMIN
SUPER_ADMIN
MANAGER
OWNER
permissions[]
```

unless those exact concepts are already documented.

---

# Token and Cookie Rules

Do not store Better Auth tokens/session credentials manually.

Do not add:

```text
localStorage.setItem(...)
sessionStorage.setItem(...)
document.cookie = ...
Authorization: Bearer ...
```

for Better Auth session persistence unless a documented Better Auth/backend contract explicitly requires such behavior.

Prefer Better Auth's server-backed cookie/session mechanism.

Do not create custom token refresh logic.

Do not read HttpOnly cookies from frontend JavaScript.

---

# TanStack Query Rules

Do not create TanStack Query wrappers for Better Auth session state merely for consistency with server-state architecture.

Do not create:

```text
useSessionQuery
sessionQueryKey
currentUserQuery
authQuery
```

around Better Auth unless a documented integration requirement explicitly requires it.

TanStack Query remains available for application/server data after authentication.

Authentication/session data remains owned by Better Auth.

---

# Zustand Rules

Do not create a Zustand auth store.

Do not create placeholder auth state.

Do not persist authentication through Zustand middleware.

Do not use Zustand to duplicate:

- session
- user
- authenticated boolean derived from session
- Better Auth loading state
- Better Auth errors

A future client-only auth-related concern may use Zustand only when it represents real client state not already owned by Better Auth.

---

# React Hook Form

React Hook Form will be used by the future Login page/form task when appropriate.

Do not create a login form in this task.

Do not create form schemas or validation rules before the actual login contract is known.

---

# Error Handling

Do not expose raw backend implementation details to product UI unnecessarily.

Keep Better Auth errors available to future UI layers in a typed/structured form.

Do not translate every auth error into "invalid credentials".

Network errors, server errors, session errors, and credential errors are different concerns.

Do not invent user-facing copy in this task.

---

# File Ownership

Authentication infrastructure should follow the existing application architecture.

Preferred existing area:

```text
src/app/providers/auth/
```

Possible files, only when actually needed:

```text
src/app/providers/auth/
  authClient.ts
  ProtectedRoute.tsx
  AuthProvider.tsx
  AuthContext.ts
  useAuth.ts
  types.ts
  index.ts
```

Do NOT create every file mechanically.

Create only the smallest set required by the actual architecture.

For example, if no custom React context/provider is required, a valid minimal structure may be:

```text
src/app/providers/auth/
  authClient.ts
  ProtectedRoute.tsx
  index.ts
```

Adapt names to existing project conventions.

Do not create a centralized generic:

```text
src/store/auth.ts
src/services/auth.ts
src/utils/auth.ts
```

when the approved architecture already has an auth provider boundary.

---

# Public API

Keep the auth public API minimal.

Export only what external consumers actually need.

Potential public exports:

```text
authClient
ProtectedRoute
useAuth
```

depending on the implemented architecture.

Do not expose internal configuration helpers, raw mutable state, or implementation-only context objects unless needed.

Avoid broad barrel exports "just in case".

---

# Existing AppProviders

Task 05 established:

```text
App
└── AppProviders
    └── QueryProvider
        └── RouterProvider
```

Preserve this structure unless the approved authentication architecture requires an additional provider.

If an auth provider is genuinely required, compose it deliberately without moving unrelated providers or changing router behavior unnecessarily.

For example, only if required:

```text
App
└── AppProviders
    ├── QueryProvider
    │   └── AuthProvider
    │       └── RouterProvider
```

The exact nesting must follow real dependency requirements.

Do not add `AuthProvider` if Better Auth integration does not need one.

---

# Expected Changes

The exact file list depends on the actual backend contract and existing architecture.

A minimal implementation may include changes similar to:

```text
package.json
package-lock.json

src/app/providers/auth/
  authClient.ts
  ProtectedRoute.tsx
  index.ts
```

Potentially:

```text
src/app/providers/auth/AuthProvider.tsx
src/app/providers/auth/AuthContext.ts
src/app/providers/auth/useAuth.ts
src/app/providers/auth/types.ts
src/app/providers/AppProviders.tsx
.env.example
src/vite-env.d.ts
```

ONLY if they are actually needed.

Do not modify unrelated files merely to match this example.

---

# Do Not Touch

Unless explicitly required by the approved authentication architecture or compilation, do not modify:

```text
src/shared/ui/*
src/widgets/*
src/features/*
src/entities/*
design-system tokens
Tailwind configuration
dashboard UI
login UI
admin layout UI
```

Do not implement backend API contracts.

Do not create mock API responses.

Do not alter task 04 routing architecture beyond the minimum required auth boundary.

Do not alter task 05 QueryClient configuration.

---

# Implementation Quality

Use:

- TypeScript
- strict typing
- existing import aliases
- existing formatting conventions
- existing FSD boundaries
- official Better Auth APIs
- official React Router APIs
- minimal public APIs
- explicit loading/error/authenticated states

Prefer:

```text
Simple → Maintainable → Scalable
```

Avoid abstractions without a current responsibility.

Do not create wrappers around Better Auth APIs unless the wrapper creates a clear application boundary or is required by the approved architecture.

---

# React Fast Refresh / Lint Boundaries

Respect the project's existing React Fast Refresh lint rules.

If exporting a React component alongside non-component values causes `react-refresh/only-export-components` violations, split the implementation into focused files rather than disabling lint rules.

Do not modify lint configuration to make authentication code pass.

---

# Validation

After implementation, use the project's existing validation scripts.

At minimum verify, when those scripts exist:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run format:check
```

Do not modify validation scripts merely to make the task pass.

---

# Runtime Smoke Test

A runtime smoke test is useful only if the implementation can run without inventing unavailable backend configuration.

If a backend/auth server is not available:

- do not fake one
- do not claim session authentication was runtime-tested
- verify that the frontend still boots if the implemented foundation permits it
- clearly report what could not be tested

If starting the Vite dev server:

1. verify the intended port is free
2. use an explicit host/port with `--strictPort`
3. identify the exact process started
4. stop only that exact process when finished

Do not use broad termination commands such as:

```bash
pkill -f vite
```

Do not terminate unrelated user processes.

---

# Security Rules

Never log:

- passwords
- session tokens
- cookies
- authorization credentials
- complete sensitive session payloads

Do not add debug logging that exposes authentication secrets.

Do not commit real credentials or secrets.

Do not add real production URLs/secrets to source code.

Frontend role checks are UX controls, not security controls.

---

# Acceptance Criteria

The task is complete only when all applicable criteria are satisfied:

1. Existing auth/backend documentation was inspected before implementation.
2. Better Auth is used through the official React client.
3. A single reusable Better Auth client instance exists.
4. No guessed backend URL or auth endpoint was hardcoded.
5. Better Auth remains the source of truth for session/auth state.
6. No Zustand auth/session store was introduced.
7. Better Auth session was not duplicated into TanStack Query.
8. No manual token/cookie persistence was introduced.
9. Current session access supports loading, authenticated, unauthenticated, and error distinction.
10. A protected-route boundary is prepared if task 07 owns it according to the approved auth architecture.
11. The protected boundary does not treat session/network errors as confirmed unauthenticated state.
12. Login UI was not implemented.
13. Admin layout/dashboard UI was not implemented.
14. Backend auth logic/API contracts were not implemented.
15. Undocumented roles/permissions were not invented.
16. Existing router architecture remains intact except for explicitly required auth wiring.
17. Existing QueryClient configuration remains unchanged.
18. Existing design-system infrastructure remains unchanged.
19. lint passes.
20. typecheck passes.
21. production build passes.
22. formatting checks pass.
23. Missing backend contract details are explicitly reported.

---

# Final Report

At completion report:

- backend/auth contract information found in the repository
- unresolved backend contract information
- dependencies installed or already present
- files created
- files modified
- Better Auth client configuration used
- whether same-origin or configured base URL is used, and why
- session source of truth
- whether a custom AuthProvider/context was created and why
- protected-route behavior, if implemented
- logout boundary prepared
- role/permission behavior intentionally deferred
- validation results
- runtime smoke-test results and limitations
- assumptions, if any

Explicitly confirm whether the following were NOT implemented:

```text
Login page UI
backend authentication
backend endpoints
authStore/sessionStore
manual token persistence
manual cookie management
fake users
fake sessions
mock auth APIs
admin layout
dashboard UI
feature pages
undocumented roles/permissions
```

If authentication could not be fully wired because the backend contract is incomplete, clearly state exactly what information is still required from the Tech Lead instead of guessing it.
