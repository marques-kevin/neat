# Neat Competitor

Dev notification triage app — Étape 1 (in-memory + Redux + dumb components).

## Quick start

```bash
pnpm install
pnpm dev              # web app → http://localhost:5173
pnpm storybook        # UI components → http://localhost:6006
```

## Tooling

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `pnpm dev`           | Vite web app                     |
| `pnpm storybook`     | Storybook for dumb components    |
| `pnpm test`          | Vitest (core + store + ui)       |
| `pnpm test:coverage` | Vitest with coverage             |
| `pnpm lint`          | ESLint (boundaries + TypeScript) |
| `pnpm lint:fix`      | ESLint auto-fix                  |
| `pnpm format`        | Prettier write                   |
| `pnpm format:check`  | Prettier check                   |
| `pnpm typecheck`     | TypeScript all packages          |
| `pnpm depcruise`     | Dependency boundary check        |

Pre-commit hook (husky + lint-staged): format + lint on staged files.

## Packages

| Package               | Role                                     |
| --------------------- | ---------------------------------------- |
| `@app/core`           | Domain, use cases, ports                 |
| `@app/infrastructure` | In-memory adapters (Étape 1)             |
| `@app/store`          | Redux Toolkit — thunks → use cases       |
| `@app/ui`             | Dumb components + containers + Storybook |
| `@app/web`            | Vite dev shell                           |

See [PROJECT.md](./PROJECT.md) for full product spec.
