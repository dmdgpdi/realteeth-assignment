"use client";

import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  formatTemperature,
  useGetTodayWeatherSeriesQuery,
  WeatherIcon,
} from "@/entities/weather";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function DetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lat = parseFloat(searchParams?.get("lat") || "0");
  const lon = parseFloat(searchParams?.get("lon") || "0");
  const name = searchParams?.get("name") || "상세 날씨";

  const location = {
    coordinates: { lat, lon },
  };

  const {
    data: weatherSeries,
    isLoading,
    isError,
  } = useGetTodayWeatherSeriesQuery({
    location,
  });

  if (isError) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        날씨 정보를 가져오는 중에 오류가 발생했습니다.
      </div>
    );
  }

  if (isLoading || !weatherSeries) {
    return (
      <div className="space-y-4 w-full max-w-md mx-auto px-4 mt-8">
        <Skeleton className="h-10 w-32 rounded-xl mb-4" />
        <Skeleton className="h-64 w-full rounded-xl" />
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
    mainWeather,
  } = weatherSeries;

  const curTemp = formatTemperature(currentTemperature);
  const minTemp = formatTemperature(minTemperature);
  const maxTemp = formatTemperature(maxTemperature);
  const feelTemp = formatTemperature(feelsLikeTemperature);

  return (
    <main className="container max-w-md mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>

      <Card className="py-4 gap-6">
        <CardHeader>
          <CardTitle className="text-md font-medium">현재 날씨</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 justify-start">
            <div className="flex items-center gap-2">
              <WeatherIcon weather={mainWeather} className="w-16 h-16" />
              <div className="text-5xl font-bold">
                {curTemp.isNegative && <span>-</span>}
                {`${curTemp.value}${curTemp.unit}`}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center text-sm text-blue-500 font-medium">
                <ArrowDown className="mr-1 h-4 w-4" />
                <span className="whitespace-nowrap">
                  최저 {minTemp.isNegative ? "-" : ""}
                  {minTemp.value}
                  {minTemp.unit}
                </span>
              </div>
              <div className="flex items-center text-sm text-red-500 font-medium">
                <ArrowUp className="mr-1 h-4 w-4" />
                <span className="whitespace-nowrap">
                  최고 {maxTemp.isNegative ? "-" : ""}
                  {maxTemp.value}
                  {maxTemp.unit}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4 overflow-x-auto">
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

          <div className="mt-8">
            <h3 className="text-sm font-medium mb-3">시간대별 기온</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-none py-2">
              {weathers.map((weather) => {
                const hourTemp = formatTemperature(weather.temperature);
                const text = `${hourTemp.isNegative ? "-" : ""}${hourTemp.value}${hourTemp.unit}`;

                return (
                  <div
                    key={weather.dt}
                    className="flex flex-col items-center min-w-12 text-center"
                  >
                    <span className="text-xs text-muted-foreground mb-1">
                      {`${new Date(weather.dt * 1000).getHours()}시`}
                    </span>
                    <WeatherIcon
                      weather={weather.mainWeather}
                      className="w-8 h-8 mb-1"
                    />
                    <span className="font-semibold text-sm">{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
