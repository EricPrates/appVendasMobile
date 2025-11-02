

export default class Usuario {
    constructor( endereco = '', email = '', telefone = '',
         nome = '', login = '', senha = '', tipo = 'admin' | 'comum' | null, produtosFavoritos = [], carrinho = []) {
        this.produtosFavoritos  = produtosFavoritos;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.nome = nome;
        this.carrinho = carrinho;
        this.login = login;
        this.senha = senha;
        this.tipo = tipo;
    }
    setEndereco(endereco = '') {
        this.endereco = endereco;
    }
    
    
    getProdutosFavoritos() {
        return this.produtosFavoritos;
    }

    getEndereco() {
        return this.endereco;
    }
    setEmail(email = '') {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
    setTelefone(telefone = '') {
        this.telefone = telefone;
    }
    getTelefone() {
        return this.telefone;
    }
    setNome(nome = '') {
        this.nome = nome;
    }
    getNome() {
        return this.nome;
    }
    setLogin(login = '') {
        this.login = login;
    }
    getLogin() {
        return this.login;
    }
    setSenha(senha = '') {
        this.senha = senha;
    }
    getSenha() {
        return this.senha;
    }
    setTipo(tipo = '') {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    

}
