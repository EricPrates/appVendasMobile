import { StyleSheet } from "react-native";
import BarraBaixa from "../components/BarraBaixa";
import Cabecalho from "../components/Cabecalho";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useAuth } from "../components/Provider";
import { useState } from "react";

export default function Carrinhos({  }) {
    const { nome, signOut } = useAuth();
    const [tabAtiva, setTabAtiva] = useState('carrinho');
    return (
        <SafeAreaView style={styles.root}>
            <Cabecalho/>
            <ScrollView  >
            </ScrollView>
            <BarraBaixa tabAtiva={tabAtiva} style={styles.bottomNav}/>
        </SafeAreaView>
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