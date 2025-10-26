import { createContext, useContext, useEffect, useState } from "react";
import Usuario from "../model/Usuario";
import { UsuarioController } from "./controller/Usuario.controller";
import { ProdutoController } from "./controller/Produto.controller";



const AuthContext = createContext(null)


const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{
    const control = UsuarioController()
   
    const [favoritos, setFavoritos] = useState([])
    const [loading, setLoading] = useState(true)
    const [logado, setLogado] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const nome = logado ? logado.nome : ""

    const login = async (usuario, senha)=>{
        try{
        const res = await control.loginUsuario(usuario, senha)
        if (res.success){
            setLogado(res.data)
            return {
                success: true,
                data: res.data
            }
        }
        else{
            setLogado(false)
            return {
                success: false,
                errors: res.errors
            }
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return false;
    }
}
    const addFavorito = async (produto) =>{

        favoritos.find((p) => p.id === produto.id) ? console.log(`Produto já está nos favoritos: ${ produto.id }`) : setFavoritos([...favoritos, produto])
    }
    const buscarProdutos = async (searchQuery) => {
        const controlProduto = ProdutoController();
        const res = await controlProduto.getProdutoByNome(searchQuery);
        
        return res;
    };
    const signOut = () =>{
        setLogado(false)
        setNome("")
    }



    return (
        <AuthContext.Provider value={{logado, nome ,login, signOut, addFavorito, favoritos, setFavoritos, buscarProdutos, setSearchQuery, searchQuery}}>
            {children}
        </AuthContext.Provider>
    )

}

export {useAuth, AuthProvider}