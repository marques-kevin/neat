import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No notifications",
    description: "You're all caught up!",
  },
};

export const French: Story = {
  args: {
    title: "Aucune notification",
    description: "Vous êtes à jour !",
  },
};
