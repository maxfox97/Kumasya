# Task: Create Admin Layout

## Mode

IMPLEMENTATION TASK.

Follow:

- `CLAUDE.md`
- `docs/pattern.md`
- `docs/architecture/project-structure.md`
- `docs/architecture/state-management.md`
- `docs/architecture/auth.md`
- `docs/design/figma-map.md`

Do not redesign the project architecture.

Do not implement page-specific business logic.

---

## Goal

Create the reusable admin application layout used by authenticated admin pages.

The layout must be based on the Figma design and follow the approved Feature-Sliced Design architecture.

The layout will be reused by:

- A2 — Kitchen Dashboard
- A3 — Class Distribution
- A4 — Users
- A5 — Orders
- A6 — Menu
- A7 — Support
- A8 — Settings

A1 Login must NOT use the Admin Layout.

---

## Design Reference

Use the Figma design map:

`docs/design/figma-map.md`

Before implementation:

1. Inspect the relevant Figma nodes using Figma MCP.
2. Inspect the shared sidebar/navigation design.
3. Inspect Foundations for:
   - colors
   - typography
   - spacing
   - sidebar width
   - borders
   - active navigation state
   - background colors
4. Inspect reusable Figma components where applicable.

Figma is the source of truth for visual implementation.

Do not estimate values when they can be obtained from Figma.

---

## Repository Analysis

Before changing code:

1. Inspect the current project structure.
2. Inspect the current router.
3. Inspect existing providers.
4. Inspect existing shared UI components.
5. Inspect existing shadcn/ui components.
6. Inspect current design tokens.
7. Inspect Zustand stores.
8. Inspect authentication state if already implemented.

Use CodeGraph when useful.

Do not recreate existing functionality.

---

## Layout Responsibilities

The Admin Layout is responsible only for application shell concerns.

It must provide:

- persistent sidebar
- navigation
- authenticated admin information area
- logout action boundary
- main content area
- React Router `Outlet`
- consistent page background
- consistent sizing and spacing

It must NOT contain:

- dashboard data
- orders data
- users data
- menu data
- page-specific filters
- page-specific tables
- feature-specific API requests

---

## Expected Structure

Conceptually:

```text
AdminLayout
│
├── Sidebar
│   ├── Brand
│   ├── Navigation groups
│   ├── Navigation items
│   └── Current admin / logout
│
└── Main
    └── Outlet
```
