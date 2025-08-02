import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FavoriteContext } from "../store/FavoriteContext";
import { Actor, ActorInfo, Movie } from "../types/types";
import { getMoviesById } from "../service/api";
import MovieInfo from "../components/MovieInfo";
import { useFavoriteMovies } from "../useHooks/useFavoriteMovies";
import { useFavoriteActors } from "../useHooks/useFavoriteActors";




export default function Favorite({navigation}: any){
    
    const ctx = useContext(FavoriteContext)
    const {data: movies, isLoading: isMoviesLoading} = useFavoriteMovies(ctx?.favorites?? [])
    const {data: actors, isLoading: isActorsLoading} = useFavoriteActors(ctx?.favoriteActors?? [])

    const navigateMovieHandler= useCallback((id: number) => {
      navigation.navigate('MovieDetails', {id});
    }, [navigation]);
    const navigateActorHandler= useCallback((id: number) => {
      navigation.navigate('ActorDetails', {id});
    }, [navigation]);
    
    const renderMovieItem: ListRenderItem<Movie> = useCallback(({item, index})=><MovieInfo movie={item} onPress={navigateMovieHandler} />, [navigateMovieHandler])
    const renderActorItem: ListRenderItem<ActorInfo> = useCallback(({item, index})=><View><Text>{item.name}</Text>
  
</View> 
      , [])
    return <SafeAreaView><Text>Favorite</Text>
    {!isMoviesLoading &&<View>
        <FlatList data={movies} keyExtractor={item=>item.id.toString()} renderItem={renderMovieItem}/>
    </View>}
    {!isActorsLoading &&< View>
        <FlatList data={actors} keyExtractor={item=>item.id.toString()} renderItem={renderActorItem}/>
    </View>}
    </SafeAreaView>
}