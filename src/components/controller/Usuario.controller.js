import * as UserService from '../../service/DAO/User.Service';
import { useState } from 'react';
export const UsuarioController = () => {
    const [usuario, setUsuario] = useState(null);
    
    async function loginUsuario(login, senha) {
        try {
            const response = await UserService.loginUsuario(login, senha);
            if (response.success) {
                setUsuario(response.data);
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

    
    async function getIdFavoritosUsuario() {
        try{
            const favoritos = await UserService.getFavoritosUsuario(usuario.id);
            if(favoritos && favoritos.success){
                return { success: true, data: favoritos.data };
            } else {
                return { success: false, errors: ["Usuário não encontrado."] };
            }
        } catch (error) {
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }   
    }
    

    return {
        loginUsuario,
        logoutUsuario,
        createUsuario,
        updateUsuario,
        deleteUsuario,
        getUsuarios,
        getUsuarioById,
        estaLogado,
        getIdFavoritosUsuario

    }
};