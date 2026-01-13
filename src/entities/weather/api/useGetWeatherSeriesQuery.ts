import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { WeatherSeries } from "../model/WeatherSeries.type";
import type { GetWeatherSeriesParams } from "../model/WeatherSeriesRepository.interface";
import { useWeatherSeriesRepository } from "../model/WeatherSeriesRepositoryProvider";
import { weatherKey } from "./weather.queryKey";

interface UseGetWeatherSeriesQueryParams extends GetWeatherSeriesParams {
  options?: Partial<UseQueryOptions<WeatherSeries, Error>>;
}

export function useGetWeatherSeriesQuery({
  location,
  timeRange,
  weatherOptions,
  options,
}: UseGetWeatherSeriesQueryParams) {
  const { getWeatherSeries } = useWeatherSeriesRepository();

  return useQuery({
    queryKey: weatherKey.weatherSeries({ location, timeRange, weatherOptions }),
    queryFn: () => getWeatherSeries({ location, timeRange, weatherOptions }),
    ...options,
  });
}
