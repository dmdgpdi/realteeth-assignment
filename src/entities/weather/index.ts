import { useGetTodayWeatherSeriesQuery } from "./api/useGetTodayWeatherSeriesQuery";
import { weatherKey } from "./api/weather.queryKey";
import { DailyWeatherSeriesRepositoryProvider } from "./model/DailyWeatherSeriesProvider";
import type { DailyWeatherSeriesRepository } from "./model/DailyWeatherSeriesRepository.interface";

export type { DailyWeatherSeriesRepository };
export {
  DailyWeatherSeriesRepositoryProvider,
  useGetTodayWeatherSeriesQuery,
  weatherKey,
};
