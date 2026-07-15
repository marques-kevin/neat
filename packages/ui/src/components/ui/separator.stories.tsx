import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta = {
  title: "Design System/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <div className="text-sm font-medium">Triage</div>
      <Separator />
      <div className="text-sm text-muted-foreground">Stay on top of PRs</div>
    </div>
  ),
};
