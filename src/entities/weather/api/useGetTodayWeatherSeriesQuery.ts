import type { UseQueryOptions } from "@tanstack/react-query";
import type { Location } from "@/entities/location/@x/Weather";
import type { TimeRange } from "../model/TimeRange.type";
import type { WeatherSeries } from "../model/WeatherSeries.type";
import { useGetWeatherSeriesQuery } from "./useGetWeatherSeriesQuery";

export function useGetTodayWeatherSeriesQuery(
  location: Location,
  options?: Partial<UseQueryOptions<WeatherSeries, Error>>,
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const timeRange: TimeRange = { start: today, end: tomorrow };

  return useGetWeatherSeriesQuery({ location, timeRange, options });
}
