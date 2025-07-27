import { useQuery } from '@tanstack/react-query';

import { searchMoviesByQuery } from '../service/api';
import { Movie } from '../types/types';

export function useQuerySearch(query: string) {
  return useQuery<Movie[], Error>({
    queryKey: ['SearchMoviesByQuery', query],
    queryFn: () => searchMoviesByQuery(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    
  });
}
