import { StyleSheet, Text, View } from "react-native";
import ViewBase from "./ViewBase";
import CompCard from "../components/CompCard";

export default function DetalhesProduto() {
    return (
        <ViewBase tabAtiva = 'detalhesProduto'>
                <Text style={[styles.text, { margin: 5, textAlign: 'center' }]}>Detalhes do Produto</Text>
            <View style={[styles.content, { gap: 10, borderWidth: 1, borderColor: '#0d0303ff', padding: 20, borderRadius: 10, margin: 16 }]}>
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <CompCard style={{ marginBottom: 10 }} source = 'foto1'/>
                </View>
                <Text style={styles.text}>Nome: Produto Exemplo</Text>
                <Text style={styles.text}>Descrição: Este é um produto de exemplo.</Text>
                <Text style={styles.text}>Preço: R$ 99,99</Text>
                <Text style={styles.text}>Estoque: 10</Text>
                <Text style={styles.text}>Categoria: Exemplos</Text>
                <Text style={styles.text}>Fornecedor: Fornecedor Exemplo</Text>
                
                <Text style={styles.text}>Avaliação: ★★★★☆</Text>
            </View>
        </ViewBase>
    );
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        shadowOpacity: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 16,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',
    },
});