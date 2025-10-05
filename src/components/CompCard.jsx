import { Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
export default function CompCard({ source }) {
    return (
        <Card mode="elevated" style={styles.card}>
                <Card.Content source={source}>
                <Text variant="titleLarge">Card Title</Text>
                <Text variant="bodyMedium">Card content</Text>
                </Card.Content>
            </Card>
    );
}
const styles = StyleSheet.create({
    card: {
    width: 160, 
    height: 300, 
    marginBottom: 10,
    }}
);
