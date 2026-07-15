import type { Meta, StoryObj } from "@storybook/react";
import { Bubble, BubbleContent, BubbleGroup } from "./bubble";

const meta = {
  title: "Design System/Bubble",
  component: Bubble,
  tags: ["autodocs"],
} satisfies Meta<typeof Bubble>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BubbleGroup className="max-w-md">
      <Bubble>
        <BubbleContent>Hey, can you review this PR?</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>On it — looking now.</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
};
