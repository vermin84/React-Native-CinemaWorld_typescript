import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { Movie } from "../types/types";
import { ImageUrl } from "../service/api";
import BackdropImage from "./BackdropImage";

const { width, height } = Dimensions.get("window");
const BACKDROP_HEIGHT = height * 0.6;
const ITEM_SIZE = width * 0.72;

type Props = {
  movies: Array<Movie>;
  scrollX: Animated.SharedValue<number>;
  
};

export default function BackdropLayer({ movies, scrollX, onScroll }: Props) {
  return (
    <View style={styles.wrapper}>
      {movies.map((item, index) => <BackdropImage key={item.id} scrollX={scrollX} item={item} index={index}/>)}
    </View>
   
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: width,
    height: BACKDROP_HEIGHT,
    top: 0,
  },
  image: {
    width,
    height: BACKDROP_HEIGHT,
    resizeMode: "cover",
  },
});


/*import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";
import Svg, { Rect } from "react-native-svg";

import { Movie } from "../types/types";
import { ImageUrl } from "../service/api";

type Props = {
  movies: Array<Movie>;
  scrollX: Animated.SharedValue<number>;
};

const { width, height } = Dimensions.get("window");
const BACKDROP_HEIGHT = height * 0.6;

export default function BackdropLayer({ movies, scrollX }: Props) {
    
  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        data={movies}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => {
          if (!item.backDrop) return null;

          return (
            <MaskedView
              style={styles.wrapper}
              maskElement={
                <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                  <Rect x="0" y="0" width={width} height={height} fill="white" />
                </Svg>
              }
            >
              <Image
                style={styles.image}
                source={{ uri: `${ImageUrl}${item.backDrop}` }}
              />
            </MaskedView>
          );
        }}
      />
    </View>
  );
}




const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: width,
        height: BACKDROP_HEIGHT,
        top: 0,
        
    },
    image: {
        width: width,
        height: BACKDROP_HEIGHT,
        resizeMode: 'cover',
        backgroundColor: 'red'
    }
})*/