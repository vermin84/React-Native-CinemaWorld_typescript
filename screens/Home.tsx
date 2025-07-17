import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

import { getMovies } from "../service/api";
import { Movie } from "../types/types";
import SliderMovie from "../components/SliderMovie";

export default function Home() {
  const [movieList, setMovieList]= useState<Movie[]> ([])
  const [isLoading, setIsLoading] = useState(true)
  const {width, height} = Dimensions.get('window')
   const    ITEM_SIZE = width*0.72 
   const scrollX = useSharedValue(0);

const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    scrollX.value = event.contentOffset.x;
  },
});
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
        {!isLoading && <Animated.FlatList onScroll={scrollHandler} decelerationRate={0} bounces={false} snapToInterval={ITEM_SIZE}  horizontal data={movieList} keyExtractor={item=> item.id} renderItem={({item})=><SliderMovie movie={item}/>}/>}
      </View>
    </SafeAreaView>
  );
}
