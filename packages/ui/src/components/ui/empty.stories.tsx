import type { Meta, StoryObj } from "@storybook/react";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty";
import { Inbox } from "lucide-react";

const meta = {
  title: "Design System/Empty",
  component: Empty,
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>No notifications</EmptyTitle>
        <EmptyDescription>You're all caught up.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};
