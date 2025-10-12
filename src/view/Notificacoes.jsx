import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollViewComponent, StyleSheet, View, ScrollView, Text } from "react-native";
import { AuthProvider, useAuth } from "../components/Provider";
import { useState } from "react";
import BarraBaixa from "../components/BarraBaixa";
import CompCard from "../components/CompCard";
import Cabecalho from "../components/Cabecalho";
import ViewBase from "./ViewBase";
import { Card, Icon, PaperProvider, Title } from "react-native-paper";

export default function Notificacoes({ navigation }) {

    const [tabAtiva, setTabAtiva] = useState('notificacoes');
    
    return (

        <ViewBase  tabAtiva={tabAtiva}>
            <View style={styles.root}>
            <View style = {{marginTop: 10}}>
               <Card>
                   <Card.Content>
                        <Icon name="bell" />
                        <Text>Notificação 1</Text>
                   </Card.Content>
               </Card>
            </View>
             <View style={styles.root}>
               <Card>
                   <Card.Content>
                        <Icon name="bell" />
                        <Text>Notificação 1</Text>
                   </Card.Content>
               </Card>
            </View>
             <View style={styles.root}>
               <Card>
                   <Card.Content>
                        <Icon name="bell" />
                        <Text>Notificação 1</Text>
                   </Card.Content>
               </Card>
            </View>
             <View style={styles.root}>
               <Card>
                   <Card.Content>
                        <Icon name="bell" />
                        <Text>Notificação 1</Text>
                   </Card.Content>
               </Card>
            </View>
             <View style={styles.root}>
               <Card>
                   <Card.Content>
                        <Icon name="bell" />
                        <Text>Notificação 1</Text>
                   </Card.Content>
               </Card>
            </View>
             <View style={styles.root}>
               <Card>
                   <Card.Content>
                        <Icon name="bell" />
                        <Text>Notificação 1</Text>
                   </Card.Content>
               </Card>
            </View>
            </View>

        </ViewBase>
        
        
    );
}
const styles = StyleSheet.create({
    root: {
      flex: 1,
        backgroundColor: '#f6f6f6',
        display: 'flex',
        gap:20
    },
    content: {
    
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 16,
      gap: 3,
      width: 300,

      
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
