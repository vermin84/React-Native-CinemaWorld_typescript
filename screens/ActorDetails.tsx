import { useCallback } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import MoviePrewiev from "../components/MoviePrewiev";
import { useGetActorInfo } from "../useHooks/useGetActorInfo";
import { useActorCredits } from "../useHooks/useActorCtedits";

export default function ActorDetails({route, navigation}: any){
   
    
    const id = route.params.actorId
    const {data: actorInfo,isLoading: isInfiLoading} = useGetActorInfo(id)
    const {data: actorsFilms, isLoading: isCreditsLoading} = useActorCredits(id)
     const navigateHandler = useCallback((id: number) => {
      navigation.navigate('MovieDetails', {id});
    }, [navigation]);

   
   

     const renderItem = useCallback(({item, index}: any)=><MoviePrewiev movieCredit={item} onPress={navigateHandler}/>,[navigateHandler])
     
return <SafeAreaView>
    
    {actorInfo && <ScrollView style={styles.wrapper}>
            <Text style={styles.actirTitle}>{actorInfo.name}</Text>
            
            
                <Image style={styles.image} source={{uri: actorInfo.photo}}/>
            
            <Text style={styles.actorDate}>{actorInfo.birthday}</Text>
            <Text style={styles.biography}>{actorInfo.biography}</Text>
            {actorsFilms && <FlatList contentContainerStyle={{paddingBottom: 15}} showsHorizontalScrollIndicator={false} horizontal data={actorsFilms.slice(0,10)} keyExtractor={(film, index)=>index.toString()}
            renderItem={renderItem}
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
        borderRadius: 20,
         elevation: 5
    },
    biography: {
        fontSize: 16,
        paddingVertical: 5
    }
})