import { getJSON,setJSON } from "../storage";
import { STORAGE_KEYS } from "../storegeKeys";


function getFavoritosKey(usuarioId) {
    return `${STORAGE_KEYS.FAVORITOS}_${usuarioId}`;
}

export async function getFavoritos(usuarioId = "default") {
    const FAVORITOS_KEY = getFavoritosKey(usuarioId);
    return await getJSON(FAVORITOS_KEY, []);
}

export async function saveFavoritos(favoritos, usuarioId = "default") {
    const FAVORITOS_KEY = getFavoritosKey(usuarioId);
    await setJSON(FAVORITOS_KEY, favoritos);
}

export async function clearFavoritos(usuarioId = "default") {
    const FAVORITOS_KEY = getFavoritosKey(usuarioId);
    await setJSON(FAVORITOS_KEY, []);
}

export async function addProdutoFavorito(produtoid, usuarioId = "default") {
    
    const favoritos = await getFavoritos(usuarioId);

    if(favoritos.some(favorito => favorito.id === produtoid)) {
        return { success: false, message: "Produto já está nos favoritos." };
    }
    favoritos.push({
        produtoId: produtoid,
        adicionadoEm: new Date().toISOString()
    });
    await saveFavoritos(favoritos, usuarioId);
    return { success: true, message: "Produto adicionado aos favoritos." };     
       
}

export async function removeProdutoFavorito(produtoId, usuarioId = "default") {
    const favoritos = await getFavoritos(usuarioId);
    const produtoExistente = favoritos.find(p => p.id === produtoId);
    if (produtoExistente) {
        const novoFavoritos = favoritos.filter(p => p.id !== produtoId);
        await saveFavoritos(novoFavoritos, usuarioId);
        return { success: true, message: "Produto removido dos favoritos." };
    }
    return { success: false, message: "Produto não encontrado nos favoritos." };
}

export async function isProdutoFavorito(produtoId, usuarioId = "default") {
    const favoritos = await getFavoritos(usuarioId);
    return favoritos.some(favorito => favorito.id === produtoId);
}

export async function toggleProdutoFavorito(produto, usuarioId = "default") {
    const EhFavorito = await isProdutoFavorito(produto.id, usuarioId);
    if (EhFavorito) {
        await removeProdutoFavorito(produto.id, usuarioId);
        return { success: true, message: "Produto removido dos favoritos.", action: 'removed' };
    } else {
        await addProdutoFavorito(produto, usuarioId);
        return { success: true, message: "Produto adicionado aos favoritos.", action: 'added' };
    }
}
