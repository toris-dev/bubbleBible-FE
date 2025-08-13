"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedButton } from "@/components/atoms/AnimatedButton"
import { CounterAnimation } from "@/components/atoms/CounterAnimation"
import { Flame, Plus, CheckCircle, Clock, Users } from "lucide-react"

// 기도제목 데이터
const prayerRequests = [
  {
    id: 1,
    author: "김기도",
    level: 45,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "가족의 건강을 위한 기도",
    content: "아버지의 수술이 성공적으로 이루어지고 빠른 회복을 위해 기도 부탁드립니다.",
    category: "건강",
    prayerCount: 23,
    isAnswered: false,
    timeAgo: "1시간 전",
    urgency: "높음",
  },
  {
    id: 2,
    author: "이소망",
    level: 32,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "취업을 위한 기도",
    content: "하나님의 뜻에 맞는 직장을 찾을 수 있도록 기도해주세요.",
    category: "진로",
    prayerCount: 18,
    isAnswered: true,
    timeAgo: "3시간 전",
    urgency: "보통",
  },
  {
    id: 3,
    author: "박믿음",
    level: 28,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "선교사님들을 위한 기도",
    content: "해외에서 사역하시는 선교사님들의 안전과 사역의 열매를 위해 기도합니다.",
    category: "선교",
    prayerCount: 31,
    isAnswered: false,
    timeAgo: "5시간 전",
    urgency: "보통",
  },
]

// 기도 응답 간증
const prayerTestimonies = [
  {
    id: 1,
    author: "최감사",
    title: "취업 기도 응답!",
    content: "3개월간 기도했던 취업이 드디어 응답되었습니다. 하나님께 감사드립니다!",
    timeAgo: "2일 전",
  },
  {
    id: 2,
    author: "정치유",
    title: "아버지 수술 성공",
    content: "많은 분들이 기도해주신 아버지 수술이 성공적으로 끝났습니다. 감사합니다!",
    timeAgo: "1주 전",
  },
]

export default function PrayerPage() {
  const [newPrayerTitle, setNewPrayerTitle] = useState("")
  const [newPrayerContent, setNewPrayerContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const categories = ["전체", "건강", "진로", "가족", "선교", "교회", "기타"]

  const handlePrayerSubmit = () => {
    if (newPrayerTitle.trim() && newPrayerContent.trim()) {
      // 기도제목 작성 로직
      setNewPrayerTitle("")
      setNewPrayerContent("")
    }
  }

  const handlePrayFor = (prayerId: number) => {
    // 기도하기 로직
  }

  return (
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            기도방
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            서로의 기도제목을 나누고 함께 기도하며, 하나님의 응답하심을 경험해보세요.
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <Flame className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-800">
                <CounterAnimation value={156} />
              </p>
              <p className="text-sm text-blue-600 font-medium">총 기도제목</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">
                <CounterAnimation value={89} />
              </p>
              <p className="text-sm text-green-600 font-medium">응답된 기도</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-800">
                <CounterAnimation value={234} />
              </p>
              <p className="text-sm text-purple-600 font-medium">함께 기도한 사람</p>
            </CardContent>
          </Card>
        </div>

        {/* 기도제목 작성 */}
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg text-orange-900 flex items-center">
              <Plus className="h-5 w-5 mr-2" />새 기도제목 등록
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="기도제목 제목을 입력하세요..."
              value={newPrayerTitle}
              onChange={(e) => setNewPrayerTitle(e.target.value)}
              className="text-base border-orange-200 focus:border-orange-400"
            />
            <Textarea
              placeholder="구체적인 기도제목을 나눠주세요..."
              value={newPrayerContent}
              onChange={(e) => setNewPrayerContent(e.target.value)}
              className="min-h-[120px] text-base leading-relaxed border-orange-200 focus:border-orange-400 resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {["건강", "진로", "가족", "선교", "교회"].map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="cursor-pointer hover:bg-orange-100 border-orange-300 text-orange-700"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <AnimatedButton
                onClick={handlePrayerSubmit}
                disabled={!newPrayerTitle.trim() || !newPrayerContent.trim()}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6"
                ripple
                glow
              >
                <Flame className="h-4 w-4 mr-2" />
                기도제목 등록 (+200P)
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>

        {/* 카테고리 필터 */}
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <AnimatedButton
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border-orange-300 text-orange-700 hover:bg-orange-50"
                  }`}
                  ripple
                >
                  {category}
                </AnimatedButton>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 기도제목 목록 */}
        <div className="space-y-4">
          {prayerRequests.map((prayer) => (
            <Card
              key={prayer.id}
              className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                    <AvatarImage src={prayer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-orange-200 text-orange-800 font-semibold">
                      {prayer.author[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">{prayer.author}</h3>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">레벨 {prayer.level}</Badge>
                        <Badge
                          className={`text-xs ${
                            prayer.category === "건강"
                              ? "bg-red-100 text-red-800"
                              : prayer.category === "진로"
                                ? "bg-green-100 text-green-800"
                                : prayer.category === "선교"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {prayer.category}
                        </Badge>
                        {prayer.urgency === "높음" && (
                          <Badge className="bg-red-500 text-white text-xs animate-pulse">긴급</Badge>
                        )}
                        {prayer.isAnswered && (
                          <Badge className="bg-green-500 text-white text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            응답됨
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {prayer.timeAgo}
                      </span>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">{prayer.title}</h2>

                    <p className="text-gray-700 mb-4 leading-relaxed">{prayer.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 flex items-center">
                          <Flame className="h-4 w-4 mr-1 text-orange-500" />
                          <CounterAnimation value={prayer.prayerCount} />
                          명이 함께 기도했습니다
                        </span>
                      </div>

                      <AnimatedButton
                        onClick={() => handlePrayFor(prayer.id)}
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                        ripple
                        glow
                      >
                        <Flame className="h-4 w-4 mr-2" />
                        함께 기도하기 (+100P)
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 기도 응답 간증 */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg text-green-900 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              기도 응답 간증
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {prayerTestimonies.map((testimony) => (
              <div key={testimony.id} className="bg-white/80 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-900">{testimony.title}</h3>
                  <span className="text-sm text-green-600">{testimony.timeAgo}</span>
                </div>
                <p className="text-green-800 leading-relaxed">{testimony.content}</p>
                <p className="text-sm text-green-600 mt-2">- {testimony.author}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    
  )
}
