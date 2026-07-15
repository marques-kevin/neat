import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LanguageSwitcher } from "./LanguageSwitcher";

const meta = {
  title: "Components/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  args: {
    label: "Language",
    value: "auto",
    autoLabel: "System default",
    englishLabel: "English",
    frenchLabel: "Français",
    onChange: fn(),
  },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Auto: Story = {};

export const English: Story = {
  args: { value: "en" },
};

export const French: Story = {
  args: { value: "fr" },
};
