import React, { useState, useRef, useEffect } from 'react';
import { Appbar,  Searchbar, Modal, Portal,  PaperProvider, MD3Colors } from 'react-native-paper';

import { View, StyleSheet, Text } from 'react-native';
import { useAuth } from './Provider';
import { useNavigation } from '@react-navigation/native';
export default function Cabecalho({tabAtiva}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const { nome, signOut } = useAuth();
    const navigation = useNavigation();

 

    return (
      
        <Appbar.Header dark={true} mode="center-aligned" style={{backgroundColor: '#000000ff'}} >{
            tabAtiva !== 'home' && tabAtiva !== 'carrinhos' && tabAtiva !== 'menu' && 
            <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        }
                
                    <Searchbar
                        placeholder="Pesquisar"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={{width: '70%', backgroundColor: '#fff', height: 50, borderRadius: 20}}
                    />
                     <Appbar.Action icon={tabAtiva === "notificacoes" ? "bell" : "bell-outline"} color = {tabAtiva === "notificacoes" ? MD3Colors.error50 : MD3Colors.neutral70} onPress={() => navigation.navigate('notificacoes')}/>

        </Appbar.Header>
        
             
      

        
    );

}
