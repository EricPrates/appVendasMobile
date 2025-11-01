import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollViewComponent, StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useAuth } from "../components/Provider";
import { useEffect, useState } from "react";
import BarraBaixa from "../components/BarraBaixa";
import CompCard from "../components/CompCard";
import Cabecalho from "../components/Cabecalho";
import ViewBase from "./ViewBase";
import { PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Favoritos({  }) {

    const { logado, userController, usuario } = useAuth();
    const [tabAtiva, setTabAtiva] = useState('favoritos');
    const [favoritos, setFavoritos] = useState();   
    const navigation = useNavigation();

useEffect(() => {

    console.log(userController.getFavoritos());

   
    
}, []);

    return (
        <PaperProvider>
        <ViewBase tabAtiva = {tabAtiva}>
            <View style={styles.content}>
                {favoritos ?(
                    favoritos.map((produto) => (
                        <TouchableOpacity  onPress={() => navigation.navigate('DetalhesProduto', { produto })} >
                        <CompCard source={produto.urlImagem} object={produto} nome={produto.nome} preco={produto.preco} key={produto.id} />
                    </TouchableOpacity>
                    ))
                ) : (
                    <Text style={{ textAlign: 'center', width: '100%' }}>Nenhum favorito encontrado</Text>
                )}
            </View>
            {
                favoritos? <TouchableOpacity style={styles.removeFavoritos} onPress={() => setFavoritos([])}>
                    <Text style= {{ color: '#fff', fontWeight: 'bold' }}>Remover todos os favoritos</Text>
                </TouchableOpacity> : null
            }
               
        </ViewBase>
        </PaperProvider>
        
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
      gap: 3
      
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
  removeFavoritos: {
    width: '80%',
    alignSelf: 'center',
    padding: 15,
    backgroundColor: '#ff6b35',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
   
   
},

});
