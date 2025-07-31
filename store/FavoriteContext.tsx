import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

import { Movie } from "../types/types";

interface FavoriteContextType {
  favorites: number[];
  
  /*addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;*/
  favoriteToggler: (id: number)=> void
}

interface FavoriteContextProviderProps {
  children: ReactNode;
}
export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);


export function FavoriteContextProvider({ children }: FavoriteContextProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

function favoriteToggler(id: number){
  const isFavorite = favorites.includes(id)
  if (isFavorite){
    setFavorites(prev=>prev.filter(item => item !== id))
  }
  else {
    setFavorites(prev=>[...prev, id])
  }

}

 /* const addFavorite = (movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((m) => +m.id !== +movieId));
  };
*/
  const value: FavoriteContextType = {
    favorites,
    favoriteToggler
    /*addFavorite,
    removeFavorite,*/
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}
