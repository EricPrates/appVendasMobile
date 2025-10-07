import * as React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button, Menu, Divider, PaperProvider, Provider, Modal } from 'react-native-paper';
import { useAuth } from './Provider';
import ViewBase from '../view/ViewBase';
import Lista from './Lista';

export default function MenuComponent({ }) {
const { nome, signOut } = useAuth();
const [tabAtiva, setTabAtiva] = React.useState('menu');



  return (
    
       
      <ViewBase tabAtiva={tabAtiva}>
         <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', backgroundColor: 'black', padding: 10, marginTop:1, borderBottomWidth: 4, borderColor: 'white', elevation: 5 }}>Olá, {nome}</Text>
          <View>
             <Lista onPress={() => {}} style={{...styles.item, borderTopWidth: 3, borderColor: '#9c9696ff'}} icon='account' title="Perfil" description="Perfil" />
             <Lista onPress={() => {}} style={styles.item} icon='package-variant-closed' title="Meus Pedidos" description="Ver meus pedidos" />
             <Lista onPress={() => {}} style={styles.item} icon='account' title="First Item" description="Perfil" />
             <Lista onPress={() => {}} style={styles.item} icon='account' title="First Item" description="Perfil" />
             <Lista onPress={() => {signOut()}} style={styles.item} icon='logout' title="Sair" description="Sair" />
        </View>
        </ViewBase>
      
  );
};
const styles = StyleSheet.create({
 
  item: {
   
    fontSize: 18,
    backgroundColor: '#e6e0e0ff', 
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: '#9c9696ff',
    padding: 10,
    marginTop: 1,
    elevation: 20,
  }});