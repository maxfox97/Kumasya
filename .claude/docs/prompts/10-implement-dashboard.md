# Task: Implement A2 Kitchen Dashboard

## Mode

IMPLEMENTATION TASK.

Follow:

- `CLAUDE.md`
- `docs/pattern.md`
- `docs/architecture/project-structure.md`
- `docs/architecture/state-management.md`
- `docs/architecture/auth.md`
- `docs/design/figma-map.md`

Do not redesign the architecture.

Do not modify unrelated features.

---

## Goal

Implement the A2 — Kitchen Dashboard page according to the approved Figma design.

The page must visually match the referenced Figma screen and follow the existing Feature-Sliced Design architecture.

---

## Design Reference

Screen:

`A2 — Kitchen Dashboard`

Route:

`/dashboard`

Read the exact Figma node from:

`docs/design/figma-map.md`

Before implementation:

1. Use Figma MCP to inspect the exact A2 node.
2. Inspect the Foundations node for:
   - colors
   - typography
   - spacing
   - borders
   - radius
3. Inspect reusable Figma components when relevant.

Do not estimate design values when they can be obtained from Figma.

Figma is the source of truth for visual implementation.

---

## Repository Analysis

Before changing code:

1. Inspect the existing project structure.
2. Inspect current router configuration.
3. Inspect existing providers.
4. Inspect existing shared UI components.
5. Inspect installed shadcn/ui components.
6. Inspect existing design tokens.
7. Inspect existing TanStack Query setup.
8. Inspect existing TanStack Table setup if present.

Use CodeGraph when useful to understand existing dependencies.

Do not recreate functionality that already exists.

---

## Page Structure

The dashboard contains the following main areas:

### Page Header

Display:

- page title: `Зведення для кухні`
- last updated time
- print version action
- `.xlsx` export action

Use existing shared buttons/components when available.

---

### Filters

Implement the filters shown in Figma:

- period
- institution
- meal / shift
- dish search
- reset filters action

Expected UI labels must match Figma.

Filters must not be stored in Zustand.

Prefer URL search params for filter state where appropriate.

Example:

`/dashboard?period=week&institution=all&meal=all&search=`

The page must remain usable after browser refresh.

---

### Summary Metrics

Implement the four summary cards shown in Figma:

1. Portions for the selected period
2. Total order amount
3. Paid orders
4. Children covered

Example design values shown in Figma must not be hardcoded into reusable components.

Create reusable metric UI only if justified by actual reuse.

---

### Main Summary Table

Implement the main table with columns equivalent to the Figma design:

- Date
- Institution
- Dish
- Portions
- Amount

Use TanStack Table.

The table implementation must support the current page requirements without becoming an over-generalized table framework.

Use existing shared DataTable primitives if already available.

Do not build speculative functionality that is not required by the design.

---

### Footer / Totals Row

The main table must include the totals shown in Figma.

Examples:

- total institutions
- total menu items
- total portions
- total amount

Formatting must follow the Figma design.

---

### Summary by Institution

Implement the secondary summary block:

`Разом за закладами`

Expected columns:

- Institution
- Portions
- Amount

---

### Summary by Day

Implement the secondary summary block:

`Разом за днями`

Expected columns:

- Date
- Portions
- Amount

---

### Informational Note

Implement the informational text displayed below the dashboard tables.

Match the typography, spacing, and muted style from Figma.

---

## Data Architecture

Dashboard API data is server state.

Use:

`TanStack Query`

Do not store dashboard API data in Zustand.

Do not duplicate Query data in global state.

---

## Query Structure

Follow the existing FSD architecture.

A query should conceptually support filters such as:

```ts
type KitchenDashboardFilters = {
  period?: string;
  institutionId?: string;
  meal?: string;
  search?: string;
};
```
