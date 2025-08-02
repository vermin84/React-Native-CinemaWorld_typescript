import { useQuery } from "@tanstack/react-query";

import { getMoviesById } from "../service/api";
import { Movie } from "../types/types";

export function useFavoriteMovies(ids: number[]){
    
    return useQuery<Movie[], Error>({
        queryKey: ['Favorite_movies_list', ids],
        queryFn: ()=>getMoviesById(ids??[]),
        enabled: !!ids,
        staleTime: 1000*6*15,
    })
}