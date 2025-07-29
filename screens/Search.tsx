import {  useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import debounce from 'lodash.debounce';

import { useQuerySearch } from "../useHooks/useQuerySearch";
import { Movie } from "../types/types";
import IconButton from "../components/IconButton";
import TypingSearchList from "../components/TypingSearchList";
import MovieInfo from "../components/MovieInfo";




export default function Search({navigation}: any){
    const [query, setQuery]= useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [searchResult, setSearchResult] = useState<Movie[]>([])
    
    const [isSearching, setIsSearching]= useState(false)
    const flatListRef = useRef<FlatList>(null)
        useEffect(() => {
      if(flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: false });
      }
    }, [searchResult]);
    const navigateHandler = useCallback((id: number) => {
      navigation.navigate('MovieDetails', {id})

    
    setIsSearching(false)
      setQuery('')
        setDebouncedQuery('')
    }, [navigation]);

    const debouncedSetQuery = useMemo(() => 
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
        
        {searchResult && <FlatList ref={flatListRef} numColumns={2} initialNumToRender={7}
  maxToRenderPerBatch={5}
  windowSize={5}
  removeClippedSubviews={true}  data={searchResult} keyExtractor={item=>item.id} renderItem={({item, index}: any)=><MovieInfo movie={item} onPress={navigateHandler}/>}/>}
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