import {
  useAddFavoriteLocation,
  useDeleteFavoriteLocation,
  useGetFavoriteLocations,
} from "@/entities/favoriteLocation";
import type { FavoriteLocation } from "@/entities/favoriteLocation/model/FavoriteLocation.type";
import { isSameCoordinates, type Location } from "@/entities/location";

interface UseToggleFavoriteLocationParams {
  location: Location;
  displayName: string;
}

export function useToggleFavoriteLocation({
  location,
  displayName,
}: UseToggleFavoriteLocationParams) {
  const { data: favoriteLocations = [] } = useGetFavoriteLocations();
  const targetLocation: FavoriteLocation = {
    ...location,
    displayName,
  };
  const { mutate: addFavoriteLocation } = useAddFavoriteLocation();
  const { mutate: deleteFavoriteLocation } = useDeleteFavoriteLocation();

  const isFavorited = isLocationFavorited(targetLocation, favoriteLocations);

  const toggle = () => {
    if (isFavorited) {
      deleteFavoriteLocation(targetLocation);
      return;
    }

    addFavoriteLocation(targetLocation);
  };

  return { isFavorited, toggle };
}

const isLocationFavorited = (location: Location, favorites: Location[]) => {
  return favorites.some((favorite) =>
    isSameCoordinates(location.coordinates, favorite.coordinates),
  );
};
