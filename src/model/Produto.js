export default class Produto {
    constructor(id, nome = "") {
       
       
        this.id = id;
        
        this.nome = nome;
      
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
