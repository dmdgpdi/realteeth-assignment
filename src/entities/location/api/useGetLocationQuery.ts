import { useQuery } from "@tanstack/react-query";
import type { Coordinates } from "../model/Coordinates.type";
import { useLocationRepository } from "../model/LocationRepositoryProvider";
import { locationKey } from "./location.queryKey";

export function useGetLocationQuery(coordinates: Coordinates) {
  const { getLocation } = useLocationRepository();

  return useQuery({
    queryKey: locationKey.getLocation(coordinates),
    queryFn: () => getLocation(coordinates),
  });
}
