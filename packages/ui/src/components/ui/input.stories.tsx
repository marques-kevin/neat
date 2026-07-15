import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "Design System/Input",
  component: Input,
  tags: ["autodocs"],
  args: { type: "email", placeholder: "Email" },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Input className="max-w-sm" {...args} />,
};
