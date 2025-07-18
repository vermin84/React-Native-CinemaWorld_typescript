export interface Movie {
  id: string,
  title: string,
  rating: number,
  backDrop?: string,
  genres: number[],
  overview: string,
  poster: string,
  width?: number,
  production?: Array<{id: string, logo_path: string, name: string, origin_country: string}>
}

