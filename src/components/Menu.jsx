import * as React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Button, Menu, Divider, PaperProvider, Provider, Modal } from 'react-native-paper';
import { useAuth } from './Provider';
import ViewBase from '../view/ViewBase';
import Lista from './Lista';
import { useNavigation } from '@react-navigation/native';
import CadastrarProduto from '../view/CadastrarProduto';

import { useState } from 'react';


export default function MenuComponent({ }) {
const { nome, signOut, logado } = useAuth();
const [tabAtiva, setTabAtiva] = useState('menu');
const navigation = useNavigation();
const [modalVisible, setModalVisible] = useState(false);

  const abrirModal = () => setModalVisible(true);
  const fecharModal = () => setModalVisible(false)



return (

       
      <ViewBase tabAtiva={tabAtiva}>
         <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'white', backgroundColor: 'black', padding: 10, marginTop:1, borderBottomWidth: 3, elevation: 5 }}>Olá, {nome}</Text>
          <View style={{padding: 10, gap: 10, marginTop: 10, flex: 1, alignItems: 'space-between'}}>
             <Lista onPress={() => {}} style={{...styles.item, borderTopWidth: 1, borderColor: '#9c9696ff'}} icon='account' title="Perfil" description="Perfil" />
             <Lista onPress={() => {}} style={styles.item} icon='package-variant-closed' title="Meus Pedidos" description="Ver meus pedidos" />
            
             <Lista onPress={() => {}} style={styles.item} icon='account' title="First Item" description="Perfil" />
             <Lista onPress={() => setModalVisible(true)} style={styles.item} icon='logout' title="Sair" description="Sair"  />
              {logado.tipo === 'admin' && (
                <>
                  <Lista onPress={() => {navigation.navigate('CadastrarUsuario')}} style={styles.item} icon='account-plus' title="Cadastrar novo usuário" description="cadastro" />
                  <Lista onPress={() => {navigation.navigate('CadastrarProduto')}} style={styles.item} icon='package-variant-closed-plus' title="Cadastrar produto" description="cadastro" />
                </>
              )}
          </View>
          <Modal  visible={modalVisible} onDismiss={fecharModal} contentContainerStyle={{backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>Tem certeza que deseja sair?</Text>
            <Button onPress={() => {signOut(); fecharModal(); navigation.navigate('Login')}} style={{marginBottom: 10, borderWidth: 1, borderColor: '#f70808ff'}}>Sair</Button>
            <Button onPress={fecharModal} style={{borderWidth: 1, borderColor: '#9c9696ff'}}>Cancelar</Button>
          </Modal>
        </ViewBase>
        
  );
};
const styles = StyleSheet.create({
 
  item: {
   
    fontSize: 18,
    backgroundColor: '#c0e1e2ff', 
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#9c9696ff',
    padding: 10,
    marginTop: 1,
    elevation: 20,
  }});