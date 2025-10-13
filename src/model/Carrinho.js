import Produto from '../model/Produto'

export default class Carrinho {
    constructor(user = null) {
        this.produtos = [];
        this.user = user;
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }
    setUser(user) {
        this.user = user;
    }   
    getUser() {
        return this.user;
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
