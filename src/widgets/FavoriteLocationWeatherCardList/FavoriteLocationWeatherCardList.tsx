"use client";

import { useGetFavoriteLocations } from "@/entities/favoriteLocation";
import { FavoriteLocationWeatherCard } from "./FavoriteLocationWeatherCard";

export function FavoriteLocationWeatherCardList() {
  const { data: favoriteLocations = [] } = useGetFavoriteLocations();

  return (
    <div className="mx-auto w-xs md:w-md max-w-md space-y-4">
      {favoriteLocations.length > 0 && (
        <h2 className=" text-2xl font-bold tracking-tight">나의 즐겨찾기</h2>
      )}
      {favoriteLocations.map((favoriteLocation) => (
        <FavoriteLocationWeatherCard
          key={`${favoriteLocation.coordinates.lat}-${favoriteLocation.coordinates.lon}`}
          location={favoriteLocation}
        />
      ))}
    </div>
  );
}
