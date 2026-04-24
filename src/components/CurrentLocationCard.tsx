import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { WeatherData } from "@/types/weather";
import { getWeather } from "@/services/api";

export default function CurrentLocationCard() {
    const [weather, setWeather] = useState<WeatherData | null> (null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            // 1 Pedir permissão para acessar a localização do usuário
            let {   status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão para acessar a localização foi negada');
                setLoading(false);
                return;
            }

            // 2 Obter a localização atual do usuário
            let location = await Location.getCurrentPositionAsync({});
            
            // 3 Pegar o nome da cidade a partir das coordenadas (reverse geocoding )
            let geocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            if (geocode.length > 0 && geocode[0].subregion) {
                const city = geocode[0].subregion; // No Brasil, subregion costuma ser o nome da cidade
                const data = await getWeather(city);
                setWeather(data);
            }
            setLoading(false);
        })();
    }, []);

    if (loading) return <ActivityIndicator size="small" color="#1e88e5" />;
    if (errorMsg) return <Text style={styles.error}>{errorMsg}</Text>;
    if (!weather) return <Text style={styles.error}>Não foi possível obter o clima para a localização atual</Text>;

    return (
        <View style={styles.card}>
            <Text style={styles.label}>📍 Sua Localização Atual</Text>
            <View style={styles.row}>
                <Text style={styles.cityName}>{weather.name}</Text>
                <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
            </View>
            <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#e3f2fd',
        padding: 20,
        margin: 15,
        borderRadius: 15,
        borderWidth: 5,
        borderColor: '#1e88e5',

    },
    label: { fontSize: 12, fontWeight: 'bold', marginBottom: 5, color: '#1e88e5' },
    row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    cityName: {fontSize: 20, fontWeight: 'bold', color: '#333'},
    temp: {fontSize: 24, color: '#1e88e5', fontWeight: '900'},
    description: {fontSize: 14, textTransform: 'capitalize', color: '#666', marginTop: 5},
    error: { padding: 20, margin: 15, borderRadius: 15, backgroundColor: '#ffebee', color: '#c62828', textAlign: 'center' },
});