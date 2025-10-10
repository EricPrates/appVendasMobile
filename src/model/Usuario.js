

export default class Usuario {
    constructor(nome = '', login = '', senha = '', tipo = 'admin' | 'comum' | null) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.tipo = tipo;
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
