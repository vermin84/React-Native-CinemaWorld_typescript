import axios from "axios"

import { Movie } from "../types/types"

const API_KEY = '7788e3316511533eb7faf40b8fe0a13a'

export const ImageUrl = 'https://image.tmdb.org/t/p/w500'

const MovieUrl = 'https://api.themoviedb.org/3/movie/'
export async function getMovies(){
    const res = await axios.get(`${MovieUrl}now_playing?api_key=${API_KEY}&page=1`)
    
    const movieList  = res.data.results.map((item: any) => {return {id: item.id, genres: item.genre_ids, title: item.title,backDrop: item.backdrop_path, rating: item.vote_average, poster: item.poster_path, overview: item.overview}})
    return movieList
}


export async function getMovieById(id: string){
    const res = await axios.get(`${MovieUrl}${id}?api_key=${API_KEY}`)
    const movieInfo :Movie ={
        id : res.data.id,
        title :res.data.title,
        genres: res.data.genres,
        rating: res.data.rating,
        overview: res.data.overview,
        poster: res.data.poster_path,
        production: res.data.production

    }
    console.log(res.data)
    return movieInfo
}