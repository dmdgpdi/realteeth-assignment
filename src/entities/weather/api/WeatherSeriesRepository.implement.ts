import type { Location } from "@/entities/location/@x/Weather";
import { ENV } from "@/shared/constants/env";
import type { TimeRange } from "../model/TimeRange.type";
import type { Weather } from "../model/Weather.type";
import type { WeatherSeries } from "../model/WeatherSeries.type";
import type { WeatherSeriesRepository } from "../model/WeatherSeriesRepository.interface";
import type { OpenWeatherOneCallResponse } from "./dto/OpenWeatherOneCallResponse.dto";

/**
 * @description OpenWeatherMap API를 사용하여 날씨 정보를 가져오는 리포지토리 구현체입니다.
 */
export class WeatherSeriesRepositoryImplement
  implements WeatherSeriesRepository
{
  private readonly apiKey = ENV.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  private readonly baseUrl = "https://api.openweathermap.org/data/3.0/onecall";

  /**
   * @description 특정 위치와 시간 범위에 대한 날씨 시리즈를 가져옵니다.
   *
   * @remarks
   * **사용 중인 API**: [OpenWeather One Call API 3.0 - Current and Forecasts](https://openweathermap.org/api/one-call-3#current)
   * - 엔드포인트: `https://api.openweathermap.org/data/3.0/onecall`
   * - 제공 데이터: 현재 날씨 + 향후 48시간 hourly 예보
   *
   * **API 제약사항**:
   * - ⚠️ **과거 시간대 데이터는 조회할 수 없습니다.**
   * - 이 API는 현재 시간을 기준으로 향후 48시간 이내의 예보만 제공합니다.
   * - `timeRange`에 과거 시간이 포함된 경우, 해당 시간대의 데이터는 응답에 포함되지 않습니다.
   *
   * **예시 상황**:
   * - 현재 시각: 2026-01-13 13:00
   * - 요청 timeRange: 2026-01-13 00:00 ~ 2026-01-13 24:00 (당일 전체)
   * - 결과: 13:00 이전(00:00~13:00)의 데이터는 조회되지 않고, `weathers` 배열이 비어있거나 13:00 이후 데이터만 포함됩니다.
   *
   * **영향**:
   * - `weathers` 배열: timeRange 내에서 현재 시간 이후의 데이터만 포함됩니다.
   * - `minTemperature`, `maxTemperature`: 조회 가능한 데이터만으로 계산되므로 실제 당일 최저/최고와 다를 수 있습니다.
   *
   * **대안**:
   * - 과거 시간대 데이터가 필요한 경우, [OpenWeather History API (Timemachine)](https://openweathermap.org/api/one-call-3#history)를 사용할 수 있습니다.
   * - 단, Timemachine API는 각 타임스탬프마다 개별 API 호출이 필요하여 비용 및 성능 문제가 있습니다.
   * - 현재 이 리포지토리에서는 History API를 사용하지 않습니다.
   *
   * @param location 날씨를 조회할 위치 (위경도 포함)
   * @param timeRange 조회할 시간 범위 (시작/종료) - 과거 시간 포함 시 해당 데이터는 누락됨
   * @param _options 추가 옵션 (현재는 사용되지 않음)
   * @returns 날씨 시리즈 데이터 (현재 온도, 최저/최고 온도, 시간대별 날씨 목록)
   */
  async getWeatherSeries(
    location: Location,
    timeRange: TimeRange,
    _options?: { timeUnit: string },
  ): Promise<WeatherSeries> {
    const { lat, lon } = location.coordinates;
    const url = new URL(this.baseUrl);
    url.searchParams.append("lat", lat.toString());
    url.searchParams.append("lon", lon.toString());
    url.searchParams.append("appid", this.apiKey || "");
    url.searchParams.append("units", "metric");
    url.searchParams.append("exclude", "minutely,daily,alerts");

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `날씨 데이터를 가져오는데 실패했습니다: ${response.statusText}`,
      );
    }

    const data: OpenWeatherOneCallResponse = await response.json();

    const currentTemperature = {
      value: data.current.temp,
      unit: "C" as const,
    };

    // 시간 범위(timeRange)에 따른 시간대별 데이터 필터링
    const startTimestamp = Math.floor(timeRange.start.getTime() / 1000);
    const endTimestamp = Math.floor(timeRange.end.getTime() / 1000);

    const filteredHourly = data.hourly.filter(
      (h) => h.dt >= startTimestamp && h.dt <= endTimestamp,
    );

    // 필터링된 데이터가 없는 경우, 최저/최고 온도를 위해 전체 시간대 데이터(또는 현재 데이터)를 사용
    const temperatureDataSource = [data.current, ...filteredHourly];
    const temperatures = temperatureDataSource.map((h) => h.temp);
    const minTemperature = {
      value: Math.min(...temperatures),
      unit: "C" as const,
    };
    const maxTemperature = {
      value: Math.max(...temperatures),
      unit: "C" as const,
    };

    const weathers: Weather[] = filteredHourly.map((h) => ({
      temperature: {
        value: h.temp,
        unit: "C" as const,
      },
      feels_like_temperature: {
        value: h.feels_like,
        unit: "C" as const,
      },
    }));

    return {
      currentTemperature,
      minTemperature,
      maxTemperature,
      weathers,
    };
  }
}
