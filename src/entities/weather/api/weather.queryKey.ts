import type { GetDailyWeatherSeriesParams } from "../model/DailyWeatherSeriesRepository.interface";

export const weatherKey = {
  all: ["weather"] as const,
  dailyWeatherSeries: ({ location }: GetDailyWeatherSeriesParams) =>
    [
      ...weatherKey.all,
      "dailyWeatherSeries",
      location?.coordinates?.lat ?? null,
      location?.coordinates?.lon ?? null,
    ] as const,
} as const;
