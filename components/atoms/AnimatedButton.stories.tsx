import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedButton } from "./AnimatedButton";

const meta: Meta<typeof AnimatedButton> = {
  title: "Atoms/AnimatedButton",
  component: AnimatedButton,
  args: {
    children: "버튼",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    ripple: { control: "boolean" },
    glow: { control: "boolean" },
    bounce: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedButton>;

export const Default: Story = {
  args: {
    variant: "default",
    ripple: true,
    glow: true,
    bounce: false,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "아웃라인",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "고스트",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: "🔔",
  },
};


