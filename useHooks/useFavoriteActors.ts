import { useQuery } from "@tanstack/react-query";

import { getFavoriteActorsByIds } from "../service/api";
import { ActorInfo } from "../types/types";

export function useFavoriteActors(actors: number[]){
    return useQuery<ActorInfo[], Error>({
        queryKey: ['Favorite_actors', actors],
        queryFn: ()=>getFavoriteActorsByIds(actors ?? []),
        staleTime: 1000*6*15,
        enabled: !!actors && actors.length > 0
    })
}