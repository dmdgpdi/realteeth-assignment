import { useGetWeatherSeriesQuery } from "./api/useGetWeatherSeriesQuery";
import { weatherKey } from "./api/weather.queryKey";
import type { WeatherSeriesRepository } from "./model/WeatherSeriesRepository.interface";
import { WeatherSeriesRepositoryProvider } from "./model/WeatherSeriesRepositoryProvider";

export type { WeatherSeriesRepository };
export {
  WeatherSeriesRepositoryProvider,
  useGetWeatherSeriesQuery,
  weatherKey,
};
