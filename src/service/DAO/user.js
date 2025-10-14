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
export async function isLoggedIn() {
    const usuario = await getUsuario();
    return usuario !== null;
}

export async function updateUsuario(updatedFields = {}, id) {
    const usuarios = await getUsuario();
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return { success: false, errors: "Usuário não encontrado." };
    }
    const errors = validaUsuario(updatedFields);
    const updatedUsuario = { ...usuario, ...updatedFields };
    await setUsuario(updatedUsuario);
    return { success: true, data: updatedUsuario };
}