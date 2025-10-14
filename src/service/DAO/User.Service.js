import { getJSON, setJSON } from "../storage";
import { STORAGE_KEYS } from "../storegeKeys";

const USUARIO_KEY = STORAGE_KEYS.USUARIO;

export async function getUsuario() {
    const usuario = await getJSON(USUARIO_KEY, null);
    return usuario;
}

export async function setUsuario(usuario) {
    await setJSON(USUARIO_KEY, usuario);
}
export async function clearUsuario() {
    await setJSON(USUARIO_KEY, null);
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
export async function isLoggedIn() {
    const usuario = await getUsuario();
    return usuario !== null;
}

export async function updateUsuario(usuarioAtualizado, id) {
    const usuarios = await getUsuario();
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return { success: false, errors: "Usuário não encontrado." };
    }
    const errors = validaUsuario(usuarioAtualizado);
    if (errors.length > 0) {
        return { success: false, errors };
    }
    const updatedUsuario = { ...usuario, ...usuarioAtualizado };
    await setUsuario(updatedUsuario);
    return { success: true, data: updatedUsuario };
}

export async function createUsuario(novoUsuario) {
    const errors = validaUsuario(novoUsuario);
    if (errors.length > 0) {
        return { success: false, errors };
    }
    const usuarios = await getUsuario();
    const id = Date.now().toString();
    const usuario = { id, ...novoUsuario };
    await setUsuario([...usuarios, usuario]);
    return { success: true, data: usuario };
}
export async function deleteUsuario(id) {
    if (!id) {
        return { success: false, errors: ["ID do usuário é obrigatório."] };
    }
    const usuarios = await getUsuario();
    const usuarioIndex = usuarios.findIndex(u => u.id === id);

    if (usuarioIndex === -1) {
        return { success: false, errors: ["Usuário não encontrado."] };
    }
    usuarios.splice(usuarioIndex, 1);
    await setUsuario(usuarios);
    return { success: true };
}

export async function authenticateUsuario(login, senha) {
    if (!login || login.trim() === '' || !senha || senha.trim() === '') {
        return { success: false, errors: ["Login e senha são obrigatórios."] };
    }
    const usuarios = await getUsuario();
    const usuario = usuarios.find(u => u.login === login && u.senha === senha);
    if (!usuario) {
        return { success: false, errors: ["Login ou senha inválidos."] };
    }
    return { success: true, data: usuario };
}
export async function getAllUsuarios() {
    const usuarios = await getUsuario();
    return usuarios || [];
}