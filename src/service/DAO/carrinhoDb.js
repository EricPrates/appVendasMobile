
import { getJSON, setJSON } from "../storage";

import { STORAGE_KEYS } from "../storegeKeys";

function getCarrinhoKey(usuarioId) {
    return `${STORAGE_KEYS.CARRINHO}_${usuarioId}`;
}

function validarProdutoCarrinho(produto, quantidade) {
    const errors = [];
    if (!produto || !produto.id) {
        errors.push("Produto inválido.");
    }
    if (!quantidade || quantidade <= 0) {
        errors.push("Quantidade inválida.");
    }
    return errors;
}

export async function getCarrinho(usuarioId = "default") {
    const CARRINHO_KEY = getCarrinhoKey(usuarioId);
    return await getJSON(CARRINHO_KEY, []);
}

export async function saveCarrinho(carrinho, usuarioId = "default") {
    const CARRINHO_KEY = getCarrinhoKey(usuarioId);
    await setJSON(CARRINHO_KEY, carrinho);
}

export async function clearCarrinho(usuarioId = "default") {
    const CARRINHO_KEY = getCarrinhoKey(usuarioId);
    await setJSON(CARRINHO_KEY, []);
}

export async function addProdutoCarrinho(produto, quantidade, usuarioId = "default") {
    const carrinho = await getCarrinho(usuarioId);

    const errors = validarProdutoCarrinho(produto, quantidade);
    if (errors.length > 0) {
        return { success: false, errors };
    }
    const itemExistenteIndex = carrinho.findIndex(p => p.id === produto.id);
    if (itemExistenteIndex !== -1) {
        carrinho[itemExistenteIndex].quantidade += quantidade;
        await saveCarrinho(carrinho, usuarioId);
        return { success: true, message: "Quantidade do produto atualizada no carrinho." };
    }
    else{
        carrinho.push({ ...produto, quantidade });
        await saveCarrinho(carrinho, usuarioId);
        return { success: true, message: "Produto adicionado ao carrinho." };
    }
    
}

export async function removeProdutoCarrinho(produtoId, usuarioId = "default") {
    const carrinho = await getCarrinho(usuarioId);
    const novoCarrinho = carrinho.filter(p => p.id !== produtoId);
    await saveCarrinho(novoCarrinho, usuarioId);
    return { success: true, message: "Produto removido do carrinho." };
}
export async function updateProdutoQuantidade(produtoId, novaQuantidade, usuarioId = "default") {
    if (novaQuantidade <= 0) {
        return removeProdutoCarrinho(produtoId, usuarioId);
    }
    const carrinho = await getCarrinho(usuarioId);
    const itemIndex = carrinho.findIndex(p => p.id === produtoId);
    if (itemIndex !== -1) {
        carrinho[itemIndex].quantidade = novaQuantidade;
        await saveCarrinho(carrinho, usuarioId);
        return { success: true, message: "Quantidade do produto atualizada no carrinho." };
    }
    return { success: false, message: "Produto não encontrado no carrinho." };
}

export async function calcularTotalCarrinho(usuarioId = "default") {
    const carrinho = await getCarrinho(usuarioId);
    const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
    return total;
}
