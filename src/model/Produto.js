export default class Produto {
    constructor(cores = [], id = 0, tamanho = "", nome = "", descricao = "", preco = 0.0, quantidade = 0, urlImagem = "") {
        this.cores = cores;
        this.id = id;
        this.tamanho = tamanho;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.urlImagem = urlImagem;
    }
    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }
    getTamanho() {
        return this.tamanho;
    }
    setCores(cor) {
        this.cores.push(cor);
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
    setUrlImagem(urlImagem) {
        this.urlImagem = urlImagem;
    }
    getImagem() {
        return this.urlImagem;
    }

}
