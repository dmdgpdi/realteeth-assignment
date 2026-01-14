import type { MainWeather } from "./MainWeather.type";
import type { Temperature } from "./Temperature.type";
import type { Weather } from "./Weather.type";

export interface DailyWeatherSeries {
  currentTemperature: Temperature;
  /** 하루에서 최저 온도 */
  minTemperature: Temperature;
  /** 하루에서 최고 온도 */
  maxTemperature: Temperature;
  /** 체감 온도 */
  feelsLikeTemperature: Temperature;
  /** 하루의 강수 확률  */
  rainProbability: number;

  /** 하루의 주요 날씨 */
  mainWeather: MainWeather;

  weathers: Weather[];
}
