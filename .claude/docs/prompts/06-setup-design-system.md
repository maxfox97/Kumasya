# Task: Setup Design System

## Mode

IMPLEMENTATION TASK.

Follow:

- `CLAUDE.md`
- `docs/pattern.md`
- `docs/architecture/project-structure.md`
- `docs/design/figma-map.md`

Do not implement application pages in this task.

Do not implement page-specific business logic.

Do not redesign the existing Figma design.

---

# Goal

Create the frontend design system foundation for Kumasya Admin.

The design system must provide a consistent visual foundation for:

- A1 — Login
- A2 — Kitchen Dashboard
- A3 — Class Distribution
- A4 — Users
- A5 — Orders
- A6 — Menu
- A7 — Support
- A8 — Settings

The design system must be based on the approved Figma Foundations and reusable Figma components.

Figma is the source of truth for visual values.

---

# Technology

Use the existing project stack:

- Tailwind CSS
- shadcn/ui
- Base UI
- existing icon library
- existing Vite configuration
- existing TypeScript configuration

Do not introduce:

- Material UI
- Chakra UI
- Ant Design
- Blueprint
- another CSS framework
- another design system library

unless explicitly approved.

---

# Before Implementation

Before changing files:

1. Read `docs/design/figma-map.md`.
2. Inspect the Figma Foundations node using Figma MCP.
3. Inspect the reusable Components nodes using Figma MCP.
4. Inspect current global CSS.
5. Inspect `components.json`.
6. Inspect installed shadcn/ui configuration.
7. Inspect existing `shared/ui` components.
8. Inspect current Tailwind configuration.
9. Inspect current project aliases.
10. Inspect any existing design tokens.

Use CodeGraph when useful to understand existing dependencies.

Do not recreate components or tokens that already exist.

---

# Figma Inspection

Use Figma MCP to extract and verify the actual design values.

Inspect at minimum:

## Colors

Identify semantic colors for:

- application background
- card/surface background
- primary text
- secondary text
- muted text
- primary action
- primary action hover
- borders
- inputs
- focus state
- sidebar background
- sidebar foreground
- sidebar active item
- success
- warning
- destructive/error
- informational state

Do not create token names based only on raw color names.

Prefer semantic names.

Good:

```text
primary
background
foreground
border
muted
destructive
success
warning
sidebar
```
