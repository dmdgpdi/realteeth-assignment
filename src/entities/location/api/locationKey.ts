import type { Coordinates } from "../model/Coordinates.type";

export const locationKey = {
  all: ["location"],
  coordinates: (coordinates: Coordinates) =>
    [...locationKey.all, "coordinates", coordinates] as const,
  searchLocation: (keyword: string) =>
    [...locationKey.all, "searchLocation", keyword] as const,
  searchDistricts: (keyword: string) =>
    [...locationKey.all, "searchDistricts", keyword] as const,
  favoriteLocation: () => [...locationKey.all, "favoriteLocation"] as const,
} as const;
