import type { Location } from "../model/Location";
import type { TimeRange } from "../model/TimeRange";
import type { WeatherObservation } from "../model/WeatherObservation";
import type { WeatherSeries } from "../model/WeatherSeries";
import type { WeatherRepository } from "../model/weather.repository";

export class MockWeatherRepository implements WeatherRepository {
  private store: WeatherObservation[] = [];

  /**
   * 테스트 설정을 위한 헬퍼 메서드 (AAA - Arrange 단계에서 사용)
   */
  setScenario(observations: WeatherObservation[]) {
    this.store = observations;
  }

  async getSeries(
    location: Location,
    range: TimeRange,
    interval: "hourly" | "daily",
  ): Promise<WeatherSeries> {
    // 실제 DB처럼 범위에 맞는 데이터만 필터링하여 반환
    const filtered = this.store.filter((obs) => {
      const timeMatch =
        obs.time.getTime() >= range.from.getTime() &&
        obs.time.getTime() <= range.to.getTime();

      // 위치 검증은 간단히 위/경도만 비교 (정밀도가 다를 수 있으니 유의)
      const locMatch =
        Math.abs(obs.location.lat - location.lat) < 0.0001 &&
        Math.abs(obs.location.lon - location.lon) < 0.0001;

      return timeMatch && locMatch;
    });

    return {
      location,
      range,
      interval,
      observations: filtered,
    };
  }
}
