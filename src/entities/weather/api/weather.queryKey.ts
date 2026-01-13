import type { GetWeatherSeriesParams } from "../model/WeatherSeriesRepository.interface";

export const weatherKey = {
  all: ["weather"] as const,
  weatherSeries: (params: GetWeatherSeriesParams) =>
    [...weatherKey.all, "weatherSeries", params] as const,
} as const;
