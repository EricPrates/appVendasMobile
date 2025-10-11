import { StyleSheet, Text, View } from "react-native";
import ViewBase from "./ViewBase";
import CompCard from "../components/CompCard";

export default function DetalhesProduto({ desconto, valorSemDesconto, avaliacao }) {
    return (
        <ViewBase tabAtiva = 'detalhesProduto'>
         
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Detalhes do Produto</Text>
                <Text style={styles.headerSubtitle}>Informações completas 👟</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.cardContainer}>
                    <CompCard style={styles.productCard} source='foto1'/>
                </View>
                
                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Nome:</Text>
                        <Text style={styles.detailValue}></Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Descrição:</Text>
                        <Text style={styles.detailValue}></Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Preço:</Text>
                        <Text style={[styles.detailValue, styles.price]}>R$ 299,99</Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Estoque:</Text>
                        <Text style={styles.detailValue}></Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Categoria:</Text>
                        <Text style={styles.detailValue}></Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Fornecedor:</Text>
                        <Text style={styles.detailValue}></Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Avaliação:</Text>
                        <Text style={[styles.detailValue, styles.rating]}>★★★★☆ (4.8/5)</Text>
                    </View>
                </View>
            </View>
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
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        fontWeight: '500',
    },
    content: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
        gap: 16,
    },
    cardContainer: {
        alignItems: 'center',
        width: '100%',
    },
    productCard: {
        marginBottom: 10,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderLeftWidth: 4,
        borderLeftColor: '#ff6b35',
        gap: 12,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c2c2c',
        flex: 1,
    },
    detailValue: {
        fontSize: 16,
        color: '#666',
        flex: 2,
        textAlign: 'right',
        fontWeight: '500',
    },
    price: {
        color: '#ff6b35',
        fontWeight: 'bold',
        fontSize: 18,
    },
    rating: {
        color: '#ff9f43',
        fontWeight: 'bold',
    },
});