import type { Meta, StoryObj } from "@storybook/react";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./item";

const meta = {
  title: "Design System/Item",
  component: Item,
  tags: ["autodocs"],
} satisfies Meta<typeof Item>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item variant="outline" className="max-w-sm">
      <ItemContent>
        <ItemTitle>Review requested</ItemTitle>
        <ItemDescription>feat/auth-refactor · bob</ItemDescription>
      </ItemContent>
    </Item>
  ),
};
