import {
  useAddFavoriteLocation,
  useDeleteFavoriteLocation,
  useGetFavoriteLocations,
} from "@/entities/favoriteLocation";
import { canAddFavoriteLocation } from "@/entities/favoriteLocation/model/canAddFavoriteLocation";
import type { FavoriteLocation } from "@/entities/favoriteLocation/model/FavoriteLocation.type";
import { isSameCoordinates, type Location } from "@/entities/location";

export function useToggleFavoriteLocation(location: Location) {
  const { data: favoriteLocations = [] } = useGetFavoriteLocations();
  const { mutate: addFavoriteLocation } = useAddFavoriteLocation();
  const { mutate: deleteFavoriteLocation } = useDeleteFavoriteLocation();

  const isFavorited = favoriteLocations.some((favorite) =>
    isSameCoordinates(location.coordinates, favorite.coordinates),
  );

  const canAddMore = canAddFavoriteLocation(favoriteLocations.length);

  const toggle = () => {
    if (isFavorited) {
      const target = favoriteLocations.find((f) =>
        isSameCoordinates(location.coordinates, f.coordinates),
      );

      if (target) {
        deleteFavoriteLocation(target);
      }

      return;
    }

    if (canAddMore) {
      addFavoriteLocation({
        ...location,
        displayName: location.name || "Unknown",
      } as FavoriteLocation);
    }
  };

  return { isFavorited, toggle, canAddMore };
}
