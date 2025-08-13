import type { Meta, StoryObj } from "@storybook/react";
import { MobileNavigation } from "./MobileNavigation";

const meta: Meta<typeof MobileNavigation> = {
  title: "Organisms/MobileNavigation",
  component: MobileNavigation,
  args: { currentPage: "home" },
};

export default meta;
type Story = StoryObj<typeof MobileNavigation>;

export const Default: Story = {};


