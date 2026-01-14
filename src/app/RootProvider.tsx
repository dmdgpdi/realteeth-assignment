"use client";

import type { PropsWithChildren } from "react";
import { FavoriteLocationRepositoryImpl } from "@/entities/favoriteLocation/api/FavoriteLocationRepositoryImpl";
import { FavoriteLocationRepositoryProvider } from "@/entities/favoriteLocation/model/FavoriteLocationRepositoryProvider";
import { KakaoLocationRepository } from "@/entities/location/api/KakaoLocationRepository/KakaoLocationRepository";
import { LocationRepositoryProvider } from "@/entities/location/model/LocationRepositoryProvider";
import { WeatherSeriesRepositoryImplement } from "@/entities/weather/api/WeatherSeriesRepository.implement";
import { DailyWeatherSeriesRepositoryProvider } from "@/entities/weather/model/DailyWeatherSeriesProvider";

const locationRepo = new KakaoLocationRepository();
const weatherRepo = WeatherSeriesRepositoryImplement;
const favoriteRepo = FavoriteLocationRepositoryImpl;

export function RootProvider({ children }: PropsWithChildren) {
  return (
    <LocationRepositoryProvider repo={locationRepo}>
      <DailyWeatherSeriesRepositoryProvider repo={weatherRepo}>
        <FavoriteLocationRepositoryProvider repo={favoriteRepo}>
          {children}
        </FavoriteLocationRepositoryProvider>
      </DailyWeatherSeriesRepositoryProvider>
    </LocationRepositoryProvider>
  );
}
