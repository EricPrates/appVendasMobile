import { getJSON, setJSON } from "../storage";

import { STORAGE_KEYS } from "../storegeKeys";

const PRODUTOS_KEY = STORAGE_KEYS.PRODUTOS;

validarProduto = (produto) => {
    const { nome, descricao, preco, quantidade, imagem, cores, tamanho, categoria, fornecedor } = produto;
    const errors = [];
    if(!nome || nome.trim() === '') {
        errors.push("Nome é obrigatório.");
    }
    else if(nome.length < 3) {
        errors.push("Nome deve ter pelo menos 3 caracteres.");
    }
    else if(descricao.length < 10 || descricao.trim() === '' || !descricao || descricao === null || descricao === undefined) {
        errors.push("Descrição deve ter pelo menos 10 caracteres.");
    }
    else if(isNaN(preco) || preco <= 0) {
        errors.push("Preço deve ser um número positivo.");
    }
    else if(isNaN(quantidade) || quantidade < 0 || !Number.isInteger(quantidade)|| quantidade === null || quantidade === undefined) {
        errors.push("Não é possível cadastrar um produto com quantidade negativa, não inteira ou vazia.");
    }
    else if(!imagem || imagem.trim() === '') {
        errors.push("Imagem é obrigatória.");
    }
   else if(!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)(?:\?.*)?$/i.test(imagem)) {
    errors.push("URL da imagem inválida.");
    }
    else if (!Array.isArray(cores) || cores.length === 0) {
        errors.push("Pelo menos uma cor é obrigatória.");
    }
    else if (!tamanho || tamanho.trim() === '') {
        errors.push("Tamanho é obrigatório.");
    }
    else if(tamanho.length < 1) {
        errors.push("Tamanho deve ter pelo menos 1 caractere.");
    }
    else if (!categoria || categoria.trim() === '') {
        errors.push("Categoria é obrigatória.");
    }
    else if(fornecedor === null || fornecedor === undefined || fornecedor.trim() === '') {
        errors.push("Fornecedor é obrigatório.");
    }
    return errors;

}
export async function getProdutos() {
    const produtos = await getJSON(PRODUTOS_KEY, []);
    return produtos;
}

export async function saveProdutos(produtos) {
  await setJSON(PRODUTOS_KEY, produtos);
}

export async function addProduto(produto) {
    const errors = validarProduto(produto);
    
    if(errors.length > 0) {
        return {success: false, errors};
    }
    const produtos = await getProdutos();
    const novoProduto = { id: Date.now().toString(), ...produto };
    produtos.push(novoProduto);
    await saveProdutos(produtos);
    return { success: true, data: novoProduto, message: "Produto adicionado com sucesso." };
}

export async function updateProduto(id, produtoAtualizado) {
    const produtos = await getProdutos();
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return { success: false, errors: ["Produto não encontrado."] };
    }
    const errors = validarProduto(produtoAtualizado);
    if(errors.length > 0) {
        return {success: false, errors};
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

    const produtoBuscado = [produtos.find(p => p.nome === nome)];

    if(!produtoBuscado){
        return {sucess: false, errors: ["Produto não encontrado."]};
    }

    return {sucess: true, data: produtoBuscado};

}

export async function getProdutosGeral(filtro){
    const produtos = await getProdutos();
    
    const produtosFiltrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        p.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
        p.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
        p.fornecedor.toLowerCase().includes(filtro.toLowerCase()) ||
        p.id.toString() === filtro
    );
    return { success: true, data: produtosFiltrados };  
}

export async function getProdutosByCategoria(categoria) {
    const produtos = await getProdutos();

    if(!categoria || categoria.trim() === ''){
        return {success: false, errors: ["Produto não encontrado."]};
    }

    const produtosFiltrados = produtos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    return { success: true, data: produtosFiltrados };

}
export async function getProdutosByFornecedor(fornecedor) {
    const produtos = await getProdutos();

    if(!fornecedor || fornecedor.trim() === ''){
        return {success: false, errors: ["Produto não encontrado."]};
    }

    const produtosFiltrados = produtos.filter(p => p.fornecedor.toLowerCase() === fornecedor.toLowerCase());
    return { success: true, data: produtosFiltrados };
}

export async function getProdutosByPreco(min, max) {
    const produtos = await getProdutos();
    if(isNaN(min) || isNaN(max) || min < 0 || max < 0 || min > max) {
        return {success: false, errors: ["Intervalo de preço inválido."]};
    }
    const produtosFiltrados = produtos.filter(p => p.preco >= min && p.preco <= max);
    return { success: true, data: produtosFiltrados };
}
export async function getProdutosByEstoque(min, max) {
    const produtos = await getProdutos();
    if(isNaN(min) || isNaN(max) || min < 0 || max < 0 || min > max) {
        return {success: false, errors: ["Intervalo de estoque inválido."]};
    }
    const produtosFiltrados = produtos.filter(p => p.estoque >= min && p.estoque <= max);
    return { success: true, data: produtosFiltrados };
}
export async function getProdutosByAvaliacao(min, max) {
    const produtos = await getProdutos();
    if(isNaN(min) || isNaN(max) || min < 0 || max < 0 || min > max || min > 5 || max > 5) {
        return {success: false, errors: ["Intervalo de avaliação inválido."]};
    } 

    const produtosFiltrados = produtos.filter(p => p.avaliacao >= min && p.avaliacao <= max);
    return { success: true, data: produtosFiltrados };
}
export async function getProdutosByDesconto() {
    const produtos = await getProdutos();
    
   const produtosFiltrados = produtos.filter(p => p.desconto? p.desconto : false);
   if(produtosFiltrados.length === 0) {
        return {success: false, errors: ["Nenhum produto com desconto encontrado."]};
   }
   return { success: true, data: produtosFiltrados };
}

export async function getProdutosByTamanho(tamanho) {
    const produtos = await getProdutos();

    if(!tamanho || tamanho.trim() === '' || tamanho <= 33 || tamanho >= 50 || isNaN(tamanho)) {
        return {success: false, errors: ["Tamanho inválido."]};
    }

    const produtosFiltrados = produtos.filter(p => p.tamanho === tamanho);
    if(produtosFiltrados.length === 0) {
        return {success: false, errors: ["Nenhum produto com esse tamanho encontrado."]};
    }
    return { success: true, data: produtosFiltrados };

}

export async function getProdutosByCor(cor) {
    const produtos = await getProdutos();

    if(!cor || cor.trim() === '' ) {
        return {success: false, errors: ["Cor inválida."]};
    }

    const produtosFiltrados = produtos.filter(p => p.cor.toLowerCase() === cor.toLowerCase());
    if(produtosFiltrados.length === 0) {
        return {success: false, errors: ["Nenhum produto com essa cor encontrado."]};
    }
    return { success: true, data: produtosFiltrados };

}

export async function getProdutosEmEstoque() {
    const produtos = await getProdutos();

    const produtosFiltrados = produtos.filter(p => p.estoque > 0);
    if(produtosFiltrados.length === 0) {
        return {success: false, errors: ["Nenhum produto em estoque encontrado."]};
    }
    return { success: true, data: produtosFiltrados };

}
