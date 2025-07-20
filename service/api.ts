import axios from "axios"
import { GOOGLE_API_KEY} from '@env'

import { Movie } from "../types/types"

 

const API_KEY = '7788e3316511533eb7faf40b8fe0a13a'

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

export const ImageUrl = 'https://image.tmdb.org/t/p/w500'
//search trending movies on movie database
const MovieUrl = 'https://api.themoviedb.org/3/movie/'
export async function getMovies(){
    const res = await axios.get(`${MovieUrl}now_playing?api_key=${API_KEY}&page=1`)
    
    const movieList  = res.data.results.map((item: any) => {return {id: item.id, genres: item.genre_ids, title: item.title,backDrop: item.backdrop_path, rating: item.vote_average, poster: item.poster_path, overview: item.overview}})
    return movieList
}

//search movie info by ID on movie database
export async function getMovieById(id: string){
    const res = await axios.get(`${MovieUrl}${id}?api_key=${API_KEY}`)
    const movieInfo :Movie ={
        id : res.data.id,
        title :res.data.title,
        genres: res.data.genres,
        rating: res.data.vote_average,
        overview: res.data.overview,
        poster: res.data.poster_path,
        production: res.data.production_companies,
        releaseDate: res.data.release_date
    }
    
    return movieInfo
}

// search trailer jn youtube
export async function getYoutubeTrailerUrl(movieTitle: string): Promise<string | null> {
  try {
    const response = await axios.get(YOUTUBE_SEARCH_URL, {
      params: {
        part: "snippet",
        q: `${movieTitle} official trailer`,
        key: GOOGLE_API_KEY,
        maxResults: 1,
        type: "video",
        videoEmbeddable: "true",
      },
    });

    const video = response.data.items[0];
    
    
    //return video.id.videoId

    if (video) {
      return `https://www.youtube.com/watch?v=${video.id.videoId}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching YouTube trailer:", error);
    return null;
  }
}