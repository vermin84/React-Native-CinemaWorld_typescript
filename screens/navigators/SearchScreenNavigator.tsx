
import ActorDetails from "../ActorDetails";
import MovieDetails from "../MovieDetails";
import Search from "../Search";
import { Stack } from "./stack";

export default function SearchScreenNavigator(){
  return <Stack.Navigator initialRouteName="SearchScreen"
          screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchScreen" component={Search}/>
    <Stack.Screen name="MovieDetails" component={MovieDetails}/>
    <Stack.Screen name="ActorDetails" component={ActorDetails}/>
  </Stack.Navigator>
}