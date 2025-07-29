import { FlatList, Image, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import { Movie } from "../types/types";
import MovieInfo from "./MovieInfo";
import SearchFlashResult from "./SearchFlashResult";

type DataType ={
    dataList: Array<Movie>,
    onPress: (id: number)=>void
}


export default function TypingSearchList({dataList, onPress} : DataType){
    
   const renderItem: ListRenderItem<Movie> = useCallback(
  ({ item, index }) => <SearchFlashResult onPress={onPress} movie={item} />,
  [onPress]
);
/*const renderItem = useCallback(({item, index})=><Pressable style={{backgroundColor: 'red',
  padding: 20
}} onPress={()=>console.log(index)}><Text>{index}</Text></Pressable>,[])*/
    return <View style={styles.wrapper}>
        <FlatList data={dataList} keyExtractor={item=>item.id.toString()} renderItem={renderItem}/>
    </View>
}

const styles = StyleSheet.create({
    wrapper:{
        position: 'absolute',
        pointerEvents: 'box-none',
  //top: '100%',
  top: 100,
  left: '5%',
  elevation: 10,
  right: '5%',
  height: 500,            // чтобы растянуть по ширине (не зажато)
  maxHeight: 500,         // ограничение по высоте (настройте по дизайну)
  backgroundColor: 'rgba(255,255,255,1)',
  paddingHorizontal: 10,
  paddingVertical: 15,
  borderRadius: 8,
  //zIndex: 1000, 
    }
})
