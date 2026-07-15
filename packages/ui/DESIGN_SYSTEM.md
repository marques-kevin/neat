# Design System (`@app/ui`)

Bootstrap via [shadcn/ui](https://ui.shadcn.com) (New York / Neutral / CSS variables).

## Structure

```
src/
  components/ui/     ← 61 primitives shadcn + Storybook stories
  components/        ← feature components (dumb) using the DS
  lib/utils.ts       ← cn()
  styles.css         ← tokens + Tailwind theme
  hooks/             ← e.g. use-mobile (sidebar)
```

## Add a component

```bash
pnpm ui:add [component] --yes
# or from packages/ui:
pnpm dlx shadcn@latest add [component] --yes --overwrite
```

Config: [`components.json`](./components.json)

## Tokens

CSS variables live in `src/styles.css` (`:root` + `.dark`).  
Use semantic classes: `bg-background`, `text-foreground`, `border-border`, `bg-primary`, etc.

## Usage

```tsx
import { Button } from "@app/ui/components/ui/button";
import { Badge } from "@app/ui"; // barrel export
import { cn } from "@app/ui/lib/utils";
```

Feature components stay dumb — they only compose DS primitives + props/callbacks.

## Storybook

```bash
pnpm storybook
```

Every design-system primitive has a story under **Design System/**.  
Product components under **Components/**.

Regenerate stories (if needed):

```bash
node packages/ui/scripts/generate-ui-stories.mjs
```

## Primitives (61)

Accordion, Alert, Alert Dialog, Aspect Ratio, Attachment, Avatar, Badge, Breadcrumb, Bubble, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Dialog, Direction, Drawer, Dropdown Menu, Empty, Field, Form, Hover Card, Input, Input Group, Input OTP, Item, Kbd, Label, Marker, Menubar, Message, Message Scroller, Native Select, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip.
