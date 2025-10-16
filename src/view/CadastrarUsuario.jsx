import { View, ScrollView } from "react-native";
import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";
import { StyleSheet, Text } from "react-native";    
import { Button, Icon } from "react-native-paper";
import  UsuarioController  from "../components/controller/Usuario.controller";
import { useEffect, useState } from "react";
export default function CadastrarUsuario({ navigation }) {

    const control = UsuarioController();
    const [usuario, setUsuario] = useState({});
    const [mensagem, setMensagem] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

       setUsuario({ nome: "", 
        email: "", 
        login: "", 
        senha: "", 
        tipo: "", 
        telefone: "", 
        endereco: "" });
    }, []);

useEffect(() => {
        if(usuario.nome == '' || usuario.email == '' || usuario.login == '' || 
            usuario.senha == '' || usuario.tipo == '' || 
            usuario.telefone == '' || usuario.endereco == '') {
            return setMensagem("Os campos não podem estar vazios.");
        }
        if(usuario.telefone) {
            const telefoneFloat = parseFloat(usuario.telefone.replace(',', '.'));
            if(isNaN(telefoneFloat) || telefoneFloat <= 0) {
                return setMensagem("O telefone deve ser um número válido maior que zero.");
            }

        }
        setMensagem(null);
    }, [usuario.nome, usuario.email, usuario.login, usuario.senha, usuario.tipo, usuario.telefone, usuario.endereco]);



    const cadastrarUsuario = async (usuario) => {
        setLoading(true);
        try {
            const response = await control.createUsuario(usuario);
            if(response.error) {
                setMensagem(response.error);
            } else {
                setMensagem("Usuário cadastrado com sucesso!");
                setUsuario({});
            }
        } catch (error) {
            setMensagem("Erro ao cadastrar usuário.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ViewBase tabAtiva="cadastrarUsuario">
           
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Icon source="account-plus" size={32} color="#fff" />
                    <Text style={styles.title}>Cadastrar Usuário</Text>
                </View>
                <Text style={styles.subtitle}>Adicione um novo usuário ao sistema 👤</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>Informações do Usuário</Text>
                        
                        <EntradadeTexto 
                            title="Nome do Usuário" 
                            style={styles.input}
                            placeholder="Ex: João Silva"
                            onChangeText={text => setUsuario({ ...usuario, nome: text })}
                        />
                         
                        <EntradadeTexto 
                            title="Email" 
                            style={styles.input}
                            placeholder="exemplo@email.com"
                            keyboardType="email-address"
                            onChangeText={text => setUsuario({ ...usuario, email: text })}
                        />
                         
                        <View style={styles.rowInputs}>
                            <View style={styles.halfInput}>
                                <EntradadeTexto 
                                    title="Login" 
                                    style={styles.input}
                                    placeholder="joaosilva"
                                    onChangeText={text => setUsuario({ ...usuario, login: text })}
                                />
                            </View>
                            <View style={styles.halfInput}>
                                <EntradadeTexto 
                                    title="Senha" 
                                    style={styles.input}
                                    placeholder="••••••••"
                                    secureTextEntry={true}
                                    onChangeText={text => setUsuario({ ...usuario, senha: text })}
                                />
                            </View>
                        </View>

                        <EntradadeTexto 
                            title="Tipo de Usuário" 
                            style={styles.input}
                            placeholder=""
                            onChangeText={text => setUsuario({ ...usuario, tipo: text })}
                        />

                        <EntradadeTexto 
                            title="Telefone" 
                            style={styles.input}
                            placeholder="(11) 99999-9999"
                            keyboardType="phone-pad"
                            onChangeText={text => setUsuario({ ...usuario, telefone: text })}
                        />

                        <EntradadeTexto 
                            title="Endereço" 
                            style={[styles.input, styles.textArea]}
                            placeholder="Rua, número, bairro, cidade..."
                            multiline={true}
                            numberOfLines={3}
                            onChangeText={text => setUsuario({ ...usuario, endereco: text })}
                        />

                        <View style={styles.buttonContainer}>
                            <Button 
                                mode="contained" 
                                style={styles.cancelButton}
                                labelStyle={styles.cancelButtonText}
                                onPress={() => navigation.goBack()}
                                icon="arrow-left"
                            >
                                Voltar
                            </Button>
                            <Button 
                                mode="contained" 
                                style={styles.submitButton}
                                labelStyle={styles.submitButtonText}
                                onPress={() => cadastrarUsuario(usuario)}
                                icon="account-check"
                            >
                                Cadastrar Usuário
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ViewBase>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#357cff',
        padding: 20,
        paddingTop: 25,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 12,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#357cff',
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c2c2c',
        textAlign: 'center',
        marginBottom: 24,
        borderBottomWidth: 2,
        borderBottomColor: '#357cff',
        paddingBottom: 12,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    rowInputs: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    halfInput: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 16,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#666',
        paddingVertical: 8,
        borderRadius: 12,
        elevation: 4,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    submitButton: {
        flex: 2,
        backgroundColor: '#357cff',
        paddingVertical: 8,
        borderRadius: 12,
        elevation: 4,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});