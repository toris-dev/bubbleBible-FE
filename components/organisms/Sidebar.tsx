"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Heart, MessageCircle, Sparkles, Trophy, X } from "lucide-react";
import { AnimatedButton } from "../atoms/AnimatedButton";
import { CounterAnimation } from "../atoms/CounterAnimation";
import { LevelGuideCard } from "../molecules/LevelGuideCard";

interface SidebarProps {
  currentPage?: string;
  onClose?: () => void;
}

// 사용자 데이터 (실제로는 context나 props로 전달)
const userData = {
  name: "김성경",
  level: 42,
  currentExp: 850000,
  nextLevelExp: 1000000,
  totalPoints: 850000,
  readVerses: 1247,
  bookmarkedVerses: 89,
  communityPosts: 23,
  avatar: "/placeholder.svg?height=40&width=40",
};

const levelInfo = {
  10: {
    title: "Seed",
    subtitle: "씨앗",
    color: "bg-green-100 text-green-800",
    icon: "🌱",
  },
  20: {
    title: "Sprout",
    subtitle: "새싹",
    color: "bg-green-200 text-green-900",
    icon: "🌿",
  },
  30: {
    title: "Branch",
    subtitle: "가지",
    color: "bg-blue-100 text-blue-800",
    icon: "🌳",
  },
  40: {
    title: "Servant",
    subtitle: "종",
    color: "bg-purple-100 text-purple-800",
    icon: "🙏",
  },
  50: {
    title: "Steward",
    subtitle: "청지기",
    color: "bg-indigo-100 text-indigo-800",
    icon: "⚖️",
  },
  60: {
    title: "Disciple",
    subtitle: "제자",
    color: "bg-yellow-100 text-yellow-800",
    icon: "✝️",
  },
  70: {
    title: "Teacher",
    subtitle: "스승",
    color: "bg-orange-100 text-orange-800",
    icon: "📖",
  },
  80: {
    title: "Elder",
    subtitle: "장로",
    color: "bg-red-100 text-red-800",
    icon: "👑",
  },
  90: {
    title: "Prophet",
    subtitle: "선지자",
    color: "bg-pink-100 text-pink-800",
    icon: "🔮",
  },
  99: {
    title: "Saint",
    subtitle: "성도",
    color: "bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900",
    icon: "👼",
  },
};

export function Sidebar({ currentPage, onClose }: SidebarProps) {
  const getCurrentLevelInfo = () => {
    const levelKeys = Object.keys(levelInfo)
      .map(Number)
      .sort((a, b) => a - b);
    for (let i = levelKeys.length - 1; i >= 0; i--) {
      if (userData.level >= levelKeys[i]) {
        return levelInfo[levelKeys[i] as keyof typeof levelInfo];
      }
    }
    return {
      title: "Beginner",
      subtitle: "초심자",
      color: "bg-gray-100 text-gray-800",
      icon: "📚",
    };
  };

  const currentLevelInfo = getCurrentLevelInfo();
  const progressPercentage =
    (userData.currentExp / userData.nextLevelExp) * 100;

  return (
    <div className="p-4 space-y-6">
      {/* 모바일 닫기 버튼 */}
      {onClose && (
        <div className="flex justify-end lg:hidden">
          <AnimatedButton variant="ghost" size="icon" onClick={onClose} ripple>
            <X className="h-5 w-5" />
          </AnimatedButton>
        </div>
      )}

      {/* 사용자 프로필 카드 */}
      <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
        <CardHeader className="text-center pb-4">
          <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-orange-200 hover:ring-orange-300 transition-all duration-300">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-orange-200 text-orange-800 text-xl font-bold">
              {userData.name[0]}
            </AvatarFallback>
          </Avatar>

          <CardTitle className="text-lg text-orange-900 mb-2">
            {userData.name}
          </CardTitle>

          <Badge
            className={`${currentLevelInfo.color} border-0 text-sm px-3 py-1`}
          >
            <span className="mr-1 text-base">{currentLevelInfo.icon}</span>
            레벨 <CounterAnimation value={userData.level} /> -{" "}
            {currentLevelInfo.title}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 경험치 진행률 */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-orange-700">
              <span className="font-medium">경험치</span>
              <span className="font-mono">
                <CounterAnimation value={userData.currentExp} /> /{" "}
                <CounterAnimation value={userData.nextLevelExp} />
              </span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-3 bg-orange-100"
            />
            <p className="text-xs text-orange-600 text-center">
              다음 레벨까지{" "}
              {((userData.nextLevelExp - userData.currentExp) / 1000).toFixed(
                0
              )}
              K 남음
            </p>
          </div>

          {/* 통계 그리드 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer">
              <Book className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-blue-800">
                <CounterAnimation value={userData.readVerses} />
              </p>
              <p className="text-xs text-blue-600 font-medium">읽은 구절</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer">
              <Heart className="h-6 w-6 text-pink-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-pink-800">
                <CounterAnimation value={userData.bookmarkedVerses} />
              </p>
              <p className="text-xs text-pink-600 font-medium">북마크</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer">
              <MessageCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-green-800">
                <CounterAnimation value={userData.communityPosts} />
              </p>
              <p className="text-xs text-green-600 font-medium">게시글</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-pointer">
              <Trophy className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg font-bold text-purple-800">
                <CounterAnimation
                  value={Math.floor(userData.totalPoints / 1000)}
                  suffix="K"
                />
              </p>
              <p className="text-xs text-purple-600 font-medium">총 포인트</p>
            </div>
          </div>

          {/* 일일 미션 버튼 */}
          <AnimatedButton
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-3"
            ripple
            glow
            bounce
          >
            <Sparkles className="h-4 w-4 mr-2" />
            오늘의 말씀 읽기 (+200P)
          </AnimatedButton>
        </CardContent>
      </Card>

      {/* 레벨 가이드 */}
      <LevelGuideCard levelInfo={levelInfo} currentLevel={userData.level} />
    </div>
  );
}
