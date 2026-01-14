"use client";

import { Edit2 } from "lucide-react";
import { useState } from "react";
import { useGetFavoriteLocations } from "@/entities/favoriteLocation";
import type { FavoriteLocation } from "@/entities/favoriteLocation/model/FavoriteLocation.type";
import {
  useGetTodayWeatherSeriesQuery,
  WeatherSummary,
} from "@/entities/weather";
import {
  FavoriteToggle,
  RenameFavoriteDialog,
} from "@/features/favoriteLocation";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";

/**
 * @description 단일 즐겨찾기 장소의 날씨 카드를 렌더링합니다.
 */
function FavoriteLocationCard({ favorite }: { favorite: FavoriteLocation }) {
  const { data: weather } = useGetTodayWeatherSeriesQuery(favorite);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold truncate max-w-[120px]">
              {favorite.displayName}
            </h3>
            <p className="text-xs text-muted-foreground truncate max-w-[120px]">
              {favorite.name}
            </p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsRenameOpen(true)}
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <FavoriteToggle location={favorite} />
          </div>
        </div>

        {weather ? (
          <WeatherSummary
            weatherSeries={weather}
            className="border-none shadow-none p-0"
          />
        ) : (
          <div className="h-24 flex items-center justify-center text-sm text-muted-foreground">
            날씨 정보를 불러오는 중...
          </div>
        )}
      </CardContent>

      <RenameFavoriteDialog
        location={favorite}
        currentName={favorite.displayName}
        isOpen={isRenameOpen}
        onOpenChange={setIsRenameOpen}
      />
    </Card>
  );
}

/**
 * @description 즐겨찾기 목록을 보여주는 위젯입니다.
 */
export function FavoriteList() {
  const { data: favorites = [] } = useGetFavoriteLocations();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-10 bg-muted/30 rounded-xl border border-dashed">
        <p className="text-muted-foreground">등록된 즐겨찾기가 없습니다.</p>
        <p className="text-xs text-muted-foreground mt-1">
          자주 확인하는 지역을 추가해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((favorite) => (
        <FavoriteLocationCard
          key={`${favorite.coordinates.lat}-${favorite.coordinates.lon}`}
          favorite={favorite}
        />
      ))}
    </div>
  );
}
