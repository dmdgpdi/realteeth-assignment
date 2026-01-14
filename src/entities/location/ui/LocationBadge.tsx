import { MapPin } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Location } from "../model/Location.type";

interface LocationBadgeProps {
  location: Location;
  className?: string;
}

/**
 * @description 위치 이름을 아이콘과 함께 표시하는 배지 컴포넌트입니다.
 */
export function LocationBadge({ location, className }: LocationBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium",
        className,
      )}
    >
      <MapPin className="h-3.5 w-3.5" />
      <span>{location.name || "알 수 없는 위치"}</span>
    </div>
  );
}
