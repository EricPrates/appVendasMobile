import { createContext, useContext, useEffect, useState } from "react";
import Usuario from "../model/Usuario";
import { UsuarioController } from "./controller/Usuario.controller";
import { ProdutoController } from "./controller/Produto.controller";
import { View } from "react-native-web";
import { StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";



const AuthContext = createContext(null)


const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{
    const userController = UsuarioController()
    const produtoController = ProdutoController()
    const [usuario, setUsuario] = useState(null)
    const [loading, setLoading] = useState(false)
    const [logado, setLogado] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [filtroVisible, setFiltroVisible] = useState(false);
    
    useEffect(() => {
        if(usuario){
            userController.setUsuario(usuario);
        }
    }, [usuario]);
    
    const login = async(login, senha) =>{
        setLoading(true)
        const res = await userController.loginUsuario(login, senha);
        if(res.success){
                    
            setUsuario(res.data)
            
            
        }
        return res;
    }
    const signOut = () =>{
        setLogado(false)
        setNome("")
    }

    const alterarFiltro = () => setFiltroVisible(!filtroVisible); console.log(filtroVisible);

    return (
        <AuthContext.Provider value={{logado ,login, usuario, signOut,  setSearchQuery, searchQuery, alterarFiltro, filtroVisible, setFiltroVisible, setLogado, setLoading, userController, produtoController}}>
            {children}
            
        </AuthContext.Provider>
    ) 

}

export {useAuth, AuthProvider}

