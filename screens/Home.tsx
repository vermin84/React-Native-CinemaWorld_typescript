import React, { useCallback } from "react";
import { Dimensions, StyleSheet,  View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";



import SliderMovie from "../components/SliderMovie";
import BackdropLayer from "../components/BackdropLayer";
import { useNowPlayingMovies } from "../useHooks/useNowPlayingMovies";

export default function Home({navigation}: any) {
  
  const {data: movieListRaw=[], isLoading} = useNowPlayingMovies()

  const movieList = [{ id: 'left-spacer' }, ...movieListRaw, { id: 'right-spacer' }];
  
  const {width} = Dimensions.get('window')
   const    ITEM_SIZE = width*0.72 
   const scrollX = useSharedValue(0);

const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    scrollX.value = event.contentOffset.x;
    
  },
});
 
  const navigateHandler = useCallback((id: number) => {
  navigation.navigate('MovieDetails', {id});
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
        {!isLoading && <BackdropLayer movies={movieListRaw}  scrollX={scrollX}/>}
        {!isLoading && <Animated.FlatList initialNumToRender={3}maxToRenderPerBatch={5} 
        showsHorizontalScrollIndicator={false} style={styles.animatedFlatlist} 
        overScrollMode="never"
        scrollEventThrottle={16} onScroll={scrollHandler} decelerationRate={0} 
        bounces={false} snapToInterval={ITEM_SIZE}  horizontal data={movieList} 
        keyExtractor={item=> item.id.toString()} renderItem={renderItem}/>}
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