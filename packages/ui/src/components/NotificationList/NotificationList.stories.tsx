import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { NotificationList } from "./NotificationList";
import type { NotificationListItemViewModel } from "./NotificationList.types";

const items: NotificationListItemViewModel[] = [
  {
    id: "gh-1",
    title: "Dependabot: lodash vulnerability in org/api",
    repo: "org/api",
    author: "dependabot[bot]",
    bodyPreview: "Critical severity CVE-2024-1234",
    priority: "high",
    isRead: false,
    isPinned: true,
    isSelected: true,
  },
  {
    id: "gh-2",
    title: "Review requested on feat/auth-refactor",
    repo: "org/web",
    author: "bob",
    bodyPreview: "@you was requested for review",
    priority: "high",
    isRead: false,
    isPinned: false,
    isSelected: false,
  },
  {
    id: "gh-11",
    title: "Someone starred org/legacy-tool",
    repo: "org/legacy-tool",
    author: "github",
    bodyPreview: "Your repository has a new star",
    priority: "low",
    isRead: true,
    isPinned: false,
    isSelected: false,
  },
];

const meta = {
  title: "Components/NotificationList",
  component: NotificationList,
  tags: ["autodocs"],
  args: {
    items,
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
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: { items: [items[0]!] },
};

export const Empty: Story = {
  args: { items: [] },
};
