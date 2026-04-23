import React from "react";
import { WeatherData } from "@/types/weather";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importações dos componentes de tela (coloque no topo do arquivo)
import ListScreen from "@/screens/ListScreen";
import DetailsScreen from "@/screens/DetailsScreen";

export type RootStackParamList = {
    List: undefined;
    Details: { cityData: WeatherData };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="List" component={ListScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    );
}
