"use client";

import { createContext, type PropsWithChildren, useContext } from "react";
import type { DailyWeatherSeriesRepository } from "./DailyWeatherSeriesRepository.interface";

const DailyWeatherSeriesRepositoryContext =
  createContext<DailyWeatherSeriesRepository | null>(null);

export const DailyWeatherSeriesRepositoryProvider = ({
  repo,
  children,
}: PropsWithChildren<{ repo: DailyWeatherSeriesRepository }>) => (
  <DailyWeatherSeriesRepositoryContext.Provider value={repo}>
    {children}
  </DailyWeatherSeriesRepositoryContext.Provider>
);

export const useDailyWeatherSeriesRepository = () => {
  const ctx = useContext(DailyWeatherSeriesRepositoryContext);

  if (!ctx) {
    throw new Error(
      "useDailyWeatherSeriesRepository must be used within a WeatherSeriesRepositoryProvider",
    );
  }

  return ctx;
};
