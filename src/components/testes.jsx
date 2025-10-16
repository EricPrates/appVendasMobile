import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, Card, ActivityIndicator } from 'react-native-paper';
import { useAuth } from './Provider';
import Produto from '../model/Produto';

export default function TestesProdutos({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState('');
    const [produtos, setProdutos] = useState([]);
    const { logado } = useAuth();

    // 📋 ARRAY DE TÊNIS PRONTOS (ORDEM CORRETA DO CONSTRUTOR)
    const tenisParaAdicionar = [
        {
            // ✅ ORDEM CORRETA BASEADA NO SEU CONSTRUTOR:
            // constructor(nome, descricao, preco, quantidade, urlImagem, cores, tamanho, avaliacao, desconto, fornecedor, idUsuario, categoria)
            nome: "Nike Air Force 1 '07",
            descricao: "O ícone do basquete reinventado. O Air Force 1 '07 traz estilo atemporal e conforto duradouro para seu everyday wear.",
            preco: 899.99,
            quantidade: 25,
            urlImagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
            cores: ["Branco", "Branco"],
            tamanho: "36-45",
            avaliacao: 4.8,
            desconto: 0,
            fornecedor: "Nike",
            idUsuario: logado.id,
            categoria: "Casual"
        },
        {
            nome: "Adidas Ultraboost 5.0 DNA",
            descricao: "Tênis de corrida com tecnologia Boost para máximo retorno de energia e conforto durante suas corridas e atividades do dia a dia.",
            preco: 1199.99,
            quantidade: 18,
            urlImagem: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Tenis_Ultraboost_5.0_DNA_Branco_GZ0127_01_standard.jpg",
            cores: ["Branco", "Preto"],
            tamanho: "38-44",
            avaliacao: 4.7,
            desconto: 10,
            fornecedor: "Adidas",
            idUsuario: logado.id,
            categoria: "Corrida"
        },
        {
            nome: "Adidas Forum Low",
            descricao: "Tênis de basquete clássico dos anos 80, agora como ícone de estilo streetwear com design retrô e conforto moderno.",
            preco: 699.99,
            quantidade: 30,
            urlImagem: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/96d75c081d024b6c8611ad7400d0c352_9366/Tenis_Forum_Low_Branco_FY7756_01_standard.jpg",
            cores: ["Branco", "Azul"],
            tamanho: "36-43",
            avaliacao: 4.6,
            desconto: 5,
            fornecedor: "Adidas",
            idUsuario: logado.id,
            categoria: "Basquete"
        },
        {
            nome: "Nike Dunk Low Retro",
            descricao: "Inspirado no basquete dos anos 80, o Dunk Low retorna com cores clássicas e design atemporal para o estilo urbano.",
            preco: 999.99,
            quantidade: 15,
            urlImagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0c7f8996-85ec-4969-8c44-311d70253999/dunk-low-retro-shoes-7DAq8t.png",
            cores: ["Preto", "Branco"],
            tamanho: "37-44",
            avaliacao: 4.9,
            desconto: 0,
            fornecedor: "Nike",
            idUsuario: logado.id,
            categoria: "Skate"
        },
        {
            nome: "Adidas Samba OG",
            descricao: "O clássico tênis de futebol indoor que se tornou um ícone da cultura streetwear mundial.",
            preco: 599.99,
            quantidade: 22,
            urlImagem: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cd48b6755463484e8be63cbe08c435bf_9366/Tenis_Samba_OG_Verde_IG6175_01_standard.jpg",
            cores: ["Verde", "Branco"],
            tamanho: "36-42",
            avaliacao: 4.5,
            desconto: 15,
            fornecedor: "Adidas",
            idUsuario: logado.id,
            categoria: "Futebol"
        },
        {
            nome: "Nike Air Max 270",
            descricao: "Tênis com a maior unidade Air Max até hoje, proporcionando conforto incrível e estilo futurista.",
            preco: 1099.99,
            quantidade: 12,
            urlImagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7c6d80c-8860-4e33-9b5e-4b7b14fefd29/air-max-270-shoes-Pgb94t.png",
            cores: ["Preto", "Branco"],
            tamanho: "38-45",
            avaliacao: 4.4,
            desconto: 8,
            fornecedor: "Nike",
            idUsuario: logado.id,
            categoria: "Casual"
        },
        {
            nome: "Adidas Superstar",
            descricao: "O lendário tênis com capa de shell toe que se tornou um ícone da cultura sneaker mundial.",
            preco: 549.99,
            quantidade: 28,
            urlImagem: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9c1c731905914d8b8141938dd1cfc686_9366/Tenis_Superstar_II_Branco_JQ3208_01_00_standard.jpg",
            cores: ["Branco", "Preto"],
            tamanho: "35-44",
            avaliacao: 4.7,
            desconto: 0,
            fornecedor: "Adidas",
            idUsuario: logado.id,
            categoria: "Casual"
        },
        {
            nome: "Nike Jordan 1 Retro High",
            descricao: "O tênis que iniciou tudo. O AJ1 Retro High mantém o design clássico que você ama com conforto moderno.",
            preco: 1299.99,
            quantidade: 8,
            urlImagem: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7aae4571-018c-4b25-9b4a-1b1b85e65e6b/air-jordan-1-retro-high-og-shoes-Pz6fZ9.png",
            cores: ["Vermelho", "Preto", "Branco"],
            tamanho: "40-45",
            avaliacao: 4.9,
            desconto: 0,
            fornecedor: "Nike Jordan",
            idUsuario: logado.id,
            categoria: "Basquete"
        }
    ];

    // 🔧 FUNÇÃO FINAL CORRETA
    const adicionarTodosTenis = async () => {
        setLoading(true);
        setResultado('🎯 INICIANDO ADIÇÃO EM LOTE DE TÊNIS...\n');
        console.log("🎯 INICIANDO ADIÇÃO EM LOTE - ORDEM CORRETA");

        try {
            const ProdutoService = require('../service/DAO/Produto.Service');
            
            // 🔍 Buscar produtos existentes
            const produtosAntes = await ProdutoService.getProdutos();
            setResultado(prev => prev + `📦 Produtos antes: ${produtosAntes.length}\n\n`);

            let sucessos = 0;
            let falhas = 0;

            // 🚀 Adicionar cada tênis individualmente
            for (const tenis of tenisParaAdicionar) {
                try {
                    console.log(`➡️ Adicionando: ${tenis.nome}`);
                    
                    // ✅ ORDEM PERFEITA BASEADA NO SEU CONSTRUTOR:
                    const produtoNovo = new Produto(
                        tenis.nome,           // 1º - nome
                        tenis.descricao,      // 2º - descricao
                        tenis.preco,          // 3º - preco
                        tenis.quantidade,     // 4º - quantidade
                        tenis.urlImagem,      // 5º - urlImagem
                        tenis.cores,          // 6º - cores
                        tenis.tamanho,        // 7º - tamanho
                        tenis.avaliacao,      // 8º - avaliacao
                        tenis.desconto,       // 9º - desconto
                        tenis.fornecedor,     // 10º - fornecedor
                        tenis.idUsuario,      // 11º - idUsuario
                        tenis.categoria       // 12º - categoria
                    );

                    console.log("📦 Produto criado (ORDEM PERFEITA):", produtoNovo);
                    
                    const resultadoAdd = await ProdutoService.addProduto(produtoNovo);
                    console.log("✅ Resultado:", resultadoAdd);

                    if (resultadoAdd.success) {
                        setResultado(prev => prev + `✅ ${tenis.nome} - ADICIONADO\n`);
                        sucessos++;
                    } else {
                        const erroMsg = resultadoAdd.errors?.join(', ') || 'Erro desconhecido';
                        setResultado(prev => prev + `❌ ${tenis.nome} - ${erroMsg}\n`);
                        falhas++;
                    }
                } catch (error) {
                    console.error(`💥 Erro em ${tenis.nome}:`, error);
                    setResultado(prev => prev + `💥 ${tenis.nome} - ${error.message}\n`);
                    falhas++;
                }
            }

            // 📊 Buscar produtos após adição
            const produtosDepois = await ProdutoService.getProdutos();
            
            // 🎯 RESUMO FINAL
            setResultado(prev => prev + `\n🎯 RESUMO FINAL:\n`);
            setResultado(prev => prev + `✅ Sucessos: ${sucessos}\n`);
            setResultado(prev => prev + `❌ Falhas: ${falhas}\n`);
            setResultado(prev => prev + `📦 Total de produtos: ${produtosDepois.length}`);
            
            setProdutos(produtosDepois);

        } catch (error) {
            console.error("💥 ERRO GERAL:", error);
            setResultado(prev => prev + `\n💥 ERRO GERAL: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 🔍 TESTE APENAS BUSCA
    const testarApenasBusca = async () => {
        setLoading(true);
        setResultado('🔍 BUSCANDO PRODUTOS...');

        try {
            const ProdutoService = require('../service/DAO/Produto.Service');
            const produtos = await ProdutoService.getProdutos();
            
            setResultado(`📦 ${produtos.length} PRODUTOS ENCONTRADOS`);
            setProdutos(produtos);
            
            console.log("Produtos encontrados:", produtos);
        } catch (error) {
            setResultado(`💥 ERRO NA BUSCA: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 🧪 TESTE ADICIONAR APENAS UM (PARA DEBUG)
    const adicionarApenasUm = async (index) => {
        setLoading(true);
        
        try {
            const ProdutoService = require('../service/DAO/Produto.Service');
            const tenis = tenisParaAdicionar[index];
            
            console.log(`🧪 Testando apenas: ${tenis.nome}`);
            
            const produtoNovo = new Produto(
                tenis.nome,
                tenis.descricao,
                tenis.preco,
                tenis.quantidade,
                tenis.urlImagem,
                tenis.cores,
                tenis.tamanho,
                tenis.avaliacao,
                tenis.desconto,
                tenis.fornecedor,
                tenis.idUsuario,
                tenis.categoria
            );

            console.log("🧪 Produto de teste:", produtoNovo);
            
            const resultadoAdd = await ProdutoService.addProduto(produtoNovo);
            setResultado(`🧪 ${tenis.nome}: ${resultadoAdd.success ? '✅ SUCESSO' : '❌ FALHA'}`);
            
        } catch (error) {
            setResultado(`💥 ERRO: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>👟 TESTE - CATÁLOGO DE TÊNIS</Text>
            <Text style={styles.subtitle}>Ordem CORRETA encontrada! 🎯</Text>

            {/* BOTÕES PRINCIPAIS */}
            <View style={styles.botoes}>
                <Button 
                    mode="contained" 
                    onPress={adicionarTodosTenis}
                    loading={loading}
                    disabled={loading}
                    style={styles.botaoPrincipal}
                    icon="shoe-sneaker"
                >
                    Adicionar Todos (8 Tênis)
                </Button>

                <Button 
                    mode="outlined" 
                    onPress={() => adicionarApenasUm(0)}
                    style={styles.botaoTeste}
                    icon="test-tube"
                >
                    Teste Apenas 1 Produto
                </Button>

                <Button 
                    mode="outlined" 
                    onPress={testarApenasBusca}
                    loading={loading}
                    disabled={loading}
                    style={styles.botao}
                    icon="magnify"
                >
                    Buscar Produtos
                </Button>

                <Button 
                    mode="outlined" 
                    onPress={() => {
                        setResultado('');
                        setProdutos([]);
                    }}
                    style={styles.botao}
                    icon="delete"
                    color="#f44336"
                >
                    Limpar Resultados
                </Button>
            </View>

            {/* LOADING */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6200ee" />
                    <Text style={styles.loadingText}>Processando...</Text>
                </View>
            )}

            {/* RESULTADO */}
            {resultado ? (
                <Card style={styles.resultadoCard}>
                    <Card.Content>
                        <Text style={styles.resultadoTitle}>📋 RESULTADO:</Text>
                        <Text style={styles.resultadoText}>{resultado}</Text>
                    </Card.Content>
                </Card>
            ) : null}

            {/* LISTA DE PRODUTOS */}
            {produtos.length > 0 && (
                <View style={styles.produtosContainer}>
                    <Text style={styles.produtosTitle}>
                        📦 PRODUTOS NO SISTEMA ({produtos.length})
                    </Text>
                    <ScrollView style={styles.produtosScroll}>
                        {produtos.map((produto, index) => (
                            <Card key={index} style={styles.produtoCard}>
                                <Card.Content>
                                    <Text style={styles.produtoNome}>{produto.nome}</Text>
                                    <Text style={styles.produtoPreco}>R$ {produto.preco}</Text>
                                    <Text style={styles.produtoCategoria}>Categoria: {produto.categoria}</Text>
                                    <Text style={styles.produtoFornecedor}>Fornecedor: {produto.fornecedor}</Text>
                                    <Text style={styles.produtoInfo}>
                                        ID: {produto.id} | User: {produto.idUsuario}
                                    </Text>
                                </Card.Content>
                            </Card>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: '#f5f5f5' 
    },
    title: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 5,
        color: '#333'
    },
    subtitle: { 
        textAlign: 'center', 
        marginBottom: 20, 
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: 'bold'
    },
    botoes: { 
        gap: 12, 
        marginBottom: 20 
    },
    botaoPrincipal: { 
        paddingVertical: 8,
        backgroundColor: '#6200ee'
    },
    botao: { 
        paddingVertical: 6 
    },
    botaoTeste: {
        paddingVertical: 6,
        borderColor: '#ff9800'
    },
    loadingContainer: {
        alignItems: 'center',
        marginVertical: 15
    },
    loadingText: {
        marginTop: 8,
        color: '#666'
    },
    resultadoCard: { 
        backgroundColor: '#e8f5e8', 
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50'
    },
    resultadoTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
        fontSize: 16,
        color: '#2E7D32'
    },
    resultadoText: { 
        fontSize: 14, 
        lineHeight: 20,
        color: '#333'
    },
    produtosContainer: {
        flex: 1
    },
    produtosTitle: { 
        fontWeight: 'bold', 
        marginBottom: 12,
        fontSize: 16,
        color: '#333'
    },
    produtosScroll: {
        flex: 1
    },
    produtoCard: { 
        marginBottom: 10,
        backgroundColor: 'white'
    },
    produtoNome: { 
        fontWeight: 'bold', 
        fontSize: 15,
        color: '#333'
    },
    produtoPreco: { 
        color: '#4CAF50', 
        fontWeight: '600',
        fontSize: 14,
        marginTop: 4
    },
    produtoCategoria: {
        fontSize: 12,
        color: '#666',
        marginTop: 2
    },
    produtoFornecedor: {
        fontSize: 12,
        color: '#666',
        marginTop: 2
    },
    produtoInfo: { 
        fontSize: 10, 
        color: '#999',
        marginTop: 4
    }
});