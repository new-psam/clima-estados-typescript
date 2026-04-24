import React, { useEffect, useState } from "react";
import { WeatherData } from "@/types/weather";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { View, ActivityIndicator } from "react-native";

// Importações dos componentes de tela (coloque no topo do arquivo)
import ListScreen from "@/screens/ListScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import LoginScreen from "@/screens/LoginScreen";


// Tipagem das Rotas
export type RootStackParamList = {
    Login: undefined; // Rota de Login (sem parâmetros)
    List: undefined;
    Details: { cityData: WeatherData };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // listener que observa se o usuário logou ou deslogou (você pode usar isso para redirecionar para a tela de login ou lista)
    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (userState) => {
            setUser(userState);
            if (initializing) setInitializing(false);
        });
        return subscriber; // remove o listener quando o componente for desmontado
    }, []);

    //Enquanto o Firebase verifica o login, mostra um carregamento
    if (initializing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#1e88e5" />
            </View>
        );
    }
        
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen name="List" component={ListScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </>
            ) : (
                //Fluxo não logado
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
            
        </Stack.Navigator>
    );
}
