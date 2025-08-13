import type { Meta, StoryObj } from "@storybook/react";
import { VerseCard } from "./VerseCard";

const meta: Meta<typeof VerseCard> = {
  title: "Molecules/VerseCard",
  component: VerseCard,
  args: {
    verse: {
      id: 1,
      book: "요한복음",
      chapter: 3,
      verse: 16,
      text: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니...",
      likes: 120,
      comments: 4,
      isLiked: false,
      isBookmarked: false,
    },
    onLike: () => {},
    onBookmark: () => {},
    onRead: () => {},
    onComment: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof VerseCard>;

export const Default: Story = {};

export const Liked: Story = {
  args: {
    verse: {
      id: 2,
      book: "시편",
      chapter: 23,
      verse: 1,
      text: "여호와는 나의 목자시니 내가 부족함이 없으리로다",
      likes: 999,
      comments: 12,
      isLiked: true,
      isBookmarked: false,
    },
  },
};

export const Bookmarked: Story = {
  args: {
    verse: {
      id: 3,
      book: "창세기",
      chapter: 1,
      verse: 1,
      text: "태초에 하나님이 천지를 창조하시니라",
      likes: 45,
      comments: 1,
      isLiked: false,
      isBookmarked: true,
    },
  },
};


