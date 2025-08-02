import axios from "axios"
import { GOOGLE_API_KEY} from '@env'

import { Actor, ActorInfo, Movie, MovieCredit } from "../types/types"

 

const API_KEY = '7788e3316511533eb7faf40b8fe0a13a'

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

export const ImageUrl = 'https://image.tmdb.org/t/p/w500'
const ActorImage = 'https://image.tmdb.org/t/p/w500'
export const ImageUrlsmall = 'https://image.tmdb.org/t/p/w185'
const filmographyURL = 'https://api.themoviedb.org/3'
//search trending movies on movie database
const MovieUrl = 'https://api.themoviedb.org/3/movie'
const SearchMovieUrl = 'https://api.themoviedb.org/3/search/movie'
export async function getMovies(){
    const res = await axios.get(`${MovieUrl}/now_playing?api_key=${API_KEY}&page=1`)
    
    const movieList  = res.data.results.map((item: any) => {return {id: item.id, genres: item.genre_ids, title: item.title,backDrop: item.backdrop_path, rating: item.vote_average, poster: item.poster_path, overview: item.overview}})
    return movieList
}

//search movie info by ID on movie database
export async function getMovieById(id: number){
    const res = await axios.get(`${MovieUrl}/${id}?api_key=${API_KEY}`)
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

 //search actors from movie by movie id 

export async function getMovieCast(movieId: number){
   try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
    return  res.data.credits.cast.slice(0, 20).map((actor:Actor) => ({
  id: actor.id,
  character: actor.character,
  name: actor.name,
  profile_path: actor.profile_path ? ImageUrlsmall + actor.profile_path : '', // пустая строка если нет фото
}));
    
  } catch (error) {
    console.error('Ошибка при получении списка актёров:', error);
    throw error;
  }
}


// search actor info by actor id

export async function getActorInfo(actorId: number): Promise<ActorInfo> {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/person/${actorId}`, {
      params: {
        api_key: API_KEY,
        //language: 'ru-RU', 
      },
    });

    const data = res.data;

    return {
      id: data.id,
      name: data.name,
      birthday: data.birthday,
      place_of_birth: data.place_of_birth,
      biography: data.biography,
      profile_path: data.profile_path,
      photo: data.profile_path ? ActorImage + data.profile_path : '',
    };
  } catch (error) {
    console.error('Ошибка при получении информации об актёре:', error);
    throw error;
  }
}
//search filmography

export async function getActorMovieCredits(personId: number): Promise<MovieCredit[]> {
  try {
    const response = await axios.get(`${filmographyURL}/person/${personId}/movie_credits`, {
      params: {
        api_key: API_KEY,
        //language: 'ru-RU',
      },
    });
    
    return response.data.cast;
  } catch (error) {
    console.error('Ошибка при получении фильмографии актёра:', error);
    throw error;
  }
}

//search similar movies
export async function getSimilarMovies(movieId: number){
  try{
    const res = await axios.get(`${MovieUrl}/${movieId}/similar?api_key=${API_KEY}`)
     return res.data.results.map((movie: any): Movie => ({
      id: movie.id,
      title: movie.title,
      genres: [],              
      rating: movie.vote_average,
      overview: movie.overview,
      poster: movie.poster_path,
      production: [],          
      releaseDate: movie.release_date,
    }));

  } catch(error){
    console.error('Ошибка при получении фильмографии актёра:', error);
    throw error;
  }
}


//search movie by query

export  async function searchMoviesByQuery(query: string){
  const res = await axios.get(`${SearchMovieUrl}`,
    {
      params: {
        api_key: API_KEY,
        query: query,
        //language: 'en-US', // или 'uk-UA', если нужно
        page: 1,
        include_adult: false,
      }
    })
  return res.data.results.map((movie: any): Movie => ({
      id: movie.id,
      title: movie.title,
      genres: [],              
      rating: movie.vote_average,
      overview: movie.overview,
      poster: movie.poster_path,
      production: [],          
      releaseDate: movie.release_date,
    }))
}



//search movies by id for favorite list
export async function getMoviesById(movies:number[]):Promise<Movie[]>{

  const promises = movies.map(async (movieId) => {
    const data = await getMovieById(movieId);
    return data;
  });
  const results = await Promise.all(promises);
  const filtered = results.filter((data): data is Movie => !!data); // фильтр для исключения undefined/null
  
  return filtered;
}


//favorite actors info

export async function getFavoriteActorsByIds(actors: number[]):Promise<ActorInfo[]>{
  
  const promises = actors.map(async (actorId) => {
    const data = await getActorInfo(actorId);
    return data;
  });
  const results = await Promise.all(promises);
  const filtered = results.filter((data): data is ActorInfo => !!data); // фильтр для исключения undefined/null
  
  return filtered;
}