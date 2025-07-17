import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

import { Movie } from "../types/types";
import { ImageUrl } from "../service/api";

type Props = {
    movie: Movie;
    index: number;
    scrollX: Animated.SharedValue<number>; 
};
const {width, height} = Dimensions.get('window')
const    ITEM_SIZE = width*0.72 
const SPACER_SIZE = (width- ITEM_SIZE) / 2
export default function SliderMovie({ movie, index, scrollX }:Props){
    
    const inputRange =[
        (index-2)*ITEM_SIZE,
        (index-1)*ITEM_SIZE,
        (index)*ITEM_SIZE
    ]

    const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, 50]
    );
    return {
      transform: [{ translateY }],
    };
  });
  if(!movie.poster) return <View style={{width: SPACER_SIZE}}></View>
    return    <Animated.View style={[styles.wrapper, animatedStyle]}>

    <Pressable style={({pressed})=>[styles.wrapper, pressed && styles.pressed]}>
        <Image style={styles.image} source={{uri: `${ImageUrl}${movie.poster}`}}/>
        <Text>{movie.title}</Text>
        <Text>{movie.rating}</Text>
        <View style={styles.ratingContainer}>
       
        
            </View>
    </Pressable>
    </Animated.View>
}

const styles = StyleSheet.create({
    wrapper: {width: ITEM_SIZE,
        padding: 20
    },
    pressed: {
        opacity: 0.6
    },
    image: {
        height: 250,
        width: 200
    },
    ratingContainer: {
    alignSelf: 'flex-start', // Критически важно
    marginTop: 4,
     backgroundColor: 'red', // Для проверки видимости контейнера
        padding: 10,
  }
})