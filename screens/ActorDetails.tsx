import { useCallback, useContext } from "react";
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import MoviePrewiev from "../components/MoviePrewiev";
import { useGetActorInfo } from "../useHooks/useGetActorInfo";
import { useActorCredits } from "../useHooks/useActorCtedits";
import AddFavoriteButton from "../components/AddFavorite";
import { FavoriteContext } from "../store/FavoriteContext";


const {width, height} = Dimensions.get('window')
const IMAGE_WIDTH = width * 0.8

export default function ActorDetails({route, navigation}: any){
   const ctx = useContext(FavoriteContext)
   const id = route.params.id
   
   const isFavorite = !!ctx?.favoriteActors.includes(id)
    const {data: actorInfo,isLoading: isInfoLoading} = useGetActorInfo(id)
    const {data: actorsFilms, isLoading: isCreditsLoading} = useActorCredits(id)
     const navigateHandler = useCallback((id: number) => {
      navigation.navigate('MovieDetails', {id});
    }, [navigation]);

   function addToFavoriteHandler(id: number){
        
        ctx?.favoriteActorToggler(id)
   }
   

     const renderItem = useCallback(({item, index}: any)=><MoviePrewiev movieCredit={item} onPress={navigateHandler}/>,[navigateHandler])
     
return <SafeAreaView>
    
    {actorInfo && <ScrollView style={styles.wrapper}>
            <Text style={styles.actirTitle}>{actorInfo.name}</Text>
            
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{uri: actorInfo.photo}}/>
                <AddFavoriteButton isFavorite={isFavorite} onPress={()=>addToFavoriteHandler(id)}/>
            </View>
            
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
    imageWrapper: {
        position: 'relative',
  width: IMAGE_WIDTH,
  aspectRatio: 1 / 1.3,
  alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        elevation: 5
    },
    biography: {
        fontSize: 16,
        paddingVertical: 5
    }
})