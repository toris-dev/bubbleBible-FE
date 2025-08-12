"use client"

import { useState } from "react"
import { MainLayout } from "@/components/templates/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedButton } from "@/components/atoms/AnimatedButton"
import { CounterAnimation } from "@/components/atoms/CounterAnimation"
import { User, Trophy, Book, Heart, MessageCircle, Calendar, Settings, Edit, Crown } from "lucide-react"

// 사용자 데이터
const userData = {
  name: "김성경",
  email: "kim.bible@example.com",
  level: 42,
  currentExp: 850000,
  nextLevelExp: 1000000,
  totalPoints: 850000,
  readVerses: 1247,
  bookmarkedVerses: 89,
  communityPosts: 23,
  prayerRequests: 12,
  joinDate: "2023년 3월 15일",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "하나님의 말씀을 사랑하고 매일 성경을 읽으며 성장하고 있습니다.",
}

// 최근 활동
const recentActivities = [
  {
    id: 1,
    type: "verse_read",
    description: "요한복음 3:16을 읽었습니다",
    points: 200,
    timeAgo: "2시간 전",
  },
  {
    id: 2,
    type: "comment",
    description: "커뮤니티에 댓글을 작성했습니다",
    points: 300,
    timeAgo: "4시간 전",
  },
  {
    id: 3,
    type: "like",
    description: "시편 23:1에 좋아요를 눌렀습니다",
    points: 100,
    timeAgo: "6시간 전",
  },
  {
    id: 4,
    type: "prayer",
    description: "기도제목을 등록했습니다",
    points: 200,
    timeAgo: "1일 전",
  },
]

// 성취 뱃지
const achievements = [
  { id: 1, name: "첫 걸음", description: "첫 성경 구절 읽기", icon: "🌱", earned: true },
  { id: 2, name: "꾸준함", description: "7일 연속 성경 읽기", icon: "📚", earned: true },
  { id: 3, name: "소통왕", description: "댓글 100개 작성", icon: "💬", earned: true },
  { id: 4, name: "사랑나눔", description: "좋아요 500개 받기", icon: "❤️", earned: false },
  { id: 5, name: "기도용사", description: "기도제목 50개 등록", icon: "🙏", earned: false },
  { id: 6, name: "성경박사", description: "성경 전체 읽기", icon: "🎓", earned: false },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const progressPercentage = (userData.currentExp / userData.nextLevelExp) * 100

  return (
    <MainLayout currentPage="profile">
      <div className="space-y-6">
        {/* 프로필 헤더 */}
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="h-32 w-32 ring-4 ring-orange-200">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-orange-200 text-orange-800 text-4xl font-bold">
                    {userData.name[0]}
                  </AvatarFallback>
                </Avatar>
                <AnimatedButton
                  size="icon"
                  className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                  ripple
                >
                  <Edit className="h-4 w-4" />
                </AnimatedButton>
              </div>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData.name}</h1>
                  <p className="text-gray-600 mb-4">{userData.bio}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      <User className="h-3 w-3 mr-1" />
                      레벨 {userData.level}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      <Calendar className="h-3 w-3 mr-1" />
                      가입일: {userData.joinDate}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>경험치 진행률</span>
                    <span>
                      <CounterAnimation value={userData.currentExp} /> /{" "}
                      <CounterAnimation value={userData.nextLevelExp} />
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 bg-orange-100" />
                  <p className="text-xs text-gray-500 text-center md:text-left">
                    다음 레벨까지 {((userData.nextLevelExp - userData.currentExp) / 1000).toFixed(0)}K 남음
                  </p>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <AnimatedButton
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  ripple
                  glow
                >
                  <Edit className="h-4 w-4 mr-2" />
                  프로필 수정
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                  ripple
                >
                  <Settings className="h-4 w-4 mr-2" />
                  설정
                </AnimatedButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <Book className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-800">
                <CounterAnimation value={userData.readVerses} />
              </p>
              <p className="text-sm text-blue-600 font-medium">읽은 구절</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-50 to-pink-100 border-pink-200">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-800">
                <CounterAnimation value={userData.bookmarkedVerses} />
              </p>
              <p className="text-sm text-pink-600 font-medium">북마크</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">
                <CounterAnimation value={userData.communityPosts} />
              </p>
              <p className="text-sm text-green-600 font-medium">게시글</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-800">
                <CounterAnimation value={Math.floor(userData.totalPoints / 1000)} suffix="K" />
              </p>
              <p className="text-sm text-purple-600 font-medium">총 포인트</p>
            </CardContent>
          </Card>
        </div>

        {/* 탭 메뉴 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm border border-orange-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              <Trophy className="h-4 w-4 mr-2" />
              활동 내역
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              <Crown className="h-4 w-4 mr-2" />
              성취 뱃지
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              <Settings className="h-4 w-4 mr-2" />
              설정
            </TabsTrigger>
          </TabsList>

          {/* 활동 내역 탭 */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">최근 활동</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activity.type === "verse_read"
                            ? "bg-blue-500"
                            : activity.type === "comment"
                              ? "bg-green-500"
                              : activity.type === "like"
                                ? "bg-red-500"
                                : "bg-purple-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.timeAgo}</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-200 text-orange-800">+{activity.points}P</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 성취 뱃지 탭 */}
          <TabsContent value="achievements" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">성취 뱃지</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        achievement.earned
                          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 hover:shadow-md"
                          : "bg-gray-50 border-gray-300 opacity-60"
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-4xl mb-2 ${achievement.earned ? "" : "grayscale"}`}>
                          {achievement.icon}
                        </div>
                        <h3 className={`font-semibold mb-1 ${achievement.earned ? "text-green-900" : "text-gray-500"}`}>
                          {achievement.name}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? "text-green-700" : "text-gray-400"}`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && <Badge className="mt-2 bg-green-500 text-white">달성 완료</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 설정 탭 */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-900">계정 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{userData.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">알림 설정</label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm text-gray-700">일일 말씀 알림</span>
                        <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm text-gray-700">레벨업 알림</span>
                        <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                        <span className="text-sm text-gray-700">커뮤니티 알림</span>
                        <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <AnimatedButton
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                      ripple
                      glow
                    >
                      설정 저장
                    </AnimatedButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
