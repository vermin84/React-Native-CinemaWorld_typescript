import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from 'react-native-webview';
import YoutubePlayer from "react-native-youtube-iframe";


import {  ImageUrl } from "../service/api";
import YoutubeVideo from "../components/YoutubeVideo";
import MovieCast from "../components/MovieCast";
import SimilarMoviesList from "../components/SimilarMoviesList";
import { useSimilarMovies } from "../useHooks/useSimilarMovies";
import { useMovieData } from "../useHooks/useMovieData";
import { useMovieCast } from "../useHooks/useMovieCast";
import { FavoriteContext } from "../store/FavoriteContext";
import AddFavoriteButton from "../components/AddFavorite";


const {width, height} = Dimensions.get('window')
const IMAGE_WIDTH = width * 0.8
const ITEM_WIDTH = 170
export default function MovieDetails({route, navigation}: any){
    const scrollViewRef = useRef<ScrollView>(null);
    const id = route.params.id
    
    const ctx = useContext(FavoriteContext)

    
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
    
    const {data: cast, isLoading: isCastLoading} = useMovieCast(id)
    const {data: movieData, isLoading: isMovieLoading}= useMovieData(id)
    const {data: similarMovies, isLoading: isSimilarLoading} = useSimilarMovies(id)
    const isFavorite = !!ctx?.favorites.includes(id)
    useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [id]);
    
    const actorDetailsHandler = useCallback((id: number) => {
  navigation.navigate('ActorDetails', {id });
}, [navigation]);
const similarMovieHandler = useCallback((id: number) => {
  navigation.navigate('MovieDetails', {id});
}, [navigation]);
   


    
    
  /*  useEffect(()=>{
        async function fetchTrailer() {
            if (!movieData?.title) return
            const url = await getYoutubeTrailerUrl(movieData.title);
            
    setTrailerUrl(url || null); // сохраняешь в стейт
  }
  fetchTrailer();

    }, [movieData])*/

    
   function addToFavoriteHandler(id: number){
        
        ctx?.favoriteToggler(id)
   }
   
   return <SafeAreaView style={styles.wrapper}>
        <ScrollView ref={scrollViewRef}
        keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {movieData &&<View>

                        <Text style={styles.title}>{movieData.title}</Text>
                    <View style={styles.posterWrapper}>
                        <AddFavoriteButton onPress={()=>addToFavoriteHandler(id)} isFavorite={isFavorite}/>
                        <Image style={styles.posterImage} source={{uri: `${ImageUrl}${movieData.poster}`}}/>
                    </View>

                
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
    posterWrapper: {
        position: 'relative',
  width: IMAGE_WIDTH,
  aspectRatio: 1 / 1.3,
  alignSelf: 'center',
    },
    posterImage: {  
        width: '100%',
        height: '100%',
        borderRadius: 20,
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