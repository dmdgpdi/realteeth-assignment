import type { Coordinates } from "./Coordinates.type";

export const isSameCoordinates = (a: Coordinates, b: Coordinates): boolean => {
  return a.lat === b.lat && a.lon === b.lon;
};
