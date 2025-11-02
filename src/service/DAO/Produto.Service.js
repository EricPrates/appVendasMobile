import { getJSON, setJSON } from "../storage";

import { STORAGE_KEYS } from "../storegeKeys";

const PRODUTOS_KEY = STORAGE_KEYS.PRODUTOS;


export async function getProdutos() {
    const produtos = await getJSON(PRODUTOS_KEY, []);
    return produtos;
}

export async function saveProdutos(produtos) {
  await setJSON(PRODUTOS_KEY, produtos);
}

export async function addProduto(produto) {
    
    const produtos = await getProdutos();

    produtos.push(produto);
    await saveProdutos(produtos);
    return { success: true, data: produto, message: "Produto adicionado com sucesso." };
}
export async function clearAll() {
    await setJSON(PRODUTOS_KEY, []);
    return { success: true, message: "Todos os produtos foram removidos com sucesso." };
}

export async function updateProduto(id, produtoAtualizado) {
    const produtos = await getProdutos();
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return { success: false, errors: ["Produto não encontrado."] };
    }
    
    produtos[index] = {...produtos[index], ...produtoAtualizado};
    await saveProdutos(produtos);
    return { success: true, data: produtos[index], message: "Produto atualizado com sucesso." };
}

export async function deleteProdutoId(id) {
    const produtos = await getProdutos();
    const produtoParaDeletar = produtos.find(p => p.id === id);
    if (!produtoParaDeletar) {
        return { success: false, errors: ["Produto não encontrado."] };
    }
    produtos.remove(produtoParaDeletar);
    await saveProdutos(produtos);
    return { success: true, message: "Produto deletado com sucesso." };
}

export async function deleteProdutoNome(nome) {
    const produtos = await getProdutos();
    const produtoParaDeletar = produtos.find(p => p.nome === nome);
    if (!produtoParaDeletar) {
        return { success: false, errors: ["Produto não encontrado."] };
    }
    produtos.remove(produtoParaDeletar);
    await saveProdutos(produtos);
    return { success: true, message: "Produto deletado com sucesso." };
}

export async function getProdutoById(id) {

    const produtos = await getProdutos();
    
    const produtoBuscado = produtos.find(p => p.id === id);
    if (!produtoBuscado) {
        return { success: false, errors: ["Produto não encontrado."] };
    }
    return { success: true, data: produtoBuscado };
}

export async function getProdutoByNome(nome) {
    const produtos = await getProdutos();

    const produtoBuscado = produtos.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));

    if(!produtoBuscado || produtoBuscado.length === 0){
        return {success: false, errors: ["Produto não encontrado."]};
    }

    return {success: true, data: produtoBuscado};

}






