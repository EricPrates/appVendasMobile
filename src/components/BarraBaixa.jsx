import { useState } from "react";
import { Icon, MD3Colors, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { StyleSheet } from "react-native";

export default function BarraBaixa({ tabAtiva }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.btn, tabAtiva === 'home' && styles.btnActive]} 
                onPress={() => navigation.navigate('Home')}
            >
                <View style={styles.iconContainer}>
                    <Icon 
                        source={tabAtiva === 'home' ? 'home' : 'home-outline'}
                        color={tabAtiva === 'home' ? '#fff' : '#2c2c2c'}
                        size={24} 
                    />
                </View>
                <Text style={[styles.btnText, tabAtiva === 'home' && styles.btnTextActive]}>
                    Home
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.btn, tabAtiva === 'favoritos' && styles.btnActive]} 
                onPress={() => navigation.navigate('favoritos')}
            >
                <View style={styles.iconContainer}>
                    <Icon 
                        source={tabAtiva === 'favoritos' ? 'heart' : 'heart-outline'}
                        color={tabAtiva === 'favoritos' ? '#fff' : '#2c2c2c'}
                        size={24} 
                    />
                </View>
                <Text style={[styles.btnText, tabAtiva === 'favoritos' && styles.btnTextActive]}>
                    Favoritos
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.btn, tabAtiva === 'carrinho' && styles.btnActive]} 
                onPress={() => navigation.navigate('carrinhos')}
            >
                <View style={styles.cartContainer}>
                    <View style={styles.iconContainer}>
                        <Icon 
                            source={tabAtiva === 'carrinho' ? 'cart' : 'cart-outline'}
                            color={tabAtiva === 'carrinho' ? '#fff' : '#2c2c2c'}
                            size={24} 
                        />
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                    <Text style={[styles.btnText, tabAtiva === 'carrinho' && styles.btnTextActive]}>
                        Carrinho
                    </Text>
                </View>
                
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.btn, tabAtiva === 'menu' && styles.btnActive]} 
                onPress={() => navigation.navigate('menu')}
            >
                <View style={styles.iconContainer}>
                    <Icon 
                        source="dots-vertical"
                        color={tabAtiva === 'menu' ? '#fff' : '#2c2c2c'}
                        size={24} 
                    />
                </View>
                <Text style={[styles.btnText, tabAtiva === 'menu' && styles.btnTextActive]}>
                    Menu
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingVertical: 5,
        paddingHorizontal: 8,
        justifyContent: 'space-around',
        borderTopWidth: 2,
        borderTopColor: '#e8e8e8',
        elevation: 20,
        shadowColor: '#ff6b35',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        height: 70,
    },
    btn: {
        width: (width - 32) / 4,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 16,
        paddingVertical: 6,},
    btnActive: {
        backgroundColor: '#ff6b35',
        transform: [{ scale: 1.05 }],
        shadowColor: '#ff6b35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'transparent',
    },
    btnText: {
        color: '#666',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
    btnTextActive: {
        color: '#fff',
        fontWeight: '700',
    },
    cartContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#ff4757',
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    badgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '900',
    },
});