import type { FavoriteLocation } from "../model/FavoriteLocation.type";
import type { FavoriteLocationRepository } from "../model/FavoriteLocationRepository.interface";

export class FavoriteLocationRepositoryImpl
  implements FavoriteLocationRepository
{
  private readonly FAVORITE_LOCATIONS_KEY = "favoriteLocations";

  async addFavoriteLocation(location: FavoriteLocation) {
    const favoriteLocations = await this.getFavoriteLocations();

    localStorage.setItem(
      this.FAVORITE_LOCATIONS_KEY,
      JSON.stringify([...favoriteLocations, location]),
    );
  }

  async getFavoriteLocations(): Promise<FavoriteLocation[]> {
    if (typeof window === "undefined") {
      return [];
    }

    const favoriteLocations = JSON.parse(
      localStorage.getItem(this.FAVORITE_LOCATIONS_KEY) ?? "[]",
    );

    return favoriteLocations;
  }

  async renameFavoriteLocations({
    favoriteId,
    displayName,
  }: {
    favoriteId: string;
    displayName: string;
  }) {
    const favoriteLocations = await this.getFavoriteLocations();

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
      this.FAVORITE_LOCATIONS_KEY,
      JSON.stringify(updatedFavoriteLocations),
    );
  }

  async deleteFavoriteLocation(favoriteId: string) {
    const favoriteLocations = await this.getFavoriteLocations();

    const updatedFavoriteLocations = favoriteLocations.filter(
      (location) => location.id !== favoriteId,
    );

    localStorage.setItem(
      this.FAVORITE_LOCATIONS_KEY,
      JSON.stringify(updatedFavoriteLocations),
    );
  }
}
