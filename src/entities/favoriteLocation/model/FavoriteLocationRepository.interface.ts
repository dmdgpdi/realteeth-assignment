import type { FavoriteLocation } from "./FavoriteLocation.type";

export interface FavoriteLocationRepository {
  /** 즐겨찾기에 등록합니다 */
  addFavoriteLocation(location: FavoriteLocation): Promise<void>;

  /** 즐겨찾기 목록을 조회합니다 */
  getFavoriteLocations(): Promise<FavoriteLocation[]>;

  /** 이름을 수정합니다 */
  renameFavoriteLocations({
    favoriteLocation,
    displayName,
  }: {
    favoriteLocation: FavoriteLocation;
    displayName: string;
  }): Promise<void>;

  deleteFavoriteLocation(favoriteLocation: FavoriteLocation): Promise<void>;
}
