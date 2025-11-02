import { createContext, use, useContext, useEffect, useRef, useState } from "react";

import { UsuarioController } from "./controller/Usuario.controller";
import { ProdutoController } from "./controller/Produto.controller";




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
    const [nome, setNome] = useState('');
    const [favoritos, setFavoritos] = useState([]);
    

    

   

    const login = async(login, senha) =>{
        setLoading(true)
        const res = await userController.loginUsuario(login, senha);
        
        if(res.success){
            setLogado(true)
            setNome(res.data.nome)
            setLoading(false)
            
            
            
        }
        return res;
    }
    const signOut = () =>{
        setLogado(false)
        setNome("")
        setUsuario(null)
        setFavoritos([])
    }

    const alterarFiltro = () => setFiltroVisible(!filtroVisible);
    

   
    
    return (
        <AuthContext.Provider value={{logado ,login, usuario, signOut,  setSearchQuery, searchQuery, alterarFiltro,
         filtroVisible, setFiltroVisible, setLogado, setLoading, userController, produtoController, loading, nome,
            }} >
                {children}
            
        </AuthContext.Provider>
    ) 

}

export {useAuth, AuthProvider}

