
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/view/Splash';
import { SafeAreaView } from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/view/Login';
import { AuthProvider } from './src/components/Provider';
import Home from './src/view/Home';
import Notificacoes from './src/view/Notificacoes.jsx';
import carrinhos from './src/view/carrinhos';
import Favoritos from './src/view/Favoritos';
import CadastrarUsuario from './src/view/CadastrarUsuario.jsx';
import MenuComponent from './src/components/Menu.jsx';
import CadastrarProduto from './src/view/CadastrarProduto.jsx';

const Stack = createNativeStackNavigator();
export default function App() {
  

  return (
  
    <SafeAreaView style={styles.container}>
      <AuthProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashRoute} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="carrinhos" component={carrinhos} />
            <Stack.Screen name="favoritos" component={Favoritos} />
            <Stack.Screen name="notificacoes" component={Notificacoes} />
            <Stack.Screen name="menu" component={MenuComponent} />
            <Stack.Screen name="CadastrarProduto" component={CadastrarProduto} />
            <Stack.Screen name="CadastrarUsuario" component={CadastrarUsuario} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
}
function SplashRoute({ navigation }) {
  return <Splash onFinish={() => navigation.navigate('Login')} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0aff',
    
    
  },
});
