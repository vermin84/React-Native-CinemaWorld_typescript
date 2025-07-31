import { useQuery } from "@tanstack/react-query";

import { Actor } from "../types/types";
import { getMovieCast } from "../service/api";

export function useMovieCast(id: number){
    return useQuery<Actor[], Error>({
        queryKey: ['movie_cast', id],
        queryFn: ()=>getMovieCast(id),
        staleTime: 1000 * 60 * 5
    })
}