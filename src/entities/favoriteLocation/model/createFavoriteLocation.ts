import type { Location } from "@/entities/location/@x/FavoriteLocation";
import type { FavoriteLocation } from "./FavoriteLocation.type";

interface CreateFavoriteLocationParams {
  location: Location;
  displayName: string;
}

export const createFavoriteLocation = ({
  location,
  displayName,
}: CreateFavoriteLocationParams): FavoriteLocation => {
  return {
    displayName: displayName,
    coordinates: location.coordinates,
  };
};
