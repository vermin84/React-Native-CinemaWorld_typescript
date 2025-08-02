import { Image, Pressable, StyleSheet, Text } from "react-native";

import { ActorInfo } from "../types/types";
import { ImageUrlsmall } from "../service/api";


type  FavoriteActorProps= {
    actor: ActorInfo,
    onPress: (id: number)=>void
}

export default function FavoriteActorCard({onPress, actor}: FavoriteActorProps){
    
    return <Pressable style={({pressed})=>[styles.wrapper, pressed&& styles.pressed]} onPress={()=>onPress(actor.id)}>
        <Text>{actor.name}</Text>
        <Image style={styles.image} source={{uri: `${ImageUrlsmall}${actor.profile_path}`}}/>
    </Pressable>
}

const styles = StyleSheet.create({
    wrapper : {
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
    }
})