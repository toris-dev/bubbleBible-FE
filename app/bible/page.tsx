"use client"

import { useState } from "react"
import { MainLayout } from "@/components/templates/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedButton } from "@/components/atoms/AnimatedButton"
import { VerseCard } from "@/components/molecules/VerseCard"
import { Search, BookOpen, ChevronRight, Filter } from "lucide-react"

// 성경 책 데이터
const bibleBooks = [
  { name: "창세기", chapters: 50, category: "구약" },
  { name: "출애굽기", chapters: 40, category: "구약" },
  { name: "레위기", chapters: 27, category: "구약" },
  { name: "민수기", chapters: 36, category: "구약" },
  { name: "신명기", chapters: 34, category: "구약" },
  { name: "마태복음", chapters: 28, category: "신약" },
  { name: "마가복음", chapters: 16, category: "신약" },
  { name: "누가복음", chapters: 24, category: "신약" },
  { name: "요한복음", chapters: 21, category: "신약" },
  { name: "사도행전", chapters: 28, category: "신약" },
]

// 오늘의 추천 구절
const todayVerses = [
  {
    id: 1,
    book: "요한복음",
    chapter: 3,
    verse: 16,
    text: "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 저를 믿는 자마다 멸망치 않고 영생을 얻게 하려 하심이니라",
    likes: 1247,
    comments: 89,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: 2,
    book: "시편",
    chapter: 23,
    verse: 1,
    text: "여호와는 나의 목자시니 내가 부족함이 없으리로다",
    likes: 892,
    comments: 45,
    isLiked: true,
    isBookmarked: false,
  },
]

export default function BiblePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"전체" | "구약" | "신약">("전체")

  const filteredBooks = bibleBooks.filter((book) => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleVerseAction = () => {
    // 구절 액션 처리
  }

  return (
    <MainLayout currentPage="bible">
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            성경 읽기
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            하나님의 말씀을 통해 영적 성장을 경험하세요. 매일 새로운 은혜와 깨달음이 기다립니다.
          </p>
        </div>

        {/* 검색 및 필터 */}
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="성경 책 이름을 검색하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-orange-200 focus:border-orange-400"
                />
              </div>

              <div className="flex gap-2">
                {["전체", "구약", "신약"].map((category) => (
                  <AnimatedButton
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category as "전체" | "구약" | "신약")}
                    className={`h-12 px-6 ${
                      selectedCategory === category
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "border-orange-300 text-orange-700 hover:bg-orange-50"
                    }`}
                    ripple
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {category}
                  </AnimatedButton>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 오늘의 추천 구절 */}
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900 flex items-center">
              <BookOpen className="h-6 w-6 mr-2" />
              오늘의 추천 구절
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {todayVerses.map((verse) => (
              <VerseCard
                key={verse.id}
                verse={verse}
                onLike={handleVerseAction}
                onBookmark={handleVerseAction}
                onRead={handleVerseAction}
                onComment={handleVerseAction}
              />
            ))}
          </CardContent>
        </Card>

        {/* 성경 책 목록 */}
        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl text-orange-900">성경 책 목록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.name}
                  className="group p-4 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{book.name}</h3>
                      <p className="text-sm text-gray-600">{book.chapters}장</p>
                      <Badge
                        className={`mt-2 text-xs ${
                          book.category === "구약" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {book.category}
                      </Badge>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                <p className="text-gray-400">다른 검색어를 시도해보세요.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
