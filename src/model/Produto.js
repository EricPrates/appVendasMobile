export default class Produto {
    constructor(id = 0, nome = "", descricao = "", preco = 0.0, quantidade = 0, imagem = "") {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.imagem = imagem;
    }

    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    setNome(nome) {
        this.nome = nome;
    }
    getNome() {
        return this.nome;
    }

    setDescricao(descricao) {
        this.descricao = descricao;
    }
    getDescricao() {
        return this.descricao;
    }

    setPreco(preco) {
        this.preco = preco;
    }
    getPreco() {
        return this.preco;
    }

    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }
    getQuantidade() {
        return this.quantidade;
    }
    setImagem(imagem) {
        this.imagem = imagem;
    }
    getImagem() {
        return this.imagem;
    }
    
}
