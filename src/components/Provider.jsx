import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null)


const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{

    const [logado, setLogado] = useState(null)
    const [nome, setNome] = useState("Eric")

    const login = (usuario, senha)=>{
        if (usuario == 'Eric' && senha == '123'){
            setLogado({nome: 'Eric', tipo: 'admin'})
            setNome('Eric')
            return true
        }
        
        setLogado(null)
        return false
      }

    const signOut = () =>{
        setLogado(null)
        setNome("")
    }

    return (
        <AuthContext.Provider value={{logado, nome ,login, signOut}}>
            {children}
        </AuthContext.Provider>
    )

}

export {useAuth, AuthProvider}