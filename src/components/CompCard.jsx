import { Card, Icon, IconButton, Text } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "./Provider";

export default function CompCard({ object, source, nome, preco, avaliacao,route }) {

    const { addFavorito } = useAuth();

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
                <Text style={styles.productCategory} variant="bodyMedium">
                    
                </Text>
                
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>R$ {preco}</Text>
                    <Text style={styles.discountText}>R$ {}</Text>
                </View>
                
                
                
               
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ {avaliacao}</Text>
                    <Text style={styles.reviews}></Text>
                </View>
                <View>
                    <IconButton
                       icon={"heart-outline"
                        
                       }
                   />
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
   
    badge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#ff4757',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
        textAlign: 'center',
    },
    cardImage: {
        height: '150',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 0,
        backgroundColor: '#f8f9fa',
        resizeMode: 'extend',
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
    productCategory: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
        fontWeight: '500',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
        gap: 6,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff6b35',
        textAlign: 'center',
    },
   
    
    discountText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
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
    reviews: {
        fontSize: 10,
        color: '#888',
        fontWeight: '500',
    },
});
