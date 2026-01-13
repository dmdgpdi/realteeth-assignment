/**
 * @description OpenWeatherMap One Call API 3.0의 응답 구조를 정의하는 DTO입니다.
 */
export interface OpenWeatherOneCallResponse {
  current: {
    dt: number;
    temp: number;
    feels_like: number;
  };
  hourly: Array<{
    dt: number;
    temp: number;
    feels_like: number;
  }>;
}
