# Neat Competitor

Dev notification triage app — Étape 1 (in-memory + Redux + dumb components).

## Quick start

```bash
pnpm install
pnpm dev              # web app → http://localhost:5173
pnpm storybook        # design system + components → http://localhost:6006
```

## Tooling

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm dev`           | Vite web app                           |
| `pnpm storybook`     | Storybook (design system + components) |
| `pnpm test`          | Vitest (core + store + ui)             |
| `pnpm test:coverage` | Vitest with coverage                   |
| `pnpm lint`          | ESLint (boundaries + TypeScript)       |
| `pnpm lint:fix`      | ESLint auto-fix                        |
| `pnpm format`        | Prettier write                         |
| `pnpm format:check`  | Prettier check                         |
| `pnpm typecheck`     | TypeScript all packages                |
| `pnpm depcruise`     | Dependency boundary check              |

Pre-commit hook (husky + lint-staged): format + lint on staged files.

## Packages

| Package               | Role                                                 |
| --------------------- | ---------------------------------------------------- |
| `@app/core`           | Domain, use cases, ports                             |
| `@app/infrastructure` | In-memory adapters (Étape 1)                         |
| `@app/store`          | Redux Toolkit — thunks → use cases                   |
| `@app/ui`             | Design system (shadcn) + dumb components + Storybook |
| `@app/web`            | Vite dev shell                                       |

## Design system

See [`packages/ui/DESIGN_SYSTEM.md`](./packages/ui/DESIGN_SYSTEM.md).

Add a primitive:

```bash
cd packages/ui && pnpm dlx shadcn@latest add [component] --yes
```

See [PROJECT.md](./PROJECT.md) for full product spec.
