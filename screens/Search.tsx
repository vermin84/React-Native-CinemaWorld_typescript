import {  useCallback, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import debounce from 'lodash.debounce';

import { useQuerySearch } from "../useHooks/useQuerySearch";
import { Movie } from "../types/types";

export default function Search(){
    const [query, setQuery]= useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [searchResult, setSearchResult] = useState<Movie[]>([])

    const debouncedSetQuery = useCallback(
    debounce((text: string) => {
      setDebouncedQuery(text);
    }, 500), // 500 мс — настраиваемо
    []
  );
    function onChangeText(text: string) {
    setQuery(text);
    debouncedSetQuery(text);
  }
   const { data: movies, isLoading, isError } = useQuerySearch(debouncedQuery);
    
    function onSubmitHandler(){
        if(query&& movies){
            setSearchResult(movies)
            setQuery('')

        }
    }

    console.log(movies?.length)
    return <SafeAreaView>
        <View>
            <TextInput value={query} blurOnSubmit={true} onSubmitEditing={()=>onSubmitHandler()} onChangeText={onChangeText} placeholder="Search movie..."/>
        </View>
        <Text>Search</Text>
    </SafeAreaView>
}