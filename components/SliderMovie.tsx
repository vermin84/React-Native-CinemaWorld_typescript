import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { memo } from "react";

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
 function SliderMovie({ movie, index, scrollX, onPress }:Props){
    
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

      
    <Pressable onPress={()=>onPress(+movie.id)} style={({pressed})=>[styles.shadow, pressed && styles.pressed]}>

        <Image style={styles.image} source={{uri: `${ImageUrl}${movie.poster}`}}/>
        <Text style={styles.titleText}>{movie.title}</Text>
        <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{movie.rating?.toFixed(1)}</Text>
      </View>
        
        
            
    </Pressable>
            
    </Animated.View>
    
}


export default memo(SliderMovie)
const styles = StyleSheet.create({
    wrapper: {width: ITEM_SIZE,
        padding: 15,
        
    },
    

    pressed: {
       
        opacity: 0.6,
       
    },
    
    shadow:{
      borderRadius: 20,
      alignItems:'center',
      justifyContent: 'center',
      
      padding:20,
       elevation: 15,
      backgroundColor: 'rgba(255,255,255,0.95)',
      
    },
    image: {
        height: 250,
        width: 200,
        borderRadius: 20

    },
    titleText: {
      fontSize: 18,
      fontWeight: '700',
      marginVertical: 10,
      textAlign: 'center'
    },
    ratingContainer: {
      alignItems:'center',
      justifyContent: 'center'
    
  },
  rating: {
    fontSize:20,
    fontWeight: '700',
    textAlign: 'center'
  }
})