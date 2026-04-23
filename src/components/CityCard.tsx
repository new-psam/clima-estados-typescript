import React, { useEffect, useState } from "react";
import { CityItem, WeatherData } from "@/types/weather";
import { getWeather } from "@/services/api";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    city: CityItem;
    onPress: (data: WeatherData) => void;
}

export default function CityCard({ city, onPress }: Props) {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const res = await getWeather(city.name);
                if (isMounted && res) {
                    setData(res);
                }
            } catch (e) {
                console.log(`Erro ao buscar dados para ${city.name}:`, e);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => { isMounted = false; }; // Cleanup function para o isMounted
    }, [city.name]);

    if (loading) {
        return (
            <View style={[styles.card, styles.center]}>
                <ActivityIndicator color='#1e88e5'/>
            </View>
        );
    }

    if (!data) return null;

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(data)}>
            <View style={styles.info}>
                <Text style={styles.cityName}>{data.name}</Text>
                <Text style={styles.desc}>{data.weather[0].description}</Text>
            </View>

            <View style={styles.tempGroup}>
                <Text style={styles.currentTemp}>{Math.round(data.main.temp)}°C</Text>
                <View style={styles.minMaxGroup}>
                    <Text style={styles.tempMin}>↓ {Math.round(data.main.temp_min)}°C</Text>
                    <Text style={styles.tempMax}>↑ {Math.round(data.main.temp_max)}°C</Text>
                </View>
            </View>

            <Text style={styles.detailsButton}>Ver Detalhes</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 12,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    center: { height: 80, justifyContent: "center"},
    info: {flex: 1},
    cityName: { fontSize: 18, fontWeight: "bold", color: "#333" },
    desc: { fontSize: 14, color: "#666", textTransform: "capitalize" },
    tempGroup: { alignItems: "flex-end", marginRight: 15 },
    currentTemp: { fontSize: 26, fontWeight: 900, color: "#1e88e5" },
    minMaxGroup: { flexDirection: "row", gap: 5},
    tempMax: { fontSize: 12, color: "#f44336" },
    tempMin: { fontSize: 12, color: "#2196f3" },
    detailsButton: { fontSize: 10, color: "#1e88e5", fontWeight: "bold", textTransform: "uppercase"  },
});