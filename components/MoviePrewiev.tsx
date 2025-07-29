import {  Pressable, StyleSheet, Text } from "react-native";
import { Image } from 'expo-image';

import { MovieCredit } from "../types/types";
import { ImageUrlsmall } from "../service/api";

interface MoviePrewievProps {
  movieCredit: MovieCredit;
  onPress: (id: number)=> void
}

export default  function MoviePrewiev({movieCredit, onPress} : MoviePrewievProps){
        return <Pressable onPress={()=>onPress(movieCredit.id)} style={({pressed}:any)=>[styles.wrapper, pressed && styles.pressed]}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titles}>{movieCredit.title}</Text>
            <Image style={styles.image} source={{uri: `${ImageUrlsmall}${movieCredit.poster_path}`}}/>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titles}>{movieCredit.character}</Text>
        </Pressable>
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        padding:5,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: 170
    },
    pressed: {
        opacity: 0.6
    },
    image: {
        width: 150,
        height: 150,
        marginVertical: 5,
        borderRadius: 8
    },
    titles: {
        fontSize: 12,
        fontWeight: '700'
    }
})