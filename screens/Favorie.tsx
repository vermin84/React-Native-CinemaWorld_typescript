import { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FavoriteContext } from "../store/FavoriteContext";

export default function Favorite(){
    const ctx = useContext(FavoriteContext)

    return <SafeAreaView><Text>Favorite</Text></SafeAreaView>
}