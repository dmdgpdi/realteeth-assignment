import type { FavoriteLocation } from "./FavoriteLocation.type";
import type { FavoriteLocationRepository } from "./FavoriteLocationRepository.interface";

const MAX_FAVORITES_COUNT = 6;

export const canAddFavoriteLocation = (
  favoriteLocations: FavoriteLocation[],
) => {
  return favoriteLocations.length < MAX_FAVORITES_COUNT;
};

/**
 * TODO: canAddFavoriteLocation를 tanstackQuery의 repo를 넣어서 사용할 수 있을 지 확인
 */
export const canAddFavoriteLocation2 = (repo: FavoriteLocationRepository) => {
  const currentFavoritesCount = repo.getFavoriteLocations().length;
  return currentFavoritesCount < MAX_FAVORITES_COUNT;
};
