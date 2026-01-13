import { useQuery } from "@tanstack/react-query";
import type { GetWeatherSeriesParams } from "../model/WeatherSeriesRepository.interface";
import { useWeatherSeriesRepository } from "../model/WeatherSeriesRepositoryProvider";
import { weatherKey } from "./weather.queryKey";

export function useGetWeatherSeriesQuery(params: GetWeatherSeriesParams) {
  const { getWeatherSeries } = useWeatherSeriesRepository();

  return useQuery({
    queryKey: weatherKey.weatherSeries(params),
    queryFn: () => getWeatherSeries(params),
  });
}
