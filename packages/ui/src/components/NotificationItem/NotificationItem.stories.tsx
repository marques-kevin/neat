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
  initials: "BO",
  avatarClassName: "bg-sky-100 text-sky-700",
};

const meta = {
  title: "Components/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl border bg-card shadow-sm">
        <Story />
      </div>
    ),
  ],
  args: {
    markReadLabel: "Mark read",
    pinLabel: "Pin",
    unpinLabel: "Unpin",
    dismissLabel: "Dismiss",
    moreLabel: "More actions",
    onSelect: fn(),
    onOpen: fn(),
    onMarkAsRead: fn(),
    onPin: fn(),
    onDismiss: fn(),
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {
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
      initials: "GH",
      avatarClassName: "bg-amber-100 text-amber-800",
    },
  },
};
