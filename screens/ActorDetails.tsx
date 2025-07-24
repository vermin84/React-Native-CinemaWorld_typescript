import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActorDetails({route}: any){
    const id = route.params.actorId
    console.log(id)
return <SafeAreaView>
    <Text>{id}</Text>
</SafeAreaView>
}