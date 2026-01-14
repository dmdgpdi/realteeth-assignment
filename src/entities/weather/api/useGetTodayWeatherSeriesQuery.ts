import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { DailyWeatherSeries } from "../model/DailyWeatherSeries.type";
import { useDailyWeatherSeriesRepository } from "../model/DailyWeatherSeriesProvider";
import type { GetDailyWeatherSeriesParams } from "../model/DailyWeatherSeriesRepository.interface";
import { weatherKey } from "./weather.queryKey";

interface UseGetTodayWeatherSeriesQueryParams
  extends GetDailyWeatherSeriesParams {
  options?: Partial<UseQueryOptions<DailyWeatherSeries, Error>>;
}

export function useGetTodayWeatherSeriesQuery({
  location,
  weatherOptions,
  options,
}: UseGetTodayWeatherSeriesQueryParams) {
  const { getDailyWeatherSeries } = useDailyWeatherSeriesRepository();

  return useQuery({
    queryKey: weatherKey.dailyWeatherSeries({ location, weatherOptions }),
    queryFn: () => getDailyWeatherSeries({ location, weatherOptions }),
    ...options,
  });
}
