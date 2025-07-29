import { useQuery } from "@tanstack/react-query";

import { Movie } from "../types/types";
import { getMovies } from "../service/api";

export function useNowPlayingMovies() {
  return useQuery<Movie[], Error>({
    queryKey: ['now-playing-movies'],
    queryFn: getMovies,
    staleTime: 1000 * 60 * 5, // 5 минут
  });
}
