import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import searchMoviesByQuery from "../service/api";

export default function Search(){
    const [query, setQuery]= useState('')

    function queryHandler(e: string){
        setQuery(e )
        
    }
    useEffect(()=>{
        console.log(query)
        async function fetchData(){
            const res = await searchMoviesByQuery(query)
            console.log(res.length)
        }
        fetchData()
    },[query])
    
    
    return <SafeAreaView>
        <View>
            <TextInput value={query} onChangeText={queryHandler} placeholder="Search movie..."/>
        </View>
        <Text>Search</Text>
    </SafeAreaView>
}