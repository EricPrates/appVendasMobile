import { useState } from "react";
import Usuario from "../../model/Usuario";

const LoginController = () =>{

    const [usuario, setUsuario] = useState(new Usuario());
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!usuario.getLogin() || !usuario.getSenha()){
            setErrorMessage('Login e senha são obrigatórios.');
            return;
        }
        // Aqui você pode adicionar a lógica de autenticação, como chamar uma API
        console.log('Usuário autenticado:', usuario);
        setErrorMessage('');
    };

    return {
        usuario,
        errorMessage,
        handleInputChange,
        handleSubmit
    };

}

export default LoginController;