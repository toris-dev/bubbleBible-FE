import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>카드 타이틀</CardTitle>
      </CardHeader>
      <CardContent>
        <p>카드 내용입니다.</p>
      </CardContent>
    </Card>
  ),
};


