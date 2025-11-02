import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollViewComponent, StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useAuth } from "../components/Provider";
import { use, useEffect, useState } from "react";
import BarraBaixa from "../components/BarraBaixa";
import CompCard from "../components/CompCard";
import Cabecalho from "../components/Cabecalho";
import ViewBase from "./ViewBase";
import { Button, Icon, PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { logoutUsuario } from "../service/DAO/User.Service";


export default function Favoritos({  }) {

    const {  userController, nome} = useAuth();
    const [tabAtiva, setTabAtiva] = useState('favoritos');  
    const navigation = useNavigation();
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favs = userController.getFavoritos();
    setFavoritos(favs);

    }, [, userController]);



    return (
        
        <ViewBase tabAtiva = {tabAtiva}>
        
            <View style={styles.header}>
                            <View style={styles.titleContainer}>
                                <Icon source="heart" size={32} color="#fff" />
                                <Text style={styles.title}>Meus Favoritos</Text>
                            </View>
                            <Text style={styles.subtitle}>{nome}, confira seus produtos!</Text>
        </View>
            <View style={styles.content}>
                {favoritos.length > 0 ? (
                    favoritos.map((produto) => (
                      <TouchableOpacity key={produto.id} onPress={() =>{ navigation.navigate('DetalhesProduto', { produto })} }>
                            <CompCard  id={produto.id} source={produto.urlImagem} object={produto} nome={produto.nome} preco={produto.preco} />
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyFavoritos}>
                        <Icon source="heart-off" size={80} color="#ccc" />
                        <Text style={styles.emptyFavoritosText}>Sua lista de favoritos está vazia</Text>
                        <Text style={styles.emptyFavoritosSubtext}>
                            Adicione alguns tênis incríveis! 👟
                        </Text>
                        <Button 
                            mode="contained" 
                            style={styles.shopButton}
                            labelStyle={styles.shopButtonText}
                            onPress={() => navigation.navigate('Home')}
                        >
                            Começar a Comprar
                        </Button>
                    </View>
                )}
            </View>
            {
                favoritos.length > 0 ? <TouchableOpacity style={styles.removeFavoritos} onPress={() => {userController.removeFavoritos();}}>
                    <Text style= {{ color: '#fff', fontWeight: 'bold' }}>Remover todos os favoritos</Text>
                </TouchableOpacity> : null
            }
            
        </ViewBase>
        
        
    );
}
const styles = StyleSheet.create({
      header: {
        backgroundColor: '#ff6b35',
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
 emptyFavoritos: {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
    },
    emptyFavoritosText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyFavoritosSubtext: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 24,
    },
});
