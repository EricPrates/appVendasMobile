import * as UserService from '../../service/DAO/User.Service';
import { useState } from 'react';

import { ProdutoController } from './Produto.controller';

export const UsuarioController = () => {
    
    const productController = ProdutoController();
    const [usuario, setUsuario] = useState(null);
    const [favoritos, setFavoritos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    
    
    async function loginUsuario(login, senha) {
    try {
        const response = await UserService.loginUsuario(login, senha);
        
        if (response.success) {
            setUsuario(response.data);
            
        
            const [favoritosDetalhados, carrinhoDetalhado] = await Promise.all([
                 carregarProdutosDetalhados(response.data.produtosFavoritos || []),
                 carregarProdutosDetalhados(response.data.produtosCarrinho || [])
            ]);
            
           
            setFavoritos(favoritosDetalhados.flat());
            setCarrinho(carrinhoDetalhado.flat());
            
            
            return { success: true, data: response.data };
        } else {
            return { success: false, errors: response.errors };
        }               
    } catch (error) {
        return { success: false, errors: ["Erro interno no servidor tente novamente."] };
    }
}


async function carregarProdutosDetalhados(produtosIds) {
    try {
        const produtosDetalhados = [];
        
       
        for (const produtoId of produtosIds) {
            const produtoResponse = await productController.getProdutoById(produtoId);
            if (produtoResponse.success) {
                produtosDetalhados.push(produtoResponse.data);
            }
        }
        
        return produtosDetalhados;
    } catch (error) {
        console.error('Erro ao carregar produtos detalhados:', error);
        return [];
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
    console.log(usuario);
    
    try {
        if(produtoId == null || produtoId.trim() === '') {
            return { success: false, errors: ["ID do produto é obrigatório para adicionar aos favoritos."] };
        }
        
        
        if (!usuario.produtosFavoritos.includes(produtoId)) {
            usuario.produtosFavoritos.push(produtoId);
            console.log(usuario.produtosFavoritos);
            
        } else {
            return { success: false, errors: ["Produto já está nos favoritos"] };
        }
        
        const response = await UserService.updateUsuario(usuario, usuario.id);
        
        if (response.success) {
            setUsuario(usuario);
            
           
            const produtoResponse = await productController.getProdutoById(produtoId);
            
            
            if (produtoResponse.success) {
                setFavoritos((prevFavoritos) => {
                    if (!prevFavoritos.some(fav => fav.id === produtoId)) {
                        return [...prevFavoritos, produtoResponse.data];
                    }
                    return prevFavoritos;
                });
            }
            
            return { 
                success: true, 
                data: usuario.produtosFavoritos,
            };
        } else {
            return { success: false, errors: response.errors };
        }
    } catch (error) {
        console.error('Erro ao adicionar favorito:', error);
        return { success: false, errors: ["Erro ao adicionar favorito: " + error.message] };
    }
}
async function removeFavoritos() {
    try{
        usuario.produtosFavoritos = [];
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
            const produtoResponse = await productController.getProdutoById(produtoId);
            if (produtoResponse.success) {
                setFavoritos((prevFavoritos) => prevFavoritos.filter(produto => produto.id !== produtoId));
            }
            return { success: true };
        } else {
            return { success: false, errors: response.errors };
        }
    } catch (error) {
        return { success: false, errors: ["Erro ao remover favorito: " + error] };
    }
}
async function removerItemCarrinho(produtoId) {
    try {
        if(produtoId == null || produtoId.trim() === '') {
            return { success: false, errors: ["ID do produto é obrigatório para remover do carrinho."] };
        }
        usuario.carrinho = usuario.carrinho.filter(id => id !== produtoId);

        const response = await UserService.updateUsuario(usuario, usuario.id);

        if (response.success) {
            setUsuario(usuario);
            setCarrinho((prevCarrinho) => prevCarrinho.filter(id => id !== produtoId));
            return { success: true };
        } else {
            return { success: false, errors: response.errors };
        }
    } catch (error) {
        return { success: false, errors: ["Erro ao remover item do carrinho: " + error] };
    }
}
async function adicionarItemCarrinho(produtoId) {
    try {
        if(produtoId == null || produtoId.trim() === '') {
            return { success: false, errors: ["ID do produto é obrigatório para adicionar ao carrinho."] };
        }
        if (!usuario.carrinho.includes(produtoId)) {
            usuario.carrinho.push(produtoId);
        } else {
            return { success: false, errors: ["Produto já está no carrinho"] };
        }

        const response = await UserService.updateUsuario(usuario, usuario.id);

        if (response.success) {
            setUsuario(usuario);
            setCarrinho((prevCarrinho) => [...prevCarrinho, produtoId]);
            return { success: true };
        } else {
            return { success: false, errors: response.errors };
        }
    } catch (error) {
        return { success: false, errors: ["Erro ao adicionar item ao carrinho: " + error] };
    }
}
function getFavoritos() {
    
        return favoritos || [];
}
function getCarrinho() { 
    return carrinho || [];
}
function produtoEhFavorito(produtoId) {
    if (!favoritos || favoritos.length === 0) {
        return false;
    }
    return favoritos.some(fav => fav.id === produtoId);
}

    return {
        produtoEhFavorito,
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
        removeFavoritos,
        getCarrinho,
        removerItemCarrinho,
        adicionarItemCarrinho,
        removerUmFavorito,
        

    }
};