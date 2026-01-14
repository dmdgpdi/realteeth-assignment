import { toast } from "sonner";
import {
  useAddFavoriteLocation,
  useDeleteFavoriteLocation,
  useGetFavoriteLocations,
} from "@/entities/favoriteLocation";
import { canAddFavoriteLocation } from "@/entities/favoriteLocation/model/canAddFavoriteLocation";
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

    if (!canAddMore) {
      toast.warning("즐겨찾기는 최대 6개까지 추가할 수 있습니다.");
      return;
    }

    addFavoriteLocation(
      {
        ...location,
        displayName: location.name || "Unknown",
      },
      {
        onError: (error) => {
          console.error("error", error);
          toast.warning(error.message);
        },
      },
    );
  };

  return { isFavorited, toggle, canAddMore };
}
