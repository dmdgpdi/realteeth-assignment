import { useMutation } from "@tanstack/react-query";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";

export function useDeleteFavoriteLocation() {
  const { deleteFavoriteLocation } = useFavoriteLocationRepository();

  return useMutation({
    mutationFn: deleteFavoriteLocation,
  });
}
