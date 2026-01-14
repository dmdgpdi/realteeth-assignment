import { ChevronRight } from "lucide-react";
import type { MouseEventHandler } from "react";
import { type District, useSearchLocationQuery } from "@/entities/location";
import { ToggleFavoriteLocationIconButton } from "@/features/favoriteLocation";
import { Card, CardContent } from "@/shared/ui/card";

interface DistrictCardProps {
  district: District;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function DistrictCard({ district, onClick }: DistrictCardProps) {
  //const { data: locations } = useSearchLocationQuery(district.full);

  //const location = locations?.[0];

  const location = {
    coordinates: {
      lat: 37.5891974378627,
      lon: 126.969329763593,
    },
    name: "서울 종로구 청운동",
    countryCode: "KR",
  };

  return (
    <Card
      key={district.id}
      className="p-4 hover:bg-accent/10 transition-colors"
      onClick={onClick}
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
        {location && <ToggleFavoriteLocationIconButton location={location} />}
      </CardContent>
    </Card>
  );
}
