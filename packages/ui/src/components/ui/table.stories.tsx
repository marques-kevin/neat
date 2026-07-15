import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const meta = {
  title: "Design System/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent notifications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Repo</TableHead>
          <TableHead>Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Review requested</TableCell>
          <TableCell>org/web</TableCell>
          <TableCell>High</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>CI failed</TableCell>
          <TableCell>org/api</TableCell>
          <TableCell>Medium</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
