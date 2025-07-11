import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getMovies } from "../service/api";
import { Movie } from "../types/types";
import SliderMovie from "../components/SliderMovie";

export default function Home() {
  const [movieList, setMovieList]= useState<Movie[]> ([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
          async function fetchData() {
        setIsLoading(true)
        const res = await getMovies()
      
        setMovieList(res)
        setIsLoading(false)
     } 
fetchData()
  },[])
  return (
    <SafeAreaView>
      <View>
        <Text>HomeScreen</Text>
        {!isLoading && <FlatList data={movieList} keyExtractor={item=> item.id} renderItem={({item})=><SliderMovie movie={item}/>}/>}
      </View>
    </SafeAreaView>
  );
}
