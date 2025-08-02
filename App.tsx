import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./screens/Home";
import MovieDetails from "./screens/MovieDetails";
import CustomBottomTabBar from "./components/CustomBottomTabBar";
import Favorite from "./screens/Favorie";
import Search from "./screens/Search";
import ActorDetails from "./screens/ActorDetails";
import SearchScreenNavigator from "./screens/navigators/SearchScreenNavigator";
import HomeScreenNavigator from "./screens/navigators/HomeScreenNavigator";
import { FavoriteContext, FavoriteContextProvider } from "./store/FavoriteContext";
import FavoriteScreenNavigator from "./screens/navigators/FavoriteScreenNavigation";

const queryClient = new QueryClient();



const Tabs = createBottomTabNavigator()





export default function App() {
  return (
    <FavoriteContextProvider>

    <QueryClientProvider client={queryClient}>

    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator 
        tabBar={(props) => <CustomBottomTabBar {...props } />}
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="Home" component={HomeScreenNavigator}/>
          <Tabs.Screen name="Search" component={SearchScreenNavigator}/>
          <Tabs.Screen name="Favorite" component={FavoriteScreenNavigator}/>
        </Tabs.Navigator>
        
        
      </NavigationContainer>
    </SafeAreaProvider>
          </QueryClientProvider>
          </FavoriteContextProvider>
  );
}

const styles = StyleSheet.create({});
