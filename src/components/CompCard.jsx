import { Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";

export default function CompCard({ source }) {
    return (
        <Surface style={styles.card} elevation={8}>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>🔥 POPULAR</Text>
            </View>
            
           
            <Card.Cover 
                style={styles.cardImage} 
                source={{ uri: `https://picsum.photos/200/300?random=${source}` }} 
            />
            
            <Card.Content style={styles.cardContent}>
                <Text style={styles.productName} variant="titleLarge">
                    Tênis Esportivo
                </Text>
                <Text style={styles.productCategory} variant="bodyMedium">
                    Corrida & Performance
                </Text>
                
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>R$ 299,99</Text>
                    <Text style={styles.oldPrice}>R$ 399,99</Text>
                </View>
                
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>25% OFF</Text>
                </View>
                
               
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>⭐ 4.8</Text>
                    <Text style={styles.reviews}>(128 reviews)</Text>
                </View>
            </Card.Content>
        </Surface>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        margin: 6,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f0f0f0',
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
        zIndex: 2,
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
        height: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 0,
        backgroundColor: '#f8f9fa',
    },
    cardContent: {
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c2c2c',
        textAlign: 'center',
        marginBottom: 4,
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
        marginBottom: 6,
        gap: 6,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff6b35',
        textAlign: 'center',
    },
    oldPrice: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        textDecorationLine: 'line-through',
        fontWeight: '500',
    },
    discountBadge: {
        position: 'absolute',
        top: -8,
        right: 12,
        backgroundColor: '#4ecdc4',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        elevation: 2,
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