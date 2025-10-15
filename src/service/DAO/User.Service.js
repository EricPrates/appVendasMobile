import { getJSON, setJSON } from "../storage";
import { STORAGE_KEYS } from "../storegeKeys";

const USUARIO_KEY = STORAGE_KEYS.USUARIO;
const USUARIO_LOGADO_KEY = STORAGE_KEYS.USUARIO_LOGADO;

export async function getUsuarioLogado() {
    const usuarioLogado = await getJSON(USUARIO_LOGADO_KEY, null);
    return  usuarioLogado;
}
export async function setUsuarioLogado(usuario) {
    await setJSON(USUARIO_LOGADO_KEY, usuario);
}
export async function logout() {
    await setJSON(USUARIO_LOGADO_KEY, null);
}

export async function getUsuarios() {
    const usuarios = await getJSON(USUARIO_KEY, []);
    return usuarios;
}

export async function setUsuarios(usuarios) {
    await setJSON(USUARIO_KEY, usuarios);
}
export async function clearUsuarios() {
    await setJSON(USUARIO_KEY, null)
}

function validaUsuario(updatedFields) {
    const { endereco, email, telefone, nome, login, senha, tipo } = updatedFields;
    const errors = [];
    if (!nome || nome.trim() === '') {
        errors.push("Nome é obrigatório.");
    }
    if (!email || email.trim() === '') {
        errors.push("Email é obrigatório.");
    }
    if (!telefone || telefone.trim() === '') {
        errors.push("Telefone é obrigatório.");
    }
    if (!endereco || endereco.trim() === '') {
        errors.push("Endereço é obrigatório.");
    }
    if (!login || login.trim() === '') {
        errors.push("Login é obrigatório.");
    }
    if (!senha || senha.trim() === '') {
        errors.push("Senha é obrigatória.");
    }
    if (!tipo || tipo.trim() === '') {
        errors.push("Tipo é obrigatório.");
    }
    return errors;
}


export async function updateUsuario(usuarioAtualizado, id) {
    const usuarios = await getUsuarios();
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return { success: false, errors: ["Usuário não encontrado."] };
    }
    const errors = validaUsuario(usuarioAtualizado);
    if (errors.length > 0) {
        return { success: false, errors };
    }
    const emailExiste = usuarios.some(u => u.id !== id && u.email === usuarioAtualizado.email);
    const loginExiste = usuarios.some(u => u.id !== id && u.login === usuarioAtualizado.login);

    if (emailExiste) {
        return { success: false, errors: ["Email já está em uso."] };
    }
    if (loginExiste) {
        return { success: false, errors: ["Login já está em uso."] };
    }
    const updatedUsuario = { ...usuario, ...usuarioAtualizado };
    const updateUsuario = usuarios.map(u => u.id === id ? updatedUsuario : u);
    await setUsuarios(updateUsuario);
    return { success: true, data: updatedUsuario };
}

export async function createUsuario(novoUsuario) {
    const errors = validaUsuario(novoUsuario);
    if (errors.length > 0) {
        return { success: false, errors };
    }
    
    const usuarios = await getUsuarios();

    const loginExiste = usuarios.some(u => u.login === novoUsuario.login);
    const emailExiste = usuarios.some(u => u.email === novoUsuario.email);
    if (emailExiste) {
        return { success: false, errors: ["Email já está em uso."] };
    }
    if (loginExiste) {
        return { success: false, errors: ["Login já está em uso."] };
    }
  
    const id = Date.now().toString();
    const usuario = { id, ...novoUsuario };
    await setUsuarios([...usuarios, usuario]);
    return { success: true, data: usuario };
}

export async function deleteUsuario(id) {
    if (!id) {
        return { success: false, errors: ["ID do usuário é obrigatório."] };
    }
    const usuarios = await getUsuarios();
    const usuarioIndex = usuarios.findIndex(u => u.id === id);

    if (usuarioIndex === -1) {
        return { success: false, errors: ["Usuário não encontrado."] };
    }
    usuarios.splice(usuarioIndex, 1);
    await setUsuarios(usuarios);
    return { success: true };
}

export async function Logar(login, senha) {
    if (!login || login.trim() === '' || !senha || senha.trim() === '') {
        return { success: false, errors: ["Login e senha são obrigatórios."] };
    }
    const usuarios = await getUsuarios();
    const usuario = usuarios.find(u => u.login === login && u.senha === senha);
    if (!usuario) {
        return { success: false, errors: ["Login ou senha inválidos."] };
    }
    await setUsuarioLogado(usuario);
    return { success: true, data: usuario };
}

export async function getUsuarioById(id) {
    if (!id) {
        return { success: false, errors: ["ID do usuário é obrigatório."] };
    }
    const usuarios = await getUsuarios();
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return { success: false, errors: ["Usuário não encontrado."] };
    }
    return { success: true, data: usuario };
}

