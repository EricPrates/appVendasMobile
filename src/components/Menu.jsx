import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
    const fecharModal = () => setModalVisible(false);

    return (
        <ViewBase tabAtiva={tabAtiva}>
       
            <View style={styles.header}>
                <Text style={styles.headerText}>Olá, {nome}! 👋</Text>
                <Text style={styles.subHeaderText}>Bem-vindo à sua área</Text>
            </View>
            
         
            <View style={styles.menuContainer}>
                <Lista 
                    onPress={() => {}} 
                    style={styles.itemFirst} 
                    icon='account' 
                    title="Perfil" 
                    description="Gerencie suas informações" 
                />
                <Lista 
                    onPress={() => {navigation.navigate('MeusPedidos'); setTabAtiva('meusPedidos')}} 
                    style={styles.item} 
                    icon='package-variant-closed' 
                    title="Meus Pedidos" 
                    description="Acompanhe seus pedidos" 
                />
                <Lista 
                    onPress={() => {}} 
                    style={styles.item} 
                    icon='heart' 
                    title="Favoritos" 
                    description="Seus produtos favoritos" 
                />
                <Lista 
                    onPress={() => setModalVisible(true)} 
                    style={styles.itemLast} 
                    icon='logout' 
                    title="Sair" 
                    description="Encerrar sessão" 
                />
                
                </View>
                {logado.tipo === 'admin' && (
                    <View style={styles.adminSection}>
                        <Text style={styles.adminTitle}>Administração</Text>
                        <Lista 
                            onPress={() => {navigation.navigate('CadastrarUsuario')}} 
                            style={styles.adminItem} 
                            icon='account-plus' 
                            title="Cadastrar usuário" 
                            description="Novo usuário" 
                        />
                        <Lista 
                            onPress={() => {navigation.navigate('CadastrarProduto')}} 
                            style={styles.adminItemLast} 
                            icon='package-variant-closed-plus' 
                            title="Cadastrar produto" 
                            description="Novo produto" 
                        />
                        <Lista 
                            onPress={() => {navigation.navigate('EditarProduto')}} 
                            style={styles.adminItemLast} 
                            icon='tag-edit' 
                            title="Editar produto" 
                            description="Editar produto existente" 
                        />
                    </View>
                )}
            

          
            <Modal 
                visible={modalVisible} 
                onDismiss={fecharModal} 
                contentContainerStyle={styles.modalContainer}
            >
                <View style={styles.modalIcon}>
                    <Text style={styles.modalIconText}>👟</Text>
                </View>
                <Text style={styles.modalTitle}>Sair da conta?</Text>
                <Text style={styles.modalText}>Tem certeza que deseja sair?</Text>
                
                <View style={styles.modalButtons}>
                    <Button 
                        mode="contained" 
                        onPress={() => {signOut(); fecharModal(); navigation.navigate('Login')}} 
                        style={styles.buttonSair}
                        labelStyle={styles.buttonSairText}
                    >
                        Sair
                    </Button>
                    <Button 
                        mode="outlined" 
                        onPress={fecharModal} 
                        style={styles.buttonCancelar}
                        labelStyle={styles.buttonCancelarText}
                    >
                        Cancelar
                    </Button>
                </View>
            </Modal>
        </ViewBase>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ff6b35',
        padding: 16,
        paddingTop: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 4,
    },
    subHeaderText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        fontWeight: '500',
    },
    menuContainer: {
      marginTop: 8,
        backgroundColor: 'rgba(249, 107, 25, 0.1)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(243, 103, 33, 0.5)',
    },
    itemFirst: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#ff6b35',
    },
    item: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#4ecdc4',
    },
    itemLast: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#ff4757',
        marginBottom: 20,
    },
    adminSection: {
        marginTop: 8,
        backgroundColor: 'rgba(37, 178, 254, 0.1)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(53, 198, 255, 0.2)',
    },
    adminTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff6b35',
        marginBottom: 12,
        textAlign: 'center',
    },
    adminItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        padding: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#ff9f43',
    },
    adminItemLast: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8',
        padding: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#ff9f43',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 24,
        margin: 20,
        borderRadius: 24,
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
    },
    modalIcon: {
        alignItems: 'center',
        marginBottom: 16,
    },
    modalIconText: {
        fontSize: 48,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#2c2c2c',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
        color: '#666',
    },
    modalButtons: {
        gap: 12,
    },
    buttonSair: {
        backgroundColor: '#ff4757',
        paddingVertical: 6,
        borderRadius: 12,
        elevation: 4,
    },
    buttonSairText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonCancelar: {
        borderColor: '#ff6b35',
        borderWidth: 2,
        paddingVertical: 6,
        borderRadius: 12,
    },
    buttonCancelarText: {
        color: '#ff6b35',
        fontWeight: 'bold',
        fontSize: 16,
    },
});