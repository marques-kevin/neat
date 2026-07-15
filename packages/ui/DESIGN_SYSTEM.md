# Design System (`@app/ui`)

Bootstrap via [shadcn/ui](https://ui.shadcn.com) (New York / Neutral / CSS variables).

## Structure

```
src/
  components/ui/     ← primitives shadcn (Button, Badge, Card…)
  components/        ← feature components (dumb) using the DS
  lib/utils.ts       ← cn()
  styles.css         ← tokens + Tailwind theme
```

## Add a component

From `packages/ui`:

```bash
pnpm dlx shadcn@latest add [component] --yes
```

Examples:

```bash
pnpm dlx shadcn@latest add dialog sheet input avatar --yes
```

Config: [`components.json`](./components.json)

## Tokens

CSS variables live in `src/styles.css` (`:root` + `.dark`).  
Use semantic classes: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, etc.

## Usage

```tsx
import { Button } from "@app/ui/components/ui/button";
import { Badge } from "@app/ui/components/ui/badge";
import { cn } from "@app/ui/lib/utils";
```

Feature components stay dumb — they only compose DS primitives + props/callbacks.

## Storybook

```bash
pnpm storybook
```

Design System stories: `Design System/*`  
Product components: `Components/*`
