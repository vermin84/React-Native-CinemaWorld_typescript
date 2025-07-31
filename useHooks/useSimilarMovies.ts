import { useQuery } from "@tanstack/react-query";

import { Movie } from "../types/types";
import { getSimilarMovies } from "../service/api";

export function useSimilarMovies(id: number){
    return useQuery<Movie[],Error>({
        queryKey: ['similar_movies', id],
        queryFn: ()=>getSimilarMovies(id),
        staleTime: 1000*60*5
    })
}