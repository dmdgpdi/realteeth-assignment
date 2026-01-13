import type { Location } from "@/entities/location/@x/Weather";
import type { TimeRange } from "./TimeRange.type";
import type { WeatherSeries } from "./WeatherSeries.type";

/**
 * @description 날씨 시리즈 데이터를 조회하는 리포지토리 인터페이스입니다.
 */
export interface WeatherSeriesRepository {
  /**
   * @description 특정 위치와 시간 범위에 대한 날씨 시리즈를 가져옵니다.
   */
  getWeatherSeries(params: GetWeatherSeriesParams): Promise<WeatherSeries>;
}

/**
 * @description 리포지토리 조회 옵션입니다.
 */
type WeatherSeriesRepositoryOptions = {
  /** 타임 레인지를 어떤 시간 단위로 쪼개는지 (5분, 1시간, 1일 등) */
  timeUnit: string;
};

export interface GetWeatherSeriesParams {
  location: Location;
  timeRange: TimeRange;
  options?: WeatherSeriesRepositoryOptions;
}
