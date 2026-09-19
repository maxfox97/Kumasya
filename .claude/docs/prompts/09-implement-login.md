# Task: Implement A1 Admin Login

## Mode

IMPLEMENTATION TASK.

Read and follow:

- `CLAUDE.md` if present
- `src/CLAUDE.md` if present
- `.claude/docs/pattern.md`
- `.claude/docs/architecture/project-structure.md`
- `.claude/docs/architecture/state-management.md`
- `.claude/docs/architecture/auth.md`
- `.claude/docs/design/figma-map.md`

Also use the completed foundations from tasks 00–08:

- project architecture
- audit / tooling / FSD structure
- design system
- router/providers
- state-management foundation
- Better Auth frontend foundation
- protected route boundary
- Admin Layout / Sidebar

Do not redesign the project architecture.

Do not implement backend authentication.

Do not modify unrelated pages/features.

Remain in Manual Mode and show significant edits for approval before applying them.

---

# Goal

Implement the first real product screen:

```text
A1 — Admin Login
```

Route:

```text
/login
```

The result must match the approved Figma design as closely as practical and integrate with the existing frontend authentication boundary without inventing missing backend behavior.

This task owns:

- the `/login` page UI
- login-form presentation
- login-form local state
- client-side validation that is actually supported by the documented login contract
- invalid-credentials presentation
- wiring the real Login page component to `/login`
- Better Auth sign-in integration only if the backend/login method is documented

This task does NOT own:

- backend auth configuration
- password hashing/policy
- session persistence implementation
- role/permission enforcement
- registration
- password reset
- email verification
- Admin Layout
- Dashboard page/content

---

# Design Reference

Screen:

```text
A1 — Admin Login
```

Source:

```text
.claude/docs/design/figma-map.md
```

Before implementation:

1. Read the exact A1 node reference from `figma-map.md`.
2. Inspect the exact A1 node using Figma MCP.
3. Inspect any linked reusable components/assets.
4. Inspect relevant Foundations/design tokens.
5. Inspect all login states represented in Figma.

Required states:

- default login
- invalid credentials

Figma is the source of truth for visual implementation.

Do not estimate values when they are available from Figma.

Extract and record exact values for:

- viewport/layout behavior
- login-card/container dimensions
- horizontal/vertical positioning
- page background
- card background
- border/border radius
- shadow if present
- logo/brand treatment
- heading typography
- helper text
- labels
- input dimensions
- input border/focus/error state
- password input treatment
- button dimensions/style
- spacing/gaps/padding
- invalid-credentials message
- any iconography
- any responsive behavior explicitly shown

Do not invent mobile/responsive behavior unless represented in Figma.

If the required A1 node is missing from `figma-map.md`, stop before visual implementation and report the missing node instead of guessing.

---

# Repository Analysis Before Changes

Before editing:

1. Inspect the current `/login` route.
2. Inspect `src/app/providers/auth/`.
3. Inspect the installed Better Auth version/API.
4. Inspect whether a login/sign-in method is documented anywhere.
5. Inspect current environment/auth configuration.
6. Inspect existing design-system components from task 06.
7. Inspect current typography/color/radius tokens.
8. Inspect installed dependencies for:
   - `react-hook-form`
   - `zod`
   - any existing RHF/Zod resolver package
9. Search for any pre-existing Login page/scaffold.
10. Search for existing form/error helper patterns.
11. Inspect FSD placement rules and existing `pages/login` scaffold if present.

Do not recreate an implementation that already exists.

---

# Authentication Architecture

Task 07 established:

```text
Better Auth client → authentication/session source of truth
TanStack Query     → ordinary backend/server application data
Zustand            → shared client-only application state
React Hook Form    → form state
React Router       → navigation/URL state
local React state  → local UI interaction state
```

This task must preserve that architecture.

Do NOT create:

```text
authStore
sessionStore
loginStore
currentUserStore
tokenStore
```

Do NOT place:

- email
- password
- field errors
- submitting state
- invalid-credentials state

into Zustand.

The original statement “Zustand is used for global authentication state” is NOT applicable to this project architecture.

Better Auth remains the source of truth for authentication/session state.

React Hook Form owns login form state.

---

# Backend Contract Gate

Task 07 established that the backend auth contract was incomplete.

Before wiring submit behavior, re-check whether the repository now documents:

- login method
- email/password availability
- Better Auth base URL/origin
- Better Auth base path
- required Better Auth client plugins
- custom login fields
- expected invalid-credentials error behavior/code
- post-login destination
- whether only admins can sign in to this frontend

Do not invent missing backend details.

If the sign-in method is STILL undocumented:

- fully implement the visual Login page
- fully implement RHF form state
- fully implement client-side validation only for constraints that are unambiguously safe/documented
- fully implement the Figma invalid-credentials visual state as a reusable presentation state
- do NOT call a guessed Better Auth sign-in method
- do NOT fake a successful/failed login
- do NOT create mock credentials
- report the missing Tech Lead contract in the final report

If email/password login IS explicitly documented, use the installed Better Auth client's official email/password sign-in API after checking the actual installed types.

---

# Login Form

Use:

- React Hook Form
- Zod
- existing resolver package if already installed

If the required package is missing:

- inspect the project's package manager
- install only the minimum official dependency required
- do not add a form library other than RHF/Zod

Do not use Zustand for form state.

Do not duplicate RHF field values into local state.

---

# Validation Rules

Do not invent backend password policy.

Do not create arbitrary rules such as:

```text
password >= 8
must contain uppercase
must contain number
```

unless explicitly documented by the backend/product contract.

Safe client validation may include, when the login method is confirmed as email/password:

- required email
- valid email format
- required password

Use exact user-facing validation copy from Figma if provided.

If Figma does not define validation-copy text, do not invent elaborate product copy.

Prefer minimal neutral validation or existing product-copy conventions.

Keep client-side validation separate from server credential errors.

---

# Invalid Credentials State

Figma defines an invalid-credentials state.

Implement its visual presentation exactly from Figma.

Do not fake invalid credentials during normal production behavior.

If real email/password sign-in is wired:

- map only the documented/confirmed Better Auth credential failure to the Figma invalid-credentials state
- do not classify network/server/unknown errors as invalid credentials
- unexpected errors must remain distinguishable from credential rejection

If backend error mapping is not documented:

- implement the visual state/component capability
- do not guess which raw server error/code triggers it
- report the missing mapping

Do not log credentials or sensitive auth error payloads.

---

# Better Auth Login Integration

Only if email/password login is confirmed by the backend contract:

Use the installed-version official Better Auth client API.

Conceptually this may be:

```ts
authClient.signIn.email(...)
```

but inspect the actual installed version/types before implementing.

Do not guess the method signature.

On confirmed successful sign-in:

```text
navigate(paths.dashboard, { replace: true })
```

is allowed only if Dashboard is the documented post-login destination.

If the post-login route is not documented, do not invent it; report the missing contract.

On failed credential sign-in:

- keep the user on `/login`
- render the Figma invalid-credentials state when the failure is confirmed to be credential-related
- do not clear unrelated state/storage

Do not:

- write cookies manually
- store auth tokens manually
- use localStorage/sessionStorage for session persistence
- add custom refresh logic
- create backend endpoints

---

# Existing Session on /login

Inspect the approved auth behavior before adding an authenticated-user redirect from `/login`.

Do not automatically invent:

```text
/login -> /dashboard
```

for authenticated sessions unless the project/auth contract explicitly defines it.

If the behavior is documented, use Better Auth `useSession()` and the existing router.

Otherwise leave it deferred and report it.

Do not introduce redirect loops.

---

# FSD Placement

Use the existing approved FSD structure.

Prefer the existing `pages/login` scaffold if present.

Conceptually:

```text
src/pages/login/
  ui/
    LoginPage.tsx
  model/
    loginSchema.ts
  index.ts
```

Create only what is needed.

If the project already uses a different page-slice convention, follow it.

Do not create:

```text
src/components/login/
src/common/login/
src/forms/login/
```

outside the approved FSD structure.

The page layer may depend on lower layers and on application auth/router public APIs where the project's architecture explicitly allows that integration.

Avoid unnecessary abstractions.

---

# Design-System Reuse

Inspect the existing shared UI from task 06 first.

Potential existing primitives include:

- `Button`
- `Input`
- other approved shared primitives

Reuse them when they match the Figma semantics.

Do not install or introduce shadcn/ui merely because the original prompt says "Use shadcn/ui".

This project already has an approved design system.

Only use an existing shadcn component if it is already part of the repository and actually matches the design.

Do not rebuild `Button` or `Input` locally when an approved shared primitive already satisfies the design.

If the existing primitive cannot represent the exact Figma state:

1. first determine whether a small generic design-system extension is justified
2. do not mutate the global component API for a one-off page hack without approval
3. report the mismatch before making a broad design-system change

---

# Password Field

Match the Figma password-field behavior exactly.

If Figma shows a visibility toggle:

- implement it with local UI state
- use a semantic button
- provide an accessible name
- preserve keyboard accessibility

If Figma does NOT show a visibility toggle, do not invent one.

Do not store the password anywhere outside RHF.

Do not log the password.

---

# Submit Button

Use the existing Button primitive if it matches the design.

During submission:

- prevent duplicate submissions
- use RHF `isSubmitting` or equivalent form-state mechanism
- do not create a global loading store
- preserve accessible disabled behavior

Do not invent button-loading text unless Figma/product copy defines it.

---

# Accessibility

Use semantic form markup.

At minimum:

- real `<form>`
- `<label>` associated with each input
- correct email input semantics
- password input semantics
- keyboard-submittable form
- accessible error association where practical
- invalid state reflected accessibly
- focus behavior preserved
- no clickable `<div>` for form actions

Do not remove visible focus styles without a replacement.

---

# Route Integration

Task 04 registered:

```text
/login
```

as a public route.

Task 08 kept `/login` outside:

```text
ProtectedRoute
AdminLayoutRoute
```

This task should attach the real Login page component to the existing `/login` route.

Do not move `/login` under the protected/admin layout.

Do not redesign router structure.

Do not change:

- ProtectedRoute nesting
- AdminLayoutRoute nesting
- admin route paths
- root `/` behavior
- NotFound behavior

unless required for compilation and explicitly approved.

---

# Page Scope

The Login page must NOT render:

- Sidebar
- Admin Layout
- Dashboard content
- admin navigation
- page-specific data from other features

A1 is a standalone public page.

---

# Styling

Use:

- Tailwind
- existing design tokens
- approved shared primitives

Prefer token classes when they exactly match Figma.

Use one-off measurements only when they are exact Figma values with no suitable token.

Do not modify Tailwind config unless absolutely required and approved.

Do not create global CSS for page-local styling when Tailwind/component styles are sufficient.

Do not approximate brand assets if exact assets exist in Figma/repository.

---

# Error Handling

Keep distinct:

```text
client validation error
credential rejection
network/server error
unexpected error
```

Do not collapse all failures into "invalid credentials".

Do not expose sensitive raw backend errors to the user.

Use exact Figma/product error copy where defined.

Do not add a toast library just for this page.

---

# Expected Changes

Exact files depend on the existing repository structure.

Potential changes may include:

```text
src/pages/login/
  model/loginSchema.ts
  ui/LoginPage.tsx
  index.ts

src/app/providers/router/router.tsx
```

Potential dependency changes only if required:

```text
package.json
package-lock.json
```

Do not mechanically create every example file.

Create the smallest maintainable implementation.

---

# Do Not Touch

Unless strictly required:

```text
src/widgets/sidebar/*
src/app/providers/router/AdminLayoutRoute.tsx
src/app/providers/router/navigation.ts
src/app/providers/auth/ProtectedRoute.tsx
src/app/providers/auth/authClient.ts
QueryClient configuration
Zustand stores
Dashboard implementation
other page implementations
Tailwind config
unrelated design-system components
backend contracts
```

Do not change the Admin Layout while implementing Login.

---

# React Fast Refresh / Lint Boundaries

Respect the existing `react-refresh/only-export-components` rule.

Split schemas/constants/components into separate files if necessary.

Do not disable lint rules.

---

# Validation

After implementation run the full existing validation sequence:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run format:check
```

All must pass.

Do not modify validation scripts to force success.

---

# Runtime / Visual Validation

This task is visual.

After implementation:

1. verify the dev-server port is free
2. start Vite with explicit host/port and `--strictPort`
3. identify the exact process PID
4. open `/login` in the available browser/Chrome DevTools MCP
5. inspect console errors
6. compare against the exact Figma A1 node
7. verify:
   - container size/position
   - typography
   - inputs
   - button
   - spacing
   - borders/radius
   - colors
   - invalid-credentials visual state
8. fix measurable visual differences
9. verify `/login` is outside Admin Layout
10. stop only the exact Vite PID

Do not use broad process termination commands such as:

```bash
pkill -f vite
```

If Chrome DevTools MCP/browser tooling is unavailable, report that limitation explicitly rather than pretending a visual comparison occurred.

If the backend is unavailable, do not fake authentication just to test the visual page.

---

# Security

Never log:

- email/password pairs
- passwords
- session tokens
- cookies
- sensitive auth payloads

Do not commit credentials.

Do not add real secrets to `.env` files.

Do not persist the password outside RHF/browser-native form state.

---

# Acceptance Criteria

The task is complete only when all applicable criteria are satisfied:

1. Exact A1 Figma node inspected with Figma MCP.
2. Default Login state matches Figma.
3. Invalid-credentials visual state matches Figma.
4. `/login` renders the real Login page.
5. `/login` remains outside Admin Layout and ProtectedRoute.
6. Existing router structure remains intact.
7. Existing design-system primitives are reused where appropriate.
8. No unnecessary shadcn/new UI library introduced.
9. React Hook Form owns form state.
10. Zod is used for client validation.
11. No form state is stored in Zustand.
12. No auth/session state is duplicated into Zustand or TanStack Query.
13. Better Auth remains the auth/session source of truth.
14. Backend login method is not guessed.
15. No backend auth implementation was added.
16. No manual cookie/token persistence was added.
17. No fake credentials/session/mock auth was added.
18. Credential rejection is distinguished from network/unexpected errors.
19. No undocumented password policy was invented.
20. No Dashboard/Admin Layout content was added.
21. lint passes.
22. typecheck passes.
23. build passes.
24. formatting checks pass.
25. `/login` was visually inspected against Figma when browser tooling was available.
26. Console errors were checked when browser tooling was available.
27. Missing backend/auth contract details are explicitly reported.

---

# Final Report

At completion report:

- exact A1 Figma node inspected
- exact Figma measurements/styles used
- files created
- files modified
- design-system components reused
- dependencies installed/already present
- RHF/Zod structure
- validation rules implemented
- Better Auth submit behavior implemented or intentionally deferred
- backend/login contract found
- backend/login contract still missing
- invalid-credentials behavior
- route integration
- validation results
- browser/Chrome DevTools visual comparison results
- console-error result
- runtime limitations

Explicitly confirm whether the following were NOT implemented:

```text
backend authentication
registration
password reset
email verification
manual token persistence
manual cookie management
Zustand login/form state
Zustand auth/session duplication
mock credentials
fake sessions
Dashboard content
Admin Layout changes
role/permission logic
undocumented password policy
```

If the sign-in method or error mapping is still missing from the Tech Lead, state exactly what contract information is required instead of guessing it.
