// ./models/usuario-model.js

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

/**
* Valida se o usuário com email e senha existe na base.
* Retorna o usuário se encontrado, ou null.
*/
export async function validarUsuario(email, senha) {
    const { data, error } = await supabase
        .from('usuarios') // Acessa a tabela ‘usuarios’
        .select('*') // Seleciona todos os campos
        .eq('email', email) // Filtra pelo campo email
        .eq('senha', senha) // Filtra pelo campo senha
        .single(); // Espera apenas um resultado
    
        if (error || !data) {
        return null;
    }
    
    return data;
}

/**
* Insere um novo usuário na tabela ‘usuarios’.
* Espera um objeto contendo email e senha.
*/
export async function inserirUsuario(usuario) {
    const { data, error } = await supabase
        .from('usuarios') // Acessa a tabela ‘usuarios’
        .insert([usuario]);//Insere o objeto no formato de array
    
        if (error) {
        console.error('Erro ao inserir usuário:', error);
        return null;
    }
    
    return data;
}

export default {
    validarUsuario,
    inserirUsuario
};