import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  args: {
    user: { name: "홍길동", level: 42 },
    levelInfo: { title: "Servant", subtitle: "종", color: "bg-purple-100 text-purple-800", icon: "🙏" },
    notifications: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};


