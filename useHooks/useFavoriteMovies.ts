import { useQuery } from "@tanstack/react-query";

import { getMoviesById } from "../service/api";

export function useFavoriteMovies(ids: number[]| undefined){
    
    return useQuery({
        queryKey: ['Favorite_movies_list', ids],
        queryFn: ()=>getMoviesById(ids),
        enabled: !!ids,
        staleTime: 1000*6*15,
    })
}