import type { Temperature } from "./Temperature.type";
import type { Weather } from "./Weather.type";

export interface WeatherSeries {
  currentTemperature: Temperature;
  /** timeRange 상에서의 최저 온도 */
  minTemperature: Temperature;
  /** timeRange 상에서의 최고 온도 */
  maxTemperature: Temperature;
  weathers: Weather[];
}
