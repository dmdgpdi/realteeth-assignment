import type { FavoriteLocationRepository } from "./FavoriteLocationRepository.interface";

const MAX_FAVORITES_COUNT = 6;

export const canAddFavoriteLocation = async (
  repo: FavoriteLocationRepository,
) => {
  const currentFavoritesCount = (await repo.getFavoriteLocations()).length;
  return currentFavoritesCount < MAX_FAVORITES_COUNT;
};
