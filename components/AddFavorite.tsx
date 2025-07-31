import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { Movie } from "../types/types";
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];


interface FavoriteButton {
    name?: IoniconsName;
    isFavorite : boolean,
    onPress: (movieData: any)=>void,
    

}
export default function AddFavoriteButton({onPress, isFavorite}: FavoriteButton){
    return  <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Ionicons size={32} name={isFavorite ?'heart' : 'heart-outline'} color={'red'}/>
    </Pressable>
}

const styles = StyleSheet.create({
    button: {
        
        
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    
    borderRadius:30,
    position: 'absolute',
    top: "8%",
    right: '8%',
        zIndex:10
    },
    pressed: {
        opacity: 0.6
    }
})