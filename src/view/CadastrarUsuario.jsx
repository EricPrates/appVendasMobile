import { View } from "react-native";
import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";
import {StyleSheet, Text}from "react-native";    


export default function CadastrarProduto({ navigation }) {
    return (
        <ViewBase tabAtiva="cadastrarProduto">
            <View style = {styles.container}>

                <EntradadeTexto title = 'Nome do Usuário' style= {styles.input}  onChangeText={text => console.log(text)
                } />
                 
                <EntradadeTexto title = 'Login' style= {styles.input} onChangeText={text => console.log(text)
                } />
                 
                <EntradadeTexto title = 'Senha' style= {styles.input} onChangeText={text => console.log(text)
                } /> 
                <EntradadeTexto title = 'Tipo de Usuário' style= {styles.input} onChangeText={text => console.log(text)
                } />
            </View>
        </ViewBase>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    
})