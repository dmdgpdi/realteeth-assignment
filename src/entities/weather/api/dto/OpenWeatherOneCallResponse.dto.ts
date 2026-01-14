/**
 * @description OpenWeatherMap One Call API 3.0의 응답 구조를 정의하는 DTO입니다.
 */

export type MainWeatherDTO =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado";

export interface OpenWeatherOneCallResponse {
  /** 위도 */
  lat: number;
  /** 경도 */
  lon: number;
  /** 시간대 */
  timezone: string;
  /** UTC 오프셋(초 단위) */
  timezone_offset: number;

  /** 현재 날씨 */
  current: {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    clouds: number;
    uvi: number;
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    rain?: { "1h"?: number };
    snow?: { "1h"?: number };
    weather: Array<{
      id: number;
      main: MainWeatherDTO;
      description: string;
      icon: string;
    }>;
  };

  /** 시간 단위 예보 */
  hourly: Array<{
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    clouds: number;
    uvi: number;
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    pop: number; // 강수 확률
    rain?: { "1h"?: number };
    snow?: { "1h"?: number };
    weather: Array<{
      id: number;
      main: MainWeatherDTO;
      description: string;
      icon: string;
    }>;
  }>;

  /** 일 단위 예보 */
  daily: Array<{
    dt: number;
    sunrise?: number;
    sunset?: number;
    moonrise: number;
    moonset: number;
    moon_phase: number; // 0~1
    temp: {
      morn: number;
      day: number;
      eve: number;
      night: number;
      min: number;
      max: number;
    };
    feels_like: {
      morn: number;
      day: number;
      eve: number;
      night: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    clouds: number;
    uvi: number;
    pop: number; // 강수 확률
    rain?: number; // 하루 강수량, mm
    snow?: number; // 하루 적설량, mm
    weather: Array<{
      id: number;
      main: MainWeatherDTO;
      description: string;
      icon: string;
    }>;
  }>;
}
