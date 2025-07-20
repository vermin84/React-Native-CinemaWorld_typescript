import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import { getMovieById, ImageUrl } from "../service/api";
import { Movie } from "../types/types";

const {width, height} = Dimensions.get('window')
const IMAGE_WIDTH = width * 0.8
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
    return <SafeAreaView style={styles.wrapper}>
        <ScrollView>

        {movieData &&<View>

                        <Text style={styles.title}>{movieData.title}</Text>
                        <Image style={styles.posterImage} source={{uri: `${ImageUrl}${movieData.poster}`}}/>
                        <View style={styles.movieInfo}>
                            <Text>Release date: <Text>{movieData.releaseDate}</Text></Text>
                            <Text style={styles.ovirwiev}>{movieData.overview}</Text>    
                            <Text>Rating: {movieData.rating?.toFixed(2)}</Text>
                            <Text>Genres: {movieData.genres.map((item, index)=><Text key={item.id}>{movieData.genres.length-1>index ? item.name+', ' : item.name}</Text>)} </Text>

                        </View>
                    </View>}
        </ScrollView>
    </SafeAreaView>
}



const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10
        
    },
    posterImage: {  
        width: IMAGE_WIDTH,
        aspectRatio: 1 / 1,
        maxWidth: 300,
        borderRadius: 20,
        marginHorizontal: 'auto',
        marginVertical: 10
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 15,
        fontWeight: '800'
    },
    movieInfo: {
        alignItems: 'center'
    },
    ovirwiev: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 10
    }
    
})