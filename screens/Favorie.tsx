import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FavoriteContext } from "../store/FavoriteContext";
import { Movie } from "../types/types";
import { getMoviesById } from "../service/api";
import MovieInfo from "../components/MovieInfo";
import { useFavoriteMovies } from "../useHooks/useFavoriteMovies";

export default function Favorite({navigation}: any){
    //const [movies, setMovies] = useState<Movie[]>()
    const ctx = useContext(FavoriteContext)
    const {data: movies, isLoading: isMoviesLoading} = useFavoriteMovies(ctx?.favorites)
    

    const navigateHandler= useCallback((id: number) => {
      navigation.navigate('MovieDetails', {id});
    }, [navigation]);
    
    const renderItem: ListRenderItem<Movie> = useCallback(({item, index})=><MovieInfo movie={item} onPress={navigateHandler} />, [navigateHandler])
    return <SafeAreaView><Text>Favorite</Text>
    <View>
        <FlatList data={movies} keyExtractor={item=>item.id.toString()} renderItem={renderItem}/>
    </View>
    </SafeAreaView>
}