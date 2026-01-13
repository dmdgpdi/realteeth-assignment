export const favoriteLocationKey = {
  all: ["favoriteLocation"],
  getFavoriteLocations: () => [...favoriteLocationKey.all] as const,
} as const;
