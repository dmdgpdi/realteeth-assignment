import type { MainWeather } from "./MainWeather.type";
import type { Temperature } from "./Temperature.type";

export interface Weather {
  /** 기온 정보 */
  temperature: Temperature;
  /** 체감 온도 */
  feels_like_temperature: Temperature;

  /** 주요 날씨 */
  mainWeather: MainWeather;
}
