"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedButton } from "../atoms/AnimatedButton"
import { CounterAnimation } from "../atoms/CounterAnimation"
import { TypingAnimation } from "../atoms/TypingAnimation"
import { Heart, Bookmark, MessageCircle, Book, Sparkles } from "lucide-react"

interface VerseCardProps {
  verse: {
    id: number
    book: string
    chapter: number
    verse: number
    text: string
    likes: number
    comments: number
    isLiked: boolean
    isBookmarked: boolean
  }
  onLike: () => void
  onBookmark: () => void
  onRead: () => void
  onComment: () => void
}

export function VerseCard({ verse, onLike, onBookmark, onRead, onComment }: VerseCardProps) {
  const [showTyping, setShowTyping] = useState(false)
  const [isRead, setIsRead] = useState(false)
  const [combo, setCombo] = useState(0)

  const handleRead = () => {
    setIsRead(true)
    setCombo((prev) => prev + 1)
    onRead()

    // 콤보 리셋
    setTimeout(() => setCombo(0), 3000)
  }

  const handleInteraction = (action: () => void) => {
    action()
    if ("vibrate" in navigator) {
      navigator.vibrate(30)
    }
  }

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-white/80 to-orange-50/80 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* 콤보 표시 */}
      {combo > 1 && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-bounce">
            <Sparkles className="h-3 w-3 mr-1" />
            {combo}x 콤보!
          </Badge>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-orange-200 text-orange-800 border-0 hover:bg-orange-300 transition-colors">
            {verse.book} {verse.chapter}:{verse.verse}
          </Badge>
          <div className="flex space-x-2">
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={() => handleInteraction(onLike)}
              className={`${verse.isLiked ? "text-red-600 bg-red-100" : "text-gray-600 hover:text-red-600 hover:bg-red-100"}`}
              ripple
              bounce
            >
              <Heart className={`h-4 w-4 mr-1 transition-all ${verse.isLiked ? "fill-current scale-110" : ""}`} />
              <CounterAnimation value={verse.likes} />
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={() => handleInteraction(onBookmark)}
              className={`${verse.isBookmarked ? "text-yellow-600 bg-yellow-100" : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-100"}`}
              ripple
              bounce
            >
              <Bookmark className={`h-4 w-4 transition-all ${verse.isBookmarked ? "fill-current scale-110" : ""}`} />
            </AnimatedButton>
          </div>
        </div>

        <div className="mb-6 relative">
          {showTyping ? (
            <TypingAnimation
              text={verse.text}
              speed={30}
              className="text-lg leading-relaxed text-gray-800 font-medium italic"
              onComplete={() => setShowTyping(false)}
            />
          ) : (
            <blockquote
              className="text-lg leading-relaxed text-gray-800 font-medium italic cursor-pointer hover:text-orange-800 transition-colors"
              onClick={() => setShowTyping(true)}
            >
              "{verse.text}"
            </blockquote>
          )}
        </div>

        <div className="flex items-center justify-between">
          <AnimatedButton
            onClick={handleRead}
            disabled={isRead}
            className={`${
              isRead
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            } text-white`}
            ripple
            glow
            bounce
          >
            <Book className="h-4 w-4 mr-2" />
            {isRead ? "읽기 완료!" : "읽기 완료 (+200P)"}
          </AnimatedButton>

          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={() => handleInteraction(onComment)}
            className="text-gray-600 hover:text-orange-600 hover:bg-orange-100"
            ripple
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <CounterAnimation value={verse.comments} suffix="개 댓글" />
          </AnimatedButton>
        </div>

        {/* 읽기 완료 시 파티클 효과 트리거 영역 */}
        <div className="absolute inset-0 pointer-events-none">
          {isRead && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 animate-pulse" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
