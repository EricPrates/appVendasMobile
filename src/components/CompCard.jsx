import { Card, IconButton, Text } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import { useAuth } from "./Provider";
import { useState } from "react";

export default function CompCard({id, source, nome, preco, avaliacao}) {
    const { setLoading, userController } = useAuth();
    const [refresh, setRefresh] = useState(0);
    
    const toggleFavorito = async (id) => {
        try {
            setLoading(true);

            if (userController.produtoEhFavorito(id)) {
                await userController.removerFavorito(id);
                
            } else {
                await userController.adicionarFavoritosUsuario(id);
                
                
            }
        } catch (error) {
            console.error('Erro ao favoritar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Surface style={styles.card} elevation={8}>
            <Image
                style={styles.cardImage}
                source={{ uri: source }}
            />
            
            <Card.Content style={styles.cardContent}>
                <Text style={styles.productName} variant="titleLarge">
                    {nome}
                </Text>
              
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>R$ {preco}</Text>
                </View>
                
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {avaliacao}</Text>
                </View>
                
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <IconButton
                            style={{ backgroundColor: '#ff6b35', borderWidth: 1, borderColor: '#ff6b35' }}
                            icon={"cart"}
                            iconColor="#fff"
                            size={24}
                            onPress={() => {}}
                        />
                        <IconButton
                            icon={userController.produtoEhFavorito(id) ? "heart" : "heart-outline"} 
                            size={24}
                            iconColor="#fff"
                            style={{ backgroundColor: '#ff6b35', borderWidth: 1, borderColor: '#ff6b35' }}
                            onPress={() => toggleFavorito(id)}
                        />
                    </View>
                </View>
            </Card.Content>
        </Surface>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 300,
        margin: 6,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ff4757',
        zIndex: 1,
        position: 'relative',
    },
    cardImage: {
        height: 150, 
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 0,
        backgroundColor: '#f8f9fa',
        resizeMode: 'cover', 
    },
    cardContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 12,
        paddingTop: 8,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2c2c2c',
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff6b35',
        textAlign: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        gap: 4,
    },
    rating: {
        fontSize: 12,
        color: '#ff9f43',
        fontWeight: 'bold',
    },
});