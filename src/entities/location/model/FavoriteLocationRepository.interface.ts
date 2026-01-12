import type { FavoriteLocation } from "./FavoriteLocation.type";

export interface FavoriteLocationRepository {
  /** 즐겨찾기에 등록합니다 */
  addFavoriteLocation(location: FavoriteLocation): void;

  /** 즐겨찾기 목록을 조회합니다 */
  getFavoriteLocations(): FavoriteLocation[];

  /** 이름을 수정합니다 */
  renameFavoriteLocations(favoriteId: string, displayName: string): void;

  removeFavoriteLocation(favoriteId: string): void;
}
