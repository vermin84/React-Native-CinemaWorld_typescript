import { Image, Pressable, StyleSheet, Text } from "react-native";

import { Movie } from "../types/types";
import { ImageUrlsmall } from "../service/api";

interface MovieInfo{
    movie: Movie,
    onPress: (id: number)=>void,
    
}
export default function MovieInfo({movie, onPress}: MovieInfo){

    return<Pressable style={({pressed})=>[styles.wrapper, pressed && styles.pressed]} onPress={()=>onPress(+movie.id)}>
        <Text numberOfLines={1} ellipsizeMode="tail">{movie.title}</Text>
        <Image style={styles.image} source={{uri:`${ImageUrlsmall}${movie.poster}`}}/>
        <Text>Rating: {movie.rating?.toFixed(1)}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    wrapper: {
        width:150,
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 8,
        alignItems: 'center',
        gap: 5
    },
    pressed: {},
    image: {
        width: 100,
        height: 100,
        borderRadius: 8
    }
})