import * as ProdutoService from '../../service/DAO/Produto.Service';

export const ProdutoController = () => {

    async function saveProdutos(produtos) {
        try{
           const produtosComId = produtos.map(p => ({ ...p, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` }));
            await ProdutoService.saveProdutos(produtosComId);
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function addProduto(novoProduto) {
        try{
            const id = Date.now().toString();
            const produtoComId = { id, ...novoProduto };
            const response = await ProdutoService.addProduto(produtoComId);
            return response;
            }catch(error){
                    return { success: false, errors: ["Erro interno no servidor tente novamente."] };
            }
    }

    async function updateProduto(id, produtoAtualizado) {
        try{
            const response = await ProdutoService.updateProduto(id, produtoAtualizado);
            return response;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function deleteProduto(id) {
        try{
            const response = await ProdutoService.deleteProdutoId(id);
            return response;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutos() {
        try{
            const produtos = await ProdutoService.getProdutos();
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutoById(id) {
        try{
            const produto = await ProdutoService.getProdutoById(id);
            return produto;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutoByNome(nome) {
        try{
            const produto = await ProdutoService.getProdutoByNome(nome);
            return produto;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosByCategoria(categoria) {
        try{
            const produtos = await ProdutoService.getProdutosByCategoria(categoria);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosByFornecedor(fornecedor) {
        try{
            const produtos = await ProdutoService.getProdutosByFornecedor(fornecedor);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosGeral(filtro) {
        try{
            const produtos = await ProdutoService.getProdutosGeral(filtro);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosByAvaliacao(avaliacao) {
        try{
            const produtos = await ProdutoService.getProdutosByAvaliacao(avaliacao);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosByPreco(min, max) {
        try{
            const produtos = await ProdutoService.getProdutosByPreco(min, max);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosByCor(cor) {
        try{
            const produtos = await ProdutoService.getProdutosByCor(cor);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }

    }
    
    async function getProdutosByTamanho(tamanho) {
        try{
            const produtos = await ProdutoService.getProdutosByTamanho(tamanho);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosByEstoque(minEstoque, maxEstoque) {
        try{
            const produtos = await ProdutoService.getProdutosByEstoque(minEstoque, maxEstoque);
            return { success: true, data: [produtos] };
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosByDesconto(desconto) {
        try{
            const produtos = await ProdutoService.getProdutosByDesconto(desconto);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function getProdutosEmEstoque(disponibilidade) {
        try{
            const produtos = await ProdutoService.getProdutosEmEstoque(disponibilidade);
            return produtos;
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }
    async function clearAll() {
        try{
            await ProdutoService.clearAll();
        }catch(error){
            return { success: false, errors: ["Erro interno no servidor tente novamente."] };
        }
    }

    return {
        saveProdutos,
        clearAll,
        addProduto,
        updateProduto,
        deleteProduto,
        getProdutos,
        getProdutoById,
        getProdutoByNome,
        getProdutosByCategoria,
        getProdutosByFornecedor,
        getProdutosGeral,
        getProdutosByAvaliacao,
        getProdutosByPreco,
        getProdutosByCor,
        getProdutosByTamanho,
        getProdutosByEstoque,
        getProdutosByDesconto,
        getProdutosEmEstoque
    }
}