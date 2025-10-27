import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollViewComponent, StyleSheet, View, ScrollView, TouchableOpacity, Button, Text, TextInput } from "react-native";
import { AuthProvider, useAuth } from "../components/Provider";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import CompCard from "../components/CompCard";

import ViewBase from "./ViewBase";
import { ProdutoController } from "../components/controller/Produto.controller";


export default function Home({ navigation }) {
    const { buscarProdutos, searchQuery, filtroVisible } = useAuth();
    const produtoController = ProdutoController();
    const [produtos, setProdutos] = useState([]);
     const [tabAtiva, setTabAtiva] = useState('home');
     const [error, setError] = useState(null);
     const [tipoFiltro, setTipoFiltro] = useState(null);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

   useEffect( () => {
    const carregarProdutos = async () => {
        try {
            const todosProdutos = await produtoController.getProdutos();
            setProdutos(todosProdutos);
        }
        catch (error) {
            setError(error);
        }
    }
    carregarProdutos();
   }, []);

   useEffect( () => {
       const buscarNomeOuCategoria = async () => {
        setError(null);
           try {
               if(buscarProdutos && searchQuery) {
                   const produtosFiltrados = await buscarProdutos(searchQuery);
                   if (produtosFiltrados.success) {
                       setProdutos(produtosFiltrados.data);
                   }
                   if(produtosFiltrados.errors){
                    setProdutos([]);
                       setError(produtosFiltrados.errors);
                   }

               }
               
           }
           catch (error) {
               console.error("Erro ao filtrar produtos:", error);
           }
       }
       buscarNomeOuCategoria();
   }, [searchQuery]);
   const pesquisarPorCategoria = async (categoria) => {
        setCategoriaSelecionada(categoria);
        try {
            const produtosFiltrados = await produtoController.getProdutosByCategoria(categoria);
            if (produtosFiltrados.success) {
                setProdutos(produtosFiltrados.data);
            }
            if (produtosFiltrados.errors) {
                setProdutos([]);
                setError(produtosFiltrados.errors);
            }
        }
        catch (error) {
            console.error("Erro ao filtrar produtos por categoria:", error);
        }
   }
    return (
    
        <ViewBase tabAtiva = {tabAtiva}>
            { filtroVisible && (
        <View style={styles.filtroContainer}>
    <Text style={styles.filtroTitulo}>Filtrar por</Text>
    
    <View style={styles.filtrosGrid}>
        <TouchableOpacity 
            style={[
                styles.filterElement,
                tipoFiltro === 'preco' && styles.filterElementAtivo
            ]} 
            onPress={() => setTipoFiltro('preco')}
        >
            <Text style={styles.filterIcon}>💰</Text>
            <Text style={styles.filterText}>Preço</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
            style={[
                styles.filterElement,
                tipoFiltro === 'categoria' && styles.filterElementAtivo
            ]} 
            onPress={() => setTipoFiltro('categoria')}
        >
            <Text style={styles.filterIcon}>📁</Text>
            <Text style={styles.filterText}>Categoria</Text>
        </TouchableOpacity>
        
        
    </View>

    {tipoFiltro === 'preco' && (
        <View style={styles.filtroDetalhes}>
            <Text style={styles.filtroSubtitulo}>Faixa de Preço</Text>
            
            <TextInput 
                placeholder="Valor mínimo" 
                placeholderTextColor="#999"
                style={styles.input} 
                keyboardType="numeric"
                onChange={(text) => console.log(text)}
            />
            
            <TextInput 
                placeholder="Valor máximo" 
                placeholderTextColor="#999"
                style={styles.input} 
                keyboardType="numeric"
            />
            
            <TouchableOpacity style={styles.botaoAplicar}>
                <Text style={styles.botaoAplicarTexto}>Aplicar Filtro</Text>
            </TouchableOpacity>
        </View>
    )}

    {tipoFiltro === 'categoria' && (
        <View style={styles.filtroDetalhes}>
            <Text style={styles.filtroSubtitulo}>Categorias</Text>

            <TouchableOpacity style={[styles.opcaoCategoria, categoriaSelecionada === 'casual' && styles.opcaoCategoriaAtiva]} onPress={() => pesquisarPorCategoria('casual')}>
                <Text style={styles.opcaoTexto}>👟 Casual</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.opcaoCategoria, categoriaSelecionada === 'corrida' && styles.opcaoCategoriaAtiva]} onPress={() => pesquisarPorCategoria('corrida')}>
                <Text style={styles.opcaoTexto}>🏃 Corrida</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.opcaoCategoria, categoriaSelecionada === 'basquete' && styles.opcaoCategoriaAtiva]} onPress={() => pesquisarPorCategoria('basquete')}>
                <Text style={styles.opcaoTexto}>🏀 Basquete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.opcaoCategoria, categoriaSelecionada === 'futebol' && styles.opcaoCategoriaAtiva]} onPress={() => pesquisarPorCategoria('futebol')}>
                <Text style={styles.opcaoTexto}>⚽ Futebol</Text>
            </TouchableOpacity>
        </View>
    )}
</View>
    )}
            <View style={styles.content}>
                {produtos.length > 0 && produtos.map((produto) => (
                <TouchableOpacity key={produto.id} onPress={async () => navigation.navigate('DetalhesProduto', { produto })} >
                        <CompCard  source={produto.urlImagem} object={produto} nome={produto.nome} preco={produto.preco} />
                    </TouchableOpacity>
                    
                ))}
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}> {error}</Text>
                    </View>
                )}

            </View>
           <View>
            </View>
        </ViewBase>
    
    );
}
const styles = StyleSheet.create({
    root: {
      flex: 1,
        backgroundColor: '#f6f6f6',
        display: 'flex',
        
    },
    content: {
    
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 16,
      gap: 3,
      position: 'relative',
    
    },
     bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 8,
        shadowColor: '#000',
        height: 70,
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    
    },
   filtroContainer: {
        width: 220,
        position: 'absolute',
        right: 20,
        top: 0,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        margin: 0,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#ffd8cc',
        zIndex: 1000,
    },
    filtroTitulo: {
        color: '#2c2c2c',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#ff6b35',
        paddingBottom: 8,
    },
    filtrosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 5,
    },
    filterElement: {
        backgroundColor: '#e55a2b7a',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
        minHeight: 70,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    filterElementAtivo: {
        backgroundColor: '#e55a2b',
        transform: [{ scale: 1.1 }],
        borderWidth: 2,
        borderColor: '#f6e930ff',
        elevation: 4,
    },
    filterIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    filterText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
        textAlign: 'center',
    },
    filtroDetalhes: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    filtroSubtitulo: {
        color: '#2c2c2c',
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 12,
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 12,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ff6b35',
        fontSize: 14,
        color: '#2c2c2c',
    },
    botaoAplicar: {
        backgroundColor: '#ff6b35',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
    },
    botaoAplicarTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    opcaoCategoria: {
        backgroundColor: '#fdfaf9ab',
        padding: 12,
        borderRadius: 8,
        marginVertical: 4,
        borderWidth: 2,
        borderColor: '#ff6b35',
    },
    opcaoCategoriaAtiva: {
        backgroundColor: '#ff6b35',
    },
    opcaoTexto: {
      
        color: '#000000ff',
        fontSize: 14,
        fontWeight: '500',
    },
});
