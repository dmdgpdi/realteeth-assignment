import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";
import { favoriteLocationKey } from "./favoriteLocation.queryKey";

export function useDeleteFavoriteLocation() {
  const { deleteFavoriteLocation } = useFavoriteLocationRepository();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavoriteLocation,
    onMutate: () => {
      const prevFavoriteLocations = queryClient.getQueryData(
        favoriteLocationKey.getFavoriteLocations(),
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
