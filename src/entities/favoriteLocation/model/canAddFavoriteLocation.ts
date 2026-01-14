const MAX_FAVORITES_COUNT = 6;

export const canAddFavoriteLocation = (totalFavoritesCount: number) => {
  return totalFavoritesCount < MAX_FAVORITES_COUNT;
};
