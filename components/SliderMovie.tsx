import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

import { Movie } from "../types/types";
import { ImageUrl } from "../service/api";

type Props = {
    movie: Movie;
    index: number;
    scrollX: Animated.SharedValue<number>; 
    onPress: (id: number)=> void
};
const {width, height} = Dimensions.get('window')
const    ITEM_SIZE = width*0.72 
const SPACER_SIZE = (width- ITEM_SIZE) / 2
export default function SliderMovie({ movie, index, scrollX, onPress }:Props){
    
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

    <Pressable onPress={()=>onPress(+movie.id)} style={({pressed})=>[styles.imageWrapper, pressed && styles.pressed]}>
        <Image style={styles.image} source={{uri: `${ImageUrl}${movie.poster}`}}/>
        <Text style={styles.titleText}>{movie.title}</Text>
        <Text>{movie.rating}</Text>
        <View style={styles.ratingContainer}>
    
        
            </View>
    </Pressable>
    </Animated.View>
}

const styles = StyleSheet.create({
    wrapper: {width: ITEM_SIZE,
        padding: 15,
        
        overflow: 'hidden',
        
    },
    pressed: {
       
        opacity: 0.6,
       
    },
    imageWrapper: {
         padding: 20,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 20,
        marginHorizontal: 'auto'

    },
    image: {
        height: 250,
        width: 200,
        borderRadius: 20
    },
    titleText: {
      fontSize: 18,
      fontWeight: '700'
    },
    ratingContainer: {
    
  }
})