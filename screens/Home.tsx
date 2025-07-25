import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";


import { getMovies } from "../service/api";
import { Movie } from "../types/types";
import SliderMovie from "../components/SliderMovie";
import BackdropLayer from "../components/BackdropLayer";

export default function Home({navigation}: any) {
  const [movieList, setMovieList]= useState<Movie[]> ([])
  
  const [isLoading, setIsLoading] = useState(true)
  const {width} = Dimensions.get('window')
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
        
        setMovieList([{id: 'left-spacer'},...res, {id: 'right-spacer'}])
        setIsLoading(false)
     } 
fetchData()
  },[])
  const navigateHandler = useCallback((id: number) => {
  navigation.navigate('MovieDetails', id);
}, [navigation]);
  const renderItem = useCallback(({ item, index }: any) => (
  <SliderMovie
    movie={item}
    index={index}
    scrollX={scrollX}
    onPress={navigateHandler}
  />
), [scrollX, navigateHandler]);
  return (
    <SafeAreaView  style={styles.wrapper}>
      <View style={styles.wrapper}>
        {!isLoading && <BackdropLayer movies={movieList}  scrollX={scrollX}/>}
        {!isLoading && <Animated.FlatList initialNumToRender={3}maxToRenderPerBatch={5} 
        showsHorizontalScrollIndicator={false} style={styles.animatedFlatlist} 
        overScrollMode="never"
        scrollEventThrottle={16} onScroll={scrollHandler} decelerationRate={0} 
        bounces={false} snapToInterval={ITEM_SIZE}  horizontal data={movieList} 
        keyExtractor={item=> item.id} renderItem={renderItem}/>}
      </View>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    
  },
  animatedFlatlist: {
    paddingTop: '40%'
  }
})