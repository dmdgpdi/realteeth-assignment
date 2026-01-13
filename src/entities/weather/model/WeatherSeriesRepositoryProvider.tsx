import { createContext, type PropsWithChildren, useContext } from "react";
import type { WeatherSeriesRepository } from "@/entities/weather";

const WeatherSeriesRepositoryContext =
  createContext<WeatherSeriesRepository | null>(null);

export const WeatherSeriesRepositoryProvider = ({
  repo,
  children,
}: PropsWithChildren<{ repo: WeatherSeriesRepository }>) => (
  <WeatherSeriesRepositoryContext.Provider value={repo}>
    {children}
  </WeatherSeriesRepositoryContext.Provider>
);

export const useWeatherSeriesRepository = () => {
  const ctx = useContext(WeatherSeriesRepositoryContext);

  if (!ctx) {
    throw new Error(
      "useWeatherSeriesRepository must be used within a WeatherSeriesRepositoryProvider",
    );
  }

  return ctx;
};
