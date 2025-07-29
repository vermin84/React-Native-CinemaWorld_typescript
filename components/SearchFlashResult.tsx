import { Pressable, StyleSheet, Text, View } from "react-native";

import { Movie, MovieCredit } from "../types/types";

interface SearchResultProps {
  movie: Movie,
  onPress: (id: number)=> void
}
export default function SearchFlashResult({movie, onPress} : SearchResultProps){
    
    return <Pressable style={({pressed}: any)=>[styles.wrapper, pressed && styles.pressed]} onPress={()=>onPress(+movie.id)}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.info}>

        <Text >{movie.releaseDate}</Text>
        <Text>Rating:{movie.rating?.toFixed(2)}</Text>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 5,
        elevation: 5,
        borderRadius: 15,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 5
    },
    pressed: {
        opacity: 0.6
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 18,
        textAlign: 'center'
    }
})