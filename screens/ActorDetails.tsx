import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getActorInfo, getActorMovieCredits } from "../service/api";
import { ActorInfo, MovieCredit } from "../types/types";
import MoviePrewiev from "../components/MoviePrewiev";

export default function ActorDetails({route}: any){
    const [actorInfo, setActorInfo] = useState<ActorInfo>()
    const [actorsFilms, setActorsFilms] = useState<MovieCredit[]>()
    const id = route.params.actorId

    useEffect(()=>{
        async function fetchActorInfo(){
            const res = await getActorInfo(id)
            setActorInfo(res)
        }
        fetchActorInfo()
    },[id])
     useEffect(()=>{
        async function getCredits() {
            const res = await getActorMovieCredits(id)
            setActorsFilms(res)
        }
        getCredits()
     },[id])  

     console.log(actorsFilms?.[0])
return <SafeAreaView>
    
    {actorInfo && <ScrollView style={styles.wrapper}>
            <Text style={styles.actirTitle}>{actorInfo.name}</Text>
            
            
                <Image style={styles.image} source={{uri: actorInfo.photo}}/>
            
            <Text style={styles.actorDate}>{actorInfo.birthday}</Text>
            <Text style={styles.biography}>{actorInfo.biography}</Text>
            {actorsFilms && <FlatList showsHorizontalScrollIndicator={false} horizontal data={actorsFilms.slice(0,10)} keyExtractor={(film, index)=>index.toString()}
            renderItem={({item})=><MoviePrewiev movieCredit={item } />}
            />}
        </ScrollView>}
</SafeAreaView>
}


const styles= StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10
    },
    actirTitle: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 10

    },
    actorDate: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 5
    },
    image: {
        width: '70%',
        marginHorizontal: 'auto',
        resizeMode: 'cover',
        aspectRatio: 1 / 1,
        borderRadius: 20
    },
    biography: {
        fontSize: 16,
        paddingVertical: 5
    }
})