# Task: Setup State Management Foundation

## Mode

IMPLEMENTATION TASK.

Read and follow:

- `src/CLAUDE.md` if present
- `.claude/docs/pattern.md`
- `.claude/docs/architecture/project-structure.md`
- `.claude/docs/architecture/state-management.md`
- `.claude/docs/prompts/05-setup-state-management.md`

Also use the conclusions from the already completed:

- project architecture
- project audit
- FSD structure
- project tooling
- design system
- router/application-provider setup

Inspect the current repository before making changes.

Do not duplicate existing infrastructure.

Do not redesign the approved architecture.

---

# Goal

Prepare the state-management foundation for Kumasya Admin.

The application intentionally uses different tools for different categories of state.

The architecture must clearly separate:

- global client state
- server/API state
- form state
- URL/navigation state
- table state
- local component state

Avoid overlapping responsibilities.

Do not introduce a single universal global store.

---

# Scope

This task is responsible only for:

- installing the missing state-management foundation dependencies required now
- configuring TanStack Query
- integrating `QueryClientProvider` into the existing `AppProviders`
- preparing the project for future Zustand stores without creating fake application state
- documenting/enforcing clear ownership rules through code structure where appropriate

This task must NOT implement:

- authentication logic
- authentication stores
- current-user/session logic
- token storage
- protected routes
- redirects based on authentication
- backend API clients or API contracts
- login page
- dashboard page
- admin layout
- application pages
- feature business logic
- tables
- forms
- fake/mock server data

Keep changes strictly within the state-management/application-provider foundation.

---

# Approved State Management Stack

The approved application stack is:

- Zustand
- TanStack Query
- React Hook Form
- React Router
- TanStack Table
- local React state

Each tool has a specific responsibility.

Do not use one tool as a replacement for all others.

Do not introduce Redux, MobX, Recoil, Jotai, or another competing global state library.

---

# State Ownership Rules

## 1. TanStack Query — server state

Use TanStack Query for data whose source of truth is the backend/server.

Examples:

```text
current server session
users
orders
classes
menu items
dashboard metrics
support requests
settings loaded from backend
```

TanStack Query owns:

- fetching
- loading states
- error states
- caching
- refetching
- invalidation
- mutations
- server-data synchronization

Do NOT copy query results into Zustand merely to make them globally accessible.

Components and features should consume server data through TanStack Query.

---

## 2. Zustand — global client state

Use Zustand only for client-side application state that:

1. is not server-owned, and
2. must be shared between independent parts of the application.

Possible future examples:

```text
client-only UI preferences
global sidebar preference if persistence is required
temporary cross-feature client workflow state
application-wide client flags
```

Do NOT create a generic dumping-ground store such as:

```text
useAppStore
globalStore
rootStore
```

unless the repository already has a documented architectural reason for it.

Prefer feature/entity-owned stores close to the code that owns the state.

Example future structure:

```text
features/
  some-feature/
    model/
      store.ts
```

or another location already approved by the project architecture.

Do not create feature stores during this task.

---

# Authentication State Rule

Authentication belongs to task `07-setup-auth-foundation`.

Do NOT create:

```text
authStore
useAuthStore
sessionStore
currentUserStore
tokenStore
```

during task 05.

Do not decide here whether authentication will ultimately use:

- TanStack Query
- Zustand
- React context
- cookies
- another session mechanism

Task 07 owns that decision based on the actual backend/session contract.

As a general architectural rule:

- server-backed user/session data should normally be treated as server state
- client-only authentication coordination may use client state only if actually required

Do not duplicate server-backed session data into Zustand without a documented reason.

---

# React Hook Form — form state

Use React Hook Form for non-trivial form state.

Examples:

```text
login form
create/edit user
create/edit class
create/edit menu item
settings forms
```

React Hook Form owns:

- field values
- field validation state
- dirty state
- touched state
- submission state

Do NOT place ordinary form field values in Zustand.

No forms are implemented in this task.

Do not create fake form examples.

---

# React Router — URL state

Use React Router for state that belongs in the URL.

Examples:

```text
route
search query
filters that should survive refresh/share
pagination when represented in URL
selected URL tab
sort represented in search params
```

Prefer URL state when the value should:

- survive refresh
- be bookmarkable
- be shareable
- participate in browser back/forward navigation

Do NOT duplicate URL state into Zustand without a concrete reason.

The router infrastructure from task 04 must remain intact.

---

# TanStack Table — table state

Use TanStack Table for table-specific behavior.

Examples:

```text
sorting
column visibility
row selection
column sizing
table pagination
```

Do not introduce global Zustand state for table state by default.

Table state should remain close to the owning table/widget unless a future requirement explicitly requires persistence or cross-feature sharing.

No tables are implemented in this task.

---

# Local React State

Use:

```text
useState
useReducer
```

for state owned by a single component or tightly coupled component subtree.

Examples:

```text
popover open state
temporary toggle
local modal state
temporary input interaction state
component-only interaction state
```

Do not promote local state into Zustand merely because Zustand is available.

---

# TanStack Query Foundation

Install the current stable TanStack Query React package if it is not already installed.

Expected package:

```text
@tanstack/react-query
```

Do not install deprecated packages.

Before installing, inspect `package.json` and existing infrastructure.

---

# QueryClient

Create a single application-level QueryClient instance.

Preferred structure:

```text
src/app/providers/query/
  QueryProvider.tsx
  queryClient.ts
  index.ts
```

Adapt this structure only if the existing approved FSD/project architecture requires another equivalent location.

The QueryClient must NOT be created inside a React component on every render.

Correct concept:

```ts
export const queryClient = new QueryClient(...)
```

and reuse that instance through the provider.

---

# QueryClient Configuration

Do not invent business-specific caching policies.

Do not guess values for:

```text
staleTime
gcTime
retry
refetchInterval
refetchOnWindowFocus
networkMode
```

unless an existing architecture document already specifies them.

Prefer TanStack Query's stable defaults for the initial foundation.

If a minimal configuration is technically necessary, keep it conservative and explain the reason in the final report.

---

# Query Provider

Create a small provider responsible only for TanStack Query.

Conceptually:

```tsx
<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```

Do not put router logic, authentication logic, feature state, or business logic inside the Query provider.

---

# AppProviders Integration

The existing composition root from task 04 is:

```text
src/app/providers/AppProviders.tsx
```

Update it so TanStack Query becomes part of the application provider composition.

Conceptually:

```tsx
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  )
}
```

The existing router remains outside/inside this composition according to the architecture already established in task 04.

Do not restructure routing unnecessarily.

Do not add authentication providers yet.

Expected application composition should remain conceptually similar to:

```text
App
└── AppProviders
    └── QueryProvider
        └── RouterProvider
```

or the equivalent composition already established by the repository.

---

# Zustand Foundation

Install the current stable `zustand` package if it is not already installed.

However:

DO NOT create an empty/global Zustand store merely to prove that Zustand works.

Do NOT create:

```text
useAppStore
useGlobalStore
rootStore
store.ts with placeholder state
```

without real state ownership.

Installing Zustand and defining the ownership architecture is sufficient until a real feature requires global client state.

Future stores must live with the feature/entity/application concern that owns them.

---

# React Hook Form and TanStack Table

React Hook Form and TanStack Table are approved parts of the architecture.

However, do not create fake form/table infrastructure in this task.

If these packages are not yet required by any concrete implementation in this task, do not create example components merely to use them.

Do not create:

```text
ExampleForm
ExampleTable
demo stores
sample queries
mock query hooks
```

Their concrete setup belongs to the tasks that actually implement forms/tables.

If the task specification or existing architecture explicitly requires installing the packages now, installation is acceptable, but no fake usage should be added.

---

# Query Keys

Do not create speculative domain query keys for APIs that do not exist yet.

Do NOT invent:

```text
usersQuery
ordersQuery
classesQuery
dashboardQuery
```

without corresponding API contracts.

When server features are implemented later, query keys should follow a consistent factory-style convention close to the owning entity/feature.

Example future concept:

```ts
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
}
```

This example is architectural guidance only.

Do not implement speculative query-key factories during this task.

---

# Mutation Rules

Future mutations must:

- update/invalidate relevant server queries
- remain inside their owning entity/feature API layer
- not manually synchronize duplicated Zustand copies of server data

Do not implement mutations in this task.

---

# Persistence Rules

Do not add persistence by default.

Do not use:

```text
localStorage
sessionStorage
zustand persist middleware
IndexedDB
```

unless a real requirement already exists.

Authentication persistence especially belongs to task 07 and must not be implemented here.

---

# File Ownership

Application-wide provider composition belongs under:

```text
src/app/providers/
```

Feature-specific state belongs close to the owning feature.

Entity-specific server queries belong close to the owning entity/API layer when those tasks are implemented.

Shared utilities must only live under `shared` when they are genuinely domain-independent.

Do not create a centralized `src/store` dumping ground.

---

# Expected Changes

The implementation should normally include only changes similar to:

```text
package.json
package-lock.json

src/app/providers/AppProviders.tsx

src/app/providers/query/
  QueryProvider.tsx
  queryClient.ts
  index.ts
```

Potentially update:

```text
src/app/providers/index.ts
```

only if required by the existing provider public API.

The exact file list may differ slightly based on the current repository.

Do not modify unrelated files.

---

# Do Not Touch

Unless required for compilation, do not modify:

```text
src/app/routes/*
src/app/providers/router/*
src/app/providers/auth/*
src/shared/ui/*
src/pages/*
src/widgets/*
src/features/*
src/entities/*
```

Do not modify design-system tokens or Tailwind configuration.

Do not change routing behavior.

Do not create page components.

---

# Implementation Quality

Use:

- TypeScript
- strict typing
- existing project aliases
- existing formatting conventions
- existing FSD boundaries
- simple composition
- maintainable file structure

Prefer:

```text
Simple → Maintainable → Scalable
```

Avoid unnecessary abstraction.

Do not create wrapper utilities when the underlying library API is already sufficient.

---

# Validation

After implementation run the project's existing validation commands.

At minimum verify:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run format:check
```

Use only scripts that actually exist in `package.json`.

Do not modify validation scripts merely to make the task pass.

---

# Runtime Smoke Test

If useful, briefly run the existing Vite dev server and verify that the application still boots after adding QueryClientProvider.

Do not introduce temporary application UI solely for testing.

Do not leave background dev-server processes running.

When stopping a temporary dev server, terminate only the exact process started for this task.

Do not use broad process termination such as:

```bash
pkill -f vite
```

---

# Acceptance Criteria

The task is complete only when:

1. TanStack Query is installed and configured.
2. Exactly one application QueryClient instance exists.
3. QueryClientProvider is integrated through the existing AppProviders composition root.
4. Zustand is available for future global client state without introducing a fake global store.
5. No server data is duplicated into Zustand.
6. No authentication implementation was introduced.
7. No pages, layouts, tables, forms, or backend contracts were implemented.
8. Existing router behavior remains unchanged.
9. Existing design-system infrastructure remains unchanged.
10. lint passes.
11. typecheck passes.
12. production build passes.
13. formatting checks pass.

---

# Final Report

At completion report:

- dependencies installed
- files created
- files modified
- provider composition after the change
- what responsibility TanStack Query owns
- what responsibility Zustand owns
- what was intentionally deferred
- validation results
- any assumptions or unresolved decisions

Explicitly confirm that the following were NOT implemented:

```text
authentication
auth store
protected routes
admin layout
login
dashboard
feature pages
backend API contracts
fake server data
```
