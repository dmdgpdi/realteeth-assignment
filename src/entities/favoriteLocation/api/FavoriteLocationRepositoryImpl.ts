import { isSameCoordinates } from "@/entities/location/@x/FavoriteLocation";
import type { FavoriteLocation } from "../model/FavoriteLocation.type";
import type { FavoriteLocationRepository } from "../model/FavoriteLocationRepository.interface";

const FAVORITE_LOCATIONS_KEY = "favoriteLocations";

function createFavoriteLocationRepository(): FavoriteLocationRepository {
  const getFavoriteLocations = async (): Promise<FavoriteLocation[]> => {
    if (typeof window === "undefined") {
      return [];
    }

    return JSON.parse(localStorage.getItem(FAVORITE_LOCATIONS_KEY) ?? "[]");
  };

  const addFavoriteLocation = async (location: FavoriteLocation) => {
    const favoriteLocations = await getFavoriteLocations();

    localStorage.setItem(
      FAVORITE_LOCATIONS_KEY,
      JSON.stringify([...favoriteLocations, location]),
    );
  };

  const renameFavoriteLocations = async ({
    favoriteLocation,
    displayName,
  }: {
    favoriteLocation: FavoriteLocation;
    displayName: string;
  }) => {
    const favoriteLocations = await getFavoriteLocations();

    const updatedFavoriteLocations = favoriteLocations.map((location) =>
      isSameCoordinates(location.coordinates, favoriteLocation.coordinates)
        ? { ...location, displayName }
        : location,
    );

    localStorage.setItem(
      FAVORITE_LOCATIONS_KEY,
      JSON.stringify(updatedFavoriteLocations),
    );
  };

  const deleteFavoriteLocation = async (favoriteLocation: FavoriteLocation) => {
    const favoriteLocations = await getFavoriteLocations();

    const updatedFavoriteLocations = favoriteLocations.filter(
      (location) =>
        !isSameCoordinates(location.coordinates, favoriteLocation.coordinates),
    );

    localStorage.setItem(
      FAVORITE_LOCATIONS_KEY,
      JSON.stringify(updatedFavoriteLocations),
    );
  };

  return {
    getFavoriteLocations,
    addFavoriteLocation,
    renameFavoriteLocations,
    deleteFavoriteLocation,
  };
}

export const FavoriteLocationRepositoryImpl =
  createFavoriteLocationRepository();
