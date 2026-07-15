import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { NotificationItem } from "./NotificationItem";
import type { NotificationListItemViewModel } from "../NotificationList/NotificationList.types";

const baseItem: NotificationListItemViewModel = {
  id: "gh-2",
  title: "Review requested on feat/auth-refactor",
  repo: "org/web",
  author: "bob",
  bodyPreview: "@you was requested for review",
  priority: "high",
  isRead: false,
  isPinned: false,
  isSelected: false,
};

const meta = {
  title: "Components/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs"],
  args: {
    markReadLabel: "Mark read",
    pinLabel: "Pin",
    unpinLabel: "Unpin",
    dismissLabel: "Dismiss",
    onSelect: fn(),
    onOpen: fn(),
    onMarkAsRead: fn(),
    onPin: fn(),
    onDismiss: fn(),
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HighPriority: Story = {
  args: { item: baseItem },
};

export const Read: Story = {
  args: { item: { ...baseItem, isRead: true } },
};

export const Pinned: Story = {
  args: { item: { ...baseItem, isPinned: true } },
};

export const Selected: Story = {
  args: { item: { ...baseItem, isSelected: true } },
};

export const LowPriority: Story = {
  args: {
    item: {
      ...baseItem,
      id: "gh-11",
      title: "Someone starred org/legacy-tool",
      priority: "low",
      bodyPreview: "Your repository has a new star",
    },
  },
};
