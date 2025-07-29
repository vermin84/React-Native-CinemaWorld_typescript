import {  useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import debounce from 'lodash.debounce';

import { useQuerySearch } from "../useHooks/useQuerySearch";
import { Movie } from "../types/types";
import IconButton from "../components/IconButton";
import TypingSearchList from "../components/TypingSearchList";
import MovieInfo from "../components/MovieInfo";
import { searchMoviesByQuery } from "../service/api";



export default function Search({navigation}: any){
    const [query, setQuery]= useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [searchResult, setSearchResult] = useState<Movie[]>([])
    //const [movies, setMovies] =useState<Movie[]>([])
    const [isSearching, setIsSearching]= useState(false)
    const navigateHandler = useCallback((id: number) => {
      navigation.navigate('MovieDetails', id)
    
    setIsSearching(false)
      setQuery('')
        setDebouncedQuery('')
    }, [navigation]);
/*useEffect(()=>{
    async function fetchData() {
        const res = await searchMoviesByQuery(query)
        setMovies(res)
    }
    fetchData()
},[query])*/
    const debouncedSetQuery = useCallback(
    debounce((text: string) => {
      setDebouncedQuery(text);
    }, 500), // 500 мс — настраиваемо
    []
  );


    function onChangeText(text: string) {
    setIsSearching(true)    
    setQuery(text);
    debouncedSetQuery(text);
  }
   const { data: movies, isLoading, isError } = useQuerySearch(debouncedQuery);
    
    function onSubmitHandler(){
        if(query&& movies){
            setSearchResult(movies)
            setQuery('')
            setDebouncedQuery('')
            setIsSearching(false)
        }
    }

    
    return <SafeAreaView style={styles.screenWrapper}>
        <View style={styles.inputWrapper} >
            <TextInput style={styles.input} value={query} blurOnSubmit={true} onSubmitEditing={()=>onSubmitHandler()} onChangeText={onChangeText} placeholder="Search movie..."/>
           <IconButton size={34} onPress={onSubmitHandler} name="search" color="#000"/>
        </View>
        
        {searchResult && <FlatList initialNumToRender={5}
  maxToRenderPerBatch={2}
  windowSize={2}
  removeClippedSubviews={true}  horizontal data={searchResult} keyExtractor={item=>item.id} renderItem={({item, index}: any)=><MovieInfo movie={item} onPress={navigateHandler}/>}/>}
        {isSearching && movies
         &&<TypingSearchList onPress={navigateHandler} dataList={movies}/>}
    </SafeAreaView>
}

const styles=StyleSheet.create({
    screenWrapper: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flex: 1,
        
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    input: {
        paddingHorizontal: 12,
        paddingVertical: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        width: 150
    }
})