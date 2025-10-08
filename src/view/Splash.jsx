import * as React from 'react';
import { ActivityIndicator, MD2Colors, Banner} from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

export default function Splash({ onFinish }) {
    useEffect(()=>{
        const id = setTimeout(() => {
           onFinish() 
        }, 1000);
        return ()=> clearTimeout(id)
    },[onFinish])

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} size={100} position="absolute" zIndex={1} />
            <Image
                style={styles.avatar}
                source={require('../view/img/tenimg.png')}
                resizeMode='cover'
            
            />
        </SafeAreaView>
    );
}
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fbfbfbff',
        
    },
    avatar: {
        alignContent: 'center',
        marginTop: 20,
        borderRadius: 0,
        position: 'relative',
        zIndex: 0,
        width: 180,
        height: 180
    },
});