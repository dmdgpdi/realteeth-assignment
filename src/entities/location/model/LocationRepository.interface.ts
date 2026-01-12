import type { Coordinates } from "./Coordinates.type";
import type { District } from "./District.type";
import type { Location } from "./Location.type";

export type LocationRepository = {
  /**
   * @description 좌표를 기반으로 주소 정보를 가져옵니다.
   */
  getLocation(coordinates: Coordinates): Promise<Location>;

  /**
   * @description 키워드에 맞는 장소를 반환합니다.
   * @param keyword 검색어
   */
  searchLocation(keyword: string): Promise<Location[]>;

  /**
   * @description 키워드에 맞는 행정구역 리스트를 반환합니다.
   */
  searchDistricts(keyword: string): Promise<District[]>;
};
