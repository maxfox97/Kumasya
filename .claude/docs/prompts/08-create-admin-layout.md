# Task: Create Admin Layout

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

Also use the conclusions from the already completed:

- project architecture
- project audit
- FSD structure
- project tooling
- design system
- router/application-provider setup
- state-management foundation
- authentication foundation

Inspect the current repository before making changes.

Do not redesign the approved architecture.

Do not recreate existing infrastructure.

Do not implement page-specific business logic.

---

# Goal

Create the reusable authenticated admin application shell for Kumasya Admin.

The layout must be based on the approved Figma design and must integrate with the router/authentication foundations already created.

The Admin Layout will be reused by:

- A2 — Kitchen Dashboard
- A3 — Class Distribution
- A4 — Users
- A5 — Orders
- A6 — Menu
- A7 — Support
- A8 — Settings

A1 Login must remain outside the Admin Layout.

This task owns the shared authenticated application shell only.

---

# Scope

The task may implement:

- reusable Admin Layout
- persistent sidebar
- brand/logo area
- admin navigation
- active navigation state
- current authenticated user/admin presentation using documented Better Auth session fields only
- logout action UI/boundary
- main content area
- React Router `Outlet`
- protected admin route grouping using the existing `ProtectedRoute`
- shared layout styling required by Figma
- layout-only responsive behavior when explicitly defined in Figma

The task must NOT implement:

- Login page UI
- dashboard content
- dashboard cards/charts/statistics
- users page
- orders page
- menu page
- support page
- settings page
- page-specific tables
- page-specific filters
- feature API requests
- backend authentication
- backend authorization
- new role/permission models
- mock admin data
- fake session data

---

# Design Reference

Use:

```text
.claude/docs/design/figma-map.md
```

Figma is the source of truth for visual implementation.

Before implementation:

1. Read the Figma map.
2. Resolve the exact Admin Layout / Sidebar / navigation-related Figma nodes.
3. Inspect those nodes through Figma MCP.
4. Inspect the relevant Foundations/design tokens.
5. Inspect reusable Figma components/assets used by the layout.

Extract actual values for:

- sidebar width
- shell dimensions
- page/background colors
- sidebar background
- typography
- text colors
- icon sizes
- navigation item height
- navigation spacing
- section spacing
- horizontal/vertical padding
- borders
- border radius
- active navigation state
- hover state if represented
- brand/logo size
- user/admin area
- logout control
- main content padding
- layout min-height
- responsive behavior if explicitly designed

Do not estimate values when they are available in Figma.

Do not invent responsive/mobile behavior that is not represented in the approved design.

If Figma and the current design-system tokens differ, report the conflict before creating a new token or overriding an established shared primitive.

---

# Figma MCP Rule

Use the exact persistent Figma node links/IDs documented in `.claude/docs/design/figma-map.md`.

Do not search Figma by approximate page/component names when an exact node reference exists.

If the map does not contain the required Admin Layout nodes:

- stop before visual implementation
- report exactly which node/link is missing
- do not guess spacing, dimensions, colors, assets, or layout structure

Do not replace missing Figma information with arbitrary CSS values.

---

# Repository Analysis

Before changing code:

1. Inspect the current repository structure.
2. Read the approved FSD/project structure.
3. Inspect the existing router from task 04.
4. Inspect existing application providers.
5. Inspect the authentication foundation from task 07.
6. Inspect `ProtectedRoute`.
7. Inspect `authClient`.
8. Inspect existing route path constants.
9. Inspect existing shared UI primitives created by the design-system task.
10. Inspect existing design tokens/CSS.
11. Inspect the installed icon solution.
12. Inspect any existing layout/sidebar/navigation scaffolds.
13. Inspect current asset conventions.
14. Search for any existing Admin Layout implementation before creating one.

Do not recreate functionality that already exists.

Do not add shadcn/ui or another component library merely for this task if the project already has approved shared UI primitives.

Use CodeGraph/repository intelligence when useful.

---

# Architecture Boundary

The Admin Layout is an application shell.

It is responsible for:

- navigation chrome
- persistent sidebar
- layout-level authenticated-user presentation
- logout interaction boundary
- main content container
- rendering nested route content
- layout-level spacing/background
- active route presentation

It is NOT responsible for:

- feature data
- page data
- page API requests
- business logic
- page filters
- page tables
- dashboard metrics
- role authorization logic
- backend permission enforcement

Keep page/feature logic out of the layout.

---

# FSD Placement

Do not decide placement from this prompt alone.

First inspect the approved project structure and the existing empty scaffolds.

Place the Admin Layout, Sidebar, navigation, and related components in the layer already designated by the project's FSD rules.

Do not introduce a new architectural layer or arbitrary folder such as:

```text
src/components/
src/layout/
src/common/
```

unless the approved architecture explicitly uses it.

If the approved structure has separate responsibilities such as:

- application layout in `app`
- reusable shell composition in `widgets`
- shared primitive in `shared`

respect those boundaries.

Do not move existing files merely to fit a preferred personal architecture.

---

# Expected Composition

Conceptually:

```text
ProtectedRoute
└── AdminLayout
    ├── Sidebar
    │   ├── Brand
    │   ├── Navigation
    │   │   ├── Dashboard
    │   │   ├── Class Distribution
    │   │   ├── Users
    │   │   ├── Orders
    │   │   ├── Menu
    │   │   ├── Support
    │   │   └── Settings
    │   └── Current user / Logout
    │
    └── Main
        └── Outlet
```

This diagram is conceptual only.

Use the exact Figma hierarchy and approved FSD placement.

---

# Router Integration

Task 04 created the router foundation.

Task 07 created `ProtectedRoute` but intentionally did not wire it.

This task owns the first protected admin route grouping if the existing router structure supports it cleanly.

Use the existing:

- `createBrowserRouter`
- `RouterProvider`
- route path constants
- `ProtectedRoute`

Do not redesign the router.

Do not recreate `paths`.

Do not hardcode route strings when an existing route constant exists.

A1 Login must remain public and outside both:

- `ProtectedRoute`
- `AdminLayout`

Authenticated admin routes should conceptually become nested under:

```text
ProtectedRoute
└── AdminLayout
    └── authenticated child routes
```

Do not create fake page components merely to make nesting work.

If current page routes are not implemented yet, preserve the existing route contract and create only the minimum valid nesting needed for the shell.

Do not invent root `/` redirect behavior unless it is already documented.

Do not introduce role-based route guards.

---

# Navigation

Navigation items must come from the approved route contract and Figma.

Use existing `paths` constants.

Do not duplicate literal URLs such as:

```text
/dashboard
/classes
/users
/orders
/menu
/support
/settings
```

throughout components.

Use React Router navigation primitives appropriate for active-state navigation, normally `NavLink` when it matches the current router architecture.

Active state must reflect the current URL and the Figma active navigation design.

Be deliberate about exact vs nested matching.

Do not mark multiple unrelated navigation entries active at once.

Do not implement disabled or permission-gated navigation unless documented.

---

# Navigation Configuration

A small layout-local navigation configuration is acceptable if it reduces repeated markup.

It may contain only UI/navigation metadata such as:

- label
- route path
- icon/component reference

Do not put:

- permissions
- backend role checks
- API state
- feature data
- analytics behavior

into the navigation configuration.

Do not create a global configuration framework for seven static admin navigation entries.

---

# Icons and Assets

Use the icon/asset solution already installed and approved by the repository.

Do not install a new icon package unless the exact Figma asset cannot be represented by the current project solution and approval is explicitly required.

If Figma uses custom SVG/logo assets:

- use the existing asset convention
- export/download the exact asset through the supported Figma workflow when needed
- do not redraw brand assets approximately with CSS
- do not embed unexplained external URLs

If an icon exists in the already-installed icon library and accurately matches the approved design, use it consistently.

---

# Shared UI Rules

Reuse the existing design-system primitives where they semantically match the Figma component.

Existing project primitives may include components such as:

- Button
- Badge
- StatusBadge
- Input
- Select
- Checkbox

Do not force a shared primitive into the layout when it does not semantically match.

Do not create page-specific shared primitives during this task.

If the logout control is visually a button and the existing Button supports the required Figma variant, reuse it.

Do not modify the global Button API solely for one layout edge case without a concrete design-system reason.

---

# Styling Rules

Use the existing styling approach and design tokens.

Prefer existing tokens/classes over hardcoded duplicates when the token represents the exact Figma value.

Hardcoded layout values are acceptable only when:

- they are specific layout measurements from Figma, and
- there is no approved reusable token for that value

Do not create global tokens for one-off measurements without clear reuse.

Avoid inline style objects unless required for a technical reason.

Do not add global CSS for a local layout concern if local component classes solve it cleanly.

Preserve the existing Tailwind/design-system configuration.

---

# Sidebar Behavior

Implement only behavior shown or required by the approved design.

Potential responsibilities:

- fixed/persistent sidebar
- vertical navigation
- active state
- brand area
- authenticated user area
- logout affordance

Do NOT automatically invent:

- collapsible sidebar
- mobile drawer
- hamburger menu
- tooltip mode
- mini sidebar
- persisted collapsed state
- animation
- resizable width

unless those behaviors are explicitly represented in Figma or existing requirements.

---

# Current Authenticated User Area

Better Auth remains the source of truth for session/user state.

Do not introduce:

```text
authStore
sessionStore
currentUserStore
```

Do not mirror the session into Zustand or TanStack Query.

If the Figma sidebar displays the current user/admin:

- read from the existing `authClient` / Better Auth session
- use only fields guaranteed by the installed Better Auth client or explicitly documented backend contract
- do not invent role/title/restaurant/team fields
- do not create fake fallback admin names such as "Admin User"
- do not create mock avatar URLs

If a visual field required by Figma is not present in the documented session contract, report it as a backend-contract/design integration gap.

A neutral visual fallback such as initials derived from a real documented name may be used only if the Figma/design system supports such a fallback and no fake identity is introduced.

---

# Session Handling Inside the Layout

The `ProtectedRoute` remains the authentication boundary.

Do not recreate protection logic inside `AdminLayout`.

The layout may consume the Better Auth session only for presentation of current-user information.

Do not redirect unauthenticated users from multiple components.

Do not implement a second authentication gate.

Do not implement manual session restoration.

Do not manually manage cookies/tokens.

---

# Logout

Use the Better Auth client already created in task 07.

Use the installed-version official `signOut` API.

Before implementation, inspect the installed Better Auth types/API instead of guessing callback signatures.

Expected behavior:

1. user activates the logout control
2. Better Auth sign-out is invoked
3. navigation to the existing public Login route occurs only after successful sign-out
4. a failed sign-out must not be silently represented as successful

Do not:

- clear cookies manually
- clear auth tokens manually
- clear unrelated localStorage/sessionStorage
- use a fake timeout
- reload the page unless there is a documented reason
- implement backend logout endpoints manually

Use local React state only if needed for a transient logout interaction such as pending state.

Do not create a global logout store.

---

# Logout Error UI

Do not invent product copy or a new notification system in this task.

If the project already has an approved error/toast mechanism, it may be used.

If no approved mechanism exists:

- preserve the failure state
- avoid navigating as if logout succeeded
- keep the UI implementation minimal
- report that user-facing logout error presentation remains unresolved

Do not add a toast library just for logout.

---

# Main Content Area

The main content area must:

- render React Router `Outlet`
- use the Figma background
- use Figma-defined spacing/padding
- occupy the remaining viewport/application width correctly
- support future page content without page-specific assumptions

Do not put Dashboard-specific wrappers, titles, cards, grids, or loading state into `AdminLayout`.

---

# Layout Sizing

Use the exact layout measurements from Figma.

Be explicit about:

- sidebar width
- viewport/min-height behavior
- main width/flex behavior
- overflow behavior
- content padding

Avoid accidental double-scroll containers.

Do not introduce a fixed content width unless Figma explicitly defines one.

Do not make the whole app horizontally scroll because of an incorrectly fixed sidebar/main combination.

---

# Accessibility

Navigation and logout controls must remain keyboard accessible.

Use semantic elements where appropriate:

- `nav`
- links
- buttons

Do not make clickable `div` elements when a semantic interactive element exists.

If icon-only controls exist in Figma, provide an accessible name.

Preserve visible focus behavior according to the design system.

Decorative icons should not create redundant screen-reader output.

---

# TypeScript

Use strict TypeScript.

Avoid `any`.

Type layout/navigation configuration explicitly when useful.

Do not duplicate Better Auth session interfaces manually.

Prefer inferred Better Auth types for authenticated user/session data.

---

# Public API

Keep each new module's public API minimal.

Export only components/types actually needed by other application layers.

Do not export internal navigation arrays, styling helpers, or implementation-only subcomponents "just in case".

Respect existing barrel-file conventions.

---

# Do Not Touch

Unless required for this layout integration or compilation, do not modify:

```text
src/shared/ui/*
design-system tokens
Tailwind configuration
QueryClient configuration
Better Auth client configuration
Login page
Dashboard page/content
Users page
Orders page
Menu page
Support page
Settings page
feature API code
backend contracts
```

Do not change authentication architecture from task 07.

Do not add Zustand state for the sidebar unless Figma explicitly requires persistent global sidebar behavior.

---

# Expected Changes

The exact file list must follow the approved FSD structure and existing scaffolds.

Potential changes may include:

```text
<approved-layout-location>/
  AdminLayout.tsx
  Sidebar.tsx
  navigation.ts
  index.ts
```

and the minimum router changes necessary to compose:

```text
ProtectedRoute
└── AdminLayout
```

Do not mechanically create all example files.

Create only the smallest maintainable set actually needed.

Do not introduce an `AdminHeader` / top bar unless it exists in Figma.

---

# React Fast Refresh / Lint Boundaries

Respect the existing React Fast Refresh lint rules.

If a React component and non-component exports trigger:

```text
react-refresh/only-export-components
```

split them into focused files.

Do not disable lint rules.

---

# Validation

After implementation run the existing project checks.

At minimum, when available:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run format:check
```

Do not modify validation scripts to make the task pass.

---

# Runtime / Visual Smoke Test

This task is visual, so a plain `curl 200` check is not sufficient as the only runtime validation.

When practical:

1. start Vite on an explicit host/port with `--strictPort`
2. identify the exact process
3. verify the application boots
4. inspect the Admin Layout in a browser-capable environment if available
5. compare the implementation with the exact Figma node
6. verify active navigation state
7. verify layout dimensions/background/spacing
8. verify the Login route is outside the Admin Layout
9. verify protected admin routes are under the auth boundary
10. verify logout behavior only to the extent a real backend/session is available
11. stop only the exact dev-server process

If no authenticated backend session is available, do not fake one just to pass the visual test.

Instead:

- validate compile/build
- validate the route composition statically
- use an existing safe development/design preview mechanism only if the repository already has one
- clearly document which authenticated runtime behaviors could not be exercised

Do not add mock authentication code to production files.

Do not use broad process termination commands such as:

```bash
pkill -f vite
```

---

# Backend Contract Limitations

Task 07 established that the backend/auth contract is currently incomplete.

Do not solve that gap by guessing.

If the Admin Layout requires user fields that are not documented:

- use only guaranteed Better Auth fields when sufficient
- otherwise report the missing field requirement
- do not fabricate an admin profile

If real logout cannot be runtime-tested because the backend is unavailable, say so explicitly.

---

# Acceptance Criteria

The task is complete only when all applicable criteria are satisfied:

1. The exact Admin Layout Figma node(s) were inspected through Figma MCP.
2. Figma values were used rather than arbitrary estimates.
3. Existing FSD placement rules were followed.
4. The reusable Admin Layout exists.
5. The persistent Sidebar exists if present in Figma.
6. Navigation reflects the approved admin destinations.
7. Navigation uses existing route constants rather than duplicated URL strings.
8. Active navigation state matches Figma.
9. A1 Login remains outside the Admin Layout.
10. Protected admin route composition uses the existing `ProtectedRoute`.
11. The existing router architecture was preserved.
12. `AdminLayout` renders nested content through `Outlet`.
13. The current-user area uses Better Auth session state only if required by Figma.
14. No fake admin/user/session data was introduced.
15. Logout uses the existing Better Auth client and official installed-version API.
16. Logout does not manually manipulate cookies/tokens.
17. No duplicate auth/session state was introduced.
18. No undocumented roles/permissions were introduced.
19. No page-specific data or business logic was added.
20. Dashboard content was not implemented.
21. Existing design-system primitives/tokens were reused where appropriate.
22. No new component library was introduced unnecessarily.
23. TypeScript passes.
24. lint passes.
25. production build passes.
26. formatting checks pass.
27. Runtime/visual validation limitations are accurately reported.

---

# Final Report

At completion report:

- exact Figma node(s) inspected
- key Figma measurements used
- FSD placement chosen and why it matches the existing architecture
- files created
- files modified
- router changes
- protected-route composition
- navigation implementation
- active-state implementation
- current-user/session fields used
- logout implementation
- design-system primitives reused
- validation results
- visual/runtime smoke-test results
- backend/session limitations
- unresolved design/backend contract gaps

Explicitly confirm whether the following were NOT implemented:

```text
Login page UI
Dashboard page/content
Users page
Orders page
Menu page
Support page
Settings page
backend authentication
backend authorization
mock authentication
fake admin data
new role/permission model
manual token persistence
manual cookie management
page-specific API requests
page-specific business logic
```

If required Figma nodes or backend/session fields are missing, report exactly what is missing instead of guessing.
