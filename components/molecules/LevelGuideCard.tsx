"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Crown,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { LevelDetailModal } from "./LevelDetailModal";

interface LevelGuideCardProps {
  levelInfo: Record<
    number,
    {
      title: string;
      subtitle: string;
      color: string;
      icon: string;
    }
  >;
  currentLevel: number;
}

export function LevelGuideCard({
  levelInfo,
  currentLevel,
}: LevelGuideCardProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 레벨별 상세 데이터 생성
  const getLevelDetailData = (levelNum: number) => {
    const info = levelInfo[levelNum as keyof typeof levelInfo];
    const requiredExp = levelNum * levelNum * 1000;
    const currentExp = currentLevel * currentLevel * 1000;

    return {
      level: levelNum,
      title: info.title,
      subtitle: info.subtitle,
      icon: info.icon,
      color: info.color,
      description: getLevelDescription(levelNum),
      requiredExp,
      currentExp,
      isAchieved: currentLevel >= levelNum,
      isCurrent: currentLevel === levelNum,
      conditions: getLevelConditions(levelNum),
      rewards: getLevelRewards(levelNum),
      biblicalMeaning: getBiblicalMeaning(levelNum),
      tips: getLevelTips(levelNum),
    };
  };

  const getLevelDescription = (level: number) => {
    const descriptions: Record<number, string> = {
      10: "신앙의 첫 걸음을 내딛는 단계입니다. 하나님의 말씀에 대한 기초를 다지는 시기입니다.",
      20: "말씀 안에서 자라나는 새싹처럼, 꾸준한 성장을 보이는 단계입니다.",
      30: "포도나무에 연결된 가지처럼 하나님과의 관계가 깊어지는 시기입니다.",
      40: "겸손한 마음으로 섬기는 자의 모습을 갖춰가는 단계입니다.",
      50: "하나님께서 맡겨주신 것들을 충실히 관리하는 청지기의 역할을 하는 시기입니다.",
      60: "예수님의 제자로서 헌신적인 신앙생활을 하는 단계입니다.",
      70: "다른 이들에게 신앙의 지혜를 나누어주는 스승의 역할을 하는 시기입니다.",
      80: "교회 공동체를 이끌어가는 성숙한 신앙인의 모습을 보이는 단계입니다.",
      90: "영적 통찰력으로 하나님의 뜻을 분별하는 선지자적 역할을 하는 시기입니다.",
      99: "하늘의 성도로서 완전한 신앙의 모습을 추구하는 최고 단계입니다.",
    };
    return descriptions[level] || "신앙 성장의 한 단계입니다.";
  };

  const getLevelConditions = (level: number) => {
    const baseConditions = [
      {
        type: "verses",
        description: "성경 구절 읽기",
        current: Math.min(1247, level * 50), // Fixed parsing issue
        required: level * 50,
        icon: <BookOpen className="h-4 w-4 text-blue-600" />,
      },
      {
        type: "likes",
        description: "좋아요 받기",
        current: Math.min(892, level * 20), // Fixed parsing issue
        required: level * 20,
        icon: <Heart className="h-4 w-4 text-red-600" />,
      },
      {
        type: "comments",
        description: "댓글 작성",
        current: Math.min(156, level * 5), // Fixed parsing issue
        required: level * 5,
        icon: <MessageCircle className="h-4 w-4 text-green-600" />,
      },
      {
        type: "community",
        description: "커뮤니티 활동",
        current: Math.min(45, level * 2), // Fixed parsing issue
        required: level * 2,
        icon: <Users className="h-4 w-4 text-purple-600" />,
      },
    ];
    return baseConditions;
  };

  const getLevelRewards = (level: number) => {
    const rewards: Record<number, string[]> = {
      10: ["씨앗 뱃지 획득", "일일 보너스 +10%", "특별 칭호 부여"],
      20: ["새싹 뱃지 획득", "경험치 보너스 +15%", "프로필 테마 해제"],
      30: ["가지 뱃지 획득", "커뮤니티 특권", "성경 하이라이터 기능"],
      40: ["종 뱃지 획득", "기도방 우선 접근", "멘토 자격 부여"],
      50: ["청지기 뱃지 획득", "그룹 생성 권한", "특별 이벤트 참여"],
      60: ["제자 뱃지 획득", "교육 콘텐츠 접근", "리더십 프로그램 참여"],
      70: ["스승 뱃지 획득", "강의 개설 권한", "전문가 인증"],
      80: ["장로 뱃지 획득", "커뮤니티 관리 권한", "VIP 서비스"],
      90: ["선지자 뱃지 획득", "예언적 통찰 콘텐츠", "특별 상담 권한"],
      99: ["성도 뱃지 획득", "모든 기능 해제", "명예의 전당 등재"],
    };
    return rewards[level] || ["특별 보상", "경험치 보너스", "새로운 기능 해제"];
  };

  const getBiblicalMeaning = (level: number) => {
    const meanings: Record<number, string> = {
      10: "씨 뿌리는 자의 비유 (마태복음 13:3-9) - 좋은 땅에 떨어진 씨앗처럼 하나님의 말씀을 받아들이는 마음",
      20: "새싹이 돋아나듯 (마가복음 4:27) - 하나님의 은혜 안에서 자라나는 신앙",
      30: "포도나무와 가지 (요한복음 15:5) - 예수님 안에 거하며 열매 맺는 삶",
      40: "섬기는 자 (마가복음 10:43-45) - 예수님처럼 섬기는 자가 되라는 가르침",
      50: "충성된 청지기 (누가복음 16:10) - 작은 일에 충성하는 자에게 큰 일을 맡기심",
      60: "제자의 길 (마태복음 28:19) - 모든 족속으로 제자를 삼으라는 대명령",
      70: "지혜로운 교사 (전도서 12:11) - 지혜자의 말씀은 찌르는 채찍 같고 박힌 못 같다",
      80: "장로의 자격 (디모데전서 5:17) - 잘 다스리는 장로들을 배나 존경할 자로 알라",
      90: "선지자의 사명 (예레미야 1:10) - 뽑으며 파괴하며 파멸하며 넘어뜨리며 건설하며 심기 위함",
      99: "하늘의 성도 (요한계시록 7:9-14) - 큰 환난에서 나온 자들로 어린 양의 피에 그 옷을 씻어 희게 한 자들",
    };
    return meanings[level] || "하나님의 사랑 안에서 성장하는 신앙인의 모습";
  };

  const getLevelTips = (level: number) => {
    const tips: Record<number, string[]> = {
      10: [
        "매일 성경 한 구절씩 읽어보세요",
        "좋아요를 눌러 다른 사람들과 은혜를 나누세요",
        "간단한 댓글로 소통을 시작해보세요",
      ],
      20: [
        "꾸준한 성경 읽기 습관을 만들어보세요",
        "커뮤니티에서 활발히 소통해보세요",
        "다른 사람의 글에 격려의 댓글을 남겨보세요",
      ],
      30: [
        "성경 구절을 북마크하여 다시 읽어보세요",
        "QT 나눔 게시판에 참여해보세요",
        "기도제목을 나누며 함께 기도해보세요",
      ],
      40: [
        "새신자들을 도와주는 멘토 역할을 해보세요",
        "성경 공부 그룹에 참여해보세요",
        "봉사 활동에 적극적으로 참여해보세요",
      ],
      50: [
        "소그룹을 이끌어보는 경험을 쌓아보세요",
        "성경 암송에 도전해보세요",
        "교회 사역에 더 깊이 참여해보세요",
      ],
    };
    return (
      tips[level] || [
        "꾸준한 성경 읽기를 실천하세요",
        "커뮤니티 활동에 적극 참여하세요",
        "다른 사람들과 은혜를 나누세요",
      ]
    );
  };

  const handleLevelClick = (levelNum: number) => {
    setSelectedLevel(levelNum);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLevel(null);
  };

  return (
    <>
      <Card className="bg-white/70 backdrop-blur-sm border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center">
            <Crown className="h-5 w-5 mr-2 animate-pulse" />
            레벨 가이드
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-80 overflow-y-auto">
          {Object.entries(levelInfo)
            .slice(0, 8)
            .map(([levelNum, info]) => {
              const isAchieved = currentLevel >= Number.parseInt(levelNum);
              const isCurrent = currentLevel === Number.parseInt(levelNum);

              return (
                <div
                  key={levelNum}
                  onClick={() => handleLevelClick(Number.parseInt(levelNum))}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isCurrent
                      ? "bg-gradient-to-r from-orange-200 to-yellow-200 ring-2 ring-orange-400"
                      : isAchieved
                      ? "bg-gradient-to-r from-green-50 to-green-100"
                      : "bg-gradient-to-r from-orange-50 to-yellow-50 opacity-60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-2xl transition-transform ${
                        isCurrent ? "animate-bounce" : ""
                      }`}
                    >
                      {info.icon}
                    </span>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          isCurrent ? "text-orange-900" : "text-orange-800"
                        }`}
                      >
                        레벨 {levelNum}
                      </p>
                      <p
                        className={`text-xs ${
                          isCurrent ? "text-orange-700" : "text-orange-600"
                        }`}
                      >
                        {info.title} ({info.subtitle})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isCurrent && (
                      <Badge className="bg-orange-500 text-white border-0 animate-pulse">
                        현재
                      </Badge>
                    )}
                    {isAchieved && (
                      <CheckCircle
                        className={`h-5 w-5 ${
                          isCurrent ? "text-orange-600" : "text-green-600"
                        }`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </CardContent>
      </Card>

      {/* 레벨 상세 모달 */}
      {selectedLevel && (
        <LevelDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          levelData={getLevelDetailData(selectedLevel)}
        />
      )}
    </>
  );
}
