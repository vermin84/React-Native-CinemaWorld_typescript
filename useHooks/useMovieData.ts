import { useQuery } from "@tanstack/react-query";

import { Movie } from "../types/types";
import { getMovieById } from "../service/api";

export function useMovieData(id: number){
    return useQuery<Movie, Error>({
        queryKey: ['movie_details', id],
        queryFn: ()=>getMovieById(id),
        staleTime: 1000*60*5
    })
}