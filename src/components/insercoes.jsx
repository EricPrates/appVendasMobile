import { ScrollView, Text, View } from "react-native";
import Produto from "../model/Produto";
import { use, useEffect, useState } from "react";
import { ProdutoController } from "./controller/Produto.controller";
import { useAuth } from "./Provider";



export default function Insercoes({}) {
const produtoController = ProdutoController();
const {logado} = useAuth();
const [produtos, setProdutos] = useState([]);
// useEffect(() => {
//     const produtos = [];
//     const produto1 = new Produto(
//     "Nike Air Force 1 '07",
//     "O clássico tênis de basquete que se tornou um ícone da cultura streetwear. Conforto duradouro e estilo atemporal.",
//     899.99,
//     25,
//     "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
//     ["Branco", "Branco"],
//     "36-45",
//     4.8,
//     0,
//     "Nike",
//     logado.id,
//     "Casual"
// );

// const produto2 = new Produto(
//     "Adidas Ultraboost 22",
//     "Tênis de corrida com tecnologia Boost para máximo retorno de energia e amortecimento responsivo.",
//     1199.99,
//     18,
//     "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
//     ["Preto", "Branco"],
//     "38-44",
//     4.7,
//     15,
//     "Adidas",
//     logado.id,
//     "Corrida"
// );

// const produto3 = new Produto(
//     "Nike Jordan 1 Retro High",
//     "O tênis que iniciou a lenda. Design clássico do basquete com conforto moderno e estilo inconfundível.",
//     1299.99,
//     8,
//     "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",
//     ["Vermelho", "Preto", "Branco"],
//     "40-45",
//     4.9,
//     0,
//     "Nike Jordan",
//     logado.id,
//     "Basquete"
// );

// const produto4 = new Produto(
//     "Adidas Forum Low",
//     "Tênis de basquete retrô dos anos 80, agora como ícone do streetwear com design clássico.",
//     699.99,
//     30,
//     "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&q=80",
//     ["Branco", "Azul"],
//     "36-43",
//     4.6,
//     10,
//     "Adidas",
//     logado.id,
//     "Basquete"
// );

// const produto5 = new Produto(
//     "Nike Dunk Low Retro",
//     "Inspirado no basquete dos anos 80, retorna com cores clássicas para o estilo urbano contemporâneo.",
//     999.99,
//     15,
//     "https://images.unsplash.com/photo-1600269452121-4f2416e6c447?w=500&q=80",
//     ["Preto", "Branco"],
//     "37-44",
//     4.9,
//     5,
//     "Nike",
//     logado.id,
//     "Skate"
// );

// const produto6 = new Produto(
//     "Adidas Samba OG",
//     "O clássico tênis de futebol indoor que conquistou as ruas worldwide. Estilo vintage e versátil.",
//     599.99,
//     22,
//     "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
//     ["Verde", "Branco"],
//     "36-42",
//     4.5,
//     20,
//     "Adidas",
//     logado.id,
//     "Futebol"
// );

// const produto7 = new Produto(
//     "Nike Air Max 270",
//     "Tênis com a maior unidade Air Max até hoje, proporcionando conforto incrível e estilo futurista.",
//     1099.99,
//     12,
//     "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
//     ["Preto", "Branco"],
//     "38-45",
//     4.4,
//     8,
//     "Nike",
//     logado.id,
//     "Casual"
// );

// const produto8 = new Produto(
//     "Adidas Superstar",
//     "O lendário tênis com capa de shell toe que se tornou um ícone da cultura sneaker mundial.",
//     549.99,
//     28,
//     "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80",
//     ["Branco", "Preto"],
//     "35-44",
//     4.7,
//     0,
//     "Adidas",
//     logado.id,
//     "Casual"
// );

// const produto9 = new Produto(
//     "Nike Blazer Mid '77",
//     "Tênis de basquete vintage com design retrô que combina estilo clássico com conforto moderno.",
//     799.99,
//     20,
//     "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80",
//     ["Branco", "Preto"],
//     "37-44",
//     4.6,
//     12,
//     "Nike",
//     logado.id,
//     "Casual"
// );

// const produto10 = new Produto(
//     "Adidas NMD_R1",
//     "Tênis urbano com tecnologia Boost e design moderno, perfeito para o dia a dia e estilo streetwear.",
//     899.99,
//     16,
//     "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
//     ["Preto", "Cinza"],
//     "38-44",
//     4.5,
//     15,
//     "Adidas",
//     logado.id,
//     "Casual"
// );
        
// produtos.push(produto1, produto2, produto3, produto4, produto5, produto6, produto7, produto8, produto9, produto10);
// produtoController.saveProdutos(produtos);
// }, []);

const pegarTodosProdutos = async () => {
    const todosProdutos = await produtoController.getProdutos();
    setProdutos(todosProdutos);
}
useEffect(() => {
    pegarTodosProdutos();
}, []);
    return (
       <View>
            <Text>Inserções</Text>
            <ScrollView>
               {produtos.map((produto) => (
                   <View key={produto.id}>
                       <Text>{produto.id}</Text>
                       <Text>{produto.idUsuario}</Text>
                            <Text>{produto.nome}</Text>
                            <Text>{produto.preco}</Text>
                        </View>
                ))
                }
            </ScrollView>
       </View>
    );
}



