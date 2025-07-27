
import ActorDetails from "../ActorDetails";
import Home from "../Home";
import MovieDetails from "../MovieDetails";
import { Stack } from "./stack";

export default function HomeScreenNavigator(){
  return <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="MovieDetails" component={MovieDetails}/>
          <Stack.Screen name="ActorDetails" component={ActorDetails}/>
        </Stack.Navigator>
}