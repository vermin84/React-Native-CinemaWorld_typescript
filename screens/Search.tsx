import {  useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {searchMoviesByQuery} from "../service/api";
import { useQuerySearch } from "../useHooks/useQuerySearch";

export default function Search(){
    const [query, setQuery]= useState('')

    function queryHandler(e: string){
        setQuery(e )
        
    }
   const { data: movies, isLoading, isError } = useQuerySearch(query);
    
    console.log(movies?.length)
    return <SafeAreaView>
        <View>
            <TextInput value={query} onChangeText={queryHandler} placeholder="Search movie..."/>
        </View>
        <Text>Search</Text>
    </SafeAreaView>
}