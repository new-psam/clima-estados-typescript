import React, { useState } from "react"
import { 
    ActivityIndicator, 
    Alert, 
    KeyboardAvoidingView, 
    Platform, 
    Text, 
    TextInput, 
    TouchableOpacity,
    StyleSheet,
    View,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebaseConfig";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("atenção", 'Preencha e-mail e senha!');
            return;
        }

        Keyboard.dismiss(); //limpa o teclado ao iniciar o login

        setLoading(true);
        

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
        } catch (error: any) {
            Alert.alert("Erro!", "E-mail ou senha incorretos!");
            setPassword("");
        }  finally {
            setLoading(false);
        } 
    };

    // função para criar a conta
    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert('Erro', "Por favor, preencha email e senha para cadastrar");
            return;
        }

        Keyboard.dismiss(); //limpa o teclado ao iniciar o login

        setLoading(true);
        

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            Alert.alert("Sucesso", "Conta criada com sucesso! Agora você pode entrar!");
        } catch (error: any) {
            Alert.alert('Erro', "Falha no cadastro. Tente novamente!");
        }  finally {
            setLoading(false);
        }
    }

    return (
        // TouchableWithoutFeedback faz o teclado sumir ao clicar em qualquer lugar vazio
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS ==='ios' ? 'padding': 'height'}
                style={styles.container}
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.logo}>🌦️ Bem-vindo ao Clima-Estados</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Entrar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRegister} style={styles.registerBtn} disabled={loading}>
                        <Text style={styles.registerText}>Não tem conta? Cadastre-se aqui</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#f5f5f5',},
    innerContainer: {flex: 1, justifyContent: 'center', padding: 25,},
    logo: {fontSize: 32, fontWeight: 'bold', color: '#1e88e5', marginBottom: 40, textAlign: 'center'},
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#1e88e5',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
    registerBtn: {marginTop: 25, alignItems: 'center'},
    registerText: {color: '#1e88e5', fontSize: 14, fontWeight: 'bold'},
});