import { BlurView } from "expo-blur";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import TabBarButton from "./TabBarButton";
const { width } = Dimensions.get('window')
export default function CustomBottomTabBar({ state, descriptors, navigation, route }){
    const insets = useSafeAreaInsets()
    const focusedRoute = state.routes[state.index]
    const nestedState = focusedRoute.state
    const isTabBarVisible = !(nestedState && nestedState.index > 0);
    function onPressHandler(path : string){
        
        
        navigation.navigate(path)
    }


    if(!isTabBarVisible){
        return null
    }
    return <View style={[styles.tabBarWrapper, { bottom: insets.bottom + 20 }]}>
        
      <BlurView
        intensity={55} // Интенсивность размытия (от 0 до 100)
        tint="light" // Оттенок размытия (light, dark, default)
        style={styles.blurContainer}
      >
        <View style={styles.content}>
          <TabBarButton name="home" size={32} onPress={onPressHandler} color="#000" title="Home"/>
          <TabBarButton name="search" size={32} onPress={onPressHandler} color="#000" title="Search"/>
          <TabBarButton name="heart" size={32} onPress={onPressHandler} color="#000" title="Favorite"/>
          
          
          
          <Text style={styles.tabItemText}>Settings</Text>
        </View>
      </BlurView>
    </View>
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    
    left: 20,
    right: 20,
    borderRadius: 30, // Чуть больше скругление для эффекта "пилюли"
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25, 
    shadowRadius: 25,    
    elevation: 15,       
    height: 70,          
    justifyContent: 'center', 
    alignItems: 'center',
  },
  blurContainer: {
    flex: 1, 
    width: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 10, 
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%', 
    
  },
  tabItemText: {
    fontSize: 16,
    color: '#333', // Темный текст для контраста
    fontWeight: '600',
  }
});
