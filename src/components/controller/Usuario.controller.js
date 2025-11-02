import * as UserService from '../../service/DAO/User.Service';
import { useState } from 'react';
import { useAuth } from '../Provider';
import { ProdutoController } from './Produto.controller';

export const UsuarioController = () => {
    
    const productController = ProdutoController();
    const [usuario, setUsuarioAtual] = useState(null);
    const [favoritos, setFavoritos] = useState([]);
    
    const setUsuario = (usuario) => {
        setUsuarioAtual(usuario);
    }
    async function loginUsuario(login, senha) {
        try {
            const response = await UserService.loginUsuario(login, senha);
            if (response.success) {
                setUsuario(response.data);
                response.data.produtosFavoritos.map(async (produtoId) => {
                    const produtoResponse = await productController.getProdutoById(produtoId);
                    if (produtoResponse.success) {
                        setFavoritos((prevFavoritos) => [...prevFavoritos, produtoResponse.data]);
                    }
                });
                return { success: true, data: response.data };
            }

            else {
                return { success: false, errors: response.errors };
            }               
        } catch (error) {
            
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }

    async function logoutUsuario() {
        try{
            return await UserService.logoutUsuario();
        } catch (error) {
            
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function createUsuario(novoUsuario) {
        try{
            const response = await UserService.createUsuario(novoUsuario);
            return response;
        } catch (error) {
           
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function updateUsuario(usuarioAtualizado, id) {
       
        try{
            return await UserService.updateUsuario(usuarioAtualizado, id.toString());
        } catch (error) {
       
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function deleteUsuario(id) {
        try{
            return await UserService.deleteUsuario(id);
        } catch (error) {
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getUsuarios() {
        try{
            const usuarios = await UserService.getUsuarios();
            return { success: true, data: usuarios };
        } catch (error) {
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getUsuarioById(id) {
        try{
            return await UserService.getUsuarioById(id);
            
        } catch (error) {
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function estaLogado() {
        try{
            return await UserService.estaLogado();
        } catch (error) {
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
   async function adicionarFavoritosUsuario(produtoId) {
    try {
        if(produtoId == null || produtoId.trim() === '') {
            return { success: false, errors: ["ID do produto é obrigatório para adicionar aos favoritos."] };
        }
            if (!usuario.produtosFavoritos.includes(produtoId)) {
                usuario.produtosFavoritos.push(produtoId);
            } else {
                return { success: false, errors: ["Produto já está nos favoritos"] };
            }
        
        
        const response = await UserService.updateUsuario(usuario, usuario.id);
        
        if (response.success) {
            setUsuario(usuario);
            setFavoritos((prevFavoritos) => [...prevFavoritos, produtoId]);
            return { 
                success: true, 
                data: usuario.produtosFavoritos,
            };
        } else {
            return { success: false, errors: response.errors };
        }
    } catch (error) {
        return { success: false, errors: ["Erro ao adicionar favorito: " + error] };
    }
}
async function removeFavoritos() {
    try{
        const response = await UserService.updateUsuario(usuario, usuario.id);
        if (response.success) {
            setUsuario(usuario);
            setFavoritos([]);
            return { success: true };
        } else {
            return { success: false, errors: response.errors };
        }
    } catch (error) {
        return { success: false, errors: ["Erro ao remover favoritos: " + error] };
    }
}
async function removerUmFavorito(produtoId) {
    try {
        if(produtoId == null || produtoId.trim() === '') {
            return { success: false, errors: ["ID do produto é obrigatório para remover dos favoritos."] };
        }
        usuario.produtosFavoritos = usuario.produtosFavoritos.filter(id => id !== produtoId);
        
        const response = await UserService.updateUsuario(usuario, usuario.id);

        if (response.success) {
            setUsuario(usuario);
            setFavoritos((prevFavoritos) => prevFavoritos.filter(id => id !== produtoId));
            return { success: true };
        } else {
            return { success: false, errors: response.errors };
        }
    } catch (error) {
        return { success: false, errors: ["Erro ao remover favorito: " + error] };
    }
}

function getFavoritos() {
    
        return favoritos || [];
}

    return {
        setUsuario,
        loginUsuario,
        logoutUsuario,
        createUsuario,
        updateUsuario,
        deleteUsuario,
        getUsuarios,
        getUsuarioById,
        estaLogado,
        getFavoritos,
        adicionarFavoritosUsuario,
        removeFavoritos

    }
};