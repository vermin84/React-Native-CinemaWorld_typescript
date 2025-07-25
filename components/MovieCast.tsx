import { Dimensions, FlatList, View } from "react-native";
import { useCallback } from "react";

import { Actor } from "../types/types";
import ActorInfo from "./ActorInfo";

const {width, height} = Dimensions.get('window')
const IMAGE_WIDTH = width * 0.8
const ITEM_WIDTH = 170
interface MovieCastProps {
    cast: Actor[],
    onPress: (id: number)=>void
}


export default function MovieCast({cast, onPress}: MovieCastProps){
    const renderItem = useCallback(({item, index}: any)=><ActorInfo onPress={onPress} actorData={item}></ActorInfo>,[onPress])
    return <View >
                <FlatList showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingBottom: 15}}  getItemLayout={(cast, index) => (
        { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
      )} initialNumToRender={3}maxToRenderPerBatch={5} horizontal data={cast} keyExtractor={(item:Actor)=>item.id.toString()
      } renderItem={renderItem}/>
                </View>
}