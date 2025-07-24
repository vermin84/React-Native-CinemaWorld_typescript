import { Image, Pressable, StyleSheet, Text } from "react-native";

import { MovieCredit } from "../types/types";
import { ImageUrlsmall } from "../service/api";

interface MoviePrewievProps {
  movieCredit: MovieCredit;
}

export default  function MoviePrewiev({movieCredit} : MoviePrewievProps){
        return <Pressable>
            <Text>{movieCredit.title}</Text>
            <Image style={styles.image} source={{uri: `${ImageUrlsmall}${movieCredit.poster_path}`}}/>
            <Text>{movieCredit.character}</Text>
        </Pressable>
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150
    }
})