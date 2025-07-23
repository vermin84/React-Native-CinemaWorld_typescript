import { BlurView } from "expo-blur";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width } = Dimensions.get('window')
export default function CustomBottomTabBar(){
    const insets = useSafeAreaInsets()
    return <View style={[styles.tabBarWrapper, { bottom: insets.bottom + 20 }]}>
      <BlurView
        intensity={75} // Интенсивность размытия (от 0 до 100)
        tint="light" // Оттенок размытия (light, dark, default)
        style={styles.blurContainer}
      >
        <View style={styles.content}>
          
          <Text style={styles.tabItemText}>Home</Text>
          <Text style={styles.tabItemText}>Search</Text>
          <Text style={styles.tabItemText}>Favorites</Text>
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
    paddingHorizontal: 20, 
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
