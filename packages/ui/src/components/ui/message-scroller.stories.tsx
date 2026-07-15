import type { Meta, StoryObj } from "@storybook/react";
import { Bubble, BubbleContent } from "./bubble";
import { Message, MessageContent } from "./message";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "./message-scroller";

const meta = {
  title: "Design System/Message Scroller",
  component: MessageScroller,
  tags: ["autodocs"],
} satisfies Meta<typeof MessageScroller>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-64 max-w-md rounded-md border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="gap-3 p-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <MessageScrollerItem key={i} scrollAnchor={i === 11}>
                <Message align={i % 2 ? "end" : "start"}>
                  <MessageContent>
                    <Bubble variant={i % 2 ? "default" : "secondary"}>
                      <BubbleContent>Message {i + 1}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  ),
};
