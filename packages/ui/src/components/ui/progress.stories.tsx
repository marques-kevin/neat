import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";

const meta = {
  title: "Design System/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: { value: 66 },
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Progress className="w-[280px]" {...args} />,
};
