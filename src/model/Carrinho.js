export default class Carrinho {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    removerProduto(id) {
        this.produtos = this.produtos.filter(produto => produto.getId() !== id);
    }

    calcularTotal() {
        return this.produtos.reduce((total, produto) => total + produto.getPreco() * produto.getQuantidade(), 0);
    }

    listarProdutos() {
        return this.produtos;
    }
}
