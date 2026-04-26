import React, { useState } from "react";
import { 
    ActivityIndicator,
    Alert,
    Keyboard, 
    KeyboardAvoidingView, 
    Platform, ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    View,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import Header from "@/components/Header";
import { addFavorityCity, updateFavorityCity } from "@/services/cityService";
import { RootStackParamList } from "@/routes";

export default function AddCityScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'AddCity'>>();;
    const cityToEdit = route.params?.cityToEdit;

    const [cityName, setCityName] = useState(cityToEdit?.cityName || '');
    const [comment, setComment] = useState(cityToEdit?.comment || '');
    const [photoTheme, setPhotoTheme] = useState(''); 
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    const isEditing = !!cityToEdit;

    const handleSave = async () => {
        setLoading(true);
        // if (!cityName.trim() || !comment.trim()) {
        //     Alert.alert('Erro', 'Por favor, preencha o nome da cidade e um comentário.');
        //     return;
        // }
        // Keyboard.dismiss();
        // setLoading(true);

        try {
            if (isEditing) {
                // Lógica de UPDATE
                const finalPhotUrl = photoTheme.trim() !== ''
                ? `https://loremflickr.com/600/400/city,${photoTheme.replace(/\s/g, '')}`
                : cityToEdit.photoUrl; // Mantém a foto antiga se não mudar o tema

                await updateFavorityCity(cityToEdit.id, comment, finalPhotUrl);
                Alert.alert('Sucesso!', 'Suas notas foram atualizadas.');
                navigation.goBack();
            } else {

                // LÓGICA DA FOTO: Se o usuário não definiu um tema, usa o nome da cidade
                const searchTerm = photoTheme.trim() !== '' ? photoTheme : cityName;
                const finalPhotoUrl = `https://loremflickr.com/600/400/city,${searchTerm.replace(/\s/g, '')}`;
                
                // chamada para o serviço (Passando os 3 parâmetros conforme ajustamos)
                await addFavorityCity(cityName, comment, finalPhotoUrl);
    
                Alert.alert('Sucesso!', `${cityName} foi adicionada aos seus favoritos.`);
    
                // Limpa os campos após o sucesso
                setCityName('');
                setComment('');
                setPhotoTheme('');
                // Volta para a lista
                navigation.goBack();
            }

        } catch (error: any) {
            Alert.alert('Erro', 'Falha ao processar.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>
                    <Header title={isEditing ? "Editar Notas": "Nova Cidade"} showBackButton={true} />

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding': 'height'}
                        style={styles.container}
                    >
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            <Text style={styles.label}>Qual cidade deseja adicionar?</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Ex: Santos, São Paulo ou Paris"
                                value={cityName}
                                onChangeText={setCityName}
                                placeholderTextColor="#999"
                            />

                            <Text style={styles.label}>Tema da foto(opcional)</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Ex: sunset, architecture, beach..."
                                value={photoTheme}
                                onChangeText={setPhotoTheme}
                                placeholderTextColor="#999"
                            />
                            <Text style={styles.helperText}>
                                Dica: Se deixar vazio, buscaremos uma foto da cidade informada.
                            </Text>

                            <Text style={styles.label}>O que você achou dela?</Text>
                            <TextInput 
                                style={[styles.input, styles.textArea]}
                                placeholder="Escreva seu comentário aqui..."
                                value={comment}
                                onChangeText={setComment}
                                multiline
                                numberOfLines={5}
                                placeholderTextColor="#999"
                            />

                            <TouchableOpacity
                                style={[styles.button, loading && styles.buttonDisabled]}
                                onPress={handleSave}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff"/>
                                ) : (
                                    <Text style={styles.buttonText}>{isEditing ? "ATUALIZAR NOTAS" : "SALVAR NO DIÁRIO"}</Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{flex:1, backgroundColor: '#f5f5f5'},
    scrollContent: {padding: 20},
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        marginTop: 10
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top', // Para o Android começar o texto no topo
    },
    button: {
        backgroundColor: '#1e88e5',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        
    },
    buttonDisabled: { backgroundColor: "#a5d1f2"},
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16},
    helperText: {
        fontSize: 12,
        color: '#888',
        marginTop: -15,
        marginBottom: 20,
        fontStyle: 'italic',
    },
});