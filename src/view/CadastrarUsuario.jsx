import { View, ScrollView } from "react-native";
import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";
import { StyleSheet, Text } from "react-native";    
import { Button, Icon, Modal, Snackbar } from "react-native-paper";
import { useAuth } from "../components/Provider";
import { useEffect, useState } from "react";
import Usuario from "../model/Usuario";
export default function CadastrarUsuario({ route}) {
   
    
    const { usuarioEditar } = route.params;
    const { userController } = useAuth();
    const [usuario, setUsuario] = useState(usuarioEditar ?{
        id: usuarioEditar.id,
        endereco: usuarioEditar.endereco,
        email: usuarioEditar.email,
        telefone: usuarioEditar.telefone,
        nome: usuarioEditar.nome,
        login: usuarioEditar.login,
        senha: usuarioEditar.senha,
        tipo: usuarioEditar.tipo,
        
        
    } : new Usuario());
   
    
    const [mensagem, setMensagem] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const abrirModal = () => setModalVisible(true);
    const fecharModal = () => setModalVisible(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('');

    





const verificaCampos = (usuario) => {
        if(usuario.nome == '' || usuario.email == '' || usuario.login == '' || 
            usuario.senha == '' || usuario.tipo == '' || 
            usuario.telefone == '' || usuario.endereco == '') {
            setMensagem("Os campos não podem estar vazios.");
            return false;
        }
       
        
        setMensagem(null);
        setModalVisible(true);
        return true;
    };



    const cadastrarUsuario = async (usuario) => {
        setLoading(true);
        try {
            const response = await userController.createUsuario(usuario);
            return response;
            
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            return{
                success: false,
                errors: ["Erro ao cadastrar usuário. Tente novamente mais tarde."]
            }
        } finally {
            setLoading(false);
        }
    };
    const editarUsuario = async (usuario, id) => {
                
        setLoading(true);
        
        
        try {
            const response = await userController.updateUsuario(usuario, id);
           
            return response;

        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            return {
                success: false,
                errors: ["Erro ao editar usuário. Tente novamente mais tarde."]
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <ViewBase tabAtiva="cadastrarUsuario">
           
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Icon source="account-plus" size={32} color="#fff" />
                    {usuarioEditar && <Text style={styles.title}>Editar Usuário</Text>}
                    {!usuarioEditar && <Text style={styles.title}>Cadastrar Usuário</Text>}
                </View>
                {usuarioEditar && (<Text style={styles.subtitle}>Editando usuário: {usuarioEditar.nome}</Text>)}
                {!usuarioEditar && (
                <Text style={styles.subtitle}>Adicione um novo usuário ao sistema 👤</Text>
                )}
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>Informações do Usuário</Text>
                        
                        <EntradadeTexto 
                            title="Nome do Usuário" 
                            style={styles.input}
                            value={usuario.nome}
                            placeholder="Ex: João Silva"
                            onChangeText={text => setUsuario({ ...usuario, nome: text })}
                        />
                         
                        <EntradadeTexto 
                            title="Email" 
                            style={styles.input}
                            value={usuario.email}
                            placeholder="exemplo@email.com"
                            keyboardType="email-address"
                            onChangeText={text => setUsuario({ ...usuario, email: text })}
                        />
                         
                        <View style={styles.rowInputs}>
                            <View style={styles.halfInput}>
                                <EntradadeTexto 
                                    title="Login"
                                    value={usuario.login}
                                    style={styles.input}
                                    placeholder="joaosilva"
                                    onChangeText={text => setUsuario({ ...usuario, login: text })}
                                />
                            </View>
                            <View style={styles.halfInput}>
                                <EntradadeTexto 
                                    title="Senha" 
                                    style={styles.input}
                                    value={usuario.senha}
                                    placeholder="••••••••"
                                    secureTextEntry={true}
                                    onChangeText={text => setUsuario({ ...usuario, senha: text })}
                                />
                            </View>
                        </View>

                        <EntradadeTexto 
                            title="Tipo de Usuário" 
                            style={styles.input}
                            value={usuario.tipo}
                            placeholder=""
                            onChangeText={text => setUsuario({ ...usuario, tipo: text })}
                        />

                        <EntradadeTexto 
                            title="Telefone" 
                            style={styles.input}
                            value={usuario.telefone}
                            placeholder="(11) 99999-9999"
                            keyboardType="phone-pad"
                            onChangeText={text => setUsuario({ ...usuario, telefone: text })}
                        />

                        <EntradadeTexto 
                            title="Endereço" 
                            style={[styles.input, styles.textArea]}
                            value={usuario.endereco}
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
                            {usuarioEditar && (
                                <Button 
                                mode="contained" 
                                style={styles.submitButton}
                                labelStyle={styles.submitButtonText}
                                onPress={() => { if (verificaCampos(usuario)) { setModalVisible(true); } }}
                                icon="account-check"
                            >
                                Editar Usuário
                            </Button>
                            )}
                            {!usuarioEditar && (
                            <Button 
                                mode="contained" 
                                style={styles.submitButton}
                                labelStyle={styles.submitButtonText}
                                onPress={() => { if (verificaCampos(usuario)) { setModalVisible(true); } }}
                                icon="account-check"
                            >
                                Cadastrar Usuário
                            </Button>
                            )}
                        </View>
                    </View>
                      <Modal 
                                  visible= {modalVisible}
                                  onDismiss={fecharModal} 
                                  contentContainerStyle={styles.modalContainer}
                              >
                                  <View style={styles.modalIcon}>
                                      <Text style={styles.modalIconText}>👟</Text>
                                  </View>
                                  {
                                    usuarioEditar ? (<Text style={styles.modalTitle}>Edição de Usuario</Text>
                                        
                                    ) : (<Text style={styles.modalTitle}>Cadastro de Usuario</Text>)
                                  }
                                  {
                                    usuarioEditar ? (<Text style={styles.modalText}>Confirma a edição do usuario com todos os dados?</Text>

                                    ) : (<Text style={styles.modalText}>Confirma a criação do usuario com todos os dados?</Text>)
                                  }
                                  <Text style={styles.modalText}>Nome: {usuario.nome}</Text>
                                  <Text style={styles.modalText}>Email: {usuario.email}</Text>
                                  <Text style={styles.modalText}>Telefone: {usuario.telefone}</Text>
                                  <Text style={styles.modalText}>Endereço: {usuario.endereco}</Text>
                                  <Text style={styles.modalText}>Login: {usuario.login}</Text>
                                  <Text style={styles.modalText}>Tipo: {usuario.tipo}</Text>
                                

                                  <View style={styles.modalButtons}>
                                      <Button
                                          mode="contained"
                                          onPress={async () => { const novoUsuario =  usuarioEditar?  await editarUsuario(usuario, usuario.id): await cadastrarUsuario(usuario);
                                            
                                            setSnackbarVisible(true);
                                                 if (novoUsuario && novoUsuario.success) {
                                                    setSnackbarMessage("Usuário cadastrado com sucesso!");
                                                    fecharModal();
                                                    setUsuario(new Usuario());
                                                    
                                                } 
                                                else {
                                                    const erros = usuarioCadastrado.errors.join('\n');
                                                    setSnackbarMessage(`Erro ao cadastrar usuário:\n${erros}`);
                                                }
                                            }}
                                                
                                          style={styles.buttonSim}
                                          labelStyle={styles.buttonSimText}
                                      >
                                          Sim
                                      </Button>
                                      <Button 
                                          mode="outlined" 
                                          onPress={fecharModal} 
                                          style={styles.buttonCancelar}
                                          labelStyle={styles.buttonCancelarText}
                                      >
                                          Cancelar
                                      </Button>
                                  </View>
                    </Modal>
                </View>
            </ScrollView>
              <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={8000}
            action={{
                label: 'Fechar',
                onPress: () => setSnackbarVisible(false),
            }}
        >
            {snackbarMessage}
        </Snackbar>
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
      modalContainer: {
        backgroundColor: 'white',
        padding: 24,
        margin: 20,
        borderRadius: 24,
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    modalIcon: {
        alignItems: 'center',
        marginBottom: 16,
    },
    modalIconText: {
        fontSize: 48,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#2c2c2c',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#666',
    },
    modalButtons: {
        gap: 12,
    },
    buttonSim: {
        backgroundColor: '#0833f5ff',
        paddingVertical: 6,
        borderRadius: 12,
        elevation: 4,
    },
    buttonSimText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonCancelar: {
        borderColor: '#ff6b35',
        borderWidth: 2,
        paddingVertical: 6,
        borderRadius: 12,
    },
    buttonCancelarText: {
        color: '#ff6b35',
        fontWeight: 'bold',
        fontSize: 16,
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