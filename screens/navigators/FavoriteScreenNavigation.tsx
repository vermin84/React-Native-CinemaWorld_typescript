
import ActorDetails from "../ActorDetails";
import Favorite from "../Favorie";
import MovieDetails from "../MovieDetails";
import Search from "../Search";
import { Stack } from "./stack";

export default function FavoriteScreenNavigator(){
  return <Stack.Navigator initialRouteName="FavoriteScreen"
          screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoriteScreen" component={Favorite}/>
    <Stack.Screen name="MovieDetails" component={MovieDetails}/>
    <Stack.Screen name="ActorDetails" component={ActorDetails}/>
  </Stack.Navigator>
}