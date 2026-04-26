
import React, { useState, useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { WeatherData } from "@/types/weather";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWeather } from "@/services/api";
import { deleteFavorityCity, updateFavorityCity } from "@/services/cityService";


// Definição do tipo da rota para o TypeScript
type RootStackParamList = {
    Details: { 
        cityName: string, 
        cityId: string,
        comment: string,
        photoUrl: string,
    }; // Tela de detalhes recebe um objeto com os dados do clima
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
    const navigation = useNavigation()
    const route = useRoute<DetailsScreenRouteProp>(); // Hook para acessar os parâmetros da rota
    const { cityName, cityId, comment, photoUrl } = route.params;

    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadWeather() {
            try {
                const data = await getWeather(cityName);
                setWeather(data);
            } catch (error) {
                Alert.alert("Erro", "Não foi possível carregar o clima.");
            } finally {
                setLoading(false);
            }
        }
        loadWeather();
    }, [cityName]);

    
    const handleDelete = () => {
        Alert.alert(
            "Excluir Cidade",
            `Tem certeza que deseja remover ${cityName} do seu diário?`,
            [
                {text: "Cancelar", style: "cancel"},
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () =>{
                        try {
                            // O ID da cidade precisa vir da ListScreen via rota!
                            //const { cityId } = route.params;
                            await deleteFavorityCity(cityId);
                            navigation.goBack()
                        } catch (error) {
                            Alert.alert("Erro", "Não foi poosível excluir.");
                        }
                    }
                }
            ]
        )
    }
    
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#1e88e5" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title={`Detalhes de ${weather?.name || cityName}`} showBackButton={true} />
            {/* Aqui você pode renderizar os detalhes do clima usando os dados de cityData */}

            <View style={styles.content}>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    
                    {/* Card principal de Temperatura Atual */ }
                    <View style={styles.mainCard}>
                        <Text style={styles.cityName}>{weather?.name || cityName}</Text>
                        <Text style={styles.mainTemp}>{Math.round(weather?.main.temp ?? 0)}°C</Text>
                        <Text style={styles.description}>{weather?.weather[0].description}</Text>
                    </View>

                    {/* Grade de Informações Técnicas */ }
                    <View style={styles.grid}>

                        <View style={styles.infoBox}>
                            <Feather name="droplet" size={24} color="#1e88e5"/>
                            <Text style={styles.label}>Umidade</Text>
                            <Text style={styles.value}>{weather?.main.humidity ?? 0}%</Text>
                        </View>

                        <View style={styles.infoBox}>
                            <Feather name="wind" size={24} color="#1e88e5"/>
                            <Text style={styles.label}>Vento</Text>
                            <Text style={styles.value}>{weather?.wind.speed ?? 0} m/s</Text>  
                        </View>

                        <View style={styles.infoBox}>
                            <Ionicons name="speedometer-outline" size={24} color="#1e88e5"/>
                            <Text style={styles.label}>Pressão</Text>
                            <Text style={styles.value}>{weather?.main.pressure ?? 0} hPa</Text>
                        </View>

                        <View style={styles.infoBox}>
                            <Feather name="thermometer" size={24} color="#1e88e5"/>
                            <Text style={styles.label}>Sensação Térmica</Text>
                            <Text style={styles.value}>{Math.round(weather?.main.feels_like ?? 0)}°C</Text>
                        </View>

                        

                    </View>
                </ScrollView>

                {/* BOTÃO DE DELETAR FLUTUANTE (FAB) */}
                <TouchableOpacity style={styles.deleteFab} onPress={handleDelete}>
                    <Feather name="trash-2" size={26} color="#fff" />
                </TouchableOpacity>
            </View>
            <Footer />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
   container: { flex: 1,backgroundColor: '#f5f5f5',},
   scrollContent: { padding: 20 }, // Adicione seus estilos aqui
   mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
 
   },
   content: {flex:1},
    cityName: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    mainTemp: { fontSize: 64, fontWeight: 'bold', color: '#1e88e5', marginVertical: 10 },
    description: { fontSize: 18, color: '#666', textTransform: 'capitalize', letterSpacing: 1.2 },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    infoBox: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    label: {fontSize: 12, color: '#888', marginTop: 10, textTransform: 'uppercase', letterSpacing: 1 },
    value: {fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 5 },
    deleteFab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#ff4444', // Vermelho para indicar perigo/exclusão
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    infoBoxFull: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        marginTop: 10
    },
});