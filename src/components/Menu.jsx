import * as React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button, Menu, Divider, PaperProvider, Provider, Modal } from 'react-native-paper';
import { useAuth } from './Provider';
import ViewBase from '../view/ViewBase';
import Lista from './Lista';
import { useNavigation } from '@react-navigation/native';
import CadastrarProduto from '../view/CadastrarProduto';
export default function MenuComponent({ }) {
const { nome, signOut, logado } = useAuth();
const [tabAtiva, setTabAtiva] = React.useState('menu');
const navigation = useNavigation();



return (

       
      <ViewBase tabAtiva={tabAtiva}>
         <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white', backgroundColor: 'black', padding: 10, marginTop:1, borderBottomWidth: 3, elevation: 5 }}>Olá, {nome}</Text>
          <View style={{padding: 10, gap: 10, marginTop: 10, flex: 1, alignItems: 'space-between'}}>
             <Lista onPress={() => {}} style={{...styles.item, borderTopWidth: 1, borderColor: '#9c9696ff'}} icon='account' title="Perfil" description="Perfil" />
             <Lista onPress={() => {}} style={styles.item} icon='package-variant-closed' title="Meus Pedidos" description="Ver meus pedidos" />
             <Lista onPress={() => {}} style={styles.item} icon='account' title="First Item" description="Perfil" />
             <Lista onPress={() => {}} style={styles.item} icon='account' title="First Item" description="Perfil" />
             <Lista onPress={() => {signOut() }} style={styles.item} icon='logout' title="Sair" description="Sair" />
              {logado.tipo === 'admin' && (
                <>
                  <Lista onPress={() => {navigation.navigate('CadastrarUsuario')}} style={styles.item} icon='account-plus' title="Cadastrar novo usuário" description="cadastro" />
                  <Lista onPress={() => {navigation.navigate('CadastrarProduto')}} style={styles.item} icon='package-variant-closed-plus' title="Cadastrar produto" description="cadastro" />
                </>
              )}
        </View>
        </ViewBase>
      
  );
};
const styles = StyleSheet.create({
 
  item: {
   
    fontSize: 18,
    backgroundColor: '#e2c0c0ff', 
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#9c9696ff',
    padding: 10,
    marginTop: 1,
    elevation: 20,
  }});