import * as React from 'react';
import { ActivityIndicator, MD2Colors, Banner} from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { StyleSheet, View, Text} from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { UsuarioController } from '../components/controller/Usuario.controller';
import {useAuth} from '../components/Provider';
export default function Splash({ onFinish }) {
    
    const control = UsuarioController()
    const {logado, nome, login, carregarUsuarios} = useAuth();

   

    useEffect(()=>{
        const id = setTimeout(() => {
           onFinish() 
        }, 4000);
        return ()=> clearTimeout(id)
    },[onFinish])

    return (
        <SafeAreaView style={styles.container}>{
            
            
        }
          
          
            <View style={styles.backgroundOverlay} />
            
            
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.avatar}
                        source={require('../view/img/tenimg.png')}
                        resizeMode='contain'
                    />
                </View>
                
               
                <View style={styles.textContainer}>
                    <View style={styles.brandNameContainer}>
                        <Text style={styles.brandName}>SNEAKER</Text>
                        <Text style={styles.brandSubtitle}>STORE</Text>
                    </View>
                    <Text style={styles.tagline}>Seu estilo em movimento</Text>
                </View>
                
            
                <View style={styles.loadingContainer}>
                    <ActivityIndicator 
                        animating={true} 
                        color="#ff6b35" 
                        size={60} 
                    />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            </View>
            
          
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Sneaker Store</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1a1a1a',
        paddingVertical: 60,
    },
    backgroundOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'linear-gradient(135deg, #ff6b35 0%, #1a1a1a 100%)',
        opacity: 0.1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 25,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 20,
        transform: [{ scale: 1.1 }],
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    brandNameContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    brandName: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#ff6b35',
        marginRight: 8,
        textShadowColor: 'rgba(255, 107, 53, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    brandSubtitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    tagline: {
        fontSize: 30,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '500',
        textAlign: 'center',
    },
    loadingContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    loadingText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 12,
        fontWeight: '500',
    },
    footer: {
        paddingBottom: 20,
    },
    footerText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.5)',
        fontWeight: '400',
    },
});