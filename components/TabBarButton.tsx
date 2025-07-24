import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated, { interpolate, interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabButton {
    name: IoniconsName;
    title: string,
    onPress: (title: string)=>void,
    color: string,
    active: string

}

const AnimatedIcons = Animated.createAnimatedComponent(Ionicons)
export default function TabBarButton({name, title, onPress,color,  active}: TabButton){
    const isFocused: boolean = active === title
    const animatedFocus = useSharedValue(isFocused ? 1 : 0);
    const animatedProps = useAnimatedProps(() => {
        const color = interpolateColor(animatedFocus.value, [0, 1], ['gray', '#673ab7']);
        
        return {
            
            color,
        } as any; 
    });
    
    
    
    const animatedIconStyle = useAnimatedStyle(() => {
        const scale = 1 + 0.3 * animatedFocus.value; // увеличиваем на 30% если активна
        const color = interpolateColor(animatedFocus.value, [0, 1], ['gray', '#673ab7']);
       
        return {
           transform: [{ scale }],
            color,
            
        };
    });
    useEffect(() => {
    animatedFocus.value = withSpring(isFocused ? 1 : 0, { damping: 12, stiffness: 150 });
  }, [isFocused, animatedFocus]);
      
      
      const animatedTextStyle = useAnimatedStyle(() => {
        
        const color = interpolateColor(animatedFocus.value, [0, 1], ['gray', '#673ab7']);
        const fontSize = interpolate(animatedFocus.value, [0,1], [14, 20])
        return {
            
          fontWeight: isFocused ? 'bold' : 'normal',
          fontSize,
          color,
        };
      });
      



    return <Pressable style={({pressed}: any)=>[styles.buttonWrapper,pressed && styles.pressed]} onPress={()=>onPress(title)}>
        <Animated.Text style={animatedIconStyle}>
        <AnimatedIcons  size={24} name={name}/>
            </Animated.Text>
           <Animated.Text style={animatedTextStyle}>
           {title}
            </Animated.Text> 
    </Pressable>
}


const styles = StyleSheet.create({
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        
    },
    pressed : {
        opacity: 0.6
    },

   
})