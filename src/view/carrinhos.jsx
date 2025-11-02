import { StyleSheet, Text, View, ScrollView} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../components/Provider";
import { Icon,  Card, Button } from "react-native-paper";
import ViewBase from "./ViewBase";

export default function Carrinhos({ navigation }) {
    const [tabAtiva, setTabAtiva] = useState('carrinho');
    const { nome, signOut } = useAuth();
    const { userController } = useAuth();
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {
        setCarrinho(userController.getCarrinho());
    }, []);

    const total = carrinho.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <ViewBase tabAtiva={tabAtiva}>
          
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Icon source="cart" size={32} color="#fff" />
                    <Text style={styles.title}>Meu Carrinho</Text>
                </View>
                <Text style={styles.subtitle}>{nome}, confira seus produtos! 🛒</Text>
            </View>

         
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {carrinho.length > 0 ? (
                    <View style={styles.itemsContainer}>
                        {carrinho.map((item, index) => (
                            <Card key={item.id} style={[styles.cartItem, index === 0 && styles.firstItem]}>
                                <Card.Content style={styles.itemContent}>
                                    <View style={styles.itemImageContainer}>
                                        <Card.Cover 
                                            source={{ uri: item.image }} 
                                            style={styles.itemImage}
                                        />
                                    </View>
                                    
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemSpecs}>
                                            Tamanho: {item.size} | Cor: {item.color}
                                        </Text>
                                        
                                        <View style={styles.itemActions}>
                                            <View style={styles.quantityContainer}>
                                                <Button 
                                                    mode="outlined" 
                                                    compact 
                                                    style={styles.quantityButton}
                                                    labelStyle={styles.quantityButtonText}
                                                >
                                                    -
                                                </Button>
                                                <Text style={styles.quantity}>{item.quantity}</Text>
                                                <Button 
                                                    mode="outlined" 
                                                    compact 
                                                    style={styles.quantityButton}
                                                    labelStyle={styles.quantityButtonText}
                                                >
                                                    +
                                                </Button>
                                            </View>
                                            
                                            <Text style={styles.itemPrice}>
                                                R$ {(item.price * item.quantity).toFixed(2)}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <Button 
                                        mode="text" 
                                        style={styles.removeButton}
                                        labelStyle={styles.removeButtonText}
                                    >
                                        <Icon source="delete" size={20} />
                                    </Button>
                                </Card.Content>
                            </Card>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyCart}>
                        <Icon source="cart-off" size={80} color="#ccc" />
                        <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
                        <Text style={styles.emptyCartSubtext}>
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
            </ScrollView>

            
            {carrinho.length > 0 && (
                <View style={styles.summaryContainer}>
                    <Card style={styles.summaryCard}>
                        <Card.Content>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal:</Text>
                                <Text style={styles.summaryValue}>R$ {total.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Frete:</Text>
                                <Text style={styles.summaryValue}>R$ 15,00</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Desconto:</Text>
                                <Text style={[styles.summaryValue, styles.discountText]}>- R$ 30,00</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.summaryRow}>
                                <Text style={styles.totalLabel}>Total:</Text>
                                <Text style={styles.totalValue}>
                                    R$ {(total + 15 - 30).toFixed(2)}
                                </Text>
                            </View>
                            
                            <Button 
                                mode="contained" 
                                style={styles.checkoutButton}
                                labelStyle={styles.checkoutButtonText}
                               
                            >
                                Finalizar Compra
                            </Button>
                        </Card.Content>
                    </Card>
                </View>
            )}
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
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    itemsContainer: {
        paddingVertical: 16,
        gap: 12,
    },
    firstItem: {
        marginTop: 8,
    },
    cartItem: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#ff6b35',
    },
    itemContent: {
        flexDirection: 'row',
        padding: 12,
    },
    itemImageContainer: {
        marginRight: 12,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c2c2c',
        marginBottom: 4,
    },
    itemSpecs: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    itemActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
        gap: 8,
    },
    quantityButton: {
        width: 36,
        height: 36,
        borderColor: '#ff6b35',
        borderWidth: 2,
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff6b35',
        marginBottom: 2,
        marginTop: -1
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c2c2c',
        marginHorizontal: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff6b35',
    },
    removeButton: {
        minWidth: 40,
        marginLeft: 8,
    },
    removeButtonText: {
        color: '#ff4757',
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
    },
    emptyCartText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyCartSubtext: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 24,
    },
    shopButton: {
        backgroundColor: '#ff6b35',
        paddingHorizontal: 24,
        borderRadius: 12,
        elevation: 4,
    },
    shopButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    summaryContainer: {
        padding: 16,
        paddingBottom: 24,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 14,
        color: '#2c2c2c',
        fontWeight: '500',
    },
    discountText: {
        color: '#4ecdc4',
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#e8e8e8',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c2c2c',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff6b35',
    },
    checkoutButton: {
        backgroundColor: '#ff6b35',
        marginTop: 16,
        paddingVertical: 8,
        borderRadius: 12,
        elevation: 4,
    },
    checkoutButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});