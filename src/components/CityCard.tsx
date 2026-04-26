import { Feather } from "@expo/vector-icons";
import React from "react";
import { 
    ImageBackground, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from "react-native";

interface CityCardProps {
    
    cityName: string;
    comment: string;
    photoUrl: string;
    onPress: () => void;
    onEdit: () => void; // Adicione esta linha
}

export default function CityCard({ cityName, comment, photoUrl, onPress, onEdit }: CityCardProps) {
    // const [data, setData] = useState<WeatherData | null>(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     let isMounted = true;
    //     const fetchData = async () => {
    //         try {
    //             const res = await getWeather(city.name);
    //             if (isMounted && res) {
    //                 setData(res);
    //             }
    //         } catch (e) {
    //             console.log(`Erro ao buscar dados para ${city.name}:`, e);
    //         } finally {
    //             if (isMounted) {
    //                 setLoading(false);
    //             }
    //         }
    //     };

    //     fetchData();
    //     return () => { isMounted = false; }; // Cleanup function para o isMounted
    // }, [city.name]);

    // if (loading) {
    //     return (
    //         <View style={[styles.card, styles.center]}>
    //             <ActivityIndicator color='#1e88e5'/>
    //         </View>
    //     );
    // }

    // if (!data) return null;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            {/* Imagem de fundo da cidade */}
            <ImageBackground
                source={{ uri: photoUrl }}
                style={styles.imageBackground}
                imageStyle={{ borderRadius: 15}}
            >
                {/* Overlay escuro para garantir que o texto seja legível */}
                <View style={styles.orverlay}>
                    {/* Botão de Editar no topo do Card */}
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            onEdit();
                            
                        }}
                    >
                        <Feather name="edit-2" size={20} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.content}>
                        <Text style={styles.cityName}>{cityName}</Text>
                        <Text style={styles.comment} numberOfLines={2}>{comment}</Text>
                    </View>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Ver Clima</Text>
                    </View>
                    
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 180,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#fff',
    },
    imageBackground: {flex: 1, justifyContent: 'flex-end'},
    orverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)', // Escurece a imagem para o texto branco destacar
        borderRadius: 15,
        padding: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    content: {flex: 1, marginRight: 10},
    cityName: { 
        fontSize: 24, 
        fontWeight: "bold", 
        color: "#fff",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
 },
    comment: {
        color: '#eee',
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 5
      },
    badge: {
        backgroundColor: 'rgba(30, 136, 229, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
    }
    
});