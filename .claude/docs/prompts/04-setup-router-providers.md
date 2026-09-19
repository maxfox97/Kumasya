# 04 — Setup Router and Application Providers

## Goal

Set up the routing foundation and application-level provider composition for the React application.

This task establishes the infrastructure required by later login, authentication, dashboard, and admin pages.

The result must be production-ready, minimal, typed, and compatible with the existing FSD project structure.

Do not implement page UI or business logic in this task.

---

## Read first

Before making any changes, read and follow:

- `.claude/docs/pattern.md`
- `.claude/docs/architecture/project-structure.md`
- `.claude/docs/architecture/state-management.md`
- `.claude/docs/architecture/auth.md`
- `.claude/docs/design/figma-map.md`
- `.claude/docs/prompts/00-plan-project-structure.md`
- `.claude/docs/prompts/01-audit-project-foundation.md`
- `.claude/docs/prompts/02-create-fsd-structure.md`
- `.claude/docs/prompts/03-configure-project-tooling.md`

Also inspect the current repository before changing anything.

The repository is the source of truth for what has already been implemented.

Important:
the design-system task may already have been completed.
Do not overwrite, reorganize, or refactor existing design-system files unless routing requires a strictly necessary integration change.

---

## Scope

Implement only the routing and application-provider foundation.

This task may include:

- React Router installation/configuration
- central route definitions
- typed route/path constants where useful
- router provider
- application provider composition
- root application wiring
- route-level infrastructure required for future pages
- generic fallback / not-found routing if appropriate
- lazy-loading infrastructure if it can be introduced without creating fake page implementations

Keep the implementation minimal.

---

## Required architecture

Follow the existing FSD structure.

Application-wide infrastructure belongs under:

```text
src/app/
├── App.tsx
├── providers/
│   ├── router/
│   │   ├── router.tsx
│   │   └── index.ts
│   ├── AppProviders.tsx
│   └── index.ts
└── routes/
    ├── paths.ts
    └── index.ts
```

Adapt the exact structure if the existing architecture documentation defines a better project-specific convention.

Do not create directories or files only for symmetry.

Do not create empty placeholder source files.

---

## Router

Use the current stable React Router API appropriate for this project.

Prefer the data-router architecture when compatible with the installed React Router version:

```text
createBrowserRouter
RouterProvider
```

Do not introduce deprecated routing APIs.

Keep route configuration centralized and easy to extend.

---

## Route paths

Create centralized route path definitions instead of scattering literal route strings throughout the application.

The route contract should accommodate the planned application pages:

```text
/login
/dashboard
/classes
/users
/orders
/menu
/support
/settings
```

However:

- do not implement those page UIs in this task
- do not invent business behavior
- do not create fake production page components just to satisfy the router
- do not duplicate page implementations belonging to later prompts

If some routes cannot yet be connected because their real pages do not exist, keep the routing foundation extensible and document that those route elements will be attached by their dedicated implementation tasks.

Do not create misleading placeholders that look like finished screens.

---

## Application providers

Create a clean application composition root.

For example:

```tsx
<AppProviders>
  ...
</AppProviders>
```

The purpose is to provide one stable location where application-wide providers can be composed later.

At this stage, include only providers actually required by the current routing implementation.

Do NOT prematurely add:

- authentication providers
- session providers
- Zustand providers
- domain state
- business contexts
- API-specific providers
- feature-specific contexts

If React Router uses `RouterProvider`, structure the composition accordingly rather than forcing an unnecessary wrapper API.

Prefer simple architecture over abstraction for abstraction's sake.

---

## State-management boundary

The next dedicated task owns state-management infrastructure.

Do not implement the responsibilities of:

```text
05-setup-state-management.md
```

Specifically, do not create or configure:

- Zustand stores
- application UI stores
- server-state query hooks
- entity queries
- domain state
- persistence
- API cache policies

If TanStack Query or another state provider is specified by the architecture documentation but belongs to task 05, leave a clean composition point for it rather than implementing it here.

---

## Design-system boundary

The design system is handled by:

```text
06-setup-design-system.md
```

It may already exist in the repository.

Do not:

- change design tokens
- rewrite `src/index.css`
- modify shared UI primitives
- change Tailwind configuration
- recreate Button/Input/Select/Checkbox/Badge components
- introduce page styling

Routing infrastructure should remain independent of visual design.

---

## Authentication boundary

Authentication is owned by:

```text
07-setup-auth-foundation.md
```

Do not implement:

- auth API
- login requests
- session storage
- tokens
- refresh-token logic
- user state
- permissions
- role checks
- protected-route business logic
- redirects based on authenticated user state

Do not create a fake `ProtectedRoute` with mocked authentication.

However, structure the router so protected routing can be introduced cleanly in task 07 without redesigning the router.

---

## Layout boundary

Admin layout is owned by:

```text
08-create-admin-layout.md
```

Do not implement:

- sidebar
- header
- navigation UI
- mobile navigation
- admin shell
- dashboard layout

The router architecture should make it easy to introduce a nested admin layout later.

---

## Login and dashboard boundaries

Do not implement anything belonging to:

```text
09-implement-login.md
10-implement-dashboard.md
```

No Login UI.
No Dashboard UI.
No cards.
No tables.
No charts.
No page-specific business logic.

---

## Error handling

Provide a sensible routing failure strategy.

If using React Router data routes, configure an appropriate route-level error boundary / fallback only if it can be implemented generically without design-specific UI.

Keep it simple.

Do not create a large custom error page in this task.

---

## TypeScript

Keep the routing implementation fully typed.

Avoid:

```ts
any
```

Do not suppress TypeScript errors.

Avoid unnecessary type assertions.

Route/path helpers should preserve useful literal types where practical.

---

## Imports

Use the existing alias:

```ts
@/
```

where appropriate.

Respect FSD boundaries.

Prefer public APIs when importing from slices/modules that expose them.

Do not introduce deep cross-layer imports.

---

## Dependencies

Before installing anything:

1. inspect `package.json`
2. verify whether the required router package is already installed
3. install only what is actually necessary
4. use the current maintained package/API
5. do not add redundant routing libraries

Do not install multiple router libraries.

If a dependency installation is required, show the command for approval.

---

## App integration

Wire the routing foundation into the current application entry point.

The final runtime hierarchy should be simple and intentional.

Conceptually it may look like:

```text
main.tsx
└── App
    └── application/router provider
```

or:

```text
main.tsx
└── AppProviders
    └── RouterProvider
```

Choose the structure that best matches the current React Router API and repository architecture.

Do not preserve unnecessary wrapper layers.

---

## Important implementation rule

Inspect before creating.

If an equivalent router/provider/path module already exists:

- reuse it
- improve it only when necessary
- do not create duplicates

If an existing empty directory was intentionally created by the FSD scaffold, use it when appropriate.

Git does not track empty directories, so do not assume missing directories were never planned.

---

## Validation

After implementation run:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run format:check
```

All checks must pass.

Do not silence errors merely to make validation green.

Fix the underlying problem.

---

## Manual verification

Verify that:

- the application starts with `npm run dev`
- the router mounts without runtime errors
- direct navigation / browser refresh does not crash the client application
- there are no React Router console errors
- existing design-system infrastructure remains intact

Do not add temporary test UI to production source files solely for visual verification.

---

## Git / scope safety

Do not commit or push anything.

Do not modify unrelated files.

At the end, report:

1. dependencies installed
2. files created
3. files modified
4. routing architecture chosen
5. routes/path contracts introduced
6. provider composition created
7. intentionally deferred work
8. validation results

Explicitly mention anything left for tasks 05, 07, 08, 09, and 10.

---

## Definition of Done

The task is complete when:

- React Router foundation is installed/configured
- routing configuration has a clear single source of truth
- application provider composition has a clear home
- planned route paths are centralized where appropriate
- the architecture is ready for auth guards and nested admin layout
- no page UI has been prematurely implemented
- no authentication logic has been implemented
- no state-management logic has been implemented
- no design-system work has been duplicated
- lint passes
- TypeScript passes
- production build passes
- formatting check passes
