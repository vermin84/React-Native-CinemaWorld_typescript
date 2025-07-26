import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search(){
    const [query, setQuery]= useState('')

    function queryHandler(e: string){
        setQuery(e )
        console.log(query)
    }
    return <SafeAreaView>
        <View>
            <TextInput value={query} onChangeText={queryHandler} placeholder="Search movie..."/>
        </View>
        <Text>Search</Text>
    </SafeAreaView>
}