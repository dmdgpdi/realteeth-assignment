import { useMutation } from "@tanstack/react-query";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";

export function useRenameFavoriteLocations() {
  const { renameFavoriteLocations } = useFavoriteLocationRepository();

  return useMutation({
    mutationFn: renameFavoriteLocations,
  });
}
