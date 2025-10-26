import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollViewComponent, StyleSheet, View, ScrollView, TouchableOpacity, Button, Text } from "react-native";
import { AuthProvider, useAuth } from "../components/Provider";
import { use, useEffect, useEffectEvent, useState } from "react";
import BarraBaixa from "../components/BarraBaixa";
import CompCard from "../components/CompCard";
import Cabecalho from "../components/Cabecalho";
import ViewBase from "./ViewBase";
import { PaperProvider } from "react-native-paper";
import Insercoes from "../components/insercoes";
import { ProdutoController } from "../components/controller/Produto.controller";

export default function Home({ navigation }) {
    const { buscarProdutos, searchQuery } = useAuth();
    const produtoController = ProdutoController();
    const [produtos, setProdutos] = useState([]);
     const [tabAtiva, setTabAtiva] = useState('home');
     const [error, setError] = useState(null);

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
       const filtrarProdutosNome = async () => {
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
       filtrarProdutosNome();
   }, [searchQuery]);
    return (
    
        <ViewBase tabAtiva = {tabAtiva}>
            <View style={styles.content}>
                {!error && produtos.map((produto) => (
                <TouchableOpacity key={produto.id} onPress={async () => navigation.navigate('DetalhesProduto', { produto })} >
                        <CompCard  source={produto.urlImagem} object={produto} nome={produto.nome} preco={produto.preco} />
                    </TouchableOpacity>
                    
                ))}
                {error && 
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}> {error}</Text>
                    </View>
                }
                
            </View>
            <Button title="Testar Model" onPress={() => navigation.navigate('insercoes')} />
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
    },
});
