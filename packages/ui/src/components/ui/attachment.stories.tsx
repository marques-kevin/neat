import type { Meta, StoryObj } from "@storybook/react";
import { FileIcon } from "lucide-react";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "./attachment";

const meta = {
  title: "Design System/Attachment",
  component: Attachment,
  tags: ["autodocs"],
} satisfies Meta<typeof Attachment>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Attachment>
      <AttachmentMedia>
        <FileIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>spec.pdf</AttachmentTitle>
        <AttachmentDescription>128 KB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
};
