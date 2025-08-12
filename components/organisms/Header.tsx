"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bell, Book, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { AnimatedButton } from "../atoms/AnimatedButton";
import { CounterAnimation } from "../atoms/CounterAnimation";

interface HeaderProps {
  user?: {
    name: string;
    level: number;
    avatar?: string;
  };
  levelInfo?: {
    title: string;
    subtitle: string;
    color: string;
    icon: string;
  };
  notifications?: number;
}

export function Header({ user, levelInfo, notifications }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Book className="h-8 w-8 text-orange-600 group-hover:animate-bounce transition-transform" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                성경 포털
              </h1>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex space-x-6">
              <AnimatedButton
                variant="ghost"
                className="text-orange-700 hover:text-orange-800 hover:bg-orange-100"
                ripple
              >
                성경읽기
              </AnimatedButton>
              <AnimatedButton
                variant="ghost"
                className="text-orange-700 hover:text-orange-800 hover:bg-orange-100"
                ripple
              >
                커뮤니티
              </AnimatedButton>
              <AnimatedButton
                variant="ghost"
                className="text-orange-700 hover:text-orange-800 hover:bg-orange-100"
                ripple
              >
                기도방
              </AnimatedButton>
            </nav>
          </div>

          {/* 우측 컨트롤 */}
          <div className="flex items-center space-x-4">
            {/* 검색바 */}
            <div className="hidden md:flex items-center space-x-2 bg-white/60 rounded-full px-4 py-2 border border-orange-200 focus-within:border-orange-400 transition-colors">
              <Search className="h-5 w-5 text-orange-600" />
              <Input
                placeholder="성경 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 border-0 bg-transparent focus:ring-0 focus:outline-none"
              />
            </div>

            {/* 알림 버튼 */}
            <div className="relative">
              <AnimatedButton
                variant="ghost"
                size="icon"
                className="text-orange-600 hover:bg-orange-100"
                ripple
                bounce
              >
                <Bell className="h-5 w-5" />
              </AnimatedButton>
              {(notifications || 0) > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-0 min-w-[20px] h-5 flex items-center justify-center text-xs animate-pulse">
                  <CounterAnimation value={notifications || 0} />
                </Badge>
              )}
            </div>

            {/* 사용자 프로필 */}
            <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full px-4 py-2 hover:from-orange-200 hover:to-yellow-200 transition-all duration-300 cursor-pointer group">
              <Avatar className="h-8 w-8 group-hover:scale-110 transition-transform">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-orange-200 text-orange-800">
                  {user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-orange-900">
                  {user?.name || "사용자"}
                </p>
                <p className="text-xs text-orange-700">
                  레벨 <CounterAnimation value={user?.level || 1} />
                </p>
              </div>
              <Badge
                className={`${
                  levelInfo?.color || "bg-orange-200 text-orange-800"
                } border-0 hover:scale-105 transition-transform`}
              >
                <span className="mr-1">{levelInfo?.icon || "✨"}</span>
                {levelInfo?.title || "입문자"}
              </Badge>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <AnimatedButton
              variant="ghost"
              size="icon"
              className="md:hidden text-orange-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ripple
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </AnimatedButton>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-orange-200 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-2">
              <AnimatedButton
                variant="ghost"
                className="justify-start text-orange-700"
                ripple
              >
                성경읽기
              </AnimatedButton>
              <AnimatedButton
                variant="ghost"
                className="justify-start text-orange-700"
                ripple
              >
                커뮤니티
              </AnimatedButton>
              <AnimatedButton
                variant="ghost"
                className="justify-start text-orange-700"
                ripple
              >
                기도방
              </AnimatedButton>
              <div className="pt-2 border-t border-orange-200">
                <Input
                  placeholder="성경 검색..."
                  className="border-orange-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
