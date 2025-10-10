
const produtoController  =() => {

    const getAllProdutos = (req, res) => {
        res.send('Lista de todos os produtos');
    };

    const getProdutoById = (req, res) => {
        const { id } = req.params;
        res.send(`Detalhes do produto com ID: ${id}`);
    };

    const createProduto = (req, res) => {
        const novoProduto = req.body;
        res.status(201).send(`Produto criado: ${JSON.stringify(novoProduto)}`);
    };

    const updateProduto = (req, res) => {
        const { id } = req.params;
        const produtoAtualizado = req.body;
        res.send(`Produto com ID: ${id} atualizado para: ${JSON.stringify(produtoAtualizado)}`);
    };

    const deleteProduto = (req, res) => {
        const { id } = req.params;
        res.send(`Produto com ID: ${id} deletado`);
    };

    return {
        getAllProdutos,
        getProdutoById,
        createProduto,
        updateProduto,
        deleteProduto
    };

    
}
export default produtoController;