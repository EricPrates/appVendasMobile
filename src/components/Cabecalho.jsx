import React, { useState, useRef, useEffect } from 'react';
import { Appbar, Searchbar, Modal, Portal, PaperProvider, MD3Colors } from 'react-native-paper';
import { View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import { useAuth } from './Provider';
import { useNavigation } from '@react-navigation/native';
import { ProdutoController } from './controller/Produto.controller';
export default function Cabecalho({ tabAtiva }) {
    const controlProduto = ProdutoController();
    
    const [menuVisible, setMenuVisible] = useState(false);
    const { nome, signOut, buscarProdutos, setSearchQuery, searchQuery, alterarFiltro } = useAuth();
    const navigation = useNavigation();
   


    return (
        <Appbar.Header 
            mode="center-aligned" 
            style={styles.header}
        >
            {tabAtiva !== 'home' && tabAtiva !== 'carrinhos' && tabAtiva !== 'menu' && 
                <Appbar.BackAction 
                    onPress={() => navigation.goBack()} 
                    color="#fff" 
                    size={24}
                />
            }
            
            <Searchbar
                placeholder="Encontre seus tênis..."
                placeholderTextColor="#888"
                value={searchQuery}
                style={styles.searchbar}
                iconColor="#ff6b35"
                inputStyle={styles.searchInput}
                onChangeText = {(query) => { setSearchQuery(query) }}
            />
            <Appbar.Action 
                icon={"filter-variant"}
                color={"#fff"}
                size={24}
                onPress={() => alterarFiltro()}
                style={styles.notificationIcon}
                
            />
            
               
        
            
            <Appbar.Action 
                icon={tabAtiva === "notificacoes" ? "bell" : "bell-outline"} 
                color={tabAtiva === "notificacoes" ? "#fff" : "#fff"} 
                size={24}
                onPress={() => navigation.navigate('notificacoes')}
                style={[
                    styles.notificationIcon,
                    tabAtiva === "notificacoes" && styles.notificationIconActive
                ]}
            />
        </Appbar.Header>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ff6b35',
        elevation: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        height: 60,
        paddingHorizontal: 8,
    },
    searchbar: {
        flex: 1,
        backgroundColor: '#fff',
        height: 42,
        borderRadius: 25,
        marginHorizontal: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#ffd8cc',
    },
    searchInput: {
        color: '#2c2c2c',
        fontSize: 14,
        fontWeight: '500',
        minHeight: 42,
    },
    notificationIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    notificationIconActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        transform: [{ scale: 1.1 }],
    },
      
});
