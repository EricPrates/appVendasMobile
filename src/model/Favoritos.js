export default class Favoritos {
    constructor(produtos = [], usuario = null) {
        this.produtos = produtos;
        this.usuario = usuario;
    }

    addProdutos(produto) {
        this.produtos.push(produto);
    }

    removeProduto(produto) {
        this.produtos = this.produtos.filter(p => p.id !== produto.id);
    }

    getProdutos() {
        return this.produtos;
    }
    setUsuario(usuario) {
        this.usuario = usuario;
    }
    getUsuario() {
        return this.usuario;
    }
}
