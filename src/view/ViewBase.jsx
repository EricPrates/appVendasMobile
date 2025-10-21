import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollViewComponent, StyleSheet, View, ScrollView, Text, FlatList } from "react-native";
import { useState } from "react";
import BarraBaixa from "../components/BarraBaixa";
import Cabecalho from "../components/Cabecalho";
import { AuthProvider, useAuth } from "../components/Provider";

export default function ViewBase({  children, showSearch= true, tabAtiva,  }) {
 
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView style={styles.root}>

            <Cabecalho tabAtiva={tabAtiva} />

        <FlatList
            data={children}
            renderItem={({ item }) => <View>{item}</View>}
            
        />
       <BarraBaixa tabAtiva = {tabAtiva}style={styles.bottomNav}/>
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
