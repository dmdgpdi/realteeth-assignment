import type { Coordinates } from "./Coordinates.type";
import type { Location } from "./Location.type";

export type LocationRepository = {
  getLocation(coordinages: Coordinates): Location;

  /**
   * 장소를 검색하면 그 장소에 맞는 좌표가 반환됩니다.
   */
  searchCoordinates(keyword: string): Coordinates;

  /**
   * 해당 키워드에 맞는 장소를 반환합니다.
   */
  searchLocation(keyword: string): Location[];
};
