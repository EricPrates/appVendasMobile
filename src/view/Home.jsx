import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollViewComponent, StyleSheet, View, ScrollView, TouchableOpacity, Button } from "react-native";
import { AuthProvider, useAuth } from "../components/Provider";
import { useEffect, useEffectEvent, useState } from "react";
import BarraBaixa from "../components/BarraBaixa";
import CompCard from "../components/CompCard";
import Cabecalho from "../components/Cabecalho";
import ViewBase from "./ViewBase";
import { PaperProvider } from "react-native-paper";
import Insercoes from "../components/insercoes";
import { ProdutoController } from "../components/controller/Produto.controller";
export default function Home({ navigation }) {
    const produtoController = ProdutoController();
    const [produtos, setProdutos] = useState([]);
   useEffect( () => {
    const carregarProdutos = async () => {
        try {
            const BuscarProdutos = await produtoController.getProdutos();
            setProdutos(BuscarProdutos);
        }
        catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    }
    carregarProdutos();
   }, []);
    
    const [tabAtiva, setTabAtiva] = useState('home');
    
    return (
    
        <ViewBase tabAtiva = {tabAtiva}>
            <View style={styles.content}>
                { produtos.map((produto) => (
                <TouchableOpacity key={produto.id} onPress={async () => navigation.navigate('DetalhesProduto', { produto })} >
                        <CompCard key={produto.id} source={produto.urlImagem} object={produto} nome={produto.nome} preco={produto.preco} />
                    </TouchableOpacity>
                    
                ))}
                
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
   
    
});
