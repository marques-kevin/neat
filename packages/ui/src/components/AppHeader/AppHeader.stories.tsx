import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { AppHeader } from "./AppHeader";

const meta = {
  title: "Components/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  args: {
    appName: "Triage",
    unreadCount: 12,
    unreadLabel: "12 unread notifications",
    focusMode: false,
    focusModeLabel: "Focus off",
    syncLabel: "Sync",
    isLoading: false,
    onToggleFocusMode: fn(),
    onSync: fn(),
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FocusOn: Story = {
  args: {
    focusMode: true,
    focusModeLabel: "Focus on",
    unreadCount: 4,
    unreadLabel: "4 unread notifications",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    syncLabel: "Syncing…",
  },
};
