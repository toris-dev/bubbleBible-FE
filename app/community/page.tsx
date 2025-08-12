"use client"

import { useState } from "react"
import { MainLayout } from "@/components/templates/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedButton } from "@/components/atoms/AnimatedButton"
import { CounterAnimation } from "@/components/atoms/CounterAnimation"
import { MessageCircle, Heart, Plus, TrendingUp, Clock, Pin } from "lucide-react"

// 게시글 데이터
const communityPosts = [
  {
    id: 1,
    author: "이믿음",
    level: 35,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "오늘 QT 나눔 - 시편 23편",
    content:
      "여호와는 나의 목자시니... 이 말씀이 오늘 제게 큰 위로가 되었습니다. 어려운 시기를 지나고 있는데 하나님께서 함께하신다는 확신을 주셨어요.",
    likes: 24,
    comments: 8,
    timeAgo: "2시간 전",
    category: "QT 나눔",
    isPinned: false,
  },
  {
    id: 2,
    author: "박소망",
    level: 28,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "기도제목 나눔",
    content: "가족의 건강을 위해 기도 부탁드립니다. 아버지께서 수술을 받으시게 되었는데 하나님의 치유하심을 구합니다.",
    likes: 18,
    comments: 12,
    timeAgo: "4시간 전",
    category: "기도 나눔",
    isPinned: true,
  },
  {
    id: 3,
    author: "김은혜",
    level: 52,
    avatar: "/placeholder.svg?height=40&width=40",
    title: "찬양 추천 - 주님의 사랑",
    content: "오늘 예배 시간에 불렀던 찬양이 너무 은혜로웠어요. 여러분도 함께 들어보시면 좋을 것 같아서 공유합니다.",
    likes: 31,
    comments: 15,
    timeAgo: "6시간 전",
    category: "찬양 추천",
    isPinned: false,
  },
]

// 카테고리 데이터
const categories = [
  { id: "all", name: "전체", count: 156 },
  { id: "qt", name: "QT 나눔", count: 45 },
  { id: "prayer", name: "기도 나눔", count: 32 },
  { id: "praise", name: "찬양 추천", count: 28 },
  { id: "question", name: "성경 질문", count: 51 },
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newPost, setNewPost] = useState("")
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest")

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // 게시글 작성 로직
      setNewPost("")
    }
  }

  const handleLike = (postId: number) => {
    // 좋아요 처리 로직
  }

  const handleComment = (postId: number) => {
    // 댓글 처리 로직
  }

  return (
    <MainLayout currentPage="community">
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            커뮤니티
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            성도들과 함께 은혜를 나누고, 기도제목을 공유하며, 신앙의 여정을 함께 걸어가세요.
          </p>
        </div>

        {/* 게시글 작성 */}
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg text-orange-900 flex items-center">
              <Plus className="h-5 w-5 mr-2" />새 게시글 작성
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="오늘의 은혜나 기도제목을 나눠주세요..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[120px] text-base leading-relaxed border-orange-200 focus:border-orange-400 resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {["QT 나눔", "기도 나눔", "찬양 추천", "성경 질문"].map((category) => (
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
                onClick={handlePostSubmit}
                disabled={!newPost.trim()}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6"
                ripple
                glow
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                게시글 작성 (+300P)
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>

        {/* 카테고리 및 정렬 */}
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex-1 bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <AnimatedButton
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "border-orange-300 text-orange-700 hover:bg-orange-50"
                    }`}
                    ripple
                  >
                    {category.name}
                    <Badge className="ml-2 bg-white/20 text-current border-0">
                      <CounterAnimation value={category.count} />
                    </Badge>
                  </AnimatedButton>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
            <CardContent className="p-4">
              <div className="flex gap-2">
                <AnimatedButton
                  variant={sortBy === "latest" ? "default" : "outline"}
                  onClick={() => setSortBy("latest")}
                  className={`${
                    sortBy === "latest"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border-orange-300 text-orange-700 hover:bg-orange-50"
                  }`}
                  ripple
                >
                  <Clock className="h-4 w-4 mr-2" />
                  최신순
                </AnimatedButton>
                <AnimatedButton
                  variant={sortBy === "popular" ? "default" : "outline"}
                  onClick={() => setSortBy("popular")}
                  className={`${
                    sortBy === "popular"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border-orange-300 text-orange-700 hover:bg-orange-50"
                  }`}
                  ripple
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  인기순
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <Card
              key={post.id}
              className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                    <AvatarImage src={post.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-orange-200 text-orange-800 font-semibold">
                      {post.author[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">레벨 {post.level}</Badge>
                        <Badge className="bg-green-100 text-green-800 text-xs">{post.category}</Badge>
                        {post.isPinned && <Pin className="h-4 w-4 text-orange-600" />}
                      </div>
                      <span className="text-sm text-gray-500">{post.timeAgo}</span>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">{post.title}</h2>

                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    <div className="flex items-center space-x-6">
                      <AnimatedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                        ripple
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        <CounterAnimation value={post.likes} />
                      </AnimatedButton>

                      <AnimatedButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleComment(post.id)}
                        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        ripple
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        댓글 <CounterAnimation value={post.comments} />개
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        <div className="text-center">
          <AnimatedButton
            variant="outline"
            className="border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-3"
            ripple
          >
            더 많은 게시글 보기
          </AnimatedButton>
        </div>
      </div>
    </MainLayout>
  )
}
