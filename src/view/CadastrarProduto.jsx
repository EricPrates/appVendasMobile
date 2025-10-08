import { View } from "react-native";
import EntradadeTexto from "./EntradadeTexto";
import ViewBase from "./ViewBase";
import {StyleSheet, Text}from "react-native";    


export default function CadastrarProduto({ navigation }) {
    return (
        <ViewBase tabAtiva="cadastrarProduto">
            <View style = {styles.container}>
                <Text style = {styles.texto}>Cadastrar Produto</Text>
                <EntradadeTexto style= {styles.input}  onChangeText={text => console.log(text)
                } />
                 <Text style = {styles.texto} >Cadastrar Produto</Text>
                <EntradadeTexto  style= {styles.input}onChangeText={text => console.log(text)
                } />
                 <Text style = {styles.texto}>Cadastrar Produto</Text>
                <EntradadeTexto  onChangeText={text => console.log(text)
                } />
                 <Text style = {styles.texto}>Cadastrar Produto</Text>
                <EntradadeTexto  onChangeText={text => console.log(text)
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
    input:{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        margin: 10,
        fontSize: 18,
    },
    texto:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 10,
    }
})