import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Surface} from "react-native-paper";
export default function CompCard({ source }) {
    return (


        <Surface style={styles.card} elevation={4}>
            <Card.Cover source={{ uri: `https://picsum.photos/200/300?random=${source}` }} />
            <Card.Content>
                <Text variant="titleLarge">Card Title</Text>
                <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
        </Surface>
    );
}
const styles = StyleSheet.create({
    card: {
    width: 160, 
    height: 300, 
    marginBottom: 10,
    backgroundColor: '#ffffffff',
    borderRadius: 12,
    
    }}
);
