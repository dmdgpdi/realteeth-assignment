import { isSameCoordinates } from "@/entities/location/@x/FavoriteLocation";
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
    favoriteLocation,
    displayName,
  }: {
    favoriteLocation: FavoriteLocation;
    displayName: string;
  }) {
    const favoriteLocations = await this.getFavoriteLocations();

    const updatedFavoriteLocations = favoriteLocations.map((location) => {
      if (
        isSameCoordinates(location.coordinates, favoriteLocation.coordinates)
      ) {
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

  async deleteFavoriteLocation(favoriteLocation: FavoriteLocation) {
    const favoriteLocations = await this.getFavoriteLocations();

    const updatedFavoriteLocations = favoriteLocations.filter((location) =>
      isSameCoordinates(location.coordinates, favoriteLocation.coordinates),
    );

    localStorage.setItem(
      this.FAVORITE_LOCATIONS_KEY,
      JSON.stringify(updatedFavoriteLocations),
    );
  }
}
