"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import Link from "next/link";
import type { FavoriteLocation } from "@/entities/favoriteLocation";
import {
  formatTemperature,
  useGetTodayWeatherSeriesQuery,
  WeatherIcon,
} from "@/entities/weather";
import {
  RenameFavoriteLocationDialogButton,
  ToggleFavoriteLocationIconButton,
} from "@/features/favoriteLocation";
import { ROUTES } from "@/shared/constants/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

interface FavoriteLocationWeatherCardProps {
  location: FavoriteLocation;
}

export function FavoriteLocationWeatherCard({
  location,
}: FavoriteLocationWeatherCardProps) {
  const { data: favoriteLocationWeatherSeries, isError } =
    useGetTodayWeatherSeriesQuery({ location });

  if (isError) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        날씨 정보를 가져오는 중에 오류가 발생했습니다.
      </div>
    );
  }

  if (!favoriteLocationWeatherSeries) {
    return (
      <div className="space-y-4 w-full  max-w-md mx-auto px-4">
        <Skeleton className="h-44 w-full rounded-xl" />
      </div>
    );
  }

  const { currentTemperature, minTemperature, maxTemperature } =
    favoriteLocationWeatherSeries;
  const curTemp = formatTemperature(currentTemperature);
  const minTemp = formatTemperature(minTemperature);
  const maxTemp = formatTemperature(maxTemperature);

  return (
    <div className="space-y-4 w-xs md:w-md max-w-md mx-auto">
      <Card className="py-3 md:py-4 gap-2 md:gap-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-md font-medium">
              <Link
                href={ROUTES.DETAIL({
                  lat: location.coordinates.lat,
                  lon: location.coordinates.lon,
                  name: location.displayName,
                })}
                className="cursor-pointer"
              >
                {location.displayName}
              </Link>
              <RenameFavoriteLocationDialogButton favoriteLocation={location} />
            </CardTitle>
            <ToggleFavoriteLocationIconButton location={location} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4  justify-start">
            <div className="flex items-center gap-2">
              <WeatherIcon
                weather={favoriteLocationWeatherSeries.mainWeather}
                className="w-12 h-12"
              />
              <div className="relative text-4xl font-bold">
                {curTemp.isNegative && (
                  <span className="absolute inset-y-0 -left-4">-</span>
                )}
                {`${curTemp.value}${curTemp.unit}`}
              </div>
            </div>
            <div className="flex gap-1">
              <div className="flex items-center text-sm text-blue-500 font-medium">
                <ArrowDown className="mr-1 h-4 w-4" />
                <span className="relative whitespace-nowrap">
                  최저 {minTemp.isNegative ? "-" : ""}
                  {minTemp.value}
                  {minTemp.unit}
                </span>
              </div>
              <div className="flex items-center text-sm text-red-500 font-medium">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span className="relative whitespace-nowrap">
                  최고 {maxTemp.isNegative ? "-" : ""}
                  {maxTemp.value}
                  {maxTemp.unit}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-4 overflow-x-auto"></div>
        </CardContent>
      </Card>
    </div>
  );
}
