"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/templates/MainLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VerseCard } from "@/components/molecules/VerseCard"
import { ParticleEffect } from "@/components/atoms/ParticleEffect"
import { Book, Users, Flame, Sparkles } from "lucide-react"

// 성경 구절 데이터
const bibleVerses = [
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

export default function HomePage() {
  const [showParticles, setShowParticles] = useState(false)
  const [combo, setCombo] = useState(0)

  // PWA 설치 감지
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
    }
  }, [])

  const handleVerseRead = () => {
    setShowParticles(true)
    setCombo((prev) => prev + 1)
    setTimeout(() => setCombo(0), 5000)
  }

  const handleVerseAction = () => {
    // 구절 액션 처리
  }

  return (
    <MainLayout currentPage="home">
      {/* 파티클 효과 */}
      <ParticleEffect trigger={showParticles} onComplete={() => setShowParticles(false)} particleCount={20} />

      {/* 콤보 표시 */}
      {combo > 1 && (
        <div className="fixed top-20 right-4 z-40">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 animate-pulse">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 animate-spin" />
              <span className="font-bold text-lg">{combo}x 콤보!</span>
            </div>
          </Card>
        </div>
      )}

      <div className="space-y-6">
        {/* 환영 메시지 */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            성경 포털에 오신 것을 환영합니다
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            하나님의 말씀과 함께하는 특별한 여정을 시작하세요. 매일 새로운 은혜와 깨달음이 기다립니다.
          </p>
        </div>

        <Tabs defaultValue="bible" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm border border-orange-200">
            <TabsTrigger
              value="bible"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              <Book className="h-4 w-4 mr-2" />
              성경읽기
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              <Users className="h-4 w-4 mr-2" />
              커뮤니티
            </TabsTrigger>
            <TabsTrigger
              value="prayer"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              <Flame className="h-4 w-4 mr-2" />
              기도방
            </TabsTrigger>
          </TabsList>

          {/* 성경읽기 탭 */}
          <TabsContent value="bible" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center justify-between">
                  <span>오늘의 말씀</span>
                  <div className="flex items-center space-x-2">
                    {combo > 0 && (
                      <span className="text-sm text-purple-600 font-semibold animate-pulse">{combo}x 콤보 활성!</span>
                    )}
                    <span className="bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Daily Verse
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {bibleVerses.map((verse) => (
                  <VerseCard
                    key={verse.id}
                    verse={verse}
                    onLike={handleVerseAction}
                    onBookmark={handleVerseAction}
                    onRead={handleVerseRead}
                    onComment={handleVerseAction}
                  />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 커뮤니티 탭 */}
          <TabsContent value="community" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-orange-900">커뮤니티 게시판</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-orange-500 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-semibold text-orange-900 mb-2">커뮤니티에서 더 많은 기능을 만나보세요</h3>
                  <p className="text-orange-700 mb-4">다른 성도들과 은혜를 나누고 함께 성장하세요.</p>
                  <a href="/community" className="text-orange-600 hover:text-orange-800 font-semibold">
                    커뮤니티 바로가기 →
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 기도방 탭 */}
          <TabsContent value="prayer" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-orange-900 flex items-center">
                  <Flame className="h-5 w-5 mr-2 animate-pulse" />
                  기도방
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Flame className="h-16 w-16 text-orange-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-xl font-semibold text-orange-900 mb-2">함께 기도하는 은혜를 경험하세요</h3>
                  <p className="text-orange-700 mb-4">기도제목을 나누고 서로를 위해 기도해주세요.</p>
                  <a href="/prayer" className="text-orange-600 hover:text-orange-800 font-semibold">
                    기도방 바로가기 →
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
