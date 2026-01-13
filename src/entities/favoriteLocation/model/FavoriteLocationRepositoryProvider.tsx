"use client";

import { createContext, type PropsWithChildren, useContext } from "react";
import type { FavoriteLocationRepository } from "./FavoriteLocationRepository.interface";

const FavoriteLocationRepositoryContext =
  createContext<FavoriteLocationRepository | null>(null);

export const FavoriteLocationRepositoryProvider = ({
  repo,
  children,
}: PropsWithChildren<{ repo: FavoriteLocationRepository }>) => (
  <FavoriteLocationRepositoryContext.Provider value={repo}>
    {children}
  </FavoriteLocationRepositoryContext.Provider>
);

export const useFavoriteLocationRepository = () => {
  const ctx = useContext(FavoriteLocationRepositoryContext);

  if (!ctx) {
    throw new Error(
      "useFavoriteLocationRepository must be used within a FavoriteLocationRepositoryProvider",
    );
  }

  return ctx;
};
