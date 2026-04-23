import { View, Text, StyleSheet} from "react-native";

export default function Footer() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>© 2026 Weather App • Marcelino Santos</Text>
            <Text style={styles.subText}>Dados processados via FlatList Virtualization</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    text: { fontSize: 12, color: '#616161', fontWeight: '600', marginBottom: 4 },
    subText: { fontSize: 10, color: '#9e9e9e', fontStyle: 'italic' },
});