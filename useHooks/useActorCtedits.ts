import { useQuery } from "@tanstack/react-query";

import { MovieCredit } from "../types/types";
import { getActorMovieCredits } from "../service/api";

export function useActorCredits(id: number){
    return useQuery<MovieCredit[], Error>({
        queryKey: ['actor_credits', id],
        queryFn: ()=>getActorMovieCredits(id),
        staleTime: 1000 * 60 * 5,
    })
}