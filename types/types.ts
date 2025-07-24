export interface Movie {
  id: string,
  title: string,
  rating?: number,
  backDrop?: string,
  genres: Array<{id: number, name: string}>,
  overview: string,
  poster: string,
  width?: number,
  production?: Array<{id: number, logo_path: string, name: string, origin_country: string}>,
  releaseDate?: string
}
 export interface Actor {
  id: number,
  character: string,
  name: string,
  profile_path: string | null | undefined
 }
