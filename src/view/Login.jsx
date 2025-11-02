import { View, StyleSheet, StatusBar, KeyboardAvoidingView, Pressable, Keyboard, BackHandler} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { useEffect, useState } from "react";
import { UsuarioController } from "../components/controller/Usuario.controller";
import { useAuth } from "../components/Provider";
import { Icon, MD3Colors } from 'react-native-paper';
import userService from "../service/DAO/User.Service";

export default function Login({navigation}) {

    const {login, logado, userController} = useAuth()
    const [usuario, setUsuario] = useState({usuario: 'Eric', senha: '123'});
    const [loading, setLoading] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [erro, setErro] = useState(false);
    const [vizualizarSenha, setVisualizarSenha] = useState(false);

   
    const handleLogin = async () =>{
        setLoading(true)
        setErro(false);
        const resp = await login(usuario.usuario, usuario.senha)
              
        if(resp.success){
            
            
            setLoading(false)
            navigation.replace('Home');
        }
        else{
            setLoading(false)
            setErro(true);
            setErrorMessage("Usuário ou senha inválidos");
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <KeyboardAvoidingView style={{flex: 1}}>
                <Pressable onPress={()=>{Keyboard.dismiss();  }}>
               
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
                                value={usuario.usuario}
                                style={[styles.input, erro && { borderColor: MD3Colors.error50 }]}
                                onChangeText={text => setUsuario({...usuario , usuario: text})}
                            />
                            
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                placeholder="Digite sua senha"
                                right={<TextInput.Icon 
                                    onPress={() => setVisualizarSenha(!vizualizarSenha)}
                                    icon={vizualizarSenha ? "eye-off" : "eye"}
                                    size={25}
                                    color="#357cff"
                                />}
                                value={usuario.senha}
                                style={[styles.input, erro && { borderColor: MD3Colors.error50 }]}
                                secureTextEntry={!vizualizarSenha}
                                onChangeText={text => setUsuario({...usuario, senha: text})}
                            />
                            {erro && <Text style={{color: MD3Colors.error50, marginBottom: 10}}>{errorMessage}</Text>}
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