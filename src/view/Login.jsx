import { View, StyleSheet, StatusBar, KeyboardAvoidingView, Pressable, Keyboard} from "react-native";
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
                    <Card  style={{backgroundColor: '#fff'}}>
                <Card.Title/>
                <Card.Content>
                <Text variant="titleLarge">Usuário</Text>
                <TextInput
                    placeholder="Usuario"
                    right={<TextInput.Icon
                        marginTop={10}
                        icon="account"
                        size={30}
                        color={MD3Colors.black}
                        marginBottom={10}
                    />}
                    value={campos.usuario}
                    style={{marginBottom: 20, marginTop: 10, borderColor: '#000', borderWidth: 1, borderRadius: 5}}
                    onChangeText={text => setCampos({...campos, usuario: text})}
                    
                />
                <Text variant="titleLarge">Senha</Text>
                <TextInput 
                    right={< TextInput.Icon 
                        marginTop={10}
                        icon="eye"
                        size={30}
                        color={MD3Colors.black}

                        marginBottom={10}
                    />}
                    placeholder="Senha"
                    value={campos.senha}
                    style={{marginBottom: 20, marginTop: 10, borderColor: '#000', borderWidth: 1, borderRadius: 5}}
                    secureTextEntry
                    onChangeText={text => setCampos({...campos, senha: text})}
                />
                </Card.Content>
                <Card.Actions>
                <Button style={{backgroundColor: '#cf0909ff', borderColor: '#fff'}} textColor="#fff" onPress={() => {Keyboard.dismiss()}} >Cancel</Button>
                <Button style={{backgroundColor: '#cf0909ff', borderColor: '#fff'}} textColor="#fff" onPress={handleLogin} >Ok</Button>
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
        paddingTop: 200,
        backgroundColor: '#000',
        width: '100%',
    },
});

