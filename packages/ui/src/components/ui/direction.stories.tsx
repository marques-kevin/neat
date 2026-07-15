import type { Meta, StoryObj } from "@storybook/react";
import { DirectionProvider } from "./direction";
import { Button } from "./button";

const meta = {
  title: "Design System/Direction",
  component: DirectionProvider,
  tags: ["autodocs"],
} satisfies Meta<typeof DirectionProvider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DirectionProvider dir="rtl">
      <div className="flex gap-2" dir="rtl">
        <Button>واحد</Button>
        <Button variant="outline">اثنان</Button>
      </div>
    </DirectionProvider>
  ),
};
