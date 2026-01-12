import type { Location } from "./Location";
import type { Temperature } from "./Temperature";

/**
 * @description WeatherObservation은 특정 장소의 특정 시점의 기온 관측 또는 예측 값이다.
 *
 * - Weather 도메인의 가장 작은 원자 단위이다.
 * - 관측(observed)과 예측(forecast)을 구분하여 의미 차이를 표현한다.
 * - 불변 값 객체이다.
 */
export type WeatherObservation = {
  location: Location;
  time: Date; // UTC
  temperature: Temperature;
  /** 최저 기온 (temperature와 동일할 수도 있음) */
  minTemperature: Temperature;
  /** 최고 기온 (temperature와 동일할 수도 있음) */
  maxTemperature: Temperature;

  /** 강수 확률 (0~100) */
  rainfallProbability?: number;
  /** 날씨 상태 */
  condition?: "sunny" | "cloudy" | "rainy" | "snowy";

  /** 실제 관측인지, 예측값인지 */
  type: "observed" | "forecast";
};
