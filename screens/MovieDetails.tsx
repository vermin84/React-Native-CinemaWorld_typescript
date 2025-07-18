import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getMovieById, ImageUrl } from "../service/api";
import { Movie } from "../types/types";

export default function MovieDetails({route}: any){
    const id = route.params
    const [movieData, setMovieData] = useState<Movie>()

    useEffect(()=>{
        async function GetMovie(id:string   ) {
            const res = await getMovieById(id)
            console.log(res)
            setMovieData(res)
        }
        GetMovie(id)
    },[id])
    return <SafeAreaView>
        {movieData &&<View>

        <Text>{movieData.title}</Text>
        <Image style={styles.posterImage} source={{uri: `${ImageUrl}${movieData.poster}`}}/>
        <Text>{movieData.overview}</Text>    
        </View>}
    </SafeAreaView>
}



const styles = StyleSheet.create({
    posterImage: {width: 200,
        height: 200
    },
    
})