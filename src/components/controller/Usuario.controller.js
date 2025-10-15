import * as UserService from '../../service/DAO/User.Service';

export const UsuarioController = () => {
    
    async function loginUsuario(login, senha) {        
        try{
            return await UserService.loginUsuario(login, senha);
            
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
            return await UserService.createUsuario(novoUsuario);
        } catch (error) {
           
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function updateUsuario(id, usuarioAtualizado) {
        try{
            return await UserService.updateUsuario(usuarioAtualizado, id);
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

    async function getUsuarioLogado() {
        try{
            const usuario = await UserService.getUsuarioLogado();
            return { success: true, data: usuario };
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
        getUsuarioLogado
    }
};