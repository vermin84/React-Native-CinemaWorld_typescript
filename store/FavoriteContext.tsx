import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const MOVIE_KEY = "favorites";
const ACTOR_KEY = "favoriteActors";


export function FavoriteContextProvider({ children }: FavoriteContextProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
   const [favoriteActors, setFavoriteActors] = useState<number[]>([]);

function favoriteToggler(id: number){
  const isFavorite = favorites.includes(id);
  let updated;

  if (isFavorite) {
    updated = favorites.filter(item => item !== id);
  } else {
    updated = [...favorites, id];
  }

  setFavorites(updated);

  AsyncStorage.setItem(MOVIE_KEY, JSON.stringify(updated))
    
    .catch(console.error);

}

function favoriteActorToggler(id: number){
  const isFavorite = favoriteActors.includes(id);
  let updated;

  if (isFavorite) {
    updated = favoriteActors.filter(item => item !== id);
  } else {
    updated = [...favoriteActors, id];
  }

  setFavoriteActors(updated);

  AsyncStorage.setItem(ACTOR_KEY, JSON.stringify(updated))
    
    .catch(console.error);

}

useEffect(() => {
  const loadFavorites = async () => {
    try {
      const movieData = await AsyncStorage.getItem(MOVIE_KEY);
      const actorData = await AsyncStorage.getItem(ACTOR_KEY);  // <-- раскомментировать
      console.log("Актёры:", actorData);
      if (actorData) setFavoriteActors(JSON.parse(actorData));  // <-- раскомментировать
      if (movieData) setFavorites(JSON.parse(movieData));
      console.log("Загружено из AsyncStorage:");
      console.log("Фильмы:", movieData);
    } catch (err) {
      console.error("Ошибка загрузки избранного:", err);
    }
  };
  loadFavorites();
}, []);

  
 
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
