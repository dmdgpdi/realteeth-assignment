import type { Coordinates } from "../model/Coordinates.type";

export const locationKey = {
  all: ["location"],
  getLocation: (coordinates: Coordinates) =>
    [...locationKey.all, coordinates] as const,
  searchLocation: (keyword: string) =>
    [...locationKey.all, "searchLocation", keyword] as const,
  searchDistricts: (keyword: string) =>
    [...locationKey.all, "searchDistricts", keyword] as const,
  favoriteLocation: () => [...locationKey.all, "favoriteLocation"] as const,
  current: () => [...locationKey.all, "current"] as const,
} as const;
