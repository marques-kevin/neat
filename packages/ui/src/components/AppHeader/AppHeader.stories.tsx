import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { AppHeader } from "./AppHeader";

const meta = {
  title: "Components/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-muted">
        <Story />
      </div>
    ),
  ],
  args: {
    searchPlaceholder: "Search notifications",
    searchValue: "",
    unreadCount: 12,
    notificationsLabel: "Notifications",
    focusMode: false,
    focusModeLabel: "Focus off",
    syncLabel: "Sync",
    isLoading: false,
    onSearchChange: fn(),
    onToggleFocusMode: fn(),
    onSync: fn(),
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [searchValue, setSearchValue] = useState("");
    return <AppHeader {...args} searchValue={searchValue} onSearchChange={setSearchValue} />;
  },
};

export const FocusOn: Story = {
  args: {
    focusMode: true,
    focusModeLabel: "Focus on",
    unreadCount: 4,
  },
};

export const Syncing: Story = {
  args: {
    isLoading: true,
    syncLabel: "Syncing…",
  },
};
