import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { NotificationList } from "./NotificationList";
import type { NotificationFilter, NotificationListItemViewModel } from "./NotificationList.types";

const items: NotificationListItemViewModel[] = [
  {
    id: "gh-1",
    title: "Dependabot: lodash vulnerability",
    repo: "org/api",
    author: "dependabot[bot]",
    bodyPreview: "Critical severity CVE-2024-1234",
    priority: "high",
    isRead: false,
    isPinned: true,
    isSelected: true,
    initials: "DE",
    avatarClassName: "bg-rose-100 text-rose-700",
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
    initials: "BO",
    avatarClassName: "bg-sky-100 text-sky-700",
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
    initials: "GH",
    avatarClassName: "bg-amber-100 text-amber-800",
  },
];

const meta = {
  title: "Components/NotificationList",
  component: NotificationList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-md bg-muted p-8">
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Notifications",
    markAllAsReadLabel: "Mark all as read",
    allTabLabel: "All",
    unreadTabLabel: "Unread",
    seeAllLabel: "See all",
    emptyLabel: "No notifications",
    filter: "all" as NotificationFilter,
    items,
    markReadLabel: "Mark read",
    pinLabel: "Pin",
    unpinLabel: "Unpin",
    dismissLabel: "Dismiss",
    moreLabel: "More actions",
    onFilterChange: fn(),
    onMarkAllAsRead: fn(),
    onSeeAll: fn(),
    onSelect: fn(),
    onOpen: fn(),
    onMarkAsRead: fn(),
    onPin: fn(),
    onDismiss: fn(),
  },
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [filter, setFilter] = useState<NotificationFilter>("all");
    const visible = filter === "unread" ? args.items.filter((item) => !item.isRead) : args.items;

    return (
      <NotificationList {...args} filter={filter} items={visible} onFilterChange={setFilter} />
    );
  },
};

export const UnreadOnly: Story = {
  args: {
    filter: "unread",
    items: items.filter((item) => !item.isRead),
  },
};

export const Empty: Story = {
  args: { items: [] },
};
