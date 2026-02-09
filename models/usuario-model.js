import client from "../db/conn.js";

export async function validarUsuario(email, senha) {
    const db = client.db('meuBanco');
    const collection = db.collection('usuarios');

    const usuario = await collection.findOne({ email, senha });
    return usuario;
}

export async function inserirUsuario(email, senha) {
    const db = client.db('meuBanco');
    const collection = db.collection('usuarios');

    await collection.insertOne({ email, senha });
}

export default { validarUsuario, inserirUsuario };

