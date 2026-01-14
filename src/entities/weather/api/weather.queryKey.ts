import type { GetDailyWeatherSeriesParams } from "../model/DailyWeatherSeriesRepository.interface";

export const weatherKey = {
  all: ["weather"] as const,
  dailyWeatherSeries: (params: GetDailyWeatherSeriesParams) =>
    [...weatherKey.all, "dailyWeatherSeries", params] as const,
} as const;
