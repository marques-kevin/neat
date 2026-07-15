import type { Meta, StoryObj } from "@storybook/react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";

const meta = {
  title: "Design System/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="you@example.com" />
        <FieldDescription>We'll never share your email.</FieldDescription>
      </Field>
    </FieldGroup>
  ),
};
