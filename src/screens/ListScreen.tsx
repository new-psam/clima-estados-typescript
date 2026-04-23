import React, { useState } from "react";
import { 
  View, 
  FlatList, 
  StyleSheet,   
  StatusBar,
  SafeAreaView,
  Alert 
} from 'react-native';
//import { SafeAreaView } from "react-native-safe-area-context";
//import { NativeStackNavigationProp } from "@react-navigation/native-stack";
//import { useNavigation } from "@react-navigation/native";
import { WeatherData } from "@/types/weather";
import { CITIES_SP } from "@/data/cities";
import CityCard from "@/components/CityCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



export default function ListScreen() {
    
    const [refreshing, setRefreshing] = useState(false);

    // Função para o Pull-to-Refresh (conforme seu PDF)
    const onRefresh = () => {
        setRefreshing(true);
        // Simula um tempo de atualização (pode ser substituído por lógica real de atualização)
        setTimeout(() => {
            setRefreshing(false);
            Alert
        }, 2000);   
    };

    const handlePressCity = (data: WeatherData) => {
        Alert.alert(
            `Detalhes de ${data.name}`,
            `Temperatura: ${Math.round(data.main.temp)}°C\n` +
            `Descrição: ${data.weather[0].description}\n` +
            `Umidade: ${data.main.humidity}%\n` +
            `Vento: ${data.wind.speed} m/s`
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1e88e5"/>

            <Header title="Previsão do Tempo para Cidades de SP" />

            <FlatList
                data={CITIES_SP}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CityCard city={item} onPress={handlePressCity} />
                )}

                // --- REMOVENDO AS BARRAS DE ROLAGEM ---
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}

                
                // --- Performance (Conforme seu PDF) ---
                initialNumToRender={8} // Renderiza 8 itens logo de cara
                maxToRenderPerBatch={5} // Renderiza no máximo 5 itens por batch (rolagem)
                windowSize={5} // Mantém 5 telas de itens renderizados (2 antes, 2 depois, + o atual)

                refreshing={refreshing}
                onRefresh={onRefresh}
                contentContainerStyle={styles.listPadding} // Espaço para o Footer ficar visível
            />

            <Footer/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listPadding: {
        paddingBottom: 20,
    },
});