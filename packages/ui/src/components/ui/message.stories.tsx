import type { Meta, StoryObj } from "@storybook/react";
import { Bubble, BubbleContent } from "./bubble";
import { Message, MessageContent, MessageGroup } from "./message";

const meta = {
  title: "Design System/Message",
  component: Message,
  tags: ["autodocs"],
} satisfies Meta<typeof Message>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MessageGroup className="max-w-md">
      <Message>
        <MessageContent>
          <Bubble variant="secondary">
            <BubbleContent>Can you summarize this PR?</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Sure — it refactors auth and adds tests.</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};
