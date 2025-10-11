import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollViewComponent, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "../components/Provider";
import { useState } from "react";
import BarraBaixa from "../components/BarraBaixa";
import CompCard from "../components/CompCard";
import Cabecalho from "../components/Cabecalho";
import ViewBase from "./ViewBase";
import { PaperProvider } from "react-native-paper";
export default function Home({ navigation }) {

   
    
    const [tabAtiva, setTabAtiva] = useState('home');
    
    return (
    
        <ViewBase tabAtiva = {tabAtiva}>
            <View style={styles.content}>
            <TouchableOpacity onPress={() => navigation.navigate('DetalhesProduto')}>
                <CompCard source = 'foto1'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('favoritos')}>
                <CompCard source = 'foto2'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('foto3')}>
                <CompCard source = 'foto3'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('foto4')}>
                <CompCard source = 'foto4'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('foto5')}>
                <CompCard source = 'foto5'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('foto6')}>
                <CompCard source = 'foto6'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('foto7')}>
                <CompCard source = 'foto7'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('foto8')}>
                <CompCard source = 'foto8'/>
                </TouchableOpacity>
            </View>
        </ViewBase>
    
    );
}
const styles = StyleSheet.create({
    root: {
      flex: 1,
        backgroundColor: '#f6f6f6',
        display: 'flex',
        
    },
    content: {
    
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 16,
      gap: 3,
      position: 'relative',
    
    },
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
   
    
});
