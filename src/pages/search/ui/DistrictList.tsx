"use client";

import { ChevronRight, Star } from "lucide-react";
import type { District } from "@/entities/location";
import { Card, CardContent } from "@/shared/ui/card";

interface DistrictListProps {
  districts: District[];
  onSelect?: (district: District) => void;
}

export function DistrictList({ districts, onSelect }: DistrictListProps) {
  return (
    <div className="space-y-3">
      {districts.map((district) => (
        <Card
          key={district.id}
          className="p-4 hover:bg-accent/10 transition-colors"
          onClick={() => onSelect?.(district)}
        >
          <CardContent className="flex justify-between">
            {/* 왼쪽: 지역 이름 */}
            <div className="flex items-center min-w-0 cursor-pointer">
              <div className="font-medium text-lg text-foreground truncate">
                {district.full.replace(/-/g, " ")}
              </div>
              <ChevronRight className="text-muted-foreground w-5 h-5" />
            </div>

            {/* 오른쪽: 즐겨찾기 */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 이벤트 방지
                }}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                title="즐겨찾기"
              >
                <Star className="text-yellow-400 w-5 h-5" />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
