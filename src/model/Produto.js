export default class Produto {
    constructor(id, nome = "", descricao = "", preco = 0.0, quantidade = 0, urlImagem = "", cores = [], tamanho = "", avaliacao = 0, desconto = 0 ) {
        this.fornecedor = null;      
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.urlImagem = urlImagem;
        this.cores = cores;
        this.tamanho = tamanho;
        this.avaliacao = avaliacao;
        this.desconto = desconto;
    }
      
    
    setFornecedor(fornecedor) {
        this.fornecedor = fornecedor;
    }
    getFornecedor() {
        return this.fornecedor;
    }
    setAvaliacao(avaliacao) {
        this.avaliacao = avaliacao;
    }
    setDesconto(desconto) {
        this.desconto = desconto;
    }
    getDesconto() {
        return this.desconto;
    }

    getAvaliacao() {
        return this.avaliacao;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }
    getTamanho() {
        return this.tamanho;
    }
    addCores(cor) {
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
    getCores() {
        return this.cores;
    }
}
