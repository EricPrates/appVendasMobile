import { useState } from "react";
import { Icon, MD3Colors, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import MenuComponent from "./Menu";



export default function BarraBaixa({tabAtiva}) {
    const navigation = useNavigation();

   return (
    <View style={style.container}>
         <TouchableOpacity style = {style.btn} onPress={() => navigation.navigate('Home')}>
                  <Icon source={tabAtiva === 'home' ? 'home' : 'home-outline'}
                          color={tabAtiva === 'home' ? MD3Colors.error50 : MD3Colors.neutral70}
                          size={26} />
                  <Text style={{color: '#fff'}}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {style.btn} onPress={() => navigation.navigate('favoritos')}>
                  <Icon source={tabAtiva === 'favoritos' ? 'heart' : 'heart-outline'}
                          color={tabAtiva === 'favoritos' ? MD3Colors.error50 : MD3Colors.neutral70}
                          size={26} />
                  <Text style={{color: '#fff'}}>Favoritos</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {style.btn} onPress={() => navigation.navigate('carrinhos')}>
                  <Icon source={tabAtiva === 'carrinho' ? 'cart' : 'cart-outline'}
                          color={tabAtiva === 'carrinho' ? MD3Colors.error50 : MD3Colors.neutral70}
                          size={26} />
                  <Text style={{color: '#fff'}}>Carrinho</Text>
              </TouchableOpacity>
             <TouchableOpacity style = {style.btn} onPress={() => navigation.navigate('menu')}>
                  <Icon source={tabAtiva === 'menu' ? 'dots-vertical' : 'dots-vertical'}
                  color={tabAtiva === 'menu' ? MD3Colors.error50 : MD3Colors.neutral70} size={26} />
                  <Text style={{color: '#fff'}}>Menu</Text>
              </TouchableOpacity>
              
               
              
    </View>
        
   )
}

const style = StyleSheet.create({
    container:{ flexDirection: 'row',
        backgroundColor: '#000',
        paddingVertical: 10,
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#333',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    btn:{
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MD3Colors.primary500,
        borderRadius: 25,
    }})