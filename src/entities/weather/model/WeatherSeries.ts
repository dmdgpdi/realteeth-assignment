import type { Location } from "./Location";
import type { TimeRange } from "./TimeRange";
import type { WeatherObservation } from "./WeatherObservation";

/**
 * @description WeatherSeries는 특정 장소의 특정 기간 동안의 WeatherObservation 집합이다.
 *
 * - 시간 순서대로 정렬된 관측/예측 데이터 묶음이다.
 * - 집계, 통계, UI 변환의 입력값으로 사용된다.
 */
export type WeatherSeries = {
  /** 장소 */
  location: Location;

  /** 조회 기간 */
  range: TimeRange;

  /** 데이터 간격 (시간별/일별) */
  interval: "hourly" | "daily";

  /** 관측/예측 데이터 목록 */
  observations: WeatherObservation[];
};

/**
 *
 * Query
 * GetWeatherSeriesQuery(location, range)
 * GetTodayWeatherQuery(location)
 * GetWeeklyWeatherQuery(location)
 * GetWeatherHistoryQuery(location, range)
 *
 * Command
 * AddFavoriteLocationCommand(location, alias)
 * RenameFavoriteLocationCommand(favoriteId, newAlias)
 * RemoveFavoriteLocationCommand(favoriteId)
 */
