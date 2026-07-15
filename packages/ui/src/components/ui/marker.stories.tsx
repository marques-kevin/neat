import type { Meta, StoryObj } from "@storybook/react";
import { Marker, MarkerContent, MarkerIcon } from "./marker";
import { MapPin } from "lucide-react";

const meta = {
  title: "Design System/Marker",
  component: Marker,
  tags: ["autodocs"],
} satisfies Meta<typeof Marker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Marker>
      <MarkerIcon>
        <MapPin />
      </MarkerIcon>
      <MarkerContent>Paris, FR</MarkerContent>
    </Marker>
  ),
};
