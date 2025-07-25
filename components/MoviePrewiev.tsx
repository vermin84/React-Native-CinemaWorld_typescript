import { Image, Pressable, StyleSheet, Text } from "react-native";

import { MovieCredit } from "../types/types";
import { ImageUrlsmall } from "../service/api";

interface MoviePrewievProps {
  movieCredit: MovieCredit;
}

export default  function MoviePrewiev({movieCredit} : MoviePrewievProps){
        return <Pressable style={({pressed}:any)=>[styles.wrapper, pressed && styles.pressed]}>
            <Text style={styles.titles}>{movieCredit.title}</Text>
            <Image style={styles.image} source={{uri: `${ImageUrlsmall}${movieCredit.poster_path}`}}/>
            <Text style={styles.titles}>{movieCredit.character}</Text>
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
        borderRadius: 8
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