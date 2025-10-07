import { StyleSheet,Text } from "react-native";
import BarraBaixa from "../components/BarraBaixa";
import Cabecalho from "../components/Cabecalho";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useAuth } from "../components/Provider";
import { useState } from "react";
import { Icon, PaperProvider } from "react-native-paper";
import ViewBase from "./ViewBase";

export default function Carrinhos({ navigation }) {
    
    const [tabAtiva, setTabAtiva] = useState('carrinho');
    const { nome, signOut } = useAuth();
    return (
      
        <ViewBase tabAtiva = {tabAtiva}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16, textAlign: 'center',borderWidth: 1, borderRadius: 8 }}><Icon  source="cart" size={30} /> Carrinho de {nome}</Text>
        </ViewBase>
        
    );
}
const styles = StyleSheet.create({

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
root: {
      flex: 1,
        backgroundColor: '#f6f6f6',
        display: 'flex',

    },
});