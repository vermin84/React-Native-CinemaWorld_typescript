import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

import { Movie } from "../types/types";

interface FavoriteContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
}

interface FavoriteContextProviderProps {
  children: ReactNode;
}
export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);


export function FavoriteContextProvider({ children }: FavoriteContextProviderProps) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((m) => +m.id !== +movieId));
  };

  const value: FavoriteContextType = {
    favorites,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}
