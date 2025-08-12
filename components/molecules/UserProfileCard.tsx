"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedButton } from "../atoms/AnimatedButton"
import { CounterAnimation } from "../atoms/CounterAnimation"
import { Book, Heart, MessageCircle, Trophy, Sparkles } from "lucide-react"

interface UserProfileCardProps {
  user: {
    name: string
    level: number
    currentExp: number
    nextLevelExp: number
    totalPoints: number
    readVerses: number
    bookmarkedVerses: number
    communityPosts: number
    avatar?: string
  }
  levelInfo: {
    title: string
    subtitle: string
    color: string
    icon: string
  }
  onDailyVerse: () => void
}

export function UserProfileCard({ user, levelInfo, onDailyVerse }: UserProfileCardProps) {
  const progressPercentage = (user.currentExp / user.nextLevelExp) * 100

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="text-center relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-yellow-100/50" />

        <div className="relative z-10">
          <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-orange-200 hover:ring-orange-300 transition-all duration-300 hover:scale-110">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-orange-200 text-orange-800 text-xl">{user.name[0]}</AvatarFallback>
          </Avatar>

          <CardTitle className="text-orange-900 mb-2">{user.name}</CardTitle>

          <Badge className={`${levelInfo.color} border-0 text-sm hover:scale-105 transition-transform cursor-pointer`}>
            <span className="mr-1">{levelInfo.icon}</span>
            레벨 <CounterAnimation value={user.level} /> - {levelInfo.title}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 경험치 바 */}
        <div className="relative">
          <div className="flex justify-between text-sm text-orange-700 mb-2">
            <span>경험치</span>
            <span>
              <CounterAnimation value={user.currentExp} /> / <CounterAnimation value={user.nextLevelExp} />
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3 bg-orange-100 overflow-hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>

        {/* 통계 그리드 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-3 hover:scale-105 transition-transform cursor-pointer group">
            <Book className="h-6 w-6 text-blue-600 mx-auto mb-1 group-hover:animate-bounce" />
            <p className="text-sm font-semibold text-blue-800">
              <CounterAnimation value={user.readVerses} />
            </p>
            <p className="text-xs text-blue-600">읽은 구절</p>
          </div>

          <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-3 hover:scale-105 transition-transform cursor-pointer group">
            <Heart className="h-6 w-6 text-pink-600 mx-auto mb-1 group-hover:animate-pulse" />
            <p className="text-sm font-semibold text-pink-800">
              <CounterAnimation value={user.bookmarkedVerses} />
            </p>
            <p className="text-xs text-pink-600">북마크</p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-3 hover:scale-105 transition-transform cursor-pointer group">
            <MessageCircle className="h-6 w-6 text-green-600 mx-auto mb-1 group-hover:animate-spin" />
            <p className="text-sm font-semibold text-green-800">
              <CounterAnimation value={user.communityPosts} />
            </p>
            <p className="text-xs text-green-600">게시글</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-3 hover:scale-105 transition-transform cursor-pointer group">
            <Trophy className="h-6 w-6 text-purple-600 mx-auto mb-1 group-hover:animate-bounce" />
            <p className="text-sm font-semibold text-purple-800">
              <CounterAnimation value={Math.floor(user.totalPoints / 1000)} suffix="K" />
            </p>
            <p className="text-xs text-purple-600">총 포인트</p>
          </div>
        </div>

        {/* 일일 미션 버튼 */}
        <AnimatedButton
          onClick={onDailyVerse}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
          ripple
          glow
          bounce
        >
          <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
          오늘의 말씀 읽기 (+200P)
        </AnimatedButton>
      </CardContent>
    </Card>
  )
}
