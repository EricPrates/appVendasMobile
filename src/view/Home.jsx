import { SafeAreaView } from "react-native-safe-area-context";
import { MD2Colors, MD3Colors, Searchbar, Text, TextInput } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollViewComponent, StyleSheet, View, ScrollView } from "react-native";
import { Appbar, Card } from "react-native-paper";
import { AuthProvider, useAuth } from "../components/Provider";
import { useState } from "react";
import { BottomNavigation } from 'react-native-paper';
import BarraBaixa from "../components/BarraBaixa";
import CompCard from "../components/CompCard";
import Cabecalho from "../components/Cabecalho";

export default function Home({ navigation }) {
    const { nome, signOut } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [tabAtiva, setTabAtiva] = useState('home');
    
    return (
        <SafeAreaView style={styles.root}>
             <Cabecalho navigation={navigation}/>
        
        <ScrollView  >
           

            <View style={styles.content}>
            <CompCard source = 'foto1'/>
            <CompCard source = 'foto2'/>
            <CompCard source = 'foto3'/>
            <CompCard source = 'foto4'/>
            <CompCard source = 'foto5'/>
            <CompCard source = 'foto6'/>
            <CompCard source = 'foto7'/>
            <CompCard source = 'foto8'/>
            </View>
            
        </ScrollView>
       <BarraBaixa tabAtiva={tabAtiva} style={styles.bottomNav}/>
</SafeAreaView>
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
      gap: 3
      
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
