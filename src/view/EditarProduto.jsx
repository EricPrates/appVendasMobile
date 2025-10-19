import { View, ScrollView, FlatList, TextInput } from "react-native";
import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";
import { StyleSheet, Text } from "react-native";    
import { Button, Icon, Card } from "react-native-paper";
import { useState, useEffect } from "react";
import Produto from '../model/Produto'
import { ProdutoController } from "../components/controller/Produto.controller";

export default function EditarProduto({ navigation }) {
    const control = ProdutoController();

    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [busca, setBusca] = useState('');
    
    const buscarProdutos = async (busca) => {
        try {
            if(busca.trim() === '') {
                const todosProdutos = await control.getProdutos();
                setProdutos(todosProdutos);
                if(todosProdutos.success){
                    setProdutos(todosProdutos.data);
            }
            else{
                const resposta = await control.getProdutoByNome(busca);
                if(resposta.success){
                    setProdutos(resposta.data);
                }
            }
        } 
        }catch (error) {
                    console.error("Erro ao buscar produtos:", error);
                }
            }

   

    return (
        <ViewBase tabAtiva="editarProduto">
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Icon source="pencil" size={32} color="#fff" />
                    <Text style={styles.title}>Editar Produtos</Text>
                </View>
                <Text style={styles.subtitle}>Selecione um produto para editar</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                  {!produtoSelecionado && (
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>Buscar Produto</Text>
                        <EntradadeTexto
                            title="Buscar por nome ou ID"
                            style={styles.input}
                            value={busca}
                            placeholder="Digite nome ou ID..."
                            onChangeText={(text) => {
                                setBusca(text);
                                buscarProdutos(text);
                            }}
                            keyboardType="default"
                        />
                    </View>
                   )}  
                    {!produtoSelecionado ? (
                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>
                                Produtos ({produtosFiltrados.length})
                            </Text>
                            
                            {produtosFiltrados.length === 0 ? (
                                <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
                            ) : (
                                produtosFiltrados.map(produto => (
                                    <Card 
                                        key={produto.id} 
                                        style={styles.produtoCard}
                                        onPress={() => setProdutoSelecionado(produto)}
                                    >
                                        <Card.Content>
                                            <Text style={styles.produtoNome}>{produto.nome}</Text>
                                            <Text style={styles.produtoId}>ID: {produto.id}</Text>
                                            <Text style={styles.produtoPreco}>R$ {produto.preco}</Text>
                                        </Card.Content>
                                        <Card.Actions>
                                            <Button 
                                                onPress={() => setProdutoSelecionado(produto)}
                                                icon="pencil"
                                            >
                                                Editar
                                            </Button>
                                        </Card.Actions>
                                    </Card>
                                ))
                            )}
                        </View>
                    ) : (
                        
                        <View style={styles.formCard}>
                            <View style={styles.headerEdicao}>
                                <Text style={styles.formTitle}>
                                    Editando: {produtoSelecionado.nome}
                                </Text>
                                <Button 
                                    icon="arrow-left"
                                    onPress={() => setProdutoSelecionado(null)}
                                    mode="text"
                                    
                                >
                                    Voltar
                                </Button>
                            </View>

                            <EntradadeTexto
                                title="Nome"
                                style={styles.input}
                                value={produtoSelecionado.nome}
                                onChangeText={(text) => setProdutoSelecionado({...produtoSelecionado, nome: text})}
                            />
                            <EntradadeTexto
                                title="Descrição"
                                style={[styles.input, styles.textArea]}
                                value={produtoSelecionado.descricao}
                                onChangeText={(text) => setProdutoSelecionado({...produtoSelecionado, descricao: text})}
                            />
                            
                                <EntradadeTexto
                                    title="Preço"
                                    style={styles.input}
                                    value={produtoSelecionado.preco.toString()}
                                    onChangeText={(text) => setProdutoSelecionado({...produtoSelecionado, preco: parseFloat(text)})}
                                />

                            <EntradadeTexto
                                title="Categoria"
                                style={styles.input}
                                value={produtoSelecionado.categoria}
                                onChangeText={(text) => setProdutoSelecionado({...produtoSelecionado, categoria: text})}
                            />
                            <EntradadeTexto
                                title="Quantidade em Estoque"
                                style={styles.input}
                                value={produtoSelecionado.estoque}
                                onChangeText={(text) => setProdutoSelecionado({...produtoSelecionado, estoque: parseInt(text)})}
                            />
                            <EntradadeTexto
                                title="Imagem (URL)"
                                style={styles.input}
                                value={produtoSelecionado.imagem}
                                onChangeText={(text) => setProdutoSelecionado({...produtoSelecionado, imagem: text})}
                            />
                            <EntradadeTexto
                                title="Avaliação"
                                style={styles.input}
                                value={produtoSelecionado.avaliacao}
                                onChangeText={(text) => setProdutoSelecionado({...produtoSelecionado, avaliacao: parseFloat(text)})}
                            />

                            <View style={styles.buttonContainer}>
                                <Button 
                                    mode="contained"
                                    style={styles.cancelButton}
                                    onPress={() => setProdutoSelecionado(null)}
                                    icon="close"
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    mode="contained"
                                    style={styles.submitButton}
                                    onPress={() => {
                                      
                                        console.log('Salvando:', produtoSelecionado);
                                        setProdutoSelecionado(null);
                                    }}
                                    icon="content-save"
                                >
                                    Salvar
                                </Button>
                            </View>
                        </View>
                    )}
                </View>
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
    produtoCard: {
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
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
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 24,
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
        backgroundColor: '#f60808ff',
        paddingVertical: 8,
        borderRadius: 12,
        elevation: 4,
        
    },
    cancelButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#fff',
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