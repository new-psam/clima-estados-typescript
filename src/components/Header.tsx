import { View, Text, StyleSheet, Platform } from "react-native";


interface Props{
    title: string;
}

export default function Header({ title }: Props) {
    return (
        <View style ={styles.container}>
            <View style={styles.logoRow}>
                <Text style={styles.logoSymbol}>🌦️</Text>
                <Text style={styles.logoText}>Clima Estados</Text>
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
        width: '100%',
    },
    logoRow: {  flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    logoSymbol: {fontSize: 24, marginRight: 8, color: 'white', fontWeight: 'bold' },
    logoText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
    title: { fontSize: 14, color: '#e3f2fd', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1.2 },
});