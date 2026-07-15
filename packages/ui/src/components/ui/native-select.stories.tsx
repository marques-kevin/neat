import type { Meta, StoryObj } from "@storybook/react";
import { NativeSelect, NativeSelectOption } from "./native-select";

const meta = {
  title: "Design System/Native Select",
  component: NativeSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof NativeSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeSelect className="w-[200px]" defaultValue="en">
      <NativeSelectOption value="auto">System</NativeSelectOption>
      <NativeSelectOption value="en">English</NativeSelectOption>
      <NativeSelectOption value="fr">Français</NativeSelectOption>
    </NativeSelect>
  ),
};
