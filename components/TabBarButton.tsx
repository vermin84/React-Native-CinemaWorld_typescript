import { Pressable, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabButton {
    name: IoniconsName;
    title: string,
    onPress: (title: string)=>void,
    color: string,
    size: number

}
export default function TabBarButton({name, title, onPress,color,  size}: TabButton){
    return <Pressable onPress={()=>onPress(title)}>
        <Ionicons size={size} name={name} color={color}/>
        <Text>{title}</Text>
    </Pressable>
}