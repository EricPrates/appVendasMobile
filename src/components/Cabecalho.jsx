import React, { useState } from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cabecalho({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Appbar.Header dark={true} mode="center-aligned" style={{backgroundColor: '#000000ff'}} >
                <Appbar.BackAction color="#fff" style={{opacity: 0.5, marginRight: 16}} />
                    <Searchbar
                        placeholder="Pesquisar"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={{width: '70%', backgroundColor: '#fff', height: 50, borderRadius: 20}}
                    />
                    <Appbar.Action icon="dots-vertical" onPress={() => {}} color="#fff" />
        </Appbar.Header>
                            
    );
}
