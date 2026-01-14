import { ENV } from "@/shared/constants/env";
import type { DailyWeatherSeriesRepository } from "../model/DailyWeatherSeriesRepository.interface";
import type { MainWeather } from "../model/MainWeather.type";
import type { Weather } from "../model/Weather.type";
import type {
  MainWeatherDTO,
  OpenWeatherOneCallResponse,
} from "./dto/OpenWeatherOneCallResponse.dto";

const API_KEY = ENV.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

/**
 * @description OpenWeatherMap API를 사용하여 날씨 정보를 가져오는 리포지토리 구현체입니다.
 */
export const WeatherSeriesRepositoryImplement: DailyWeatherSeriesRepository = {
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
   * **대안**:
   * - 과거 시간대 데이터가 필요한 경우, [OpenWeather History API (Timemachine)](https://openweathermap.org/api/one-call-3#history)를 사용할 수 있습니다.
   * - 단, Timemachine API는 각 타임스탬프마다 개별 API 호출이 필요하여 비용 및 성능 문제가 있습니다.
   * - 현재 이 리포지토리에서는 History API를 사용하지 않습니다.
   *
   * @param location 날씨를 조회할 위치 (위경도 포함)
   * @param timeRange 조회할 시간 범위 (시작/종료) - 과거 시간 포함 시 해당 데이터는 누락됨
   * @param _options 추가 옵션 (시간을 언제 쪼갤지)
   * @returns 날씨 시리즈 데이터 (현재 온도, 최저/최고 온도, 시간대별 날씨 목록)
   */
  getDailyWeatherSeries: async ({ location, weatherOptions }) => {
    const { lat, lon } = location.coordinates;
    const url = new URL(BASE_URL);
    url.searchParams.append("lat", lat.toString());
    url.searchParams.append("lon", lon.toString());
    url.searchParams.append("appid", API_KEY || "");
    url.searchParams.append("units", "metric");
    url.searchParams.append("exclude", "minutely,alerts");

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

    // 오늘에 해당하는 hourly 데이터만 필터링
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startTimestamp = Math.floor(today.getTime() / 1000);
    const endTimestamp = Math.floor(tomorrow.getTime() / 1000);

    const filteredHourly = data.hourly.filter(
      (h) => h.dt >= startTimestamp && h.dt <= endTimestamp,
    );

    // timeUnit 기반 재샘플링
    const timeUnitSeconds = weatherOptions?.timeUnit ?? 3600; // 기본 1시간 단위
    const resampledWeathers: Weather[] = [];

    const firstHourlyDt = data.hourly[0]?.dt ?? startTimestamp;
    const sliceStart = Math.max(startTimestamp, firstHourlyDt);

    for (
      let sliceTime = sliceStart + timeUnitSeconds;
      sliceTime <= endTimestamp;
      sliceTime += timeUnitSeconds
    ) {
      // sliceTime과 가장 가까운 데이터 찾기
      const closest = filteredHourly.reduce<null | (typeof filteredHourly)[0]>(
        (prev, curr) => {
          if (!prev) return curr;
          return Math.abs(curr.dt - sliceTime) < Math.abs(prev.dt - sliceTime)
            ? curr
            : prev;
        },
        null,
      );

      if (closest) {
        resampledWeathers.push({
          dt: closest.dt,
          temperature: { value: closest.temp, unit: "C" },
          feels_like_temperature: { value: closest.feels_like, unit: "C" },
          mainWeather: mapMainWeather(closest.weather[0].main),
        });
      }
    }

    // 최저/최고 온도 계산 (현재 온도 포함)
    const temperatureDataSource = [
      data.current,
      ...resampledWeathers.map((w) => ({ temp: w.temperature.value })),
    ];
    const temperatures = temperatureDataSource.map((h) => h.temp);

    const minTemperature = {
      value: Math.min(...temperatures),
      unit: "C" as const,
    };
    const maxTemperature = {
      value: Math.max(...temperatures),
      unit: "C" as const,
    };

    return {
      currentTemperature,
      minTemperature,
      maxTemperature,
      weathers: resampledWeathers,
      mainWeather: mapMainWeather(data.daily[0].weather[0].main),
      feelsLikeTemperature: { value: data.daily[0].feels_like.day, unit: "C" },
      rainProbability: data.daily[0].pop,
    };
  },
};

/**
 * @description MainWeatherDTO → 도메인 MainWeather로 변환
 * @param dto OpenWeather에서 받은 날씨 그룹
 * @returns 도메인에서 사용하는 MainWeather
 */
const mapMainWeather = (dto: MainWeatherDTO): MainWeather => {
  switch (dto) {
    case "Clear":
    case "Clouds":
    case "Rain":
    case "Snow":
    case "Thunderstorm":
    case "Drizzle":
      return dto; // 도메인에 있는 값 그대로 반환
    default:
      return "Clear"; // 도메인에 없는 값은 기본값
  }
};
