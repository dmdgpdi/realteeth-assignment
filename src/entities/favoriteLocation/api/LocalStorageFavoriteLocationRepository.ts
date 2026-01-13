import type { FavoriteLocationRepository } from "../model/FavoriteLocationRepository.interface";

export const LocalStorageFavoriteLocationRepository: FavoriteLocationRepository =
  {
    addFavoriteLocation(location) {
      const favoriteLocations = this.getFavoriteLocations();

      localStorage.setItem(
        "favoriteLocations",
        JSON.stringify([...favoriteLocations, location]),
      );
    },
    getFavoriteLocations() {
      const favoriteLocations = JSON.parse(
        localStorage.getItem("favoriteLocations") ?? "[]",
      );

      return favoriteLocations;
    },

    renameFavoriteLocations(favoriteId: string, displayName: string) {
      const favoriteLocations = this.getFavoriteLocations();

      const updatedFavoriteLocations = favoriteLocations.map((location) => {
        if (location.id === favoriteId) {
          return {
            ...location,
            displayName,
          };
        }

        return location;
      });

      localStorage.setItem(
        "favoriteLocations",
        JSON.stringify(updatedFavoriteLocations),
      );
    },

    removeFavoriteLocation(favoriteId: string) {
      const favoriteLocations = this.getFavoriteLocations();

      const updatedFavoriteLocations = favoriteLocations.filter(
        (location) => location.id !== favoriteId,
      );

      localStorage.setItem(
        "favoriteLocations",
        JSON.stringify(updatedFavoriteLocations),
      );
    },
  };
