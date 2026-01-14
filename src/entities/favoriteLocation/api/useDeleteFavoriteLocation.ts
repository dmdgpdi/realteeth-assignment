import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isSameCoordinates } from "@/entities/location/@x/FavoriteLocation";
import type { FavoriteLocation } from "../model/FavoriteLocation.type";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";
import { favoriteLocationKey } from "./favoriteLocation.queryKey";

export function useDeleteFavoriteLocation() {
  const repo = useFavoriteLocationRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: repo.deleteFavoriteLocation,
    onMutate: (variable) => {
      const prevFavoriteLocations = queryClient.getQueryData<
        FavoriteLocation[]
      >(favoriteLocationKey.getFavoriteLocations());

      const nextFavoriteLocations = prevFavoriteLocations?.filter(
        (favoriteLocation) =>
          !isSameCoordinates(
            favoriteLocation.coordinates,
            variable.coordinates,
          ),
      );

      queryClient.setQueryData(
        favoriteLocationKey.getFavoriteLocations(),
        nextFavoriteLocations,
      );

      return { prevFavoriteLocations };
    },
    onError: (_error, _variable, onMutateResult) => {
      queryClient.setQueryData(
        favoriteLocationKey.getFavoriteLocations(),
        onMutateResult?.prevFavoriteLocations,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: favoriteLocationKey.getFavoriteLocations(),
      });
    },
  });
}
