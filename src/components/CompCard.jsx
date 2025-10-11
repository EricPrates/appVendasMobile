import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Surface} from "react-native-paper";
export default function CompCard({ source }) {
    return (


        <Surface style={styles.card} elevation={4}>
            <Card.Cover style={{ borderWidth: 1, borderColor: '#0c0c0cff' }} source={{ uri: `https://picsum.photos/200/300?random=${source}` }} />
            <Card.Content  style={{ alignItems: 'center', padding: 8,borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#0c0c0cff' }}>
                <Text style = {{fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'center', borderBottomWidth: 2, borderBottomColor: '#0c0c0cff'}} variant="titleLarge">Nome: </Text>
                <Text style = {{fontSize: 16, color: '#0c0b0bff', textAlign: 'center'}} variant="bodyMedium">Preço: R$ 99,99</Text>
            </Card.Content>
        </Surface>
    );
}
const styles = StyleSheet.create({
    card: {
    width: 160, 
    marginBottom: 10,
    backgroundColor: '#ffffffff',
 
    
    }}
);
