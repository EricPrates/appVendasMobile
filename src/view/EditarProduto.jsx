import { View, ScrollView } from "react-native";
import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";
import { StyleSheet, Text } from "react-native";    
import { Button, Icon } from "react-native-paper";
import { useState } from "react";
import Produto from '../model/Produto'

export default function EditarProduto({ navigation }) {

    const [busca, setBusca] = useState('');
    const [valorBusca, setValorBusca] = useState('');
    const [produto, setProduto] = useState('');

    return (
        <ViewBase tabAtiva="editarProduto">

            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Icon source="package-variant-closed-plus" size={32} color="#fff" />
                    <Text style={styles.title}>Editar Produto</Text>
                </View>
                <Text style={styles.subtitle}>Edite as informações do produto</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>Escolha como Buscar</Text>
                        
                

                        <View style={styles.buttonContainer}>
                        
                            <Button 
                                mode="contained" 
                                style={styles.submitButton}
                                labelStyle={styles.submitButtonText}
                                onPress={() => setBusca('Nome')}
                                icon="check"
                            >
                                Por Nome
                            </Button>
                            <Button 
                                mode="contained" 
                                style={styles.submitButton}
                                labelStyle={styles.submitButtonText}
                                onPress={() => setBusca('Id')}
                                icon="check"
                            >
                                Por Id
                            </Button>
                           
                            
                        </View>
                         {
                                busca && (
                                        <View>
                                            <EntradadeTexto 
                                                title={busca} 
                                                style={styles.input}
                                                value={valorBusca}
                                                placeholder={`Digite o ${busca}`}
                                                keyboardType={busca === 'Id' ? 'numeric' : 'default'}
                                                onChangeText={(e) => setValorBusca(e)}
                                            />
                                            <View style={styles.buttonContainer}>
                                                <Button style={styles.submitButton}
                                                    labelStyle={styles.submitButtonText}
                                                    onPress={() => setProduto(prod)}>
                                                    
                                                <Text>Buscar</Text>
                                            </Button>
                                            </View>
                                        </View>
                                        )

                                    }
                                    
                    </View>
                    
                </View>
                {produto && (
                                        <View style={styles.formCard}>
                                            <EntradadeTexto
                                                title="Nome"
                                                style={styles.input}
                                                value={produto.nome}
                                           
                                                placeholder={produto.nome}
                                                onChangeText={(e) => setProduto({ ...produto, nome: e })}
                                            />
                                            <EntradadeTexto
                                                title="Descrição"
                                                style={styles.input}
                                                value={produto.descricao}
                                                onChangeText={(e) => setProduto({ ...produto, descricao: e })}
                                            />
                                            <EntradadeTexto
                                                title="Preço"
                                                style={styles.input}
                                                value={produto.preco}
                                                keyboardType="numeric"
                                                onChangeText={(e) => setProduto({ ...produto, preco: e })}
                                            />
                                        </View>
                                    )}
            </ScrollView>
        </ViewBase>
    );
}

const prod  = new Produto( 1, "Nike Air Max 270", "Tênis Nike Air Max 270 com design moderno e conforto excepcional.", 599.99, "", "Corrida", [38, 39, 40, 41, 42], ["Preto", "Branco", "Azul"]);

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