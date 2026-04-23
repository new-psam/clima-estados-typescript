import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { WeatherData } from "@/types/weather";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Definição do tipo da rota para o TypeScript
type RootStackParamList = {
    Details: { cityData: WeatherData }; // Tela de detalhes recebe um objeto com os dados do clima
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
    const route = useRoute<DetailsScreenRouteProp>(); // Hook para acessar os parâmetros da rota
    const { cityData } = route.params; // Extrai os dados do clima passados pela navegação

    return (
        <SafeAreaView style={styles.container}>
            <Header title={`Detalhes de ${cityData.name}`} showBackButton={true} />
            {/* Aqui você pode renderizar os detalhes do clima usando os dados de cityData */}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Card principal de Temperatura Atual */ }
                <View style={styles.mainCard}>
                    <Text style={styles.cityName}>{cityData.name}</Text>
                    <Text style={styles.mainTemp}>{Math.round(cityData.main.temp)}°C</Text>
                    <Text style={styles.description}>{cityData.weather[0].description}</Text>
                </View>

                {/* Grade de Informações Técnicas */ }
                <View style={styles.grid}>

                    <View style={styles.infoBox}>
                        <Feather name="droplet" size={24} color="#1e88e5"/>
                        <Text style={styles.label}>Umidade</Text>
                        <Text style={styles.value}>{cityData.main.humidity}%</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Feather name="wind" size={24} color="#1e88e5"/>
                        <Text style={styles.label}>Vento</Text>
                        <Text style={styles.value}>{cityData.wind.speed} m/s</Text>  
                    </View>

                    <View style={styles.infoBox}>
                        <Ionicons name="speedometer-outline" size={24} color="#1e88e5"/>
                        <Text style={styles.label}>Pressão</Text>
                        <Text style={styles.value}>{cityData.main.pressure} hPa</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Feather name="thermometer" size={24} color="#1e88e5"/>
                        <Text style={styles.label}>Sensação Térmica</Text>
                        <Text style={styles.value}>{Math.round(cityData.main.temp)}°C</Text>
                    </View>

                </View>
            </ScrollView>

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
});