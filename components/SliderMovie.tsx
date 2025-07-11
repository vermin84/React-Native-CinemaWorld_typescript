import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { Movie } from "../types/types";
import { ImageUrl } from "../service/api";


export default function SliderMovie({ movie }: { movie: Movie }){
    
    return <Pressable style={({pressed})=>[styles.wrapper, pressed && styles.pressed]}>
        <Image style={styles.image} source={{uri: `${ImageUrl}${movie.poster}`}}/>
        <Text>{movie.title}</Text>
        <Text>{movie.rating}</Text>
        <View style={styles.ratingContainer}>
       
        
            </View>
    </Pressable>
}

const styles = StyleSheet.create({
    wrapper: {},
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