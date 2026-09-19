# Task: Setup State Management

## Mode

IMPLEMENTATION TASK.

Follow:

- `CLAUDE.md`
- `docs/pattern.md`
- `docs/architecture/project-structure.md`

Do not implement application pages.

Do not implement authentication business logic.

Do not implement backend functionality.

Do not redesign the approved architecture.

---

# Goal

Prepare the state management foundation for Kumasya Admin.

The project uses different tools for different categories of state.

The architecture must clearly separate:

- global client state
- server/API state
- form state
- URL state
- table state
- local component state

Avoid overlapping responsibilities between state management tools.

---

# Approved State Management Stack

Use:

- Zustand
- TanStack Query
- React Hook Form
- React Router
- TanStack Table
- local React state when appropriate

Each tool has a specific responsibility.

Do not use one tool as a replacement for all others.

---

# Core State Ownership Rules

Use the following ownership model.

## Zustand

Use Zustand for:

- global client-side application state
- authentication-related application state
- global UI state only when multiple independent parts of the application need it

Examples:

```text
authenticated user
authentication status
global UI preferences
```
