import { View, ScrollView } from "react-native";
import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";
import { StyleSheet, Text } from "react-native";    
import { Button, Icon, Modal, Snackbar} from "react-native-paper";
import { ProdutoController } from "../components/controller/Produto.controller";
import { useEffect, useState } from "react";
import { useAuth } from "../components/Provider";
import Produto from "../model/Produto";
import { useNavigation } from "@react-navigation/native";

export default function CadastrarProduto({  }) {
    const {logado} = useAuth();
    const control = ProdutoController();
    const [modalVisible, setModalVisible] = useState(false);
    const [produto, setProduto] = useState(new Produto());
    const [mensagem, setMensagem] = useState();
    const [loading, setLoading] = useState(false);
    const abrirModal = () => setModalVisible(true);
    const navigation = useNavigation();
    const fecharModal = () => setModalVisible(false);
    const snackbarRef = Snackbar;
    useEffect(() => {
        setProduto({
        nome: 'TESTE',
        descricao: 'TESTE INSERÇÃO MANUAL',
        preco: '100',
        quantidade: '10',
        urlImagem: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=500&q=80',
        cores: 'Preto',
        tamanho: '42',
        avaliacao: '',
        desconto: 0,
        fornecedor: 'Fornecedor Teste',
        idUsuario: '',
        categoria: 'Corrida',
        });
    }, []);

   const verificaCampos = (produto) => {
        if(produto.nome == '' || produto.descricao == '' || produto.preco == '' || 
            produto.quantidade == '' || produto.urlImagem == '' || produto.cores == '' ||
            produto.tamanho == '' ||  produto.fornecedor == '' ||
            produto.categoria == '') {
            setMensagem("Os campos não podem estar vazios.");
            return false;
        }
        if(produto.preco) {
            const precoFloat = parseFloat(produto.preco.replace(',', '.'));
            if(isNaN(precoFloat) || precoFloat <= 0) {
                setMensagem("O preço deve ser um número válido maior que zero.");
                return false;
            }
        }
        setMensagem(null);
        setModalVisible(true);
        return true;
    }

    const cadastrarProduto = async (produto) => {
        
        setLoading(true);
        try {
        const response = await control.addProduto({ ...produto, idUsuario: logado.id });
        if(response.success) {
           console.log(response.data);
            response.data
            setProduto({});
        } else {
            setMensagem("Erro ao cadastrar produto.");
        }
    } catch (error) {
        setMensagem("Erro interno no servidor, tente novamente.");
    }finally {
        setLoading(false);
    }
    }
    return (
        <ViewBase tabAtiva="cadastrarProduto">
           
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Icon source="package-variant-closed-plus" size={32} color="#fff" />
                    <Text style={styles.title}>Cadastrar Produto</Text>
                </View>
                <Text style={styles.subtitle}>Adicione um novo tênis ao catálogo 👟</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>Informações do Produto</Text>
                        {
                            mensagem && <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10, textTransform: 'capitalize', fontSize: 14 }}>{mensagem}</Text>
                        }
                        <EntradadeTexto 
                            title="Nome do Produto" 
                            value={produto.nome}
                            style={styles.input}
                            placeholder="Nome do Tênis"
                            onChangeText={text => setProduto({ ...produto, nome: text })}
                            
                        />
                         
                        <EntradadeTexto 
                            title="Descrição do Produto" 
                            style={[styles.input, styles.textArea]}
                            placeholder="Descreva as características do tênis..."
                            multiline={true}
                            value={produto.descricao}
                            numberOfLines={4}
                            onChangeText={text => setProduto({ ...produto, descricao: text })}
                        />
                         
                        <View style={styles.rowInputs}>
                            <View style={styles.halfInput}>
                                <EntradadeTexto 
                                    title="Preço (R$)" 
                                    style={styles.input}
                                    value={produto.preco}
                                    placeholder="299,99"
                                    keyboardType="numeric"
                                    onChangeText={text => setProduto({ ...produto, preco: text })}
                                />
                            </View>
                            <View style={styles.halfInput}>
                                <EntradadeTexto 
                                    title="Quantidade" 
                                    style={styles.input}
                                    value={produto.quantidade}
                                    placeholder="50"
                                    keyboardType="numeric"
                                    onChangeText={text => setProduto({ ...produto, quantidade: text })}
                                />
                            </View>
                        </View>

                        <EntradadeTexto 
                            title="Categoria" 
                            style={styles.input}
                            placeholder="Ex: Corrida, Casual, Basquete"
                            value={produto.categoria}
                            onChangeText={text => setProduto({ ...produto, categoria: text })}
                        />

                        <EntradadeTexto 
                            title="Tamanhos Disponíveis" 
                            style={styles.input}
                            placeholder="Ex: 38, 39, 40, 41, 42"
                            value={produto.tamanho}
                            onChangeText={text => setProduto({ ...produto, tamanho: text })}
                        />

                        <EntradadeTexto 
                            title="Cores Disponíveis" 
                            style={styles.input}
                            placeholder="Ex: Preto, Branco, Azul"
                            value={produto.cores}
                            onChangeText={text => setProduto({ ...produto, cores: text })}
                        />
                        <EntradadeTexto 
                            title="Fornecedor" 
                            style={styles.input}
                            placeholder="Ex: Nike, Adidas"
                            value={produto.fornecedor}
                            onChangeText={text => setProduto({ ...produto, fornecedor: text })}
                        />

                        <EntradadeTexto 
                            title="URL da Imagem" 
                            style={styles.input}
                            placeholder="https://exemplo.com/imagem.jpg"
                            value={produto.urlImagem}
                            onChangeText={text => setProduto({ ...produto, urlImagem: text })}
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
                                onPress={() => { verificaCampos(produto) }}
                                icon="check"
                            >
                                Cadastrar Produto
                            </Button>
                        </View>
                    </View>
                </View>{
                  verificaCampos && (
                  <Modal 
                visible= {modalVisible}
                onDismiss={fecharModal} 
                contentContainerStyle={styles.modalContainer}
            >
                <View style={styles.modalIcon}>
                    <Text style={styles.modalIconText}>👟</Text>
                </View>
                <Text style={styles.modalTitle}>Cadastro de Produto</Text>
                <Text style={styles.modalText}>Confirma a criação do produto com todos os dados?</Text>
                <Text style={styles.modalText}>Nome: {produto.nome}</Text>
                <Text style={styles.modalText}>Descrição: {produto.descricao}</Text>
                <Text style={styles.modalText}>Preço: {produto.preco}</Text>
                <Text style={styles.modalText}>Categoria: {produto.categoria}</Text>
                <Text style={styles.modalText}>Tamanho: {produto.tamanho}</Text>
                <Text style={styles.modalText}>Cores Disponíveis: {produto.cores}</Text>
                <Text style={styles.modalText}>URL da Imagem: {produto.urlImagem}</Text>
                <Text style={styles.modalText}>Quantidade: {produto.quantidade}</Text>
                <Text style={styles.modalText}>Fornecedor: {produto.fornecedor}</Text>
                
                <View style={styles.modalButtons}>
                    <Button
                        mode="contained"
                        onPress={() => { cadastrarProduto(produto);  navigation.navigate('Home'); }}
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
                    )
}
            </ScrollView>
        </ViewBase>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#357cffff',
        padding: 20,
        paddingTop: 25,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 8,
        shadowColor: '#000000ff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        
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
        borderLeftColor: '#357cffff',
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c2c2c',
        textAlign: 'center',
        marginBottom: 24,
        borderBottomWidth: 2,
        borderBottomColor: '#357cffff',
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
        minHeight: 100,
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
        backgroundColor: '#357cffff',
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