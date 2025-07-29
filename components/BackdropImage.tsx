import { Dimensions, StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import { ImageUrl } from "../service/api";
import { Movie } from "../types/types";

const { width, height } = Dimensions.get("window");
const BACKDROP_HEIGHT = height * 0.6;
const ITEM_SIZE = width * 0.72;

type Props = {
  item: Movie;
  index: number;
  scrollX: Animated.SharedValue<number>;
};

export default function BackdropImage({ item, scrollX, index }: Props) {
  const animatedStyle = useAnimatedStyle(() => {
    if (!item.backDrop) return { opacity: 0 }; // Возвращаем объект!
    const opacity = interpolate(
      scrollX.value,
      [(index -1 ) * ITEM_SIZE, (index) * ITEM_SIZE, (index+1)  * ITEM_SIZE],
      [0, 1, 0],
      'clamp'
    );
    return { opacity };
  });

  if (!item.backDrop) return null;

  return (
    <Animated.Image
      key={item.id}
      source={{ uri: `${ImageUrl}${item.backDrop}` }}
      style={[StyleSheet.absoluteFillObject, styles.image, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width,
    height: BACKDROP_HEIGHT,
    resizeMode: "cover",
  },
});
