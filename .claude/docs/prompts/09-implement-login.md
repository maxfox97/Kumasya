# Task: Implement A1 Admin Login

## Design

Screen:
A1 — Admin Login

Figma reference:

See:
docs/design/figma-map.md#A1--Admin-Login

Use Figma MCP to inspect the referenced node before implementation.

States:

- default login
- invalid credentials

Route:

/login

## Scope

Implement only the login page and components directly required by it.

Do not implement backend authentication.

Use the existing frontend auth architecture.

## UI

Match Figma for:

- container dimensions
- positioning
- typography
- inputs
- button
- helper text
- error state
- spacing
- borders
- colors

Do not redesign.

Use:

- Tailwind
- shadcn/ui
- existing design tokens

## Form

Use:

- React Hook Form
- Zod

## State

Do not put form values in Zustand.

Zustand is only used for global authentication state.

## Validation

Run:

npm run lint
npm run typecheck
npm run build

Then:

- open `/login` using Chrome DevTools MCP
- compare it to Figma
- check console errors
- fix visual differences
