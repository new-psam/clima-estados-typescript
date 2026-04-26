import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Platform, Touchable, TouchableOpacity, Alert } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { auth } from "@/services/firebaseConfig";
import { signOut } from "firebase/auth";


interface Props{
    title: string;
    showBackButton?: boolean;
   
}

export default function Header({ title, showBackButton}: Props) {
    const navigation = useNavigation();

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sair", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            // O listener onAuthStateChanged em Routes.tsx 
                            // vai perceber que o user é null e mandará para o Login automaticamente.
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style ={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.sideButtonContainer}>
                    {showBackButton && (
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()} 
                            style={styles.backButton}
                        >
                            <Ionicons name="chevron-back" size={28} color="#fff" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Logo Central */}
                <View style={styles.logoRow}>
                    <Text style={styles.logoSymbol}>🌦️</Text>
                    <Text style={styles.logoText}>Clima Estados</Text>
                </View>

                {/* Botão de Logout */}
                <View style={styles.sideButtonContainer} >
                    <TouchableOpacity onPress={handleLogout}>
                        <Feather name="log-out" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e88e5',
        paddingTop: Platform.OS === 'ios' ? 20 : 40, // Ajusta o padding para status bar no ios
        paddingBottom: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        //width: '100%',
    },
    topRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%', 
        justifyContent: 'center', 
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        left: 10,
        padding: 5,
    },
    logoRow: {  flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    logoSymbol: {fontSize: 24, marginRight: 8, color: 'white', fontWeight: 'bold' },
    logoText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
    title: { fontSize: 14, color: '#e3f2fd', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1.2 },
    sideButtonContainer: { width: 60,  alignItems: 'center', },
});