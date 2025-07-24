import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import MovieDetails from "./screens/MovieDetails";
import CustomBottomTabBar from "./components/CustomBottomTabBar";
import Favorite from "./screens/Favorie";
import Search from "./screens/Search";
import ActorDetails from "./screens/ActorDetails";

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator()



function StackNavigation(){
  return <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="MovieDetails" component={MovieDetails}/>
          <Stack.Screen name="ActorDetails" component={ActorDetails}/>
        </Stack.Navigator>
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator 
        tabBar={(props) => <CustomBottomTabBar {...props } />}
        initialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="Home" component={StackNavigation}/>
          <Tabs.Screen name="Favorite" component={Favorite}/>
          <Tabs.Screen name="Search" component={Search}/>
        </Tabs.Navigator>
        {/*<Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>*/}
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
