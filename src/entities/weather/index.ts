import { useGetTodayWeatherSeriesQuery } from "./api/useGetTodayWeatherSeriesQuery";
import { weatherKey } from "./api/weather.queryKey";
import { DailyWeatherSeriesRepositoryProvider } from "./model/DailyWeatherSeriesProvider";
import type { DailyWeatherSeriesRepository } from "./model/DailyWeatherSeriesRepository.interface";
import { WeatherIcon } from "./ui/WeatherIcon";

export type { DailyWeatherSeriesRepository };
export {
  DailyWeatherSeriesRepositoryProvider,
  useGetTodayWeatherSeriesQuery,
  weatherKey,
  WeatherIcon,
};
