import type { Temperature } from "./Temperature.type";

export interface Weather {
  temperature: Temperature;
  /** 체감온도 */
  feels_like_temperature: Temperature;
}
