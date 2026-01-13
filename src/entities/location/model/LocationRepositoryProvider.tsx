"use client";

import { createContext, type PropsWithChildren, useContext } from "react";
import type { LocationRepository } from "@/entities/location";

const LocationRepositoryContext = createContext<LocationRepository | null>(
  null,
);

export const LocationRepositoryProvider = ({
  repo,
  children,
}: PropsWithChildren<{ repo: LocationRepository }>) => (
  <LocationRepositoryContext.Provider value={repo}>
    {children}
  </LocationRepositoryContext.Provider>
);

export const useLocationRepository = () => {
  const ctx = useContext(LocationRepositoryContext);

  if (!ctx) {
    throw new Error(
      "useLocationRepository must be used within a LocationRepositoryProvider",
    );
  }

  return ctx;
};
