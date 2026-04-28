import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { View, ActivityIndicator } from "react-native";

// Importações dos componentes de tela (coloque no topo do arquivo)

import ListScreen from "@/screens/ListScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import LoginScreen from "@/screens/LoginScreen";
import AddCityScreen from "@/screens/AddCityScreen";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/authSlice";
import { RootState } from "@/store";


// Tipagem das Rotas
export type RootStackParamList = {
    Login: undefined; // Rota de Login (sem parâmetros)
    List: undefined;
    Details: { cityName: string; cityId: string; comment: string };
    AddCity: { cityToEdit?: any} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    const dispatch = useDispatch();
    const [initializing, setInitializing] = useState(true);
    const { user } = useSelector((state: RootState) => state.auth);

    // listener que observa se o usuário logou ou deslogou (você pode usar isso para redirecionar para a tela de login ou lista)
    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // Salva os dados básicos no redux
                dispatch(setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || 'Usuário',
                }));
            } else {
                dispatch(setUser(null));
            }
            if (initializing) setInitializing(false);
        });
        return unsubscriber;
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
                    <Stack.Screen name="AddCity" component={AddCityScreen}/>
                </>
            ) : (
                //Fluxo não logado
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
            
        </Stack.Navigator>
    );
}
