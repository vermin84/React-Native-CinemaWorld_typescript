import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

import { Movie } from "../types/types";

interface FavoriteContextType {
  favorites: number[];
  
  favoriteActors: number[],
  favoriteToggler: (id: number)=> void,
  favoriteActorToggler: (id: number)=> void
}

interface FavoriteContextProviderProps {
  children: ReactNode;
}
export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);


export function FavoriteContextProvider({ children }: FavoriteContextProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
   const [favoriteActors, setFavoriteActors] = useState<number[]>([]);

function favoriteToggler(id: number){
  const isFavorite = favorites.includes(id)
  if (isFavorite){
    setFavorites(prev=>prev.filter(item => item !== id))
  }
  else {
    setFavorites(prev=>[...prev, id])
  }

}

function favoriteActorToggler(id: number){
  
  const isFavorite = favoriteActors.includes(id)
  
  if (isFavorite){
    setFavoriteActors(prev=>prev.filter(item => item !== id))
  }
  else {
    setFavoriteActors(prev=>[...prev, id])
  }

}



 
  const value: FavoriteContextType = {
    favoriteActors,
    favorites,
    favoriteToggler,
    favoriteActorToggler,
    
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}
