/**
 * @description Location은 "날씨를 조회할 수 있는 물리적 장소"를 표현하는 값 객체이다.
 *
 * - 좌표, 타임존, 표시용 이름을 포함한다.
 */
export type Location = {
  lat: number;
  lon: number;
  timezone: string;
  countryCode?: string;
  name?: string;
};
