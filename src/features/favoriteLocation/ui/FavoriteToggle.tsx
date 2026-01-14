"use client";

import { Heart } from "lucide-react";
import type { Location } from "@/entities/location";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { useToggleFavoriteLocation } from "../toggleFavoriteLocation/useToggleFavoriteLocation.model";

interface FavoriteToogleProps {
  location: Location;
  className?: string;
}

/**
 * @description 즐겨찾기 등록/해제 버튼 컴포넌트입니다.
 */
export function FavoriteToggle({ location, className }: FavoriteToogleProps) {
  const { toggle, isFavorited, canAddMore } =
    useToggleFavoriteLocation(location);

  const handleToggle = () => {
    if (!isFavorited && !canAddMore) {
      alert("즐겨찾기는 최대 6개까지 등록할 수 있습니다.");
      return;
    }
    toggle();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "hover:text-red-500",
        isFavorited && "text-red-500",
        className,
      )}
    >
      <Heart className={cn("h-5 w-5", isFavorited && "fill-current")} />
    </Button>
  );
}
