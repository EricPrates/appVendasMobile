import { useState } from 'react';
import * as ProdutoService from '../../service/DAO/Produto.Service';

export const ProdutoController = () => {

    const [favoritos, setFavoritos] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const addFavorito = (produto) => {
        setFavoritos((prevFavoritos)=> [...prevFavoritos, produto]);
    };
    const validarProduto  = (produto) => {
        const { nome, descricao, preco, quantidade, urlImagem, cores, tamanho, categoria, fornecedor } = produto;
        const errors = [];
        if(!nome || nome.trim() === '') {
            errors.push("Nome é obrigatório.");
        }
        else if(nome.length < 3) {
            errors.push("Nome deve ter pelo menos 3 caracteres.");
        }
         if(descricao.length < 10 || descricao.trim() === '' || !descricao || descricao === null || descricao === undefined) {
            errors.push("Descrição deve ter pelo menos 10 caracteres.");
        }
         if(isNaN(preco) || preco <= 0) {
            errors.push("Preço deve ser um número positivo.");
        }
        if(isNaN(quantidade) || quantidade < 0 || !Number.isInteger(quantidade)|| quantidade === null || quantidade === undefined) {
            errors.push("Não é possível cadastrar um produto com quantidade negativa, não inteira ou vazia.");
        }
        if(!urlImagem || urlImagem.trim() === '') {
            errors.push("urlImagem é obrigatória.");
        }
        else if(!urlImagem.startsWith('http')) {
            errors.push("URL da imagem deve começar com http ou https.");
        }
        if (!Array.isArray(cores) || cores.length === 0) {
            errors.push("Pelo menos uma cor é obrigatória.");
        }
        if (!tamanho || tamanho.trim() === '') {
            errors.push("Tamanho é obrigatório.");
        }
        else if(tamanho.length < 1) {
            errors.push("Tamanho deve ter pelo menos 1 caractere.");
        }
         if (!categoria || categoria.trim() === '') {
            errors.push("Categoria é obrigatória.");
        }
        else if(fornecedor === null || fornecedor === undefined || fornecedor.trim() === '') {
            errors.push("Fornecedor é obrigatório.");
        }
        return errors;
    
    }

    async function saveProdutos(produtos = []) {
            const errors = validarProduto(produtos.map(p => p));
        try{
            
            if(errors.length > 0) {
                return { success: false, errors };
            }
            const produtosComId = produtos.map(p => ({ ...p, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }));
            await ProdutoService.saveProdutos(produtosComId);
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function addProduto(novoProduto) {
        const errors = validarProduto(novoProduto);
        try{
            
            if(errors.length > 0) {
                return { success: false, errors };
            }
            const id = Date.now().toString();
            const produtoComId = { id, ...novoProduto };
            const response = await ProdutoService.addProduto(produtoComId);
            return response;
            }catch(error){
                    return { success: false, errors: ["Erro interno no servidor tente novamente."] };
            }
    }
    
    async function updateProduto(id, produtoAtualizado) {
        if(!id || id.trim() === '') {
            return { success: false, errors: ["ID do produto é obrigatório para atualização."] };
        }
        const errors = validarProduto(produtoAtualizado);

        if(errors.length > 0) {
            return { success: false, errors };
        }
        try{
            const response = await ProdutoService.updateProduto(id, produtoAtualizado);
            return response;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function deleteProduto(id) {
        if(!id || id.trim() === '') {
            return { success: false, errors: ["ID do produto é obrigatório para exclusão."] };
        }
        try{
            const response = await ProdutoService.deleteProdutoId(id);
            return response;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutos() {
        
        try{
            const todosProdutos = await ProdutoService.getProdutos();
            setProdutos(todosProdutos);
            return todosProdutos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    function getProdutoById(id) {
        if(!id || id.trim() === '') {
            return { success: false, errors: ["ID do produto é obrigatório para busca."] };
        }
        try{
            const produto =  ProdutoService.getProdutoById(id);
            return produto;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
        
    function getProdutosNomeCategoria(filtro) {
        if(!filtro || filtro.trim() === '') {
            return { success: false, data: produtos  };
        }
        const produtosFiltrados = [...produtos].filter(p => 
            p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            p.categoria.toLowerCase().includes(filtro.toLowerCase())
        );
        return produtosFiltrados;
    }
    
    async function getProdutosByPreco(min, max) {
        if (min === undefined || max === undefined) {
            return { success: false, errors: ["Valores de preço inválidos."] };
        }
        if (isNaN(min) || isNaN(max) || min < 0 || max < 0 || min > max) {
            return { success: false, errors: ["Valores de preço inválidos."] };
        }
        try{
            const produtos = await ProdutoService.getProdutosByPreco(min, max);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
   
       
    function getProdutoOrdenacaoNomeCrescente() {
         const produtosFiltrados = [...produtos].sort((a, b) => a.nome.localeCompare(b.nome));
         return produtosFiltrados;
    }
    function getProdutoOrdenacaoPrecoCrescente() {
       const produtosFiltrados = [...produtos].sort((a, b) => a.preco - b.preco);
       return produtosFiltrados;
    }
    async function clearAll() {
        try{
            await ProdutoService.clearAll();
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    function getProdutosByCategoria(categoria) {
       if(!categoria || categoria.trim() === '') {
            return produtos;
        }
        const produtosFiltrados = [...produtos].filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
        return produtosFiltrados;
    }

    return {
        getProdutosByCategoria,
        saveProdutos,
        clearAll,
        addProduto,
        updateProduto,
        deleteProduto,
        getProdutos,
        getProdutoById,
        addFavorito,
        getProdutosByPreco,
       getProdutosNomeCategoria,
        getProdutoOrdenacaoNomeCrescente,
        getProdutoOrdenacaoPrecoCrescente
        
    }
}