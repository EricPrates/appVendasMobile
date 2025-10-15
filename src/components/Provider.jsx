import { createContext, useContext, useEffect, useState } from "react";
import Usuario from "../model/Usuario";
import { UsuarioController } from "./controller/Usuario.controller";


const AuthContext = createContext(null)


const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{
    const control = UsuarioController()

    const PrincipalUser = new Usuario('Rua A', 'eric@gmail.com', '32222222',
     'Eric', 'Eric', '123', 'admin');

    const {usuarios, setusuarios} = useState([])
    const [loading, setLoading] = useState(true)
    const [logado, setLogado] = useState(false)
    const [nome, setNome] = useState("Eric")

    const login = async (usuario, senha)=>{
        try{
        const res = await control.loginUsuario(usuario, senha)
        if (res.success){
            setLogado(res.data)
            setNome(res.data.nome)
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

    const signOut = () =>{
        setLogado(false)
        setNome("")
    }

    return (
        <AuthContext.Provider value={{logado, nome ,login, signOut}}>
            {children}
        </AuthContext.Provider>
    )

}

export {useAuth, AuthProvider}