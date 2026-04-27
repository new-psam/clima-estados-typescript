import React, { useState, useEffect } from "react";
import { 
    View, 
    FlatList, 
    StyleSheet,   
    StatusBar,
    TouchableOpacity,
    Text,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { db, auth } from "@/services/firebaseConfig";
import { collection, onSnapshot, orderBy, query, QuerySnapshot, where } from "firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import CityCard from "@/components/CityCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RootStackParamList } from "@/routes";
import CurrentLocationCard from "@/components/CurrentLocationCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFavorites, setLoading } from "@/store/slices/weatherSlice";

// Tipagem para o hook de navegação, usando o RootStackParamList definido em src/routes/index.tsx
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'List'>;

export default function ListScreen() {

    const dispatch = useDispatch();

    const navigation = useNavigation<NavigationProp>(); 
    // const [favorites, setFavorites] = useState<any[]>([]); // Estado para as cidades do Banco   
    // const [loading, setLoading] = useState(true);

    const { favorites, loading } = useSelector((state: RootState) => state.weather);

    useEffect(() => {
        dispatch(setLoading(true));

        const q = query(
            collection(db, "favorite_cities"),
            where("userId", "==", auth.currentUser?.uid),
            orderBy("createdAt", "desc") // Mostrar as mais recentes primeiro
        );

        // 2. Listener em tempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const citiesList: any[] = [];
            querySnapshot.forEach((doc) => {
                citiesList.push({ id: doc.id, ...doc.data() });
            });

            dispatch(setFavorites(citiesList));
        
        }, (error) => {
            console.error("Erro ao buscar favoritos:",error);
            dispatch(setLoading(false));
        });

        return () => unsubscribe(); //Limpa o listener ao sair da tela
    }, []);

    
    const handlePressCity = (item: any) => {
        navigation.navigate('Details', { cityId: item.id, cityName:  item.cityName, comment: item.comment} as any); // Navega para a tela de detalhes passando os dados do clima
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1e88e5"/>

            <Header title="Previsão do Tempo das Cidades Favoritas" />

            <View style={styles.content}>
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CityCard 
                            cityName={item.cityName}
                            comment={item.comment}
                            photoUrl={item.photoUrl}
                            onPress={() => handlePressCity(item)} 
                            onEdit={() => navigation.navigate('AddCity', { cityToEdit: item})}
                        />
                    )}

                    ListHeaderComponent={<CurrentLocationCard />}

                    // --- REMOVENDO AS BARRAS DE ROLAGEM ---
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}


                    // --- Performance (Conforme seu PDF) ---
                    initialNumToRender={8} // Renderiza 8 itens logo de cara
                    maxToRenderPerBatch={5} // Renderiza no máximo 5 itens por batch (rolagem)
                    windowSize={5} // Mantém 5 telas de itens renderizados (2 antes, 2 depois, + o atual)

                    
                    contentContainerStyle={styles.listPadding} // Espaço para o Footer ficar visível
                    ListEmptyComponent={
                        <Text style={{textAlign: 'center', marginTop: 50, color: '#999'}}>
                            Você ainda não tem cidades favoritas. {`\n`} Clique no + para adicionar!
                        </Text>
                    }
                />

                {/* Botão Flutuante de adicionar */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate('AddCity')}
                >
                    <Feather name="plus" size={30} color='#fff'/>
                </TouchableOpacity>
            </View>

            <Footer/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {flex: 1, backgroundColor: '#f5f5f5'},
    container: {
        flex: 1,
        backgroundColor: '#1e88e5',
    },
    listPadding: {
        paddingBottom: 100,
    },
    fab:{
        position: 'absolute',
        right: 20,
        bottom: 20, // Ajuste para ficar acima do seu Footer se necessário
        backgroundColor: '#1e88e5',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 9999,
    },
});