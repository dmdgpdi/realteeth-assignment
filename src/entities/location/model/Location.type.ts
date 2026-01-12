import type { Coordinates } from "./Coordinates.type";

/**
 * @description Location은 "날씨를 조회할 수 있는 물리적 장소"를 표현하는 값 객체이다.
 *
 * - 좌표, 타임존, 국가코드, 이름을 포함한다.
 */
export interface Location {
  coordinates: Coordinates;
  timezone: string; // Intl을 이용해서 생성한다.
  countryCode?: string;
  name?: string;
}
