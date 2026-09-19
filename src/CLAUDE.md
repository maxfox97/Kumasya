# Kumasya Admin

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Base UI
- React Router
- TanStack Query
- TanStack Table
- Zustand
- React Hook Form
- Zod
- Better Auth frontend integration
- Lucide

## Architecture

Use Feature-Sliced Design.

Layers:

app
pages
widgets
features
entities
shared

Import direction must go downward.

Pages → widgets/features/entities/shared
Widgets → features/entities/shared
Features → entities/shared
Entities → shared

Avoid global dumping folders like:

- services
- utils
- stores

Keep logic close to the slice that owns it.

Use Feature-Sliced Design.

Layers:
app
pages
widgets
features
entities
shared

Import direction must go downward only.

Pages may use widgets/features/entities/shared.
Widgets may use features/entities/shared.
Features may use entities/shared.
Entities may use shared.
Shared must not import from upper layers.

Keep stores and API logic close to the slice that owns them.
Avoid a global stores/ or services/ dumping ground.

## State Management

Zustand:

- global client state
- authentication state

TanStack Query:

- server/API state

React Hook Form:

- forms

React Router search params:

- filters
- pagination
- URL-driven state

TanStack Table:

- table state

Do not duplicate TanStack Query data in Zustand.

## Authentication

Backend authentication is owned by the backend team.

Better Auth is used by the backend.

Do not implement backend authentication logic.

Do not store:

- passwords
- session tokens
- access tokens

in Zustand or localStorage.

Frontend authentication must follow the backend API contract.

## UI

Use shadcn/ui components when appropriate.

Use design tokens from globals.css.

Do not introduce another UI library without approval.

Avoid hardcoded colors when semantic tokens exist.

## Design

Figma is the source of truth for UI implementation.

Screen mappings are documented in:

docs/design/figma-map.md

For UI tasks:

- inspect the specified Figma node through Figma MCP
- do not infer dimensions when they can be obtained from Figma
- use existing design tokens whenever possible
- do not redesign components without explicit instruction
- compare the implementation against Figma before completing the task

## Development

Keep changes scoped to the current task.

Do not refactor unrelated code.

Do not install dependencies without a clear reason.

Prefer:
Simple → Maintainable → Scalable.

Before finishing implementation run:

npm run lint
npm run typecheck
npm run build
