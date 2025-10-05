import { useState } from "react";
import { BottomNavigation, MD3Colors, Text } from "react-native-paper";
import { useAuth } from "./Provider";
import Home from "../view/Home";
import Login from "../view/Login";
import { useNavigation } from "@react-navigation/native";
export default function BarraBaixa() {
    const [index, setIndex] = useState(0);
    const { nome } = useAuth();
    const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline'},
    { key: 'favoritos', title: 'Favoritos', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'carrinho', title: 'Carrinho', focusedIcon: 'cart', unfocusedIcon: 'cart-outline' },
    { key: 'notificacoes', title: 'Notificações', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);
    

    const renderScene = BottomNavigation.SceneMap({
    home: () => {const navigation = useNavigation(); return<Login navigation={navigation}/>},
    favoritos: () => <Text>Favoritos</Text>,
    carrinho: () => <Text>Carrinho</Text>,
    notificacoes: () => <Text>Notificações</Text>, 
    });
    return (
        <BottomNavigation
            style={{ backgroundColor: '#000000ff' }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{ backgroundColor: '#000000' }}
            activeColor={MD3Colors.secondary100}
            inactiveColor={MD3Colors.secondary100}
            
        />
    );
}
