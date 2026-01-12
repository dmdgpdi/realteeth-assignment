import type { Location } from "@/entities/location/@x/Weather";
import type { TimeRange } from "./TimeRange.type";
import type { WeatherSeries } from "./WeatherSeries.type";

export interface WeatherSeriesRepository {
  getWeatherSeries(
    location: Location,
    timeRange: TimeRange,
    options?: WeatherSeriesRepositoryOptions,
  ): WeatherSeries;
}

type WeatherSeriesRepositoryOptions = {
  // 타임 레인지를 어떤 시간 단위로 쪼개는지 (5분, 1시간, 1일, 달이 될수도 있음)
  timeUnit: string;
};
