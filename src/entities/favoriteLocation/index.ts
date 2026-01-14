import { useAddFavoriteLocation } from "./api/useAddFavoriteLocation";
import { useDeleteFavoriteLocation } from "./api/useDeleteFavoriteLocation";
import { useGetFavoriteLocations } from "./api/useGetFavoriteLocations";
import { useRenameFavoriteLocations } from "./api/useRenameFavoriteLocations";
import type { FavoriteLocation } from "./model/FavoriteLocation.type";

export type { FavoriteLocation };

export {
  useAddFavoriteLocation,
  useDeleteFavoriteLocation,
  useGetFavoriteLocations,
  useRenameFavoriteLocations,
};
