import * as UserService from '../../service/DAO/User.Service';

export const UsuarioController = {
    async login(login, senha) {
        
        try{
            return await UserService.authenticateUsuario(login, senha);
            
        } catch (error) {
            console.error("Erro inesperado", error);
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    },

    async logout() {
        try{
            return await UserService.logoutUsuario();
        } catch (error) {
            console.error("Erro inesperado", error);
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    },
    async cadastrar(novoUsuario) {
        try{
            return await UserService.createUsuario(novoUsuario);
        } catch (error) {
            console.error("Erro inesperado", error);
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    },
    async atualizar(id, usuarioAtualizado) {
        try{
            return await UserService.updateUsuario(usuarioAtualizado, id);
        } catch (error) {
            console.error("Erro inesperado", error);
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    },
    async deletar(id) {
        try{
            return await UserService.deleteUsuario(id);
        } catch (error) {
            console.error("Erro inesperado", error);
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    },
    async buscarTodos() {
        try{
            const usuarios = await UserService.getUsuarios();
            return { success: true, data: usuarios };
        } catch (error) {
            console.error("Erro inesperado", error);
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    },
    async buscarPorId(id) {
        try{
            return usuario = await UserService.getUsuarioById(id);
            
        } catch (error) {
            console.error("Erro inesperado", error);
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    },
    async isLoggedIn() {
        try{
            return await UserService.isLoggedIn();
        } catch (error) {
            console.error("Erro inesperado", error);
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    },
};