import { View } from "react-native";
import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";
import {StyleSheet, Text}from "react-native";    


export default function CadastrarProduto({ navigation }) {
    return (
        <ViewBase tabAtiva="cadastrarProduto">
            <View style = {styles.container}>
        
                <EntradadeTexto title = 'Nome do Produto' style= {styles.input}  onChangeText={text => console.log(text)
                } />
                 
                <EntradadeTexto title = 'Descrição do Produto' style= {styles.input} onChangeText={text => console.log(text)
                } />
                 
                <EntradadeTexto title = 'Preço do Produto' style= {styles.input} onChangeText={text => console.log(text)
                } /> 
                <EntradadeTexto title = 'Quantidade do Produto' style= {styles.input} onChangeText={text => console.log(text)
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