import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";

import { Actor } from "../types/types";

interface ActorInfoProps {
    onPress: (id: number)=>void,
    actorData:Actor

}  

 const ActorInfo=React.memo( function ActorInfo({actorData, onPress}: ActorInfoProps){
    
    if(!actorData.profile_path) return null
    return<Pressable onPress={()=>onPress(actorData.id)} style={({pressed}: any) => [styles.wrapper, pressed && styles.pressed]}
>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{actorData.name}</Text>
        <Image style={styles.image} source={{uri: actorData.profile_path}}/>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{actorData.character}</Text>
    </Pressable>
})
export default ActorInfo

const styles = StyleSheet.create({
    wrapper: {
    width :150,
       
    paddingHorizontal: 5,
    paddingVertical: 5,
    overflow: 'hidden',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    elevation: 5,
    borderRadius: 8
    },
    pressed: {
        opacity: 0.6
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 5,
        borderRadius: 8
    },
    text: {
        textAlign: 'center',
        

    }
})