import { useMutation } from "@tanstack/react-query";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";
import { favoriteLocationKey } from "./favoriteLocation.queryKey";

export function useDeleteFavoriteLocation() {
  const { deleteFavoriteLocation } = useFavoriteLocationRepository();

  return useMutation({
    mutationFn: deleteFavoriteLocation,
    onMutate: (_variable, { client }) => {
      const prevFavoriteLocations = client.getQueryData(
        favoriteLocationKey.getFavoriteLocations(),
      );

      client.invalidateQueries({
        queryKey: favoriteLocationKey.getFavoriteLocations(),
      });

      return { prevFavoriteLocations };
    },
    onError: (_error, _variable, onMutateResult, { client }) => {
      client.setQueryData(
        favoriteLocationKey.getFavoriteLocations(),
        onMutateResult?.prevFavoriteLocations,
      );
    },
    onSettled: (_data, _error, _variable, _onMutateResult, { client }) => {
      client.invalidateQueries({
        queryKey: favoriteLocationKey.getFavoriteLocations(),
      });
    },
  });
}
