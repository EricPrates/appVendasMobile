import { View, StyleSheet, StatusBar, KeyboardAvoidingView, Pressable, Keyboard, BackHandler} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { useState } from "react";
import { useAuth } from "../components/Provider";
import { Icon, MD3Colors } from 'react-native-paper';

export default function Login({navigation}) {
    const {login} = useAuth()
    const [campos, setCampos] = useState({
        usuario: 'Eric',
        senha: '123'
    });

    const handleLogin = () =>{
        if (login(campos.usuario, campos.senha)){
             console.log("Login efetuado com sucesso");
            navigation.replace("Home")
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <KeyboardAvoidingView style={{flex: 1}}>
                <Pressable onPress={()=>{Keyboard.dismiss()}}>
               
                    <View style={styles.header}>
                        <Icon source="shoe-sneaker" size={40} color="#fff" />
                        <Text style={styles.headerTitle}>Sneaker Store</Text>
                    </View>

                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={styles.cardTitle}>Acesse sua conta</Text>
                            
                            <Text style={styles.label}>Usuário</Text>
                            <TextInput
                                placeholder="Digite seu usuário"
                                right={<TextInput.Icon
                                    icon="account"
                                    size={25}
                                    color="#357cff"
                                />}
                                value={campos.usuario}
                                style={styles.input}
                                onChangeText={text => setCampos({...campos, usuario: text})}
                            />
                            
                            <Text style={styles.label}>Senha</Text>
                            <TextInput 
                                right={<TextInput.Icon 
                                    icon="eye"
                                    size={25}
                                    color="#357cff"
                                />}
                                placeholder="Digite sua senha"
                                value={campos.senha}
                                style={styles.input}
                                secureTextEntry
                                onChangeText={text => setCampos({...campos, senha: text})}
                            />
                        </Card.Content>
                        <Card.Actions style={styles.cardActions}>
                            <Button 
                                mode="outlined" 
                                style={styles.cancelButton}
                                labelStyle={styles.cancelButtonText}
                                 icon="close"
                                onPress={() => {Keyboard.dismiss(), BackHandler.exitApp()}}
                               
                                
                            >
                                Cancelar
                            </Button>
                            <Button 
                                mode="contained" 
                                style={styles.loginButton}
                                labelStyle={styles.loginButtonText}
                                onPress={handleLogin}
                                icon="login"
                            >
                                Entrar
                            </Button>
                        </Card.Actions>
                    </Card>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
        width: '100%',
    },
    header: {
        backgroundColor: '#ff6b35',
        padding: 30,
        paddingTop: 40,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 12,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 25,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#ff6b35',
        marginHorizontal: 8,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c2c2c',
        textAlign: 'center',
        marginBottom: 25,
        borderBottomWidth: 2,
        borderBottomColor: '#ff6b35',
        paddingBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c2c2c',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        paddingHorizontal: 8,
    },
    cardActions: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        borderColor: '#666',
        borderWidth: 2,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
    },
    cancelButtonText: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 14,
    },
    loginButton: {
        flex: 1,
        backgroundColor: '#ff6b35',
        paddingVertical: 6,
        borderRadius: 12,
        marginLeft: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});