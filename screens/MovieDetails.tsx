import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from 'react-native-webview';
import YoutubePlayer from "react-native-youtube-iframe";


import { getMovieById, getMovieCast, getSimilarMovies, getYoutubeTrailerUrl, ImageUrl } from "../service/api";
import { Actor, Movie } from "../types/types";
import YoutubeVideo from "../components/YoutubeVideo";
import ActorInfo from "../components/ActorInfo";
import MovieCast from "../components/MovieCast";
import SimilarMoviesList from "../components/SimilarMoviesList";

const {width, height} = Dimensions.get('window')
const IMAGE_WIDTH = width * 0.8
const ITEM_WIDTH = 170
export default function MovieDetails({route, navigation}: any){
    const scrollViewRef = useRef<ScrollView>(null);

    const id = route.params
    const [movieData, setMovieData] = useState<Movie>()
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    const [cast, setCast] = useState<Actor[]>()
    const [similarMovies, setSimilarMovies]= useState<Movie[]>()


    useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [id]);
    
    const actorDetailsHandler = useCallback((id: number) => {
  navigation.navigate('ActorDetails', { actorId: id });
}, [navigation]);
const similarMovieHandler = useCallback((id: number) => {
  navigation.navigate('MovieDetails', id);
}, [navigation]);
    useEffect(()=>{
        async function fetchSimilar(){
            const res = await getSimilarMovies(id)
            setSimilarMovies(res)
        }
        fetchSimilar()
    },[id])

    useEffect(()=>{
        async function GetMovie(id:string   ) {
            const res = await getMovieById(id)
           
            setMovieData(res)
        }
        GetMovie(id)
    },[id])
    useEffect(()=>{
        async function fetchCredits(){
            const res = await getMovieCast(id)
            setCast(res)
         }
         fetchCredits()
    },[id])
  /*  useEffect(()=>{
        async function fetchTrailer() {
            if (!movieData?.title) return
            const url = await getYoutubeTrailerUrl(movieData.title);
            
    setTrailerUrl(url || null); // сохраняешь в стейт
  }
  fetchTrailer();

    }, [movieData])*/

    
   
   
   return <SafeAreaView style={styles.wrapper}>
        <ScrollView ref={scrollViewRef}
        keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {movieData &&<View>

                        <Text style={styles.title}>{movieData.title}</Text>
                        <Image style={styles.posterImage} source={{uri: `${ImageUrl}${movieData.poster}`}}/>
                        <View style={styles.movieInfo}>
                            <Text>Release date: <Text>{movieData.releaseDate}</Text></Text>
                            <Text style={styles.ovirwiev}>{movieData.overview}</Text>    
                            <Text style={styles.movieRating}>Rating: {movieData.rating?.toFixed(2)}</Text>
                            <Text>Genres: {movieData.genres.map((item, index)=><Text key={item.id}>{movieData.genres.length-1>index ? item.name+', ' : item.name}</Text>)} </Text>

                        </View>
                        {trailerUrl && <YoutubeVideo videoUrl={trailerUrl}/>}
                    </View>}
          {cast && <MovieCast onPress={actorDetailsHandler} cast={cast}/>} 
            {similarMovies && <SimilarMoviesList similarMovies={similarMovies} onPress={similarMovieHandler}/>}          
        </ScrollView>
    </SafeAreaView>
}



const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        
    },
    posterImage: {  
        width: IMAGE_WIDTH,
        aspectRatio: 1 / 1.3,
        maxWidth: 300,
        borderRadius: 20,
        marginHorizontal: 'auto',
        marginVertical: 10,
        elevation: 5
        
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 15,
        fontWeight: '800'
    },
    movieInfo: {
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10
    },
    ovirwiev: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        //paddingVertical: 10
    },
    movieRating: {
        fontSize: 16,
        fontWeight: '700'
    },
    playerWrapper: {
        marginHorizontal: 5,
        marginVertical: 15,
        width: '100%',
        aspectRatio: 16 / 9
    
    }
    
})