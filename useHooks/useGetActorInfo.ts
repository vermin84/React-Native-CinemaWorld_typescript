import { useQuery } from "@tanstack/react-query";

import { ActorInfo } from "../types/types";
import { getActorInfo } from "../service/api";

export function useGetActorInfo(id: number){
    return useQuery<ActorInfo, Error>({
        queryKey: ['actor_info', id],
        queryFn: ()=>getActorInfo(id),
        staleTime: 1000 * 60 * 5,
    })
}