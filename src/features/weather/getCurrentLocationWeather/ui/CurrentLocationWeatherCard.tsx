"use client";

import { ArrowDown, ArrowUp, Clock, Thermometer } from "lucide-react";
import { WeatherIcon } from "@/entities/weather";
import type { DailyWeatherSeries } from "@/entities/weather/model/DailyWeatherSeries.type";
import { formatTemperature } from "@/shared/lib/formatTemperature";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { useGetCurrentLocationWeather } from "../useGetCurrentLocationWeather.model";

export function CurrentLocationWeatherCard() {
  const {
    data: currentLocationWeather,
    isLoading,
    isError,
    isSuccess,
  } = useGetCurrentLocationWeather();

  if (isError) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        날씨 정보를 가져오는 중에 오류가 발생했습니다.
      </div>
    );
  }

  if (isLoading || !isSuccess) {
    return (
      <div className="space-y-4 w-full  max-w-md mx-auto px-4">
        <Skeleton className="h-44 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (!currentLocationWeather) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        위치 정보를 가져오는 중...
      </div>
    );
  }

  const {
    currentTemperature,
    minTemperature,
    maxTemperature,
    feelsLikeTemperature,
    rainProbability,
    weathers,
  } = currentLocationWeather;
  const curTemp = formatTemperature(currentTemperature);
  const minTemp = formatTemperature(minTemperature);
  const maxTemp = formatTemperature(maxTemperature);
  const feelTemp = formatTemperature(feelsLikeTemperature);

  return (
    <div className="space-y-4 w-xs md:w-md max-w-md mx-auto">
      <Card className="py-3 md:py-4 gap-2 md:gap-6">
        <CardHeader>
          <CardTitle className="text-md font-medium">현재 날씨</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4  justify-start">
            <div className="flex items-center gap-2">
              <WeatherIcon
                weather={currentLocationWeather.mainWeather}
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
          <div className="mt-4 flex gap-4 overflow-x-auto">
            {/* 강수확률 카드 */}
            <div className="shrink-0 w-24 h-24 p-2 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center">
              <div>
                <div className="text-blue-500 text-2xl">💧</div>
                <div className="text-md font-bold mt-1">{rainProbability}%</div>
                <div className="text-sm font-medium text-gray-500">
                  강수확률
                </div>
              </div>
            </div>

            {/* 체감온도 카드 */}
            <div className="shrink-0 w-24 h-24 p-2 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-center">
              <div className="text-red-500 text-2xl">🌡️</div>
              <div className="text-md font-bold mt-1">
                {feelTemp.isNegative ? "-" : ""}
                {feelTemp.value}
                {feelTemp.unit}
              </div>
              <div className="text-sm font-medium text-gray-500">체감온도</div>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm">시간대별 기온</span>
            <div className="flex gap-4 overflow-x-auto scrollbar-none py-2">
              {weathers.map((weather, idx) => {
                const hourTemp = formatTemperature(weather.temperature);
                const text = `${hourTemp.isNegative ? "-" : ""}${hourTemp.value}${hourTemp.unit}`;

                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: 유의미한 key가 없어서
                    key={idx}
                    className="flex flex-col items-center min-w-12 text-center"
                  >
                    <span className="text-xs text-muted-foreground">
                      {`${new Date(weather.dt * 1000).getHours()}시`}
                    </span>
                    <span className="font-semibold">{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
