import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface IconButton {
    name: IoniconsName;
    
    onPress: ()=>void,
    color: string,
    size: number

}

export default function IconButton({onPress, name, size, color}: IconButton){
    return <Pressable onPress={onPress} style={({pressed})=>[styles.wrapper, pressed&& styles.pressed]}>
        <Ionicons onPress={onPress} size={size} name={name} color={color}/>
    </Pressable>
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pressed: {
        opacity: 0.6
    }
})