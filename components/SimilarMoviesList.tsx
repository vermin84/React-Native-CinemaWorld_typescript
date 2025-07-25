import { useCallback } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";

import { Movie } from "../types/types";
import MovieInfo from "./MovieInfo";
interface SimilarMovieProps {
    similarMovies: Movie[],
    onPress: (id: number)=>void
}
const {width, height} = Dimensions.get('window')
const IMAGE_WIDTH = width * 0.8
const ITEM_WIDTH = 170

export default function SimilarMoviesList({similarMovies, onPress,}: SimilarMovieProps){

const renderSimilarItem = useCallback(({item, index}: any)=><MovieInfo movie={item}  onPress={onPress}/>, [onPress])
return <View >
            <FlatList showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingBottom: 15}}  getItemLayout={(cast, index) => (
    { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
  )} initialNumToRender={3}maxToRenderPerBatch={5} horizontal data={similarMovies} keyExtractor={(item:Movie)=>item.id
  } renderItem={renderSimilarItem}/>
            </View>
}