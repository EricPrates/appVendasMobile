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
    const [filtroVisible, setFiltroVisible] = useState(false);
    
    const addFavorito = async (produto) =>{

        favoritos.find((p) => p.id === produto.id) ? console.log(`Produto já está nos favoritos: ${ produto.id }`) : setFavoritos([...favoritos, produto])
    }
   



    const signOut = () =>{
        setLogado(false)
        setNome("")
    }

    const alterarFiltro = () => setFiltroVisible(!filtroVisible); console.log(filtroVisible);

    return (
        <AuthContext.Provider value={{logado, nome , signOut, addFavorito, favoritos, setFavoritos, setSearchQuery, searchQuery, alterarFiltro, filtroVisible, setFiltroVisible, setLogado}}>
            {children}
        </AuthContext.Provider>
    ) 

}

export {useAuth, AuthProvider}